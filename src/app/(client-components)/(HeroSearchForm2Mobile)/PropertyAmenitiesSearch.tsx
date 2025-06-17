"use client";

import { useState } from "react";

const amenitiesList = [
  "Swimming Pool",
  "Gym",
  "Parking",
  "Pet Friendly",
  "Garden",
  "Smart Home",
  "Security System",
  "Balcony",
];

const PropertyAmenitiesSearch = ({ onSelect }: { onSelect?: (selected: string[]) => void }) => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    let updatedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((item) => item !== amenity)
      : [...selectedAmenities, amenity];

    setSelectedAmenities(updatedAmenities);
    if (onSelect) onSelect(updatedAmenities);
  };

  return (
    <div className=" p-5">
      <div className="grid grid-cols-2 gap-4">
        {amenitiesList.map((amenity) => (
          <label
            key={amenity}
            className="flex items-center space-x-2 cursor-pointer text-sm text-neutral-800 dark:text-neutral-200"
          >
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity)}
              onChange={() => toggleAmenity(amenity)}
              className="w-6 h-6 border border-neutral-400 dark:border-neutral-600 rounded-md"
            />
            <span>{amenity}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PropertyAmenitiesSearch;
