import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { Auction, IAuction } from "@/lib/database/models/auction.model";
import { Types } from "mongoose";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const { id } = await context.params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid auction ID" },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    const auction = await Auction.findById(id)
      .populate({
        path: "bids.bidder",
        select: "name image",
      })
      .lean<IAuction>();

    if (!auction) {
      return NextResponse.json(
        { error: "Auction not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Get only the highest bid per unique user
    const userHighestBidsMap = new Map<string, any>();
    for (const bid of auction.bids) {
      const userId = bid.bidder?._id?.toString();
      if (!userId) continue;

      const existing = userHighestBidsMap.get(userId);
      if (!existing || bid.bidAmount > existing.bidAmount) {
        userHighestBidsMap.set(userId, bid);
      }
    }

    const highestUniqueBids = Array.from(userHighestBidsMap.values()).sort(
      (a, b) => b.bidAmount - a.bidAmount
    );

    const resultAuction = {
      ...auction,
      bids: highestUniqueBids,
    };

    return NextResponse.json(
      { success: true, auction: resultAuction },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("[GET_AUCTION_ERROR]", error);
    return NextResponse.json(
      {
        message: "Error fetching auction",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
