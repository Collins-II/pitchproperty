import mongoose, { Schema, model, Types, HydratedDocument, models } from "mongoose";
import { CustomerStatus } from "./customer.model";
// Reuse enum from Customer file

// Interface for CustomerLifecycle
export interface ICustomerLifecycle {
  customer: Types.ObjectId;
  oldStatus: CustomerStatus;
  newStatus: CustomerStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type CustomerLifecycleDocument = HydratedDocument<ICustomerLifecycle>;

// Mongoose Schema
const CustomerLifecycleSchema = new Schema<ICustomerLifecycle>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    oldStatus: {
      type: String,
      enum: Object.values(CustomerStatus),
      required: true,
    },
    newStatus: {
      type: String,
      enum: Object.values(CustomerStatus),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CustomerLifecycle =
  models?.CustomerLifecycle ||
  model<ICustomerLifecycle>("CustomerLifecycle", CustomerLifecycleSchema);