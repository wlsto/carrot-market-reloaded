"use client";

import { useOptimistic } from "react";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { dislikeTweet, likeTweet } from "@/app/tweets/[id]/actions";

interface ILikeButtonProps {
	isLiked: Boolean;
	likeCount: number;
	tweetId: number;
}

export default function LikeButton({ isLiked, likeCount, tweetId }: ILikeButtonProps) {
	const [state, reducerFn] = useOptimistic({ isLiked, likeCount }, (currentState, optimisticValue) => {
		return {
			isLiked: !currentState.isLiked,
			likeCount: currentState.isLiked ? currentState.likeCount - 1 : currentState.likeCount + 1,
		};
	});

	const onClick = async () => {
		reducerFn(undefined);

		if (isLiked) {
			await dislikeTweet(tweetId);
		} else {
			await likeTweet(tweetId);
		}
	};

	return (
		<button className="flex items-center justify-center gap-2" onClick={onClick}>
			{state.isLiked ? (
				<SolidHeartIcon className="size-6 text-gray-500" />
			) : (
				<OutlineHeartIcon className="size-6 text-gray-500" />
			)}
			<span className="text-sm">{state.likeCount}</span>
		</button>
	);
}
