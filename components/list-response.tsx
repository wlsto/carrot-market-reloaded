"use client";

import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { formatToTimeAgo } from "@/lib/utils";

interface IListResponseProps {
	id: number;
	reply: string;
	created_at: Date;
	user: {
		username: string;
	};
}

export default function ListResponse({ id, reply, created_at, user }: IListResponseProps) {
	return (
		<div className="flex gap-3">
			<div className="relative size-10 rounded-md overflow-hidden">
				<UserCircleIcon className="text-gray-500" />
			</div>
			<div className="flex flex-col w-full gap-2 *:rounded-md">
				<div className="flex gap-2 *:rounded-md">
					<span className="h-5 w-24 bg-slate-300 text-sm font-semibold pl-2">{user.username}</span>
					<span className="h-5 w-24 bg-slate-300 text-sm pl-2">{formatToTimeAgo(created_at.toString())}</span>
				</div>
				<Link href={`/tweets/${id}`}>
					<div className="h-20 w-full bg-slate-300 rounded-md">
						<p className="pl-2">{reply}</p>
					</div>
				</Link>
			</div>
		</div>
	);
}
