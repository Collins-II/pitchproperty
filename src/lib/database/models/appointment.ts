import mongoose, { Schema, Types, model, models } from "mongoose";

interface IAppointment {
  listingId: Types.ObjectId;
  userId: Types.ObjectId;
  reservedDate: Date;
  timeSlot: string;
  pickUpLocation: string;
  bookingPeriod: string;
  status: "pending" | "confirmed" | "canceled";
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    listingId: { type: Schema.Types.ObjectId, ref: 'Listing' },
    reservedDate: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    pickUpLocation: { type: String, required: true },
    bookingPeriod: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Appointment = models.Appointment || model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;
