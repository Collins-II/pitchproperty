import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Auction, IAuction } from "@/lib/database/models/auction.model";
import { resend } from "@/lib/resend"; // Adjust this path to your Resend config

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
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const body = await request.json();
    const { auctionId, amount } = body;
    console.log("AUC_BID", body)

    const auction = await Auction.findById(auctionId).populate("user"); // Populate owner
    if (!auction) return NextResponse.json({ error: "Auction not found" }, { status: 404 });

    // ❌ Prevent owner from bidding
    if (auction.user._id.toString() === user._id.toString()) {
      return NextResponse.json({ error: "You cannot bid on your own auction" }, { status: 403 });
    }

    // ❌ Prevent bids on ended auctions
    if (auction.status === "ended" || new Date() > new Date(auction.endTime)) {
      if (auction.status !== "ended") {
        auction.status = "ended";
        await auction.save();
      }
      return NextResponse.json({ error: "Auction has ended" }, { status: 400 });
    }

    // ❌ Bid must be higher than current price
    if (amount <= auction.currentPrice) {
      return NextResponse.json({ error: "Bid must be higher than current price" }, { status: 400 });
    }

    // ❌ Limit frequency: user must wait 15 seconds between bids
    const recentBid = [...auction.bids]
      .reverse()
      .find((bid) => bid.bidder.toString() === user._id.toString());

    if (recentBid && new Date().getTime() - new Date(recentBid.createdAt!).getTime() < 15000) {
      return NextResponse.json({ error: "You can only bid once every 15 seconds" }, { status: 429 });
    }

    // ✅ Add bid
    const newBid = {
      bidder: user._id,
      bidAmount: amount,
      createdAt: new Date(),
    };

    auction.bids.push(newBid);
    auction.currentPrice = amount;
    await auction.save();

    // ✅ Notify auction owner via email
   /* const auctionLink = `https://yourdomain.com/auctions/${auction._id}`; // Replace with actual domain
    await resend.emails.send({
      to: auction.user.email,
      subject: "New Bid on Your Auction!",
      html: `
        <h2>New Bid Alert</h2>
        <p><strong>${user.name}</strong> placed a bid of <strong>$${amount}</strong> on your auction.</p>
        <p><a href="${auctionLink}">View Auction</a></p>
      `,
    }); */

    // ✅ Populate and return last bid
    const populatedAuction = await Auction.findById(auctionId)
      .populate("bids.bidder", "name email image")
      .lean<IAuction>();

    const populatedNewBid = populatedAuction?.bids.at(-1);

    return NextResponse.json(
      {
        currentPrice: auction.currentPrice,
        newBid: populatedNewBid,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error placing bid:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: corsHeaders });
  }
}
