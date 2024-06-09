"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

export async function likeTweet(id: number) {
	await new Promise((r) => setTimeout(r, 10000));
	const session = await getSession();
	try {
		await db.like.create({
			data: {
				tweetId: id,
				userId: session.id!,
			},
		});
		revalidateTag(`like-status-${id}`);
	} catch (error) {}
}

export async function dislikeTweet(id: number) {
	await new Promise((r) => setTimeout(r, 10000));
	const session = await getSession();
	try {
		await db.like.delete({
			where: {
				id: {
					tweetId: id,
					userId: session.id!,
				},
			},
		});
		revalidateTag(`like-status-${id}`);
	} catch (error) {}
}

const responseSchema = z.object({
	response: z.string().trim().min(5, "This should be at least 10 characters long"),
});

export async function addResponse(prevState: any, formData: FormData) {
	const data = {
		response: formData.get("response"),
		id: formData.get("id"),
	};

	console.log("data", data);

	const result = await responseSchema.safeParseAsync(data);

	if (!result.success) {
		return result.error.flatten();
	} else {
		const session = await getSession();
		if (session.id) {
			const response = await db.response.create({
				data: {
					reply: result.data.response,
					user: {
						connect: {
							id: session.id,
						},
					},
					tweet: {
						connect: {
							id: Number(data.id!),
						},
					},
				},
				select: {
					id: true,
				},
			});

			if (Boolean(response)) {
				revalidatePath(`/tweets/${data.id}`);
			}
		}
	}
}

export async function getMoreResponse(page: number, tweetId: number) {
	const session = await getSession();
	if (session.id) {
		const response = await db.response.findMany({
			where: {
				tweetId,
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

		return response;
	}
}
