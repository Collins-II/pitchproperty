import mongoose, { Types, Schema, model, models } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  image?: string;
  email: string;
}

export interface IBid {
  _id?: string;
  bidder: IUser;
  bidAmount: number;
  createdAt: Date;
}

export interface IAuction {
  _id?: string;
  listingId: Types.ObjectId;
  listingModel: "Property" | "Car";
  title: string;
  description: string;
  imageUrls: string[];
  startingPrice: number;
  currentPrice: number;
  status: "active" | "ended";
  bidInterval: number;
  endTime: Date;
  bids: IBid[];
  user: Types.ObjectId;
}

const BidSchema = new Schema({
  bidder: { type: Schema.Types.ObjectId, ref: "User" },
  bidAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

const AuctionSchema = new Schema({
  listingId: { type: Schema.Types.ObjectId, required: true, refPath: "listingModel" },
  listingModel: { type: String, required: true, enum: ["Property", "Car"] },
  title: { type: String },
  description: { type: String },
  imageUrls: [{ type: String }],
  startingPrice: { type: Number },
  currentPrice: { type: Number },
  status: { type: String, enum: ["active", "ended"], default: "active" },
  bidInterval: { type: Number, required: true, default: 100 },
  endTime: Date,
  bids: [BidSchema],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Auction = models?.Auction || model<IAuction>("Auction", AuctionSchema);
