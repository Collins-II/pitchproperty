import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { getSession } from "@/app/actions/getCurrentUser";
import { Auction } from "@/lib/database/models/auction.model";
import { Types } from "mongoose";

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
  const session = await getSession();

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: corsHeaders }
    );
  }

  const body = await request.json();
  const { auctionId, amount } = body;

  try {
    const auction = await Auction.findById(auctionId);

    if (!auction) {
      return NextResponse.json({ message: "Auction not found" }, { status: 404, headers: corsHeaders });
    }

    if (new Date() > new Date(auction.endTime)) {
      return NextResponse.json({ message: "Auction has ended" }, { status: 400, headers: corsHeaders });
    }

    if (amount < auction.currentPrice + auction.bidInterval) {
      return NextResponse.json({ 
        message: `Bid must be at least ${auction.currentPrice + auction.bidInterval}`, 
      }, { status: 400, headers: corsHeaders });
    }

    // Create the new bid
    const newBid = {
      userId: new Types.ObjectId(session.user.id),
      amount,
      createdAt: new Date(),
    };

    // Push new bid into auction
    auction.bids.push(newBid);

    // Update auction's current price
    auction.currentPrice = amount;

    await auction.save();

    return NextResponse.json({ success: true, bid: newBid }, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("[BID_ERROR]", error);
    return NextResponse.json(
      { message: "Error placing bid", error: error instanceof Error ? error.message : String(error) },
      { status: 500, headers: corsHeaders }
    );
  }
}
