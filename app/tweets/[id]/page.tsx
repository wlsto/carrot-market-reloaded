import { notFound } from "next/navigation";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { formatToTimeAgo } from "@/lib/utils";

async function getTweetDetail(id: number) {
	const tweet = await db.tweet.findUnique({
		where: {
			id,
		},
		include: {
			user: {
				select: {
					username: true,
				},
			},
		},
	});

	if (!tweet) {
		return notFound();
	}

	return tweet;
}

async function getLike(id: number) {
	const like = await db.like.findMany({
		select: {
			id: true,
		},
		where: {
			tweetId: id,
		},
	});

	return like;
}

async function getIsOwner(userId: number) {
	const session = await getSession();
	if (session.id) {
		return session.id === userId;
	}

	return false;
}

export default async function TweetDetail({ params }: { params: { id: string } }) {
	const id = Number(params.id);
	if (isNaN(id)) {
		return notFound();
	}

	const tweet = await getTweetDetail(id);
	const like = await getLike(id);
	const isOwner = await getIsOwner(tweet.userId);

	return (
		<div className="flex flex-col gap-5 p-5">
			<div className="relative size-14 rounded-md overflow-hidden">
				<UserCircleIcon className="text-gray-500" />
			</div>
			<div className="flex flex-col items-start justify-center gap-2 *:rounded-md">
				<div className="flex gap-2 *:rounded-md">
					<span className="h-5 w-28 bg-slate-300 text-sm font-semibold pl-2">{tweet.user.username}</span>
					<span className="h-5 w-28 bg-slate-300 text-sm pl-2">Like : {like.length}</span>
					<span className="h-5 w-28 bg-slate-300 text-sm pl-2">
						{formatToTimeAgo(tweet.created_at.toString())}
					</span>
				</div>
				<div className="h-10 w-full bg-slate-300">
					<p className="pl-2">{tweet.tweet}</p>
				</div>
			</div>
		</div>
	);
}
