import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { Auction, IBid } from "@/lib/database/models/auction.model";

export type CompletedAuction = {
  winnerName: string;
  winnerAvatar?: string;
  finalPrice: number;
  listingTitle: string;
  listingImage: string;
  endedAt: string;
};

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const now = new Date();

    // Update expired auctions
    await Auction.updateMany(
      { status: "active", endTime: { $lt: now } },
      { $set: { status: "ended" } }
    );

    // Fetch ended auctions with populated bids and listing info
    const endedAuctions = await Auction.find({
      status: "ended",
      bids: { $exists: true, $not: { $size: 0 } },
    })
      .populate({
        path: "bids",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "bidder",
          select: "name image",
        },
      })
      .populate({
        path: "listingId",
        select: "title imageUrls", // Must exist on Car or Property model
      })
      .select("bids listingId imageUrls endTime")
      .lean();

    const completed: CompletedAuction[] = [];

    for (const auction of endedAuctions) {
      const latestBid = (auction.bids as IBid[])[0];
      if (!latestBid || !latestBid.bidder) continue;

      const bidder = latestBid.bidder as any;
      const listing = auction.listingId as any;

      completed.push({
        winnerName: bidder?.name ?? "Anonymous",
        winnerAvatar: bidder?.image ?? null,
        finalPrice: latestBid.bidAmount,
        listingTitle: auction?.title || "Auction item",
        listingImage: auction?.imageUrls?.[0] || "/placeholder.jpg",
        endedAt: new Date(auction.endTime).toISOString(),
      });
    }

    // Sort newest-ended first
    completed.sort((a, b) => +new Date(b.endedAt) - +new Date(a.endedAt));

    return NextResponse.json(completed);
  } catch (error) {
    console.error("Error fetching completed auctions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
