"use client";

import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftIcon, HeartIcon, EyeIcon } from "@heroicons/react/24/outline";
import { formatToTimeAgo } from "@/lib/utils";

interface IListTweetProps {
	id: number;
	tweet: string;
	view: number;
	created_at: Date;
	user: {
		username: string;
	};
	_count: {
		likes: number;
		responses: number;
	};
}

export default function ListTweet({ id, tweet, view, created_at, user, _count }: IListTweetProps) {
	return (
		<div className="flex gap-3 ">
			<div className="relative size-10 rounded-md overflow-hidden">
				<UserCircleIcon className="text-gray-500" />
			</div>
			<div className="flex flex-col w-3/5 gap-2 *:rounded-md">
				<div className="flex gap-2 *:rounded-md">
					<span className="h-5 w-24 bg-slate-300 text-sm font-semibold pl-2">{user.username}</span>
					<span className="h-5 w-24 bg-slate-300 text-sm pl-2">{formatToTimeAgo(created_at.toString())}</span>
				</div>
				<Link href={`/tweets/${id}`}>
					<div className="h-20 w-full bg-slate-300 rounded-md">
						<p className="pl-2">{tweet}</p>
					</div>
				</Link>
				<div className="flex gap-5 *:flex *:items-center *:justify-center *:gap-2">
					<div>
						<ChatBubbleLeftIcon className="size-6 text-gray-500" />
						<span className="text-sm">{_count.responses}</span>
					</div>
					<div>
						<HeartIcon className="size-6 text-gray-500" />
						<span className="text-sm">{_count.likes}</span>
					</div>
					<div>
						<EyeIcon className="size-6 text-gray-500" />
						<span className="text-sm">{view}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
