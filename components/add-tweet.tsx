"use client";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import { PhotoIcon } from "@heroicons/react/24/outline";
import FormButton from "./form-btn";
import FormInput from "./form-input";
import { useFormState } from "react-dom";
import { addTweet } from "@/app/(tabs)/tweets/actions";

export default function AddTweet() {
	const [state, dispatch] = useFormState(addTweet, null);

	return (
		<>
			<div className="flex gap-5 p-5 border-neutral-400">
				<div className="relative size-14 rounded-md overflow-hidden">
					<UserCircleIcon className="text-gray-500" />
				</div>
				<form action={dispatch} className="flex flex-col items-start justify-center gap-2 *:rounded-md">
					<FormInput
						name="tweet"
						type="text"
						placeholder="What is happening?!"
						required
						errors={state?.fieldErrors.tweet}
						style={{ paddingLeft: 10 }}
					/>
					<FormButton text="Post" pendingText="Posting..." />
					{/* <div className="primary-div">
						<label htmlFor="photo"></label>
						<PhotoIcon className="size-6 text-gray-500" />
						<input type="file" id="photo" name="photo" />
                        <FormButton text="Post" pendingText="Posting..." />	
					</div> */}
				</form>
			</div>
		</>
	);
}
