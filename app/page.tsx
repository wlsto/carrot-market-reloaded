"use client";

import { useFormState } from "react-dom";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
import { logIn } from "./actions";
import { FireIcon, EnvelopeIcon, UserIcon, KeyIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

export default function Home() {
	const [state, dispatch] = useFormState(logIn, null);

	console.log("State", state);

	return (
		<div className="flex flex-col items-center justify-center p-10 m-10 gap-3">
			<span>
				<FireIcon className="h-20 w-20 text-orange-400" />
			</span>
			<form action={dispatch} className="flex flex-col gap-3 mt-10">
				<div className="primary-div">
					<EnvelopeIcon className="h-5 w-5 absolute ml-3" />
					<FormInput name="email" type="email" placeholder="Email" required />
				</div>
				<div className="primary-div">
					<UserIcon className="h-5 w-5 absolute ml-3" />
					<FormInput name="username" type="text" placeholder="Username" required />
				</div>
				<div className={`${Boolean(state?.error) ? "invalid_div" : "primary-div"}`}>
					<KeyIcon className="h-5 w-5 absolute ml-3" />
					<FormInput name="password" type="password" placeholder="Password" required />
				</div>
				{state?.error ? (
					<div className="flex">
						<span className="text-amber-800">{state?.error}</span>
					</div>
				) : null}
				<FormButton text="Log in" />
				{state?.login ? (
					<div className="flex h-12 items-center rounded-md gap-3 bg-emerald-400 pl-4">
						<span>
							<CheckBadgeIcon className="h-5 w-5" />
						</span>
						<span>Welcome back!</span>
					</div>
				) : null}
			</form>
		</div>
	);
}
