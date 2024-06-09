"use server";

import getSession from "@/lib/session";
import db from "@/lib/db";
import { z } from "zod";
import { redirect } from "next/navigation";

export async function getMoreTweet(page: number) {
	const session = await getSession();
	if (session.id) {
		const tweet = await db.tweet.findMany({
			include: {
				user: {
					select: {
						username: true,
					},
				},
				_count: {
					select: {
						responses: true,
						likes: true,
					},
				},
			},
			skip: page * 1,
			take: 1,
			orderBy: {
				created_at: "desc",
			},
		});

		return tweet;
	}
}

const tweetSchema = z.object({ tweet: z.string().trim().min(5, "This should be at least 10 characters long") });

export async function addTweet(prevState: any, formData: FormData) {
	const data = {
		tweet: formData.get("tweet"),
	};

	const result = await tweetSchema.safeParseAsync(data);

	if (!result.success) {
		return result.error.flatten();
	} else {
		const session = await getSession();
		if (session.id) {
			const tweet = await db.tweet.create({
				data: {
					tweet: result.data.tweet,
					user: {
						connect: {
							id: session.id,
						},
					},
				},
				select: {
					id: true,
				},
			});

			if (Boolean(tweet)) {
				redirect(`/tweets/${tweet.id}`);
			}
		}
	}
}
