"use client";

import Link from "next/link";
import { HomeIcon as SolidHomeIcon, UserCircleIcon as SolidUserCircleIcon } from "@heroicons/react/24/solid";
import { HomeIcon as OutlineHomeIcon, UserCircleIcon as OutlineUserCircleIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function TabBar() {
	const pathname = usePathname();
	return (
		<div className="fixed bottom-0 w-full mx-auto grid grid-cols-2 border-neutral-600 border-t px-5 py-3">
			<Link href="/tweets" className="flex flex-col items-center gap-px">
				{pathname === "/tweets" ? (
					<SolidHomeIcon className="h-6 w-6 text-gray-500" />
				) : (
					<OutlineHomeIcon className="h-6 w-6 text-gray-500" />
				)}
				<span>Home</span>
			</Link>
			<Link href="/profile" className="flex flex-col items-center gap-px">
				{pathname === "/profile" ? (
					<SolidUserCircleIcon className="h-6 w-6 text-gray-500" />
				) : (
					<OutlineUserCircleIcon className="h-6 w-6 text-gray-500" />
				)}

				<span>Profile</span>
			</Link>
		</div>
	);
}
