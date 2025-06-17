"use client";

import React, { FC, useState } from "react";
import Textarea from "@/shared/Textarea";
import { useAppSelector } from "@/lib/redux-slice/hooks";
import { useDispatch } from "react-redux";
import { updateListingData } from "@/lib/redux-slice/property-slice";
import { StayDataType } from "@/data/types";

export interface PageAddListing6Props {
}

const PageAddListing6: FC<PageAddListing6Props> = () => {
  const listingData = useAppSelector((state) => state.property.data);
  const dispatch = useDispatch();

  // Handler to dispatch data updates
  const handleDispatch = <T extends keyof StayDataType>(key: T, value: StayDataType[T]) => {
      dispatch(updateListingData({ key, value }));
  };

  const [value,setValue] = useState("");

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">
          Your place description for client
        </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Mention the best features of your accommodation, any special amenities
          like fast Wi-Fi or parking, as well as things you like about the
          neighborhood.
        </span>
      </div>

      <Textarea value={listingData.desc} placeholder="..." rows={14} onChange={(e) => { handleDispatch("desc", e.target.value); setValue(e.target.value)}}/>
    </>
  );
};

export default PageAddListing6;
