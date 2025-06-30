"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { useConvertPrice } from "@/utils/CurrencyStore/currency-utils";
import { RootState } from "@/utils/CurrencyStore/store";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";

import { toast } from "@/hooks/use-toast";
import { IAuction, IBid } from "@/lib/database/models/auction.model";

import GallerySlider from "@/components/GallerySlider";
import { Building, CarFront, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuctionTimer from "./auction-timer";
import SectionAds from "@/app/blog/SectionAds";
import { Route } from "next";
import ActiveBidders from "@/components/auction/active-bidders";
import { useSession } from "next-auth/react";
import { isBidOver } from "@/lib/utils/bids";
import { socket } from "@/lib/socketClient";
import { Socket } from "socket.io-client";
import axios from "axios";
import LiveBidTicker from "./live-bid";
import clsx from "clsx";
import LiveAuctionsTicker from "./bids-section";
import CompletedAuctionsFeed from "./completed-feed";

interface LiveAuctionsPageProps {
  auction: any;
}

const LiveAuctionsPage = ({ auction: initialAuction }: LiveAuctionsPageProps) => {

  const {data: session} = useSession();
  //const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);

  const [auction, setAuction] = useState<IAuction>(initialAuction);
  const [category, setCategory] = useState<"property" | "car">("property");

  const itemId = initialAuction._id;
  const { _id, title, imageUrls, currentPrice, bids, description, status, endTime, listingId, user } = initialAuction;

  const isProperty = listingId?.listingType === "Property";
  const price = Number(auction.currentPrice)

  const canPlaceBid =
    session && user?._id !== session.user.id && !isBidOver(auction);

  const {
    // Vehicle
    make,
    carModel,
    modelVariant,
    year,
    odoReading,
    fuelType,
    transmission,
    colour,
    bodyType,

    // Property
    address,
    rentalForm,
    propertySize,
    bedrooms,
    bathrooms,
    listingType,

    amenities = [],
    features = [],
  } = listingId || {};

  console.log("AUCTION_CLIENT",auction)

  useEffect(() => {
    // Join the auction room
    socket.emit("joinAuction", { auctionId: itemId });

    // Listen for new bid updates
    socket.on("newBid", (bid: IBid) => {
      setAuction((prev: any) => ({
        ...prev,
        currentPrice: bid.bidAmount,
        bids: [bid, ...(prev?.bids || [])],
      }));
    });

    return () => {
      // Optionally leave the room, but don’t disconnect socket globally
      socket.off("newBid");
    };
  }, [itemId]);

  const handlePlaceBid = async (amount: number) => {
    try {
      const res = await fetch("/api/auction/bid", {
        method: "POST",
        body: JSON.stringify({ auctionId: _id, amount }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        toast({ title: "Bid placed successfully!" });

        // Emit to other users via socket (already happens on server, so optional here)
        // socket.emit("placeBid", { auctionId: _id, bid: data.newBid });

        setAuction((prev: any) => ({
          ...prev,
          currentPrice: data.currentPrice,
          bids: [data.newBid, ...(prev?.bids || [])],
        }));
      } else {
        throw new Error(data.message || "Failed to place bid.");
      }
    } catch (error: any) {
      toast({ variant: "destructive", title: error.message });
    }
  };
  

  const renderSliderGallery = () => (
    <div className="relative w-full">
      <GallerySlider
        uniqueID={`StayCard_${_id}`}
        ratioClass="aspect-w-4 aspect-h-3"
        galleryImgs={imageUrls}
        href={`/auctions/items/${_id}` as Route}
        galleryClass=""
      />
    </div>
  );

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-white dark:bg-gray-900 flex flex-col lg:flex-row items-start gap-6"
      >
        {/* Image Section */}
        <div className="relative w-full lg:w-2/3 overflow-hidden rounded-xl">
          <LiveAuctionsTicker/>
        </div>

       {/* Content Section */}
<div className="w-full lg:w-1/3 flex flex-col">
  {/* Auction Summary */}
          <CompletedAuctionsFeed />
        </div>
      </motion.div>
  );
};

export default LiveAuctionsPage;
