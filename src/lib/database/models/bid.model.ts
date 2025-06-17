import mongoose, { model, models } from "mongoose";

const bidSchema = new mongoose.Schema({
  auctionId: { type: mongoose.Schema.Types.ObjectId, ref: "Auction" },
  bidder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  createdAt: { type: Date, default: Date.now }
});

export const Bid = models?.Bid || model("Bid", bidSchema);
