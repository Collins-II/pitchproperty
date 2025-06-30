"use client";

import React, { FC, ReactNode, useState } from "react";
import { DEMO_CAR_LISTINGS } from "@/data/listings";
import { CarDataType } from "@/data/types";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import AuctionCard from "@/app/(home)/auctions/components/auction-card";
import { IAuction } from "@/lib/database/models/auction.model";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: CarDataType[] = DEMO_CAR_LISTINGS.slice(0,18);

export interface GridPropertyAuctionsProps {
  data: IAuction[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const ITEMS_PER_PAGE = 6; // Number of items to show initially and per load

const GridPropertyAuctions: FC<GridPropertyAuctionsProps> = ({
  data,
  gridClass = "",
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
  const allItemsLoaded = visibleCount >= data?.length;

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {data.slice(0, visibleCount).map((stay,idx) => <AuctionCard data={stay} key={idx} />)}
      </div>
      {!allItemsLoaded && (
        <div className="flex mt-16 justify-center items-center">
          <ButtonSecondary onClick={handleLoadMore}>Show me more</ButtonSecondary>
        </div>
      )}
    </div>
  );
};

export default GridPropertyAuctions;
