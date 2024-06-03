import { FireIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import getSession from "@/lib/session";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import PaginatedTweetList from "@/components/paginated-tweet-list";
import { redirect } from "next/navigation";
import FormButton from "@/components/form-btn";

async function getInitialTweets() {
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
			take: 1,
			orderBy: {
				created_at: "desc",
			},
		});

		return tweet;
	}
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
	const initialTweets = await getInitialTweets();
	const logOut = async () => {
		"use server";

		const session = await getSession();
		await session.destroy();
		redirect("/");
	};

	return (
		<>
			{initialTweets ? (
				<div>
					<PaginatedTweetList initialTweets={initialTweets} />
					<form action={logOut}>
						<div className="fixed bottom-0 w-full mx-auto">
							<FormButton text="Log out" pendingText="Logging Out" />
						</div>
					</form>
				</div>
			) : (
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
			)}
		</>
	);
}
