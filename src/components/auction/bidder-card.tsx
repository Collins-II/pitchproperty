"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { Clock, TrendingUp } from "lucide-react";
import AuctionTimer from "@/app/(home)/auctions/components/auction-timer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface BidderCardProps {
  name: string;
  bidAmount: string;
  avatarUrl: string | StaticImageData;
  status?: "leading" | "outbid";
}

const BidderCard: React.FC<BidderCardProps> = ({
  name,
  bidAmount,
  avatarUrl,
  status = "leading",
}) => {
  const statusColor =
    status === "leading"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="px-4 py-1 rounded-2xl shadow-sm bg-white dark:bg-neutral-900 w-full flex items-center space-x-4 border border-gray-200 dark:border-neutral-800">
      <div className="relative">
      <Avatar className="h-10 w-10">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl as string} alt={name || "Bidder"} />
            ) : (
              <AvatarFallback>
                {name ? name.slice(0, 2).toUpperCase() : "??"}
              </AvatarFallback>
            )}
          </Avatar>
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400"></span>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-light text-sm text-neutral-700 dark:text-white">
            {name}
          </h3>
 
          <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
             <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>{bidAmount}</span>
             </div>
          </div>

          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor}`}
          >
            {status === "leading" ? "Leading Bid" : "Outbid"}
          </span>
        </div>

        
      </div>
    </div>
  );
};

export default BidderCard;
