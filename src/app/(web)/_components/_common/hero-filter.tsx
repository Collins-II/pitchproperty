"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CAR_BRAND_OPTIONS,
  CAR_CONDITION_OPTIONS,
  CAR_FUEL_TYPE_OPTIONS,
  CAR_MODEL_OPTIONS,
  CAR_PRICE_RANGE_OPTIONS,
  CAR_YEAR_RANGE_OPTIONS,
} from "@/constants/car-options";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const HeroFilter = () => {
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState({});

  const filterOptions = {
    make: CAR_BRAND_OPTIONS,
    model: CAR_MODEL_OPTIONS,
    condition: CAR_CONDITION_OPTIONS,
    year: CAR_YEAR_RANGE_OPTIONS,
    fuelType: CAR_FUEL_TYPE_OPTIONS,
    price: CAR_PRICE_RANGE_OPTIONS.filter((item) => item.value !== "custom"),
  };

  const handleFilterChange = (key:any, value:any) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams(selectedFilters);
    router.push(`/market-cars?${params.toString()}`);
  };

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(filterOptions).map(([key, options]) => (
          <FilterSelect
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            options={options}
            placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)}...`}
            onChange={(value:any) => handleFilterChange(key, value)}
          />
        ))}
      </div>

      <Button
        className="w-full flex justify-between items-center py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg"
        onClick={handleSearch}
      >
        <span className="font-light flex items-center gap-1">
          <b className="font-bold">1000+</b> CAR LISTED
        </span>
        <span className="uppercase font-semibold flex items-center gap-2">
          Search Now <ChevronRight />
        </span>
      </Button>

      <p className="text-gray-500 text-sm text-center">
        Looking for more customization?
        <Link href="/market-cars" className="text-blue-600 underline font-bold ml-2">
          Advanced Search
        </Link>
      </p>
    </div>
  );
};

const FilterSelect = ({ label, options, placeholder, onChange }: any) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option :any) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default HeroFilter;