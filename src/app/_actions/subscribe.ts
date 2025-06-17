"use server";

import type { PrevState } from "@/config/types";
import { Customer , CustomerStatus } from "@/lib/database/models/customer.model";
import { SubscribeSchema } from "../schemas/subscribe.schema";

export const subscribeAction = async (_: PrevState, formData: FormData) => {
	try {
		const { data, success, error } = SubscribeSchema.safeParse({
			firstName: formData.get("firstName") as string,
			lastName: formData.get("lastName") as string,
			email: formData.get("email") as string,
		});

		if (!success) {
			return { success: false, message: error.message };
		}

		const existing = await Customer.findOne({ email: data.email });

		if (existing) {
			return { success: false, message: "You are already subscribed!" };
		}

		await Customer.create({
			...data,
			status: CustomerStatus.SUBSCRIBER,
		});

		return { success: true, message: "Subscribed successfully!" };
	} catch (error) {
		console.error("Subscription error:", error);
		if (error instanceof Error) {
			return { success: false, message: error.message };
		}
		return { success: false, message: "Something went wrong!" };
	}
};
