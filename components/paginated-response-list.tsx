"use client";

import { useState } from "react";
import ListResponse from "./list-response";
import { getMoreResponse } from "@/app/tweets/[id]/actions";
import { InitialResponse } from "@/app/tweets/[id]/page";

interface ResponseListProps {
	initialResponse: InitialResponse;
	id: string;
}

export default function PaginatedResponseList({ initialResponse, id }: ResponseListProps) {
	const [responses, setResponses] = useState(initialResponse);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [isLastPage, setIsLastPage] = useState(false);
	const [tweetId, setTweetId] = useState(id);

	const onMoreResponseClick = async () => {
		setIsLoading(true);
		const newResponse = await getMoreResponse(page + 1, Number(tweetId));
		if (newResponse?.length !== 0) {
			setResponses((prev) => [...prev!, ...newResponse!]);
			setPage((prev) => prev + 1);
		} else {
			setIsLastPage(true);
		}
		setIsLoading(false);
	};

	return (
		<div className="flex flex-col gap-5 pt-5 pb-5">
			{responses?.map((t) => (
				<ListResponse key={t.id} {...t} />
			))}

			{isLastPage ? (
				"No more responses"
			) : (
				<button onClick={onMoreResponseClick} disabled={isLoading} className="small-btn mx-28">
					{isLoading ? "Loading..." : "Load more"}
				</button>
			)}
		</div>
	);
}
