import NcInputNumber from "@/components/NcInputNumber";
import React, { FC } from "react";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { useAppSelector } from "@/lib/redux-slice/hooks";
import { useDispatch } from "react-redux";
import { updateListingData } from "@/lib/redux-slice/property-slice";
import Counter from "@/components/inputs/Counter";
import { StayDataType } from "@/data/types";

export interface PageAddListing3Props {

}

const PageAddListing3: FC<PageAddListing3Props> = () => {
  const listingData = useAppSelector((state) => state.property.data);
  const dispatch = useDispatch();

  // Handler to dispatch data updates
  const handleDispatch = <T extends keyof StayDataType>(key: T, value: StayDataType[T]) => {
    dispatch(updateListingData({ key, value }));
  };
  return (
    <>
      <h2 className="text-2xl font-semibold">Size of your location</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem label="Acreage (m2)">
          <Select
           value={listingData.propertySize}
           onChange={(e) => handleDispatch("propertySize", Number(e.target.value))}
          >
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
          </Select>
        </FormItem>
        <Counter
          onChange={(value) => handleDispatch('maxGuests', value)}
          value={listingData.maxGuests}
          title="MaxGuests"
          subtitle="How many maximum guests do you have?"
        />
        <Counter
          onChange={(value) => handleDispatch('bathrooms', value)}
          value={listingData.bathrooms}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
        <Counter
          onChange={(value) => handleDispatch('bedrooms', value)}
          value={listingData.bedrooms}
          title="Bedrooms"
          subtitle="How many bedrooms do you have?"
        />
        
      </div>
    </>
  );
};

export default PageAddListing3;
