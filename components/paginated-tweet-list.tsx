"use client";

import { getMoreTweet } from "@/app/(auth)/actions";
import { InitialTweets } from "@/app/(auth)/page";
import { useState } from "react";
import ListTweet from "./list-tweet";

interface TweetListProps {
	initialTweets: InitialTweets;
}

export default function PaginatedTweetList({ initialTweets }: TweetListProps) {
	const [tweets, setTweets] = useState(initialTweets);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [isLastPage, setIsLastPage] = useState(false);

	const onMoreTweetClick = async () => {
		setIsLoading(true);
		const newTweet = await getMoreTweet(page + 1);
		if (newTweet?.length !== 0) {
			setPage((prev) => prev + 1);
			setTweets((prev) => [...prev!, ...newTweet!]);
		} else {
			setIsLastPage(true);
		}
		setIsLoading(false);
	};

	return (
		<div className="flex flex-col gap-5 p-5">
			{tweets?.map((t) => (
				<ListTweet key={t.id} {...t} />
			))}

			{isLastPage ? (
				"No more items"
			) : (
				<button onClick={onMoreTweetClick} disabled={isLoading} className="small-btn mx-28">
					{isLoading ? "Loading..." : "Load more"}
				</button>
			)}
		</div>
	);
}
