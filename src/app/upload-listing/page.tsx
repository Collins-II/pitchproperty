"use client";

import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { updateListingData } from "@/lib/redux-slice/property-slice";
import { updateCarField } from "@/lib/redux-slice/car-slice";
import { Tab } from "@headlessui/react";
import { motion } from "motion/react";
import { ICar } from "@/lib/database/models/car.model";
import { StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Label from "@/components/Label";

const listingCategories = ["PROPERTY", "CAR"];

const AddListingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<"PROPERTY" | "CAR">();
  const [listingType, setListingType] = useState<"Sale" | "Rent">("Rent");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDispatch = <T extends keyof StayDataType>(key: T, value: StayDataType[T]) => {
    dispatch(updateListingData({ key, value }));
  };

  const handleCarDispatch = <T extends keyof ICar>(key: T, value: ICar[T]) => {
    dispatch(updateCarField({ key, value }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category as "PROPERTY" | "CAR");
  };

  const handleNext = () => {
    if (!selectedCategory) {
      alert("Please select a category to continue.");
      return;
    }

    if (selectedCategory === "PROPERTY") {
      handleDispatch("listingCategory", listingType);
      router.push("/add-listing/1");
    } else if (selectedCategory === "CAR") {
      console.log("Car listing selectedType", listingType);
      handleCarDispatch("listingCategory", listingType);
      router.push("/add-car-listing/1");
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto py-12 px-6 space-y-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Section: Listing Type */}
      <section>
        <motion.h2 className="text-3xl font-bold">Choose listing category</motion.h2>
        <div className="w-16 border-b border-neutral-300 dark:border-neutral-700 mt-3 mb-6" />

        <Tab.Group>
          <Tab.List className="flex gap-4">
            {["Rent", "Sale"].map((type) => (
              <Tab as={Fragment} key={type}>
                {({ selected }) => (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setListingType(type as "Sale" | "Rent")}
                    className={`px-6 py-3 rounded-xl text-sm font-medium transition-all 
                      ${selected
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                        : "bg-white text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      }`}
                  >
                    {type === "Rent" ? "Rental" : "Sale"}
                  </motion.button>
                )}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>

        <Label className="mt-6 block">Choose what you want to do with your listing</Label>
      </section>

      {/* Section: Listing Category */}
      <section>
        <motion.h2 className="text-3xl font-bold">Choose listing type</motion.h2>
        <div className="w-16 border-b border-neutral-300 dark:border-neutral-700 mt-3 mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {listingCategories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategoryChange(category)}
                className={`w-full text-left px-5 py-4 rounded-2xl border transition-all
                  ${isSelected
                    ? "border-neutral-900 bg-neutral-100 dark:bg-neutral-700 dark:border-white"
                    : "border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 hover:border-neutral-500"
                  }`}
              >
                <div className="text-lg font-semibold">{category}</div>
                <div className="text-sm text-neutral-500 mt-1">
                  {category === "CAR" ? "List your vehicle for rent or sale" : "Create a property listing"}
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Section: Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <ButtonSecondary onClick={() => router.back()}>Cancel</ButtonSecondary>
        <ButtonPrimary onClick={handleNext}>Continue</ButtonPrimary>
      </div>
    </motion.div>
  );
};

export default AddListingPage;
