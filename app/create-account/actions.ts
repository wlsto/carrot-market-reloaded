"use server";

import { z } from "zod";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { PASSWORD_ERROR, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import bcrypt from "bcrypt";

const checkUniqueUserName = async (username: string) => {
	const chkUser = await db.user.findUnique({
		where: {
			username,
		},
		select: {
			id: true,
		},
	});

	return !Boolean(chkUser);
};

const checkUniqueEamil = async (email: string) => {
	const chkEmail = await db.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
		},
	});

	return !Boolean(chkEmail);
};

const checkPasswords = ({ password, pwconfirm }: { password: string; pwconfirm: string }) => {
	return password === pwconfirm;
};

const formSchema = z
	.object({
		username: z
			.string()
			.trim()
			.toLowerCase()
			.min(5, "Username should be at least 5 characters long")
			.refine(checkUniqueUserName, "This username is already taken"),
		email: z
			.string()
			.toLowerCase()
			.email()
			.refine((email) => email.includes("@zod.com"), "Only @zod.com emails are allowed")
			.refine(checkUniqueEamil, "There is an account already registered with email"),
		password: z.string().trim().min(10, PASSWORD_ERROR).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
		pwconfirm: z.string().trim(),
	})
	.refine(checkPasswords, { message: "Both passwords should be the same!", path: ["pwconfirm"] });

export async function createAccount(prevState: any, formData: FormData) {
	const data = {
		username: formData.get("username"),
		email: formData.get("email"),
		password: formData.get("password"),
		pwconfirm: formData.get("pwconfirm"),
	};

	const result = await formSchema.safeParseAsync(data);

	if (!result.success) {
		return result.error.flatten();
	} else {
		const user = await db.user.create({
			data: {
				username: result.data.username,
				email: result.data.email,
				password: await bcrypt.hash(result.data.password, 12),
			},
		});

		if (Boolean(user)) {
			redirect("/login");
		}
	}
}
