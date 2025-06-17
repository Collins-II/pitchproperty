"use client";

import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/CurrencyStore/store";
import { useConvertPrice } from "@/utils/CurrencyStore/currency-utils";

interface PriceRangeSelectorProps {
  priceRange: [number, number];
  onChange: (range: [number, number]) => void;
  label?: string;
  min?: number;
  max?: number;
  currencySymbol?: string;
}

const PriceRangeSelector: React.FC<PriceRangeSelectorProps> = ({
  priceRange,
  onChange,
  label = "Price per day",
  min = 0,
  max = 2000,
  currencySymbol = "$",
}) => {
  const selectedCurrency = useSelector(
    (state: RootState) => state.currency.selectedCurrency
  );
  const convertPrice = useConvertPrice();

  const [localMin, setLocalMin] = useState(priceRange[0]);
  const [localMax, setLocalMax] = useState(priceRange[1]);

  // Keep internal state in sync with props
  useEffect(() => {
    setLocalMin(priceRange[0]);
    setLocalMax(priceRange[1]);
  }, [priceRange]);

  const handleSliderChange = (values: [number, number]) => {
    setLocalMin(values[0]);
    setLocalMax(values[1]);
    onChange(values);
  };

  const handleInputChange = (type: "min" | "max", value: string) => {
    const num = parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
    if (type === "min") {
      const safeMin = Math.min(num, localMax);
      setLocalMin(safeMin);
      onChange([safeMin, localMax]);
    } else {
      const safeMax = Math.max(num, localMin);
      setLocalMax(safeMax);
      onChange([localMin, safeMax]);
    }
  };

  return (
    <div className="relative flex flex-col px-1 py-6 space-y-4">
      <div className="space-y-5">
        <span className="font-medium text-neutral-800 dark:text-neutral-200">
          {label} ({selectedCurrency})
        </span>
        <Slider
          range
          className="text-red-400"
          min={min}
          max={max}
          value={[localMin, localMax]}
          allowCross={false}
          onChange={(values) => handleSliderChange(values as [number, number])}
        />
      </div>

      <div className="flex justify-between space-x-5">
        <div>
          <label
            htmlFor="minPrice"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Min price
          </label>
          <div className="mt-1 relative rounded-md">
            <input
              type="number"
              name="minPrice"
              id="minPrice"
              min={min}
              max={localMax}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900 dark:bg-neutral-800 dark:text-white"
              value={localMin}
              onChange={(e) => handleInputChange("min", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Max price
          </label>
          <div className="mt-1 relative rounded-md">
            <input
              type="number"
              name="maxPrice"
              id="maxPrice"
              min={localMin}
              max={max}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900 dark:bg-neutral-800 dark:text-white"
              value={localMax}
              onChange={(e) => handleInputChange("max", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSelector;
