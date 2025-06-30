"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { createSlug, formatCurrency } from "@/lib/helper";
import { IAuction } from "@/lib/database/models/auction.model";
import { Badge } from "@/components/uix/badge";
import GallerySlider from "@/components/GallerySlider";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/CurrencyStore/store";
import { useConvertPrice } from "@/utils/CurrencyStore/currency-utils";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import Timer from "./timer";
import { GavelIcon, UsersIcon } from "lucide-react";
import { Route } from "next";
import { cn } from "@/lib/utils";

interface AuctionCardProps {
  data: IAuction;
  className?: string;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ data, className }) => {
  const {
    _id,
    title,
    description,
    imageUrls,
    currentPrice,
    endTime,
    bids,
    status,
  } = data;

  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const convertPrice = useConvertPrice();

  const auctionUrl = `/auctions/live/${_id}` as Route;
  const image = imageUrls?.[0] || "/placeholder.jpg";

  const statusColor = {
    active: "text-green-600 border-green-600",
    ended: "text-red-600 border-red-600",
  }[status];

  return (
    <div className={cn("bg-white dark:bg-neutral-900 border rounded-xl shadow group", className)}>
      <div className="relative">
        <GallerySlider
          uniqueID={`AuctionCard_${_id}`}
          galleryImgs={imageUrls || []}
          ratioClass="aspect-w-12 aspect-h-10"
          imageClass="rounded-t-xl"
          href={auctionUrl}
        />
        <BtnLikeIcon isLiked={false} className="absolute right-3 top-3 z-[1]" />
      </div>

      <Link href={auctionUrl} className="block px-4 py-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-semibold text-slate-800 dark:text-white line-clamp-2">
            {title}
          </h3>
          <Badge
            variant="outline"
            className={cn("text-[11px] font-medium px-2 py-[2px] border", statusColor)}
          >
            {status}
          </Badge>
        </div>

        {description && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
          <Badge variant="outline" className="gap-1 px-2 py-[3px]">
            <GavelIcon className="size-3" />
            {selectedCurrency} {formatNumberWithCommas(convertPrice(currentPrice))}
          </Badge>
          <Badge variant="outline" className="gap-1 px-2 py-[3px]">
            <UsersIcon className="size-3" />
            {bids.length} bids
          </Badge>
          <Badge variant="outline" className="gap-1 px-2 py-[3px]">
            <Timer endTime={endTime} />
          </Badge>
        </div>

        <div className="pt-2 w-full">
          <div className="text-center text-sm font-medium py-2 px-4 rounded-lg border border-primary-500 text-primary-500 hover:bg-primary-500/10">
            Join Auction
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AuctionCard;
