import getSession from "@/lib/session";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import PaginatedTweetList from "@/components/paginated-tweet-list";
import AddTweet from "@/components/add-tweet";

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

	return (
		<div>
			<AddTweet />
			<PaginatedTweetList initialTweets={initialTweets} />
		</div>
	);
}
