"use client";

import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import { FireIcon, EnvelopeIcon, UserIcon, KeyIcon } from "@heroicons/react/24/solid";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";

export default function CreateAccount() {
	const [state, dispatch] = useFormState(createAccount, null);

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
						errors={state?.fieldErrors.email}
					/>
				</div>
				<div className="primary-div">
					<UserIcon className="primary-icon" />
					<FormInput
						name="username"
						type="text"
						placeholder="Username"
						required
						errors={state?.fieldErrors.username}
					/>
				</div>
				<div className="primary-div">
					<KeyIcon className="primary-icon" />
					<FormInput
						name="password"
						type="password"
						placeholder="Password"
						required
						errors={state?.fieldErrors.password}
					/>
				</div>
				<div className="primary-div">
					<KeyIcon className="primary-icon" />
					<FormInput
						name="pwconfirm"
						type="password"
						placeholder="Password Confirm"
						required
						errors={state?.fieldErrors.pwconfirm}
					/>
				</div>
				<FormButton text="Create Account" />
			</form>
		</div>
	);
}
