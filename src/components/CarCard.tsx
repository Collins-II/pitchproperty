"use client";

import React, { FC } from "react";
import { ICar } from "@/lib/database/models/car.model";
import Image from "next/image";
import Link from "next/link";
import StartRating from "@/components/StartRating";
import Badge from "@/shared/Badge";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Route } from "next";
import GallerySlider from "./GallerySlider";
import BtnLikeIcon from "./BtnLikeIcon";
import SaleOffBadge from "./SaleOffBadge";
import { useSelector } from "react-redux";
import { useConvertPrice } from "@/utils/CurrencyStore/currency-utils";
import { RootState } from "@/utils/CurrencyStore/store";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";

export interface CarCardProps {
  className?: string;
  data: ICar;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const CarCard: FC<CarCardProps> = ({ className = "", data, onEdit, onDelete }) => {
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const convertPrice = useConvertPrice();

  const {
    _id,
    featuredImage,
    galleryImgs,
    title,
    price,
    seats,
    transmission,
    saleOff,
    isAds,
    currency,
    reviewCount = 0,
    isAuction,
    reviewStart = 4.5,
  } = data;

  const renderSliderGallery = () => {
      return (
        <div className="relative w-full">
          <GallerySlider
            uniqueID={`StayCard_${_id}`}
            ratioClass="aspect-w-4 aspect-h-3 "
            galleryImgs={galleryImgs}
            href={"/account-savelists" as Route}
            galleryClass={""}
          />
          <BtnLikeIcon isLiked={false} className="absolute right-3 top-3 z-[1]" />
          {saleOff && <SaleOffBadge desc={`${saleOff}% today`} className="absolute left-3 top-3"  />}
        </div>
      );
    };

  const renderImage = () => (
    <div className="relative w-full h-48 rounded-t-3xl overflow-hidden">
      {isAds && (
        <Badge
          name="ADS"
          color="green"
          className="absolute right-3 top-3 text-xs px-2"
        />
      )}
     {renderSliderGallery()}
    </div>
  );

  const renderContent = () => (
    <div className="p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold line-clamp-1 capitalize">
          {title || "Untitled Car"}
        </h2>
        {isAuction && <Badge name="Auction" color="yellow" />}
      </div>

      <div className="flex items-center text-sm text-neutral-500 space-x-3">
        <span>{seats} seats</span>
        <span>•</span>
        <span>{transmission}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">
          {selectedCurrency} {formatNumberWithCommas(convertPrice(Number(price)))}
        </span>
        <StartRating reviewCount={reviewCount} point={reviewStart} />
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit?.(_id)}
          className="flex items-center space-x-1 text-slate-800 hover:underline text-sm"
        >
          <PencilIcon className="h-4 w-4" />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete?.(_id)}
          className="flex items-center space-x-1 text-red-600 hover:underline text-sm"
        >
          <TrashIcon className="h-4 w-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );

  return (
    <div
      className={`nc-CarCard group border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow ${className}`}
      data-nc-id="CarCard"
    >
      <div className="block">
        {renderImage()}
        {renderContent()}
      </div>
    </div>
  );
};

export default CarCard;

export const CarCardSkeleton = () => {
  return (
    <div className="nc-CarCard group border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full h-48 rounded-t-3xl overflow-hidden bg-neutral-200 dark:bg-neutral-700 animate-pulse"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 animate-pulse"></div>
        <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 animate-pulse"></div>
        <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 animate-pulse"></div>
      </div>
    </div>
  );
};