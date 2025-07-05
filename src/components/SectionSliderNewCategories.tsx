"use client";

import React, { FC, useEffect, useState } from "react";
import { TaxonomyType } from "@/data/types";
import CardCategory3 from "@/components/CardCategory3";
import CardCategory4 from "@/components/CardCategory4";
import CardCategory5 from "@/components/CardCategory5";
import { Building, CarFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useSwipeable } from "react-swipeable";
import PrevBtn from "./PrevBtn";
import NextBtn from "./NextBtn";
import { variants } from "@/utils/animationVariants";
import { useWindowSize } from "react-use";
import { Route } from "next";
import clsx from "clsx";
import { getCarLocations, getPropertiesGroupedByDistrict, LocationItem } from "@/app/actions/getLocations";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: LocationItem[];
  carData?: LocationItem[];
  propertyData?: LocationItem[];
  categoryCardType?: "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
}

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading = "Suggestions for discovery",
  subHeading = "Popular places to recommends for you",
  className = "",
  itemClassName = "",
  itemPerRow = 5,
  propertyData,
  carData,
  categoryCardType = "card3",
  sliderStyle = "style1",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfitem] = useState(0);
  const [category, setCategory] = useState<"property" | "car">("property");
  const [data, setData] = useState<LocationItem[]>(propertyData as LocationItem[]);
  const [carObj, setCarObj] = useState<LocationItem[]>(carData as LocationItem[]);

  useEffect(() => {
    const fetchData = async () => {
      const result = category === "property"
        ? propertyData
        : carData
      setData(result as LocationItem[]);
    };
    fetchData();
  }, [category]);

  const windowWidth = useWindowSize().width;
  useEffect(() => {
    if (windowWidth < 320) return setNumberOfitem(1);
    if (windowWidth < 500) return setNumberOfitem(itemPerRow - 3);
    if (windowWidth < 1024) return setNumberOfitem(itemPerRow - 2);
    if (windowWidth < 1280) return setNumberOfitem(itemPerRow - 1);
    setNumberOfitem(itemPerRow);
  }, [itemPerRow, windowWidth]);

  function changeItemId(newVal: number) {
    setDirection(newVal > currentIndex ? 1 : -1);
    setCurrentIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => currentIndex < data?.length - 1 && changeItemId(currentIndex + 1),
    onSwipedRight: () => currentIndex > 0 && changeItemId(currentIndex - 1),
    trackMouse: true,
  });

  if (!numberOfItems) return null;

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      <div className="flex justify-center gap-4 mb-6">
        <Button
          variant={category === "property" ? "default" : "outline"}
          onClick={() => setCategory("property")}
          className={clsx("flex items-center gap-2 px-5 py-2 rounded-xl", category === "property" && "scale-105 bg-slate-900 text-white")}
        >
          <Building className="w-5 h-5" /> Properties
        </Button>
        <Button
          variant={category === "car" ? "default" : "outline"}
          onClick={() => setCategory("car")}
          className={clsx("flex items-center gap-2 px-5 py-2 rounded-xl", category === "car" && "scale-105 bg-slate-900 text-white")}
        >
          <CarFront className="w-5 h-5" /> Cars
        </Button>
      </div>
      <div className="listingSection__wrap">
        <MotionConfig transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}>
          <div className="relative flow-root" {...handlers}>
            <div className="flow-root overflow-hidden rounded-xl">
              <motion.ul initial={false} className="relative whitespace-nowrap -mx-2 xl:-mx-4">
                <AnimatePresence initial={false} custom={direction}>
                  {data?.map((item, indx) => (
                    <motion.li
                      key={indx}
                      className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
                      custom={direction}
                      initial={{ x: `${(currentIndex - 1) * -100}%` }}
                      animate={{ x: `${currentIndex * -100}%` }}
                      variants={variants(200, 1)}
                      style={{ width: `calc(1/${numberOfItems} * 100%)` }}
                    >
                      <CardCategory5 taxonomy={item} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            </div>
            {currentIndex > 0 && (
              <PrevBtn
                style={{ transform: "translate3d(0, 0, 0)" }}
                onClick={() => changeItemId(currentIndex - 1)}
                className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -left-3 xl:-left-6 top-1/3 -translate-y-1/2 z-[1]"
              />
            )}
            {data?.length > currentIndex + numberOfItems && (
              <NextBtn
                style={{ transform: "translate3d(0, 0, 0)" }}
                onClick={() => changeItemId(currentIndex + 1)}
                className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -right-3 xl:-right-6 top-1/3 -translate-y-1/2 z-[1]"
              />
            )}
          </div>
        </MotionConfig>
      </div>
    </div>
  );
};

export default SectionSliderNewCategories;
