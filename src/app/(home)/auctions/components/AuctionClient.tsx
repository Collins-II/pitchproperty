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
import { Button } from "@/components/ui/button";
import AuctionTimer from "./auction-timer";
import BidButton from "../../../(account-pages)/account-auctions/components/ui/bid-button";
import SectionAds from "@/app/blog/SectionAds";
import { Route } from "next";
import ActiveBidders from "@/components/auction/active-bidders";
import { useSession } from "next-auth/react";
import { isBidOver } from "@/lib/utils/bids";
import { socket } from "@/lib/socketClient";
import { Socket } from "socket.io-client";
import axios from "axios";
import LiveBidTicker from "./live-bid";
import LiveAuctionsTicker from "./bids-section";
import ImagesSlider from "@/components/ImagesSlider";
import Timer from "./timer";
import { Badge } from "@/components/uix/badge";

interface AuctionClientPageProps {
  auction: any;
  bidders: IBid[];
}

const AuctionClientPage = ({ auction: initialAuction, bidders }: AuctionClientPageProps) => {
  const {data: session} = useSession();
  console.log("AUCTION_CLIENT_SESSION", session)
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const [biddersArr, setBiddersArr] = useState(bidders)

  const [auction, setAuction] = useState<IAuction>(initialAuction);

  const itemId = initialAuction._id;
  const { _id, title, imageUrls, currentPrice, bids, description, status, endTime, listingId, user } = initialAuction;

  const isProperty = listingId?.listingType === "Property";
  const price = Number(auction.currentPrice)

 // ✅ Check if session exists, auction is still running, and current user is not the owner
const isUserLoggedIn = !!session?.user?.id;
const isUserNotOwner = session?.user?.id !== user?._id?.toString();
const isAuctionActive = status === "active" && !isBidOver(auction);

const canPlaceBid = isUserLoggedIn && isUserNotOwner && isAuctionActive;

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
        body: JSON.stringify({ auctionId: itemId, amount }),
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
        className="rounded-xl bg-white dark:bg-gray-900 container space-y-8 mb-8 lg:space-y-12 lg:mb-12 flex flex-col-reverse lg:flex-row items-start gap-6"
      >
        {/* Image Section */}
        <div className="relative w-full sm:max-w-[400px] lg:w-1/3 mx-auto overflow-hidden rounded-xl">
          
          <LiveAuctionsTicker />
        </div>

       {/* Content Section */}
<div className="w-full lg:w-2/3 flex flex-col gap-6">
  {/* Auction Summary */}
  <div className="w-full dark:bg-gray-800 bg-white rounded-xl flex flex-col gap-4">
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="w-full flex-1">
        <h2 className="text-3xl lg:text-4xl font-light text-slate-800 dark:text-white">Auction: {title}</h2>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <h3 className="text-1xl font-light text-red-500">
            {selectedCurrency} {formatNumberWithCommas(price)}
          </h3>
        </div>

        <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>

        <div className="flex items-center justify-between w-full sm:gap-3">
           <Badge variant="outline" className="gap-1 px-2 py-[3px] text-xs font-medium">
          <Timer endTime={new Date(endTime)} />
        </Badge>
        <p className="my-2 text-sm">
          Status:{" "}
          <span className={`font-semibold ${status === "active" ? "text-green-500" : "text-gray-500"}`}>
            {status}
          </span>
        </p>
        </div>

        
      </div>

      {/* Auction Timer on the right (or below on small screens)
      <div className="shrink-0">
        
      </div>  */}
    </div> 

    {/* Bid Button */}
    {canPlaceBid && (
      <BidButton auctionId={_id as string} currentPrice={auction.currentPrice} onPlaceBid={handlePlaceBid} />
    )}
    <div className="border-b border-[2px] border-neutral-900 dark:border-neutral-700"></div>
    <ImagesSlider
        images={imageUrls}
        itemPerRow={5}
      />
   {!canPlaceBid && (
  <p className="text-sm text-gray-500">
    { !session?.user?.id ? "Log in to place a bid." :
      session.user.id === user?._id?.toString()
        ? "You cannot bid on your own auction."
        : isBidOver(auction)
          ? "This auction has ended."
          : "Bidding is not available." }
  </p>
)}
   {auction.bids.length > 0 &&
    <ActiveBidders data={auction.bids} /> }
  </div>


          {/* Listing Details */}
          <div className="rounded-xl bg-white dark:bg-gray-800">
            <h4 className="font-semibold text-lg">{isProperty ? "Property Details" : "Vehicle Details"}</h4>
            <div className="border-b border-neutral-200 dark:border-neutral-700 my-3 w-14"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
              {isProperty ? (
                <>
                  <div className="flex items-center space-x-2 hover:text-gold transition">
                    <i className="las la-check-circle text-2xl text-silverGray"></i>
                    <span><strong>Address:</strong> {address.suburb}</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-gold transition">
                    <i className="las la-check-circle text-2xl text-silverGray"></i>
                    <span><strong>Rental Form:</strong> {rentalForm}</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-gold transition">
                    <i className="las la-check-circle text-2xl text-silverGray"></i>
                    <span><strong>Size:</strong> {propertySize}</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-gold transition">
                    <i className="las la-check-circle text-2xl text-silverGray"></i>
                    <span><strong>Bedrooms:</strong> {bedrooms}</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-gold transition">
                    <i className="las la-check-circle text-2xl text-silverGray"></i>
                    <span><strong>Bathrooms:</strong> {bathrooms}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-2 hover:text-gold transition"><i className="las la-check-circle text-2xl text-silverGray"></i><span><strong>Make:</strong> {make}</span></div>
                  <div className="flex items-center space-x-2 hover:text-gold transition"><i className="las la-check-circle text-2xl text-silverGray"></i><span><strong>Model:</strong> {carModel}</span></div>
                  <div className="flex items-center space-x-2 hover:text-gold transition"><i className="las la-check-circle text-2xl text-silverGray"></i><span><strong>Year:</strong> {year}</span></div>
                  <div className="flex items-center space-x-2 hover:text-gold transition"><i className="las la-check-circle text-2xl text-silverGray"></i><span><strong>Mileage:</strong> {odoReading?.toLocaleString()} km</span></div>
                  <div className="flex items-center space-x-2 hover:text-gold transition"><i className="las la-check-circle text-2xl text-silverGray"></i><span><strong>Fuel:</strong> {fuelType}</span></div>
                  <div className="flex items-center space-x-2 hover:text-gold transition"><i className="las la-check-circle text-2xl text-silverGray"></i><span><strong>Transmission:</strong> {transmission}</span></div>
                  <div className="flex items-center space-x-2 hover:text-gold transition"><i className="las la-check-circle text-2xl text-silverGray"></i><span><strong>Body Type:</strong> {bodyType}</span></div>
                  <div className="flex items-center space-x-2 hover:text-gold transition"><i className="las la-check-circle text-2xl text-silverGray"></i><span><strong>Colour:</strong> {colour}</span></div>
                </>
              )}
            </div>
          </div>

          {/* Amenities */}
          {amenities?.length > 0 && (
            <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-md">
              <h4 className="font-semibold text-lg">Amenities</h4>
              <div className="border-b border-neutral-200 dark:border-neutral-700 my-3 w-14"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
                {amenities.slice(0, 6).map((item: any, index: any) => (
                  <div key={index} className="flex items-center space-x-2 hover:text-gold transition">
                    <i className="las la-check-circle text-2xl text-silverGray"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {features?.length > 0 && (
            <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-md">
              <h4 className="font-semibold text-lg">Features</h4>
              <div className="border-b border-neutral-200 dark:border-neutral-700 my-3 w-14"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
                {features.slice(0, 3).map((item: any, index: any) => (
                  <div key={index} className="flex items-center space-x-2 hover:text-gold transition">
                    <i className="las la-check-circle text-2xl text-silverGray"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <SectionAds />
        </div>
      </motion.div>
  );
};

export default AuctionClientPage;
