import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ISession extends Document {
	sessionToken: string;
	userId: string;
	expires: Date;
	requires2FA: boolean;
}

const sessionSchema = new Schema<ISession>(
	{
		sessionToken: { type: String, required: true, unique: true },
		userId: { type: String, required: true },
		expires: { type: Date, required: true },
		requires2FA: { type: Boolean, default: true },
	},
	{
		timestamps: true,
		collection: "sessions", // matches @@map("sessions")
	}
);

// Optional: define a virtual relation to User if needed
// sessionSchema.virtual("user", {
// 	ref: "User",
// 	localField: "userId",
// 	foreignField: "_id",
// 	justOne: true,
// });

export const SessionModel = models?.Session || model<ISession>("Session", sessionSchema);
