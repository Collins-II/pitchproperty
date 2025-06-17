"use client";

import React, { FC, useEffect, useState } from "react";
import { PostDataType } from "@/data/types";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useSwipeable } from "react-swipeable";
import PrevBtn from "../PrevBtn";
import NextBtn from "../NextBtn";
import { useWindowSize } from "react-use";
import { Route } from "next";
import Link from "next/link";
import Badge from "@/shared/Badge";
import Image from "next/image";

export interface BlogSliderProps {
  className?: string;
  itemClassName?: string;
  categories: PostDataType[];
  itemPerRow?: number;
}

const BlogSlider: FC<BlogSliderProps> = ({
  className = "",
  itemClassName = "",
  categories,
  itemPerRow = 5,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [visibleItems, setVisibleItems] = useState(itemPerRow);
  const windowWidth = useWindowSize().width;

  useEffect(() => {
    if (windowWidth < 500) setVisibleItems(1);
    else if (windowWidth < 1024) setVisibleItems(2);
    else if (windowWidth < 1280) setVisibleItems(itemPerRow - 1);
    else setVisibleItems(itemPerRow);
  }, [itemPerRow, windowWidth]);

  const changeSlide = (newIndex: number) => {
    if (newIndex > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      currentIndex < categories.length - visibleItems &&
      changeSlide(currentIndex + 1),
    onSwipedRight: () =>
      currentIndex > 0 && changeSlide(currentIndex - 1),
    trackMouse: true,
  });

  const renderPost = (post: PostDataType) => (
    <div key={post.id} className="relative w-full h-[400px] rounded-3xl overflow-hidden group">
      <Link href={post.href as Route} className="absolute inset-0 z-10" />
      <Image
        className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
        src={post.featuredImage}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        alt={post.title}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-xs text-neutral-300 space-y-2.5">
        <Badge color="yellow" name={post.postType?.toUpperCase()} />
        <h2 className="text-lg font-semibold text-white line-clamp-2">{post.title}</h2>
        <div className="flex items-center space-x-2 text-sm text-neutral-200">
          <span className="truncate">{post.author.name}</span>
          <span className="font-medium">·</span>
          <span className="truncate">{post.date}</span>
        </div>
      </div>
    </div>
  );

  if (!visibleItems) return null;

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`} >
      <MotionConfig transition={{ x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 }, }}>
        <div className="relative " {...handlers}>
          <div className="overflow-hidden rounded-xl">
            <motion.ul className="flex gap-4">
              <AnimatePresence initial={false} custom={direction}>
                {categories.slice(currentIndex, currentIndex + visibleItems).map((post, i) => (
                  <motion.li
                    key={i}
                    className={`flex-none ${itemClassName}`}
                    initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
                    animate={{ x: "0%", opacity: 1 }}
                    exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ flexBasis: `calc(100% / ${visibleItems})` }}
                  >
                    {renderPost(post)}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>

          {currentIndex > 0 && (
            <PrevBtn
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changeSlide(currentIndex - 1)}
              className="z-10 w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -left-3 xl:-left-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          )}
          {currentIndex < categories.length - visibleItems && (
            <NextBtn
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changeSlide(currentIndex + 1)}
              className="z-10 w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -right-3 xl:-right-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          )}
        </div>
      </MotionConfig>
    </div>
  );
};

export default BlogSlider;
