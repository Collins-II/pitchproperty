"use client";

import React, { FC } from "react";
import GallerySlider from "@/components/GallerySlider";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Link from "next/link";
import { useConvertPrice } from "@/utils/CurrencyStore/currency-utils";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/CurrencyStore/store";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import { IProperty } from "@/lib/database/models/property.model";
import { Route } from "next";
import { IoBedOutline } from "react-icons/io5";
import { LuDoorOpen } from "react-icons/lu";
import { getCurrencySymbol } from "@/lib/utils";

export interface StayCard2Props {
  className?: string;
  data: IProperty;
  size?: "default" | "small";
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const StayCard2: FC<StayCard2Props> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
}) => {
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const convertPrice = useConvertPrice();

  const {
    galleryImgs,
    listingCategory,
    address,
    title,
    bedrooms,
    bathrooms,
    listingType,
    href = "/listing-stay-detail",
    like,
    saleOff,
    isAds,
    price,
    reviewStart,
    reviewCount,
    id,
  } = data;

  const renderSliderGallery = () => (
    <div className="relative w-full">
      <GallerySlider
        uniqueID={`StayCard2_${id}`}
        ratioClass="aspect-w-12 aspect-h-11"
        galleryImgs={galleryImgs}
        imageClass="rounded-xl"
        href={href as Route}
      />
      <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" />
      {saleOff && <SaleOffBadge className="absolute left-3 top-3" />}
    </div>
  );

  const renderContent = () => (
    <div className={`mt-3 space-y-2 ${size === "small" ? "text-sm" : "text-base"}`}>
      {/* Type and Price */}
      <div className="flex items-center justify-between">
        <span className="text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold text-silverGray">{listingType} ·</span> {bedrooms} beds
        </span>
        <span className="text-sm font-semibold text-blue-900 dark:text-blue-500">
          {getCurrencySymbol(selectedCurrency)} {formatNumberWithCommas(convertPrice(Number(price)))}
        </span>
      </div>

      {/* Title and badge */}
      <div className="flex items-center space-x-2">
        {isAds && <Badge name="ADS" color="green" />}
        <h2 className="font-semibold capitalize text-slate-900 dark:text-white line-clamp-1">
          {title}
        </h2>
      </div>

      {/* Address */}
      <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 space-x-1.5">
        {size === "default" && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        )}
        <span>{address?.suburb}</span>
      </div>

      {/* Divider */}
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

      {/* Reviews */}
      <div className="flex justify-between items-center">
        <span className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
          <IoBedOutline size={24} className="mr-2"/> {bathrooms}
        </span>

        <span className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
          <LuDoorOpen size={24} className="mr-2"/> {bathrooms}
        </span>
        {/*!!reviewStart && (
          <StartRating reviewCount={reviewCount} point={reviewStart} />
        )*/}
      </div>
    </div>
  );

  return (
    <div className={`nc-StayCard2 group relative ${className} w-200 bg-white border border-[0.5px] border-neutral-200 rounded-md p-2`}>
      {renderSliderGallery()}
      <Link href={href as Route} className="block px-1.5 pt-2 pb-4">
        {renderContent()}
      </Link>
    </div>
  );
};

export default StayCard2;
