"use server";

import { Auction } from "@/lib/database/models/auction.model";
import { Knock } from "@knocklabs/node";
import { isBidOver } from "@/lib/utils/bids";
import { revalidatePath } from "next/cache";
import { getSession } from "@/app/actions/getCurrentUser";
import { connectToDatabase } from "@/lib/database";
import { getBidsById } from "@/app/actions/getBids";

const knock = new Knock(process.env.KNOCK_SECRET_KEY!);

export async function createBidAction(itemId: string) {
  await connectToDatabase();

  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("You must be logged in to place a bid");
  }

  const item = await Auction.findById(itemId);
  if (!item) {
    throw new Error("Item not found");
  }

  if (isBidOver(item)) {
    throw new Error("This auction is already over");
  }

  const latestBidValue = item.currentBid + item.bidInterval;

  // Create a new bid
  const newBid = {
    amount: latestBidValue,
    auctionId: itemId,
    userId,
    createdAt: new Date(),
  };

  // Update auction current bid and push bid reference
  item.currentBid = latestBidValue;
  item.bids.push(newBid);
  await item.save();

  // Get all users who bid on this auction (excluding current user)
  const bids = await getBidsById(itemId)
   
  const recipients: {
    id: string;
    name: string;
    email: string;
  }[] = [];

  for (const bid of bids) {
    const user = bid.bidder as any;
    if (
      user._id.toString() !== userId &&
      !recipients.find((r) => r.id === user._id.toString())
    ) {
      recipients.push({
        id: user._id.toString(),
        name: user.name || "Anonymous",
        email: user.email,
      });
    }
  }

  // Notify all previous bidders
  if (recipients.length > 0) {
    await knock.workflows.trigger("user-placed-bid", {
      actor: {
        id: userId,
        name: session.user?.name ?? "Anonymous",
        email: session.user?.email,
        collection: "users",
      },
      recipients,
      data: {
        itemId,
        bidAmount: latestBidValue,
        itemName: item.title,
      },
    });
  }

  revalidatePath(`/items/${itemId}`);
}
