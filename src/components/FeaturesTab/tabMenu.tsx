"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const tabs = [
  { id: "tabOne", label: "Executive", number: "01" },
  { id: "tabTwo", label: "Prestige", number: "02" },
  { id: "tabThree", label: "Apartment", number: "03" },
];

interface TabProps {
    currentTab: string;
    setCurrentTab: Dispatch<SetStateAction<string>>
}

const TabMenu = ({ currentTab, setCurrentTab }: TabProps) => {

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="mt-5 mb-12 rounded-xl bg-neutral-100 dark:border-strokedark dark:bg-blacksection dark:shadow-xl"
    >
      {/* Mobile Slider */}
      <div className="block md:hidden relative w-full">
        
      {/* Swiper Component */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={12}
        slidesPerView={1.8}
       
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ 
            clickable: true, 
            el: ".swiper-pagination" 
          }}
      >
        {tabs.map((tab) => (
          <SwiperSlide key={tab.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentTab(tab.id)}
              className={`relative flex flex-col items-center justify-center mb-3 px-4 py-2 cursor-pointer rounded-xl transition-all ${
                currentTab === tab.id
                  ? "border-b-2 border-gold "
                  : "border-b border-gray-300 bg-white dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-white dark:bg-gray-700 shadow-md">
                <p className="text-lg font-bold">{tab.number}</p>
              </div>
              <p className="mt-2 text-sm font-semibold ">{tab.label}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Dots Positioned Lower */}
      <div className="swiper-pagination !mt-6 !bottom-[-30px]"></div> {/* Lowered dots further down */}

      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-wrap justify-center gap-6 lg:gap-10 xl:gap-12 shadow-lg rounded-lg">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentTab(tab.id)}
            className={`relative flex items-center gap-4 p-4 cursor-pointer border-b-[2px] transition-all ${
              currentTab === tab.id
                ? "border-gold "
                : "border-transparent text-gray-600 dark:text-gray-300"
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-stroke dark:border-strokedark dark:bg-blacksection">
              <p className="text-lg font-semibold ">{tab.number}</p>
            </div>
            <p className="text-sm font-semibold ">{tab.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TabMenu;
