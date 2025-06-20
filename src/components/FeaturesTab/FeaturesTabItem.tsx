"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useConvertPrice } from "@/utils/CurrencyStore/currency-utils";
import { RootState } from "@/utils/CurrencyStore/store";
import { motion } from "motion/react";
import Badge from "@/shared/Badge";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";

interface FeatureProps {
  title: string;
  price: number;
  duration: string;
  packageName: string;
  subtitle: string;
  amenitiesIncluded: string[];
  features: string[];
  thumbnail: string;
}

const FeaturesTabItem = ({
  title,
  price,
  duration,
  packageName,
  subtitle,
  amenitiesIncluded,
  features,
  thumbnail,
}: FeatureProps) => {
  const selectedCurrency = useSelector(
    (state: RootState) => state.currency.selectedCurrency
  );
  const convertPrice = useConvertPrice();

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-white dark:bg-gray-800 py-6 px-4 flex flex-col lg:flex-row items-start gap-6"
      >
        {/* Image Section */}
        {thumbnail && (
          <div className="relative w-full sm:max-w-[400px] lg:w-1/3 mx-auto overflow-hidden rounded-xl shadow-md">
            <Image
              src={thumbnail}
              alt={title}
              width={400}
              height={250}
              className="object-cover w-full h-auto rounded-lg"
            />
            <Badge
              name={packageName}
              className="absolute top-3 left-3 bg-primary-500 text-white"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {/* Title & Pricing */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
              {title}
            </h2>
            <div className="flex flex-wrap items-center justify-between mt-2">
              <h3 className="text-xl font-bold text-neutral-500">
                {selectedCurrency} {formatNumberWithCommas(convertPrice(price))}
                <span className="text-lg font-medium text-body-color">
                  /{duration}
                </span>
              </h3>
            </div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{subtitle}</p>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="font-semibold text-lg">Amenities</h4>
            <div className="border-b border-neutral-200 dark:border-neutral-700 my-3 w-14"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
              {amenitiesIncluded.slice(0, 6).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 hover:text-gold transition"
                >
                  <i className="las la-check-circle text-2xl text-silverGray"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-lg">Features</h4>
            <div className="border-b border-neutral-200 dark:border-neutral-700 my-3 w-14"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
              {features.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 hover:text-slate-700 transition"
                >
                  <i className="las la-check-circle text-2xl text-silverGray"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reservation Button */}
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center rounded-full bg-blue-700 p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-xl"
            >
              Start Reservation
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturesTabItem;
