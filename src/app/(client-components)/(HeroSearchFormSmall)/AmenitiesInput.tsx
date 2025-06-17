"use client";

import React, { useState } from "react";
import { FC, useEffect, useRef } from "react";
import useOutsideAlerter from "@/hooks/useOutsideAlerter";
import { CheckIcon } from "@heroicons/react/24/outline";

export interface AmenitiesInputProps {
  selectedAmenities: string[];
  onChange: (amenities: string[]) => void;
  placeholder?: string;
  className?: string;
}

const amenitiesList = [
  "Wi-Fi",
  "Swimming Pool",
  "Parking",
  "Gym",
  "Air Conditioning",
  "Pet-Friendly",
  "Kitchen",
  "Washer",
  "TV",
  "Balcony",
];

const AmenitiesInput: FC<AmenitiesInputProps> = ({
  selectedAmenities,
  onChange,
  placeholder = "Select Amenities",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const [showPopover, setShowPopover] = useState(false);
  const [search, setSearch] = useState("");

  useOutsideAlerter(containerRef, () => setShowPopover(false));

  const toggleAmenity = (amenity: string) => {
    const newSelection = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((item) => item !== amenity)
      : [...selectedAmenities, amenity];

    onChange(newSelection);
  };

  const filteredAmenities = amenitiesList.filter((amenity) =>
    amenity.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* 📌 Input Box */}
      <div
        onClick={() => setShowPopover(true)}
        className={`flex items-center space-x-3 cursor-pointer border p-2 rounded-lg ${
          showPopover ? "border-blue-500 shadow-md" : "border-gray-300"
        } bg-white dark:bg-neutral-800`}
      >
        <span className="text-gray-700 dark:text-gray-200 truncate">
          {selectedAmenities.length > 0
            ? selectedAmenities.join(", ")
            : placeholder}
        </span>
      </div>

      {/* 📌 Dropdown */}
      {showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[250px] bg-white dark:bg-neutral-800 top-full mt-2 py-3 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {/* 🔍 Search Bar */}
          <div className="px-3">
            <input
              type="text"
              placeholder="Search amenities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border rounded-lg dark:bg-neutral-700"
            />
          </div>

          {/* 📌 Amenities List */}
          <div className="grid grid-cols-2 gap-2 p-3">
            {filteredAmenities.map((amenity) => (
              <button
                key={amenity}
                onClick={() => toggleAmenity(amenity)}
                className={`flex items-center space-x-2 p-2 rounded-lg border ${
                  selectedAmenities.includes(amenity)
                    ? "border-blue-500 bg-blue-100 dark:bg-blue-700"
                    : "border-gray-300"
                } hover:bg-gray-100 dark:hover:bg-neutral-700 transition`}
              >
                {selectedAmenities.includes(amenity) && (
                  <CheckIcon className="h-5 w-5 text-blue-500" />
                )}
                <span className="text-gray-800 dark:text-gray-200">
                  {amenity}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AmenitiesInput;
