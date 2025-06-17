"use client";

import React, { FC, useEffect, useState } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { useAppSelector } from "@/lib/redux-slice/hooks";
import { useDispatch } from "react-redux";
import { updateListingData } from "@/lib/redux-slice/property-slice";
import { StayDataType } from "@/data/types";

export interface PageAddListing8Props {
}

const PageAddListing8: FC<PageAddListing8Props> = () => {
  const listingData = useAppSelector((state) => state.property.data);
  const dispatch = useDispatch();

  const featuredImg = listingData.featuredImage;
  const galleryImgs = listingData.galleryImgs;

  // Handler to dispatch data updates
  const handleDispatch = <T extends keyof StayDataType>(key: T, value: StayDataType[T]) => {
    dispatch(updateListingData({ key, value }));
  };
  const [currency,setCurrency] = useState("ZMW");

  useEffect(() => {
    
      handleDispatch("currency", currency);
  }, [currency]);

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Price your space</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {` The host's revenue is directly dependent on the setting of rates and
            regulations on the number of guests, the number of nights, and the
            cancellation policy.`}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem label="Currency">
          <Select
          value={currency}
          onChange={(e) => { setCurrency(e.target.value)}}
          >
            <option value="ZMW">ZMW</option>
            <option value="USD">USD</option> 
          </Select>
        </FormItem>
        <FormItem label="Base price">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">{currency === "USD" ? "$" : "k" }</span>
            </div>
            <Input className="!pl-8 !pr-10" value={listingData.price} placeholder="0.00" onChange={(e) => handleDispatch("price", e.target.value)}/>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">{currency}</span>
            </div>
          </div>
        </FormItem>
        {/* -----
        <FormItem label="Base price  (Friday-Sunday)">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input className="!pl-8 !pr-10" placeholder="0.00" />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
        </FormItem> */}
        {/* ----- */}
        <FormItem label="Long term price (Monthly discount) ">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
            <Input className="!pl-8 !pr-10" value={listingData.discount} placeholder="0.00" onChange={(e) => handleDispatch("discount", Number(e.target.value))} />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">every month</span>
            </div>
          </div>
        </FormItem>
      </div>
    </>
  );
};

export default PageAddListing8;
