"use client";

import { useFormState } from "react-dom";
import { logIn } from "./actions";
import { FireIcon, EnvelopeIcon, UserIcon, KeyIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";

export default function Home() {
	const [state, dispatch] = useFormState(logIn, null);

	return (
		<div className="flex flex-col items-center justify-center p-10 m-10 gap-3">
			<span>
				<FireIcon className="h-20 w-20 text-orange-400" />
			</span>
			<form action={dispatch} className="flex flex-col gap-3 mt-10">
				<div className="primary-div">
					<EnvelopeIcon className="primary-icon" />
					<FormInput
						name="email"
						type="email"
						placeholder="Email"
						required
						errors={state?.result?.fieldErrors.email}
					/>
				</div>
				<div className="primary-div">
					<UserIcon className="primary-icon" />
					<FormInput
						name="username"
						type="text"
						placeholder="Username"
						required
						errors={state?.result?.fieldErrors.username}
					/>
				</div>
				<div className="primary-div">
					<KeyIcon className="primary-icon" />
					<FormInput
						name="password"
						type="password"
						placeholder="Password"
						required
						errors={state?.result?.fieldErrors.password}
					/>
				</div>
				<FormButton text="Log in" />
				{state?.success ? (
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
