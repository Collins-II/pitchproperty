"use client";

import React, { FC } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { useDispatch } from "react-redux";
import { updateListingData } from "@/lib/redux-slice/property-slice";
import { useAppSelector } from "@/lib/redux-slice/hooks";
import { StayDataType } from "@/data/types";

export interface PageAddListing1Props {
}

const PageAddListing1: FC<PageAddListing1Props> = () => {
  const listingData = useAppSelector((state) => state.property.data);
  const dispatch = useDispatch();

  // Handler to dispatch data updates
  const handleDispatch = <T extends keyof StayDataType>(key: T, value: StayDataType[T]) => {
    dispatch(updateListingData({ key, value }));
  };
  

  return (
    <>
      <h2 className="text-2xl font-semibold">Choosing listing categories</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      {/* FORM */}
      <div className="space-y-8">
        {/* Property Type */}
        <FormItem
          label="Choose a property type"
          desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
        >
          <Select
            onChange={(e) => {handleDispatch("listingType", e.target.value)}}
            value={listingData.listingType}
          >
            <option value="Hotel">Hotel</option>
            <option value="Cottage">Cottage</option>
            <option value="Villa">Villa</option>
            <option value="Cabin">Cabin</option>
            <option value="Farm stay">Farm stay</option>
            <option value="Houseboat">Houseboat</option>
            <option value="Lighthouse">Lighthouse</option>
          </Select>
        </FormItem>

        {/* Place Name */}
        <FormItem
          label="Place name"
          desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
        >
          <Input
            placeholder="Place name"
            value={listingData.title}
            onChange={(e) => handleDispatch("title", e.target.value)}
          />
        </FormItem>

        {/* Rental Form */}
        <FormItem
          label="Rental form"
          desc="Entire place: Guests have the whole place to themselves—there's a private entrance and no shared spaces. A bedroom, bathroom, and kitchen are usually included."
        >
          <Select
            onChange={(e) => handleDispatch("rentalForm", e.target.value)}
            value={listingData.rentalForm}
          >
            <option value="Entire place">Entire place</option>
            <option value="Private room">Private room</option>
            <option value="Shared room">Shared room</option>
          </Select>
        </FormItem>
      </div>
    </>
  );
};

export default PageAddListing1;
