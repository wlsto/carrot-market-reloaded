import { FireIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import getSession from "@/lib/session";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import FormButton from "@/components/form-btn";

async function getUser() {
	const session = await getSession();
	if (session.id) {
		const user = await db.user.findUnique({
			where: {
				id: session.id,
			},
		});

		return user;
	}
}

export default async function Profile() {
	const user = await getUser();
	const logOut = async () => {
		"use server";

		const session = await getSession();
		await session.destroy();
		redirect("/");
	};

	return (
		<div className="flex flex-col items-center justify-center p-10 m-10 gap-3">
			<span>
				<FireIcon className="h-20 w-20 text-orange-400" />
			</span>
			<div className="flex flex-col gap-3 mt-10">
				<div className="flex h-12 items-center rounded-md gap-3 bg-emerald-400 pl-4">
					<span>
						<CheckBadgeIcon className="h-5 w-5" />
					</span>
					<span>Welcome back!</span>
				</div>
				<div className="primary-div">
					<span>Name : {user?.username}</span>
					<span>Email : {user?.email}</span>
					<span>Create Date : {user?.created_at.toDateString()}</span>
				</div>
				<form action={logOut}>
					<div>
						<FormButton text="Log out" />
					</div>
				</form>
			</div>
		</div>
	);
}
