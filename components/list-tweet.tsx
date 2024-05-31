"use client";

import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { formatToTimeAgo } from "@/lib/utils";

interface IListTweetProps {
	id: number;
	tweet: string;
	created_at: Date;
	user: {
		username: string;
	};
}

export default function ListTweet({ id, tweet, created_at, user }: IListTweetProps) {
	return (
		<Link href={`/tweets/${id}`} className="flex gap-5">
			<div className="relative size-14 rounded-md overflow-hidden">
				<UserCircleIcon className="text-gray-500" />
			</div>
			<div className="flex flex-col items-start justify-center gap-2 *:rounded-md">
				<div className="flex gap-2 *:rounded-md">
					<span className="h-5 w-28 bg-slate-300 text-sm font-semibold pl-2">{user.username}</span>
					<span className="h-5 w-28 bg-slate-300 text-sm pl-2">{formatToTimeAgo(created_at.toString())}</span>
				</div>
				<div className="h-10 w-full bg-slate-300">
					<p className="pl-2">{tweet}</p>
				</div>
			</div>
		</Link>
	);
}
