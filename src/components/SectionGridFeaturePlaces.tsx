"use client";

import React, { FC, useState } from "react";
import { IProperty } from "@/lib/database/models/property.model";
import StayCard from "./StayCard";
import StayCard2 from "./StayCard2";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWindowSize } from "react-use";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import PrevBtn from "./PrevBtn";
import NextBtn from "./NextBtn";
import { variants } from "@/utils/animationVariants";

export interface SectionGridFeaturePlacesProps {
  stayListings: IProperty[];
  gridClass?: string;
  heading?: React.ReactNode;
  subHeading?: React.ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const ITEMS_PER_PAGE = 6;

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [itemsPerRow, setItemsPerRow] = useState(1);
  const { width } = useWindowSize();

  const handleLoadMore = () => setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  const allItemsLoaded = visibleCount >= stayListings?.length;

  React.useEffect(() => {
    if (width < 640) return setItemsPerRow(1);
    if (width < 1024) return setItemsPerRow(2);
    if (width < 1280) return setItemsPerRow(3);
    return setItemsPerRow(4);
  }, [width]);

  const changeIndex = (val: number) => {
    if (val > currentIndex) setDirection(1);
    else setDirection(-1);
    setCurrentIndex(val);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < stayListings.length - itemsPerRow) changeIndex(currentIndex + 1);
    },
    onSwipedRight: () => {
      if (currentIndex > 0) changeIndex(currentIndex - 1);
    },
    trackMouse: true,
  });

  const renderCard = (stay: IProperty) => {
    const Card = cardType === "card2" ? StayCard2 : StayCard;
    return <Card key={stay._id as string} data={stay} />;
  };

  const renderGrid = () => (
    <div className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}>
      {stayListings.slice(0, visibleCount).map((stay) => renderCard(stay))}
    </div>
  );

  const renderSlider = () => (
    <div {...handlers} className="relative overflow-hidden">
      <MotionConfig transition={{ x: { type: "spring", stiffness: 300, damping: 30 } }}>
        <motion.ul className="flex whitespace-nowrap">
          <AnimatePresence initial={false} custom={direction}>
            {stayListings.map((stay, i) => (
              <motion.li
                key={stay._id as string}
                className="inline-block px-2 w-full sm:w-[80%]"
                custom={direction}
                initial={{ x: `${(currentIndex - 1) * -100}%` }}
                animate={{ x: `${currentIndex * -100}%` }}
                variants={variants(200, 1)}
              >
                {renderCard(stay)}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {currentIndex > 0 && (
          <PrevBtn onClick={() => changeIndex(currentIndex - 1)} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
        )}
        {stayListings.length > currentIndex + itemsPerRow && (
          <NextBtn onClick={() => changeIndex(currentIndex + 1)} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" />
        )}
      </MotionConfig>
    </div>
  );

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <div className="">
        <h2 className="text-2xl font-semibold text-slate-900">{heading}</h2>
        <p className="text-neutral-500 dark:text-neutral-400 mt-1">{subHeading}</p>
      </div>
      <div className="w-50 border-b border-slate-900 border-[2px] dark:border-neutral-700 mb-8"></div>
      {width < 1024 ? renderSlider() : renderGrid()}
      {!allItemsLoaded && width >= 1024 && (
        <div className="flex mt-4 justify-center items-center">
          <ButtonSecondary onClick={handleLoadMore}>Show me more</ButtonSecondary>
        </div>
      )}
      {allItemsLoaded && (
        <div className="flex mt-4 justify-end items-center">
          <button
            aria-label="submit-button"
            onClick={() => router.push("/market-property")}
            className="flex justify-center items-center rounded-full shadow-sm bg-slate-900 px-6 py-1.5 text-sm font-medium text-white hover:text-neutral-500 shadow-lg transition duration-300 hover:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
          >
            Visit Market <ArrowRightIcon className="w-6 h-6 ml-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionGridFeaturePlaces;
