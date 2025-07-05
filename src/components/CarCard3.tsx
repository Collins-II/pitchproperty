"use client";

import React, { FC } from "react";
import GallerySlider from "@/components/GallerySlider";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import ShareBadge from "@/shared/Badge";
import Link from "next/link";
import { useConvertPrice } from "@/utils/CurrencyStore/currency-utils";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/CurrencyStore/store";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import { IProperty } from "@/lib/database/models/property.model";
import { Route } from "next";
import { IoBedOutline } from "react-icons/io5";
import { LuDoorOpen } from "react-icons/lu";
import { ICar } from "@/lib/database/models/car.model";
import { Badge } from "./ui/badge";
import { cn, getCurrencySymbol } from "@/lib/utils";
import { createSlug, formatCurrency } from "@/lib/helper";
import {
  CogIcon,
  FuelIcon,
  GaugeIcon,
  Tag,
} from "lucide-react";
import { CAR_CONDITION_OPTIONS } from "@/constants/car-options";

export interface StayCard2Props {
  className?: string;
  data: ICar;
  size?: "default" | "small";
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const CarCard3: FC<StayCard2Props> = ({
  size = "default",
  className = "",
  data,
}) => {
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const convertPrice = useConvertPrice();

    const {
      _id,
      slug,
      featuredImage,
      galleryImgs,
      title,
      description,
      price,
      fuelType,
      odoReading,
      odoUnit,
      status,
      transmission,
      currency,
      address,
      isAds,
      carModel,
      seats,
      saleOff,
    } = data;
  
    const urlSlug = slug || createSlug(title || "car");
    const conditionLabel =
      CAR_CONDITION_OPTIONS.find((opt) => opt.value === status)?.label || status;

  const renderSliderGallery = () => (
    <div className="relative w-full">
      <GallerySlider
        uniqueID={`StayCard2_${_id}`}
        ratioClass="aspect-w-12 aspect-h-11"
        galleryImgs={galleryImgs}
        imageClass="rounded-xl"
        href={urlSlug as Route}
      />
      <BtnLikeIcon isLiked={false} className="absolute right-3 top-3 z-[1]" />
      {saleOff && <SaleOffBadge className="absolute left-3 top-3" />}
    </div>
  );

  const renderContent = () => (
    <div className={`mt-3 space-y-2 ${size === "small" ? "text-sm" : "text-base"}`}>
      {/* Type and Price */}
      <div className="flex items-center justify-between">
        <span className="text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold text-silverGray">{carModel} ·</span> {seats} seats
        </span>
        <span className="text-sm font-semibold text-blue-900 dark:text-blue-500">
          {getCurrencySymbol(selectedCurrency)} {formatNumberWithCommas(convertPrice(Number(price)))}
        </span>
      </div>

      {/* Title and badge */}
      <div className="flex items-center space-x-2">
        {isAds && <ShareBadge name="ADS" color="green" />}
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
        <span>{address?.street}</span>
      </div>

      {/* Divider */}
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

      {/* Reviews */}
      <div className="flex-wrap justify-between items-center">
        <Badge
                        variant="outline"
                        className="border-primary items-center gap-1.5 text-[11px] capitalize !font-medium py-[3px] px-2"
                      >
                        <FuelIcon className="size-3 mb-px" />
                        {fuelType?.toLowerCase()}
                      </Badge>
        
                      <Badge
                        variant="outline"
                        className="border-primary gap-1.5 text-[11px] capitalize !font-medium py-[3px] px-2"
                      >
                        <GaugeIcon className="size-3 mb-px" />
                        {odoReading} {odoUnit}
                      </Badge>
        
                      <Badge
                        variant="outline"
                        className="border-primary gap-1.5 text-[11px] capitalize !font-medium py-[3px] px-2"
                      >
                        <Tag className="size-3 mb-px" />
                        {conditionLabel}
                      </Badge>
        
                      <Badge
                        variant="outline"
                        className="border-primary gap-1.5 text-[11px] capitalize !font-medium py-[3px] px-2"
                      >
                        <CogIcon className="size-3 mb-px" />
                        {transmission?.toLowerCase()}
                      </Badge>
      </div>
    </div>
  );

  return (
    <div className={`nc-StayCard2 group relative ${className} bg-white (max-width: 400px) 100vw, 300px border border-[0.5px] border-neutral-200 rounded-md p-2`}>
      {renderSliderGallery()}
      <Link href={"/" as Route} className="block px-1.5 pt-2 pb-4">
        {renderContent()}
      </Link>
    </div>
  );
};

export default CarCard3;
