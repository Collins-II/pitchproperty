
import { CarStatus } from "@/lib/database/models/car.model";
import { CustomerStatus } from "@/lib/database/models/customer.model";
import { z } from "zod";

export const AdminClassifiedFilterSchema = z.object({
	q: z.string().optional(),
	status: z
		.enum(["ALL", ...Object.values(CarStatus)])
		.default("ALL")
		.optional(),
});

export const AdminCustomerFilterSchema = z.object({
	q: z.string().optional(),
	status: z
		.enum(["ALL", ...Object.values(CustomerStatus)])
		.default("ALL")
		.optional(),
});
