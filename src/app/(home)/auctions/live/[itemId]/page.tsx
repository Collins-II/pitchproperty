import { getAuctionById } from "@/app/actions/getAuctions";
import { getBidsById } from "@/app/actions/getBids";
import { IAuction } from "@/lib/database/models/auction.model";
import AuctionPageClient from "../../components/AuctionClient";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

// ✅ Explicit dynamic segment prop typing
type Props = {
  params: {
    itemId: string;
  };
};

// ✅ PAGE COMPONENT
export default async function AuctionPage({params}: {params: Promise<{ itemId: string }>}) {
  const { itemId } = await params;
  const auction = (await getAuctionById(itemId)) as IAuction | null;
  const bids = await getBidsById(itemId);

  if (!auction) {
    redirect("/auctions");
  }

  return <AuctionPageClient auction={auction} bidders={bids} />;
}

// ✅ METADATA FUNCTION
export async function generateMetadata({params}: {params: Promise<{ itemId: string }>}) {
  const { itemId } = await params;
  const auction = (await getAuctionById(itemId)) as IAuction | null;

  if (!auction) {
    return {
      title: "Auction Not Found",
    };
  }

  return {
    title: `${auction.title} | Live Auction`,
    description: `Bid now on ${auction.title}. Starting at $${auction.startingPrice}`,
    openGraph: {
      title: `${auction.title} | Live Auction`,
      description: `Join the bidding on ${auction.title}`,
      images: auction.imageUrls?.[0] ? [auction.imageUrls[0]] : [],
    },
  };
}
