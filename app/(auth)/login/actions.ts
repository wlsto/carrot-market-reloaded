"use server";

import { z } from "zod";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { PASSWORD_ERROR, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import bcrypt from "bcrypt";

const formSchema = z.object({
	email: z.string().toLowerCase().email(),
	password: z.string().trim().min(10, PASSWORD_ERROR).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function logIn(prevState: any, formData: FormData) {
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
	};

	const result = await formSchema.safeParseAsync(data);

	if (!result.success) {
		return result.error.flatten();
	} else {
		const user = await db.user.findUnique({
			where: {
				email: result.data.email,
			},
			select: {
				id: true,
				password: true,
			},
		});

		if (Boolean(user)) {
			const chkPassword = await bcrypt.compare(result.data.password, user?.password ?? "");

			if (chkPassword) {
				const session = await getSession();
				session.id = user!.id;
				await session.save();

				redirect("/");
			} else {
				return {
					fieldErrors: {
						password: ["Please check your password."],
					},
				};
			}
		} else {
			return {
				fieldErrors: {
					email: ["An account with this email does not exist."],
				},
			};
		}
	}
}
