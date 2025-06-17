"use client";

import React, { FC } from "react";
import Checkbox from "@/shared/Checkbox";
import { amenities } from "@/data/listings";
import { useAppSelector } from "@/lib/redux-slice/hooks";
import { useDispatch } from "react-redux";
import { updateListingData } from "@/lib/redux-slice/property-slice";

export interface PageAddListing4Props {}

const PageAddListing4: FC<PageAddListing4Props> = () => {
  const listingData = useAppSelector((state) => state.property.data);
  const dispatch = useDispatch();

  const handleDispatch = (name: string, isChecked: boolean) => {
    const updatedAmenities = isChecked
      ? [...listingData.amenities, name] // Add the amenity if checked
      : listingData.amenities.filter((amenity: string) => amenity !== name); // Remove if unchecked

    dispatch(updateListingData({ key: "amenities", value: updatedAmenities }));
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Amenities</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Many customers have searched for accommodation based on amenities
          criteria
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="space-y-8">
        {amenities.map((section, index) => (
          <div key={index}>
            <label className="text-lg font-semibold">{section.category}</label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {section.items.map((item, idx) => (
                <Checkbox
                  key={idx}
                  label={item.label}
                  name={item.name}
                  defaultChecked={listingData.amenities.includes(item.name)}
                  handleDispatch={handleDispatch}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PageAddListing4;
