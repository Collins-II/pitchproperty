"use client";

import React, { FC, useEffect, useState } from "react";
import { TaxonomyType } from "@/data/types";
import CardCategory3 from "@/components/CardCategory3";
import CardCategory4 from "@/components/CardCategory4";
import CardCategory5 from "@/components/CardCategory5";
import Heading from "@/shared/Heading";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useSwipeable } from "react-swipeable";

import { variants } from "@/utils/animationVariants";
import { useWindowSize } from "react-use";
import { IAuction } from "@/lib/database/models/auction.model";
import AuctionCard from "@/app/(home)/auctions/components/auction-card";
import PrevBtn from "../PrevBtn";
import NextBtn from "../NextBtn";

export interface AuctionTabProps {
  className?: string;
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
  itemClassName?: string;
  data: IAuction[];
}

const AuctionTab: FC<AuctionTabProps> = ({
  className,
  itemPerRow = 4,
  sliderStyle,

  data
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfitem] = useState(0);

  const windowWidth = useWindowSize().width;
  useEffect(() => {
    if (windowWidth < 320) {
      return setNumberOfitem(1);
    }
    if (windowWidth < 500) {
      return setNumberOfitem(itemPerRow - 3);
    }
    if (windowWidth < 1024) {
      return setNumberOfitem(itemPerRow - 2);
    }
    if (windowWidth < 1280) {
      return setNumberOfitem(itemPerRow - 1);
    }

    setNumberOfitem(itemPerRow);
  }, [itemPerRow, windowWidth]);

  function changeItemId(newVal: number) {
    if (newVal > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < data?.length - 1) {
        changeItemId(currentIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        changeItemId(currentIndex - 1);
      }
    },
    trackMouse: true,
  });

  if (!numberOfItems) return null;

  return (
    <div className={`nc-SectionSliderNewdata ${className}`}>
        <div className="">
          <h2 className="relative text-1xl font-semibold text-slate-700">Live Auctions
          <span className="absolute -top-1 -left-2 w-3 h-3 rounded-full bg-red-400 animate-ping"></span>
          <span className="absolute -top-1 -left-2 w-3 h-3 rounded-full bg-red-400"></span>
          </h2>
        </div>
        <div className="w-20 border-b border-neutral-200 dark:border-neutral-700 my-4"></div>
     <div className="listingSection__wrap">
      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className={`relative flow-root`} {...handlers}>
          <div className={`flow-root overflow-hidden rounded-xl`}>
            <motion.ul
              initial={false}
              className="relative whitespace-nowrap -mx-2 xl:-mx-4"
            >
              <AnimatePresence initial={false} custom={direction}>
                {data.map((item, indx) => (
                  <motion.li
                    className={`relative inline-block px-2 xl:px-4 `}
                    custom={direction}
                    initial={{
                      x: `${(currentIndex - 1) * -100}%`,
                    }}
                    animate={{
                      x: `${currentIndex * -100}%`,
                    }}
                    variants={variants(200, 1)}
                    key={indx}
                    style={{
                      width: `calc(1/${numberOfItems} * 100%)`,
                    }}
                  >
                    <AuctionCard data={item}/>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>

          {currentIndex ? (
            <PrevBtn
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changeItemId(currentIndex - 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -left-3 xl:-left-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          ) : null}

          {data.length > currentIndex + numberOfItems ? (
            <NextBtn
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changeItemId(currentIndex + 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -right-3 xl:-right-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          ) : null}
        </div>
      </MotionConfig>
      </div>
    </div>
  );
};

export default AuctionTab;
