"use server";

import { routes } from "@/config/routes";
import { revalidatePath } from "next/cache";
import {
  CreateCustomerSchema,
  type CreateCustomerType,
  UpdateCustomerSchema,
} from "../schemas/customer.schema";
import { Car } from "@/lib/database/models/car.model";
import { Customer } from "@/lib/database/models/customer.model";
import { CustomerLifecycle } from "@/lib/database/models/customer_lifecycle.model";

export const createCustomerAction = async (props: CreateCustomerType) => {
  try {
    const { data, success, error } = CreateCustomerSchema.safeParse(props);

    if (!success) {
      console.log({ error });
      return { success: false, message: "Invalid data" };
    }

    if (data.terms !== "true") {
      return { success: false, message: "You must accept the terms" };
    }

    const { date, terms, slug, ...rest } = data;

    const classified = await Car.findOne({ slug });
    if (!classified) {
      return { success: false, message: "Classified not found" };
    }

    await Customer.create({
      ...rest,
      bookingDate: date,
      termsAccepted: terms === "true",
      classified: classified._id,
    });

    return { success: true, message: "Reservation Successful!" };
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: "Something went wrong" };
  }
};

export const deleteCustomerAction = async (id: string) => {
  try {
    await Customer.findByIdAndDelete(id);
    revalidatePath(routes.admin.customers);
    return { success: true, message: "Customer deleted" };
  } catch (error) {
    console.log("Error deleting customer: ", { error });
    return {
      success: false,
      message: "Something went wrong deleting customer",
    };
  }
};

export const updateCustomerAction = async (props: {
  id: string;
  status: string;
}) => {
  try {
    const validProps = UpdateCustomerSchema.safeParse(props);

    if (!validProps.success)
      return { success: false, message: "Invalid data" };

    const customer = await Customer.findById(validProps.data.id);
    if (!customer) return { success: false, message: "Customer not found" };

    await CustomerLifecycle.create({
      oldStatus: customer.status,
      newStatus: validProps.data.status,
      customer: customer._id,
    });

    customer.status = validProps.data.status;
    await customer.save();

    revalidatePath(routes.admin.editCustomer(customer._id.toString()));
    revalidatePath(routes.admin.customers);

    return { success: true, message: "Customer updated" };
  } catch (error) {
    console.log("Error in customer update action: ", { error });
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
};
