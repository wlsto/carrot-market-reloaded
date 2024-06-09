import { notFound } from "next/navigation";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { UserCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftIcon, EyeIcon } from "@heroicons/react/24/outline";
import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
import { unstable_cache as nextCache } from "next/cache";
import LikeButton from "@/components/like-btn";
import { Prisma } from "@prisma/client";
import PaginatedResponseList from "@/components/paginated-response-list";
import AddResponse from "@/components/add-response";

async function getTweetDetail(id: number) {
	try {
		const tweet = await db.tweet.update({
			where: {
				id,
			},
			data: {
				view: {
					increment: 1,
				},
			},
			include: {
				user: {
					select: {
						username: true,
					},
				},
				_count: {
					select: {
						responses: true,
					},
				},
			},
		});

		return tweet;
	} catch (error) {
		return notFound();
	}
}

const getCachedTweet = nextCache(getTweetDetail, ["tweet-detail"], { tags: ["tweet-detail"], revalidate: 60 });

async function getLikeStatus(id: number, userId: number) {
	const isLiked = await db.like.findUnique({
		where: {
			id: {
				tweetId: id,
				userId,
			},
		},
	});

	const likeCount = await db.like.count({
		where: {
			tweetId: id,
		},
	});

	return {
		likeCount,
		isLiked: Boolean(isLiked),
	};
}

function getCachedLikeStatus(id: number, userId: number) {
	const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], { tags: [`like-status-${id}`] });
	return cachedOperation(id, userId);
}

function getCachedInitialResponse(id: number) {
	const cachedResponse = nextCache(getInitialResponse, ["tweet-response"], { tags: [`tweet-response-${id}`] });
	return cachedResponse(id);
}

async function getIsOwner(userId: number) {
	const session = await getSession();
	if (session.id) {
		return session.id === userId;
	}

	return false;
}

async function getInitialResponse(id: number) {
	//await new Promise((r) => setTimeout(r, 100000));
	const response = await db.response.findMany({
		where: {
			tweetId: id,
		},
		include: {
			user: {
				select: {
					username: true,
				},
			},
		},
		take: 1,
		orderBy: {
			created_at: "desc",
		},
	});

	return response;
}

export type InitialResponse = Prisma.PromiseReturnType<typeof getInitialResponse>;

export default async function TweetDetail({ params }: { params: { id: string } }) {
	const id = Number(params.id);
	if (isNaN(id)) {
		return notFound();
	}

	const tweet = await getCachedTweet(id);
	//const isOwner = await getIsOwner(tweet.userId);
	const session = await getSession();
	const { likeCount, isLiked } = await getCachedLikeStatus(id, session.id!);

	const initialResponse = await getInitialResponse(id);

	return (
		<div className="flex flex-col gap-3 p-5">
			<Link href="/tweets">
				<div>
					<ArrowLeftIcon className="size-8 text-gray-500 rounded-2xl hover:bg-slate-200 m-1 p-1" />
				</div>
			</Link>
			<div className="flex items-center gap-2 *:rounded-md">
				<UserCircleIcon className="text-gray-500 relative size-14 rounded-md overflow-hidden" />
				<span className="h-5 w-24 bg-slate-300 text-sm font-semibold pl-2">{tweet.user.username}</span>
			</div>
			<div className="flex flex-col items-start justify-center gap-2 *:rounded-md">
				<div className="h-20 w-3/5 bg-slate-300">
					<p className="pl-2">{tweet.tweet}</p>
				</div>
				<span className="h-5 w-24 bg-slate-300 text-sm pl-2">
					{formatToTimeAgo(tweet.created_at.toString())}
				</span>
			</div>
			<div className="w-3/5 border border-neutral-200"></div>
			<div className="flex gap-5 *:flex *:items-center *:justify-center *:gap-2">
				<div>
					<ChatBubbleLeftIcon className="size-6 text-gray-500" />
					<span className="text-sm">{tweet._count.responses}</span>
				</div>
				<div>
					<LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />
				</div>
				<div>
					<EyeIcon className="size-6 text-gray-500" />
					<span className="text-sm">{tweet.view}</span>
				</div>
			</div>
			<div className="w-3/5 border border-neutral-200"></div>
			<div className="w-3/5">
				<AddResponse tweetId={params.id} />
				<PaginatedResponseList initialResponse={initialResponse} id={params.id} />
			</div>
		</div>
	);
}
