"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import PriceRangeInput from "../(HeroSearchForm2Mobile)/(real-estate-search-form)/PriceRangeInput";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/CurrencyStore/store";
import { useConvertPrice } from "@/utils/CurrencyStore/currency-utils";
import { Amenities_demos } from "@/app/(listing-detail)/listing-stay-detail/constant";

const propertyTypes = ["Apartment", "House", "Condo", "Villa", "Studio"];

export default function EstateSearch() {
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const convertPrice = useConvertPrice();
  const [activeTab, setActiveTab] = useState("property");
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([500, 5000]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg relative">
      {/* Tabs Navigation */}
      <div className="flex justify-around border-b border-gray-300 dark:border-neutral-700 pb-2">
        {["property", "amenities", "price"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-1 py-2 text-sm md:text-md lg:text-lg font-light ${
              activeTab === tab
                ? "dark:text-white border-b-2 border-blue-600"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {tab === "property" && "Property Type"}
            {tab === "amenities" && "Amenities"}
            {tab === "price" && "Price Range"}
          </button>
        ))}
      </div>

      {/* Tab Content with Fixed Height & Scroll */}
      <div className="mt-5 space-y-4 h-auto max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
        <AnimatePresence mode="wait">
          {activeTab === "property" && (
            <motion.div
              key="property"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setPropertyType(type)}
                    className={`p-3 rounded-full border ${
                      propertyType === type
                        ? "border-blue-500 bg-blue-100 dark:bg-blue-700"
                        : "border-gray-300"
                    } hover:bg-gray-100 dark:hover:bg-neutral-700 transition`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "amenities" && (
            <motion.div
              key="amenities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-2">
                {Amenities_demos.map((item) => (
                  <div
                    onClick={() => toggleAmenity(item.name)}
                    key={item.name}
                    className={`p-2 rounded-full flex items-center space-x-3 border ${
                      selectedAmenities.includes(item.name)
                        ? "border-blue-500 bg-blue-100 dark:bg-blue-700"
                        : "border-gray-300"
                    } hover:bg-gray-100 dark:hover:bg-neutral-700 transition`}
                  >
                    <i className={`text-3xl las ${item.icon}`}></i>
                    <span>{item.name}</span>
                    {selectedAmenities.includes(item.name) && (
                      <CheckIcon className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "price" && (
            <motion.div
              key="price"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <PriceRangeInput defaultValue={priceRange} onChange={setPriceRange} />
              <div className="flex justify-between px-6 text-neutral-700 dark:text-neutral-100">
                <span>
                  {selectedCurrency} {formatNumberWithCommas(convertPrice(priceRange[0]))}
                </span>
                <span>
                  {selectedCurrency} {formatNumberWithCommas(convertPrice(priceRange[1]))}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Button */}
      <button
        aria-label="search"
        className="w-full flex gap-4 items-center justify-center mt-5 bg-blue-600 text-white px-3 py-2 rounded-full transition hover:bg-blue-700"
        onClick={() => alert("Searching...")}
      >
        <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600">
          <MagnifyingGlassIcon className="w-4 h-4" />
        </span>
      </button>
    </div>
  );
}
