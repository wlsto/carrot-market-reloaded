"use client";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import FormButton from "./form-btn";
import FormInput from "./form-input";
import { useFormState } from "react-dom";
import { addResponse } from "@/app/tweets/[id]/actions";

interface IAddResponseProps {
	tweetId: string;
}

export default function AddResponse({ tweetId }: IAddResponseProps) {
	const [state, dispatch] = useFormState(addResponse, null);

	return (
		<div className="flex gap-3 pt-5 pb-5 border-neutral-400 border-b">
			<div className="relative size-10 rounded-md overflow-hidden">
				<UserCircleIcon className="text-gray-500" />
			</div>
			<form action={dispatch} className="flex flex-col w-full items-start justify-center gap-2 *:rounded-md">
				<FormInput
					name="response"
					type="text"
					placeholder="Post your reply"
					required
					errors={state?.fieldErrors.response}
					style={{ paddingLeft: 10 }}
				/>
				<FormInput name="id" type="hidden" value={tweetId} />
				<FormButton text="Reply" pendingText="Replying..." />
			</form>
		</div>
	);
}
