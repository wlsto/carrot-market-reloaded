"use server";

export async function logIn(prevState: any, formData: FormData) {
	await new Promise((resolve) => setTimeout(resolve, 3000));

	const data = {
		password: formData.get("password"),
	};

	if (data.password === "12345") {
		return {
			login: [true],
		};
	} else {
		return {
			error: ["wrong password"],
		};
	}
}
