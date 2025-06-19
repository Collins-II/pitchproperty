"use client";

import React, { FC, useEffect, useState } from "react";
import Heading from "@/shared/Heading";
import CardAuthorBox from "@/components/CardAuthorBox";
import CardAuthorBox2 from "@/components/CardAuthorBox2";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useSwipeable } from "react-swipeable";
import PrevBtn from "./PrevBtn";
import NextBtn from "./NextBtn";
import { variants } from "@/utils/animationVariants";
import { useWindowSize } from "react-use";
import { DEMO_AUTHORS } from "@/data/authors";
import { AuthorType } from "@/data/types";

export interface AuthorSliderProps {
  className?: string;
  authors?: AuthorType[];
  boxCard?: "box1" | "box2";
  itemPerRow?: 4 | 5;
}

const AuthorSlider: FC<AuthorSliderProps> = ({
  className = "block md:hidden",
  authors = DEMO_AUTHORS,
  boxCard = "box1",
  itemPerRow = 5,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfitem] = useState(0);

  const windowWidth = useWindowSize().width;
  useEffect(() => {
    if (windowWidth < 320) return setNumberOfitem(1);
    if (windowWidth < 500) return setNumberOfitem(itemPerRow - 3);
    if (windowWidth < 1024) return setNumberOfitem(itemPerRow - 2);
    if (windowWidth < 1280) return setNumberOfitem(itemPerRow - 1);
    setNumberOfitem(itemPerRow);
  }, [itemPerRow, windowWidth]);

  const changeItemId = (newVal: number) => {
    setDirection(newVal > currentIndex ? 1 : -1);
    setCurrentIndex(newVal);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < authors.length - numberOfItems) {
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

  const renderCard = (author: AuthorType, index: number) => {
    return boxCard === "box2" ? (
      <CardAuthorBox2 key={author.id} author={author} />
    ) : (
      <CardAuthorBox
        index={index < 3 ? index + 1 : undefined}
        key={author.id}
        author={author}
      />
    );
  };

  if (!numberOfItems) return null;

  return (
    <div className={`nc-AuthorSlider ${className}`}>
      <Heading desc="Rating based on customer reviews" isCenter>
        Top 10 author of the month
      </Heading>
      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="relative flow-root" {...handlers}>
          <div className="flow-root overflow-hidden rounded-xl">
            <motion.ul
              initial={false}
              className="relative whitespace-nowrap -mx-2 xl:-mx-4"
            >
              <AnimatePresence initial={false} custom={direction}>
                {authors.map((author, index) => (
                  <motion.li
                    key={author.id}
                    className="relative inline-block px-2 xl:px-4"
                    custom={direction}
                    initial={{ x: `${(currentIndex - 1) * -100}%` }}
                    animate={{ x: `${currentIndex * -100}%` }}
                    variants={variants(200, 1)}
                    style={{ width: `calc(100% / ${numberOfItems})` }}
                  >
                    {renderCard(author, index)}
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

          {currentIndex + numberOfItems < authors.length && (
            <NextBtn
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changeItemId(currentIndex + 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -right-3 xl:-right-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          )}
        </div>
      </MotionConfig>
    </div>
  );
};

export default AuthorSlider;
