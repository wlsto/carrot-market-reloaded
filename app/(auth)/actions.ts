"use server";

import getSession from "@/lib/session";
import db from "@/lib/db";

export async function getMoreTweet(page: number) {
	const session = await getSession();
	if (session.id) {
		const tweet = await db.tweet.findMany({
			where: {
				userId: session.id,
			},
			include: {
				user: {
					select: {
						username: true,
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
