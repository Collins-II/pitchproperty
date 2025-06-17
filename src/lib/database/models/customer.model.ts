import mongoose, { Schema, model, Types, HydratedDocument, models } from "mongoose";

// Enum for CustomerStatus
export enum CustomerStatus {
  SUBSCRIBER = "SUBSCRIBER",
  INTERESTED = "INTERESTED",
  CONTACTED = "CONTACTED",
  PURCHASED = "PURCHASED",
  COLD = "COLD",
}

// Interface for Customer
export interface ICustomer {
  _id: string;
  userId?: Types.ObjectId; // Assuming this is a reference to another model like "User"
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  bookingDate?: Date;
  termsAccepted: boolean;
  status: CustomerStatus;
  classified?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  lifecycle: Types.ObjectId[]; // Assuming these refer to another model like "CustomerLifecycle"
}

export type CustomerDocument = HydratedDocument<ICustomer>;

// Mongoose Schema
const CustomerSchema = new Schema<ICustomer>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String },
    bookingDate: { type: Date },
    termsAccepted: { type: Boolean, default: false },
    status: {
      type: String,
      enum: Object.values(CustomerStatus),
      default: CustomerStatus.INTERESTED,
    },
    classified: {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
    lifecycle: [{ type: Schema.Types.ObjectId, ref: "CustomerLifecycle" }],
  },
  {
    timestamps: true,
  }
);

export const Customer = models?.Customer || model<ICustomer>("Customer", CustomerSchema);
