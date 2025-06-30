import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Auction, IAuction } from "@/lib/database/models/auction.model";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const user = await getCurrentUser();
    if (!user || !user._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const body = await request.json();
    const { auctionId, amount } = body;

    if (!auctionId || !amount || isNaN(amount)) {
      return NextResponse.json({ error: "Invalid bid data." }, { status: 400, headers: corsHeaders });
    }

    const auction = await Auction.findById(auctionId).populate("listingId");
    if (!auction) {
      return NextResponse.json({ error: "Auction not found." }, { status: 404, headers: corsHeaders });
    }

    const now = new Date();
    const auctionEnded = auction.status === "ended" || now > new Date(auction.endTime);
    if (auctionEnded) {
      if (auction.status !== "ended") {
        auction.status = "ended";
        await auction.save();
      }
      return NextResponse.json({ error: "Auction has ended." }, { status: 400, headers: corsHeaders });
    }

    if (amount <= auction.currentPrice) {
      return NextResponse.json({ error: "Bid must be higher than current price." }, { status: 400, headers: corsHeaders });
    }

    const existingBidIndex = auction.bids.findIndex(
      (bid: any) => bid.bidder.toString() === user._id.toString()
    );

    // Update existing bid if found
    if (existingBidIndex !== -1) {
      const existingBid = auction.bids[existingBidIndex];
      const timeSinceLastBid = now.getTime() - new Date(existingBid.createdAt!).getTime();

      if (timeSinceLastBid < 15000) {
        return NextResponse.json(
          { error: "You can only update your bid every 15 seconds." },
          { status: 429, headers: corsHeaders }
        );
      }

      auction.bids[existingBidIndex].bidAmount = amount;
      auction.bids[existingBidIndex].createdAt = now;
    } else {
      // Create new bid
      auction.bids.push({
        bidder: user._id,
        bidAmount: amount,
        createdAt: now,
      });
    }

    // Update currentPrice and save
    auction.currentPrice = amount;
    await auction.save();

    const updatedAuction = await Auction.findById(auctionId)
      .populate("bids.bidder", "name email image")
      .lean<IAuction>();

    const populatedNewBid = updatedAuction?.bids.find(
      (b) => b.bidder?._id?.toString() === user._id.toString()
    );

    return NextResponse.json(
      {
        currentPrice: updatedAuction?.currentPrice,
        newBid: populatedNewBid,
      },
      { headers: corsHeaders }
    );
  } catch (err) {
    console.error("❌ Error placing bid:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: corsHeaders });
  }
}
