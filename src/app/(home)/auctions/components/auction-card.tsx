import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/helper";
import { ClockIcon, GavelIcon, UsersIcon } from "lucide-react";
import { Route } from "next";
import { Card, CardContent } from "@/components/uix/card";
import { Badge } from "@/components/uix/badge";
import { IAuction } from "@/lib/database/models/auction.model";
import AuctionTimer from "@/app/(home)/auctions/components/auction-timer";
import Timer from "./timer";
 // Adjust import path as needed

type AuctionCardProps = {
  data: IAuction;
  layout?: "grid" | "list";
};

const AuctionCard: React.FC<AuctionCardProps> = ({ data, layout = "grid" }) => {
  const {
    _id,
    title,
    description,
    listingModel,
    imageUrls,
    currentPrice,
    endTime,
    bids,
    status,
  } = data;

  const auctionUrl = `/auctions/live/${_id}`; // Adjust URL based on listing model
  const image = imageUrls?.[0] || "/placeholder.jpg"; // Fallback if no image
  const statusColor = {
    active: "text-green-600 border-green-600",
    ended: "text-red-600 border-red-600",
  }[status];

  return (
    <div>
        <Card
          className={cn(
            "border rounded-lg shadow-sm p-0 flex flex-col gap-4 group hover:shadow-md transition",
            layout === "list" && "flex-row border-primary/30 gap-0 md:gap-4"
          )}
        >
          {/* Image Section */}
          <div
            className={cn(
              "relative w-full min-h-28 !h-[210px] bg-primary/10 overflow-hidden",
              layout === "list" &&
                "w-[152px] !h-auto md:w-[220px] md:h-[210px] shrink-0"
            )}
          >
            <Link href={auctionUrl as Route}>
            <Image
              src={image}
              alt={title}
              className={cn(
                "rounded-t-lg w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
                layout === "list" && "!rounded-r-none"
              )}
              width={layout === "list" ? 300 : 800}
              height={layout === "list" ? 200 : 500}
            />
            </Link>
          </div>

          {/* Content Section */}
          <CardContent
            className={cn(
              "!p-4 !pt-0 space-y-2",
              layout === "list" &&
                "flex-1 !p-[10px_16px_18px_16px] md:!p-[18px_16px_18px_0px]"
            )}
          >
            {/* Title & Status */}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-sm sm:text-base text-gray-800 capitalize line-clamp-2">
                {title}
              </h3>
              <Badge
                variant="outline"
                className={cn(
                  "text-[11px] !font-semibold py-[2px] px-2 border",
                  statusColor
                )}
              >
                {status}
              </Badge>
            </div>

            {/* Description */}
            {description && (
              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                {description}
              </p>
            )}

            {/* Auction Info */}
            <div
              className={cn(
                "flex flex-wrap items-center gap-2 text-xs sm:text-sm mt-1",
                layout === "list" && "hidden sm:flex"
              )}
            >
              <Badge variant="outline" className="gap-1 px-2 py-[3px] text-xs font-medium">
                <GavelIcon className="size-3" />
                {formatCurrency(currentPrice)}
              </Badge>

              <Badge variant="outline" className="gap-1 px-2 py-[3px] text-xs font-medium">
                <UsersIcon className="size-3" />
                {bids.length} bids
              </Badge>

              <Badge variant="outline" className="gap-1 px-2 py-[3px] text-xs font-medium">
                <Timer endTime={endTime} />
              </Badge>
            </div>

            {/* View Auction Button */}
            <div className="pt-2 w-full flex justify-center">
              <Link
                href={auctionUrl as Route}
                className="w-full rounded-xl text-sm py-2 border-[1px] border-primary-500 text-primary-500 text-center hover:bg-primary-500/10"
              >
                View Auction
              </Link>
            </div>
          </CardContent>
        </Card>
    </div>
  );
};

export default AuctionCard;
