import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { Auction, IBid } from "@/lib/database/models/auction.model";
import { LiveBidDto } from "@/app/actions/getAuctions";

export async function GET(req: Request) {
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
 return NextResponse.json(data);
} catch (error) {
  console.log("Error fetching auctions:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
};
