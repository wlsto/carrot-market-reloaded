"use client";

import { FireIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-between min-h-screen p-20">
			<div className="flex flex-col text-2xl font-semibold gap-2 my-auto">
				<span>
					<FireIcon className="h-full w-full text-orange-400" />
				</span>
			</div>
			<div className="flex flex-col items-center gap-5">
				<Link href="/create-account" className="primary-btn text-lg py-2.5">
					Create Account
				</Link>
				<div className="flex gap-2">
					<span>Already have an account?</span>
					<Link href="/login" className="hover:underline">
						Log In
					</Link>
				</div>
			</div>
		</div>
	);
}
