
import { connectToDatabase } from "@/lib/database";
import { Auction, IBid } from "@/lib/database/models/auction.model";
import "@/lib/database/models/car.model";
import "@/lib/database/models/property.model";
import { User } from "@/lib/database/models/user.model";
import { serializeDoc } from "@/lib/utils";
import { NextResponse } from "next/server";

/** Shape returned to the client */
export interface LiveBidDto {
  bidderName: string;
  bidderAvatar?: string;
  amount: number;
  listingTitle: string;
  listingImage: string;
  timestamp: string;
}

const populateEvent = (query: any) => {
  return query.populate([
    {
      path: "user",
      model: User,
      select: "_id name image email",
    },
    {
      path: "listingId",
    },
    {
      path: "bids.bidder",
      model: User,
      select: "_id name image email",
    },
  ]);
};

export const getAllAuctions = async () => {
  try {
    await connectToDatabase();

    const now = new Date();

    // Step 1: Get active auctions with only needed fields
    const activeAuctions = await Auction.find({ status: "active" })
      .select("_id endTime")
      .lean();

    // Step 2: Identify ended ones
    const endedAuctionIds = activeAuctions
      .filter(auction => auction.endTime < now)
      .map(auction => auction._id);

    // Step 3: Mark ended ones
    if (endedAuctionIds.length > 0) {
      await Auction.updateMany(
        { _id: { $in: endedAuctionIds } },
        { $set: { status: "ended" } }
      );
    }

    // Step 4: Get fresh active auctions, populate & lean
    const freshActiveAuctionsQuery = Auction.find({ status: "active" })
      .select("title endTime currentPrice listingModel")
      .lean();

    const populated = await populateEvent(freshActiveAuctionsQuery);

    // Step 5: Return as plain object
    return JSON.parse(JSON.stringify(populated));
  } catch (error: any) {
    console.error("Error fetching active auctions:", error.message);
    throw new Error("Failed to get active auctions");
  }
};

export const getLiveBids = async () => {
  try {
    await connectToDatabase();

    // Pull the latest 10 bids across all *active* auctions
    const auctions = await Auction.find({ status: 'active' })
     .populate({
      path: 'bids',
      options: { sort: { createdAt: -1 }, limit: 10 },
      populate: {               // 👈  populate the bidder inside each bid
       path: 'bidder',
       select: 'name image',
    },
  })
  .populate('listingId', 'title imageUrls')
  .lean();

    const bids: LiveBidDto[] = [];

    auctions.forEach(a => {
      a.bids.forEach((b: IBid) => {
        const bidder = b.bidder as any;

        bids.push({
          bidderName: bidder?.name ?? 'Anonymous',
          bidderAvatar: bidder?.image,
          amount: b.bidAmount,
          listingTitle: a.listingId?.title ?? 'Auction item',
          listingImage: a.imageUrls?.[0] ?? '/placeholder.jpg',
          timestamp: b.createdAt?.toISOString() as string,
        });
      });
    });

    // sort newest‑first and trim to 20
    bids.sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp));

    const data = JSON.parse(JSON.stringify(bids.slice(0, 20))); 
    // Convert to JSON and back to remove Mongoose methods
    return data;
  } catch (err) {
    console.error('live‑bids api error', err);
    return NextResponse.json(
      { message: 'Failed to fetch live bids' },
      { status: 500 }
    );
  }
};

export const getUserAuctions = async (userEmail: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email: userEmail }).exec();
    if (!user) throw new Error("User not found");

    const allItems = await populateEvent(Auction.find({ user: user._id }))
      .sort({ createdAt: -1 });

    return serializeDoc(allItems);
  } catch (error: any) {
    console.log("Error fetching auctions for user:", error.message);
    throw new Error("Failed to get user auctions");
  }
};

export const getAuctionByListing = async (model: string) => {
  try {
    await connectToDatabase();

    // Then, find all items belonging to this user
    const allItems = await populateEvent(Auction.find({ listingModel: model, status: "active" }))
      .sort({ createdAt: -1 });

    return serializeDoc(allItems);
  } catch (error: any) {
    console.log("Error fetching items for user:", error.message);
    throw new Error("Failed to get user items");
  }
};

// ✅ Corrected version
export const getAuctionById = async (auctionId: string) => {
  try {
    await connectToDatabase();

    const auction = await populateEvent(Auction.findById(auctionId)); // no .lean()
    const data = JSON.parse(JSON.stringify(auction)); 
    // Convert to JSON and back to remove Mongoose methods
    return data; // Return the plain object
  } catch (error: any) {
    console.log("Error fetching auction by ID:", error.message);
    throw new Error("Failed to get auction");
  }
};

