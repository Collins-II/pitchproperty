"use client";

import React from "react";
import { motion } from "motion/react";
import Image, { StaticImageData } from "next/image";
import { TrophyIcon } from "lucide-react";
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
  const isLeading = status === "leading";
  const statusClass = isLeading
    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
    : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="flex flex-row items-center sm:items-start gap-4 rounded-2xl border border-gray-200 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 hover:shadow-md transition"
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <Avatar className="h-12 w-12 ring ring-white dark:ring-gray-800 ring-offset-2">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl as string} alt={name || "Bidder"} />
          ) : (
            <AvatarFallback>
              {name?.slice(0, 2).toUpperCase() || "??"}
            </AvatarFallback>
          )}
        </Avatar>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full" />
      </div>

      {/* Content */}
      <div className="flex flex-row items-center justify-between w-full text-sm">
        {/* Top Line */}
        <p className="font-medium text-gray-900 dark:text-white">
          <span className="italic text-blue-600 dark:text-blue-400">{name}</span> placed a bid
        </p>

        {/* Bid Info & Status */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 font-semibold bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-xs sm:text-sm">
            <TrophyIcon className="h-4 w-4" />
            ${bidAmount.toLocaleString()}
          </span>

          <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusClass}`}>
            {isLeading ? "Leading" : "Outbid"}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default BidderCard;
