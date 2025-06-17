"use server";

import { routes } from "@/config/routes";
import { redirect } from "next/navigation";
import { SessionModel } from "@/lib/database/models/session.model";
import { getSession } from "../actions/getCurrentUser";
import { signOut } from "next-auth/react";

export const signOutAction = async () => {
	const session = await getSession();
	if (session) {
		await signOut({
			redirect: true,
			//redirectTo: routes.signIn,
		});
	}
};

export const logoutOfAllSessions = async () => {
	const session = await getSession();
	if (!session?.user) return null;

	await SessionModel.deleteMany({
		userId: session.user,
	});

	redirect(routes.signIn);
};
