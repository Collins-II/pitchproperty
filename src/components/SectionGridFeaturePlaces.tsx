"use client";

import React, { FC, ReactNode, useState } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "./StayCard";
import StayCard2 from "./StayCard2";
import SectionTitle from "./Common/SectionTitle";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import PropertyCardH from "./PropertyCardH";
import { IProperty } from "@/lib/database/models/property.model";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.slice(0,18);;

export interface SectionGridFeaturePlacesProps {
  stayListings: IProperty[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const ITEMS_PER_PAGE = 6; // Number of items to show initially and per load

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings,
  gridClass = "",
  heading = "Properties to explore",
  subHeading = "Popular properties that Kingsland City recommends for you",
  headingIsCenter,
  tabs = [""],
  cardType = "card2",
}) => {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Load more items
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  // Check if all items are loaded
  const allItemsLoaded = visibleCount >= stayListings?.length;

  const renderCard = (stay: IProperty) => {
    let CardName = StayCard;
    switch (cardType) {
      case "card1":
        CardName = StayCard;
        break;
      case "card2":
        CardName = StayCard2;
        break;
      default:
        CardName = StayCard;
    }

    return <CardName key={stay._id as any} data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <div>
          <h2 className="text-2xl font-semibold text-silverGray">Explore Properties </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {`Find homes you can afford.`}
          </span>
        </div>
        <div className="w-50 border-b border-neutral-200 dark:border-neutral-700 my-8"></div>
        <div className="listingSection__wrap">
        
      <div
         className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ${gridClass}`}
      >
        {stayListings.slice(0, visibleCount).map((stay) => renderCard(stay))}
      </div>
      {!allItemsLoaded && (
        <div className="flex mt-16 justify-center items-center">
          <ButtonSecondary onClick={handleLoadMore}>Show me more</ButtonSecondary>
        </div>
      )}
      {allItemsLoaded && (
        <div className="flex mt-16 justify-end items-center">
          <button aria-label="submit-button" onClick={() => router.push("/")} className=" flex justify-center items-center rounded-full shadow-sm bg-slate-900 px-6 py-1.5 text-sm font-medium text-white hover:text-blue-500 shadow-lg transition duration-300 hover:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-400">
            Visit Market <ArrowRightIcon className="w-6 h-6 ml-3" />
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
