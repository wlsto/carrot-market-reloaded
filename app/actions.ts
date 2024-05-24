"use server";

import { z } from "zod";

const passwordRegex = new RegExp(/^(?=.*\d).+$/);

const formSchema = z.object({
	username: z.string().trim().toLowerCase().min(5, "Username should be at least 5 characters long"),
	email: z
		.string()
		.toLowerCase()
		.email()
		.refine((email) => email.includes("@zod.com"), "Only @zod.com emails are allowed"),
	password: z
		.string()
		.trim()
		.min(10, "Password should be at least 10 characters long")
		.regex(passwordRegex, "Password should contain at least one number (0123456789)"),
});

export async function logIn(prevState: any, formData: FormData) {
	await new Promise((resolve) => setTimeout(resolve, 3000));

	const data = {
		username: formData.get("username"),
		email: formData.get("email"),
		password: formData.get("password"),
	};

	const result = await formSchema.safeParseAsync(data);

	if (!result.success) {
		return {
			success: false,
			result: result.error.flatten(),
		};
	} else {
		return {
			success: true,
			result: null,
		};
	}
}
