"use client"

import React, { FC, useState } from "react";
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import { StaySearchFormFields } from "../../type";
import PriceRangeInput from "../../(HeroSearchForm2Mobile)/(real-estate-search-form)/PriceRangeInput";
import AmenitiesInput from "../AmenitiesInput";

export interface StaySearchFormProps {
  defaultFieldFocus?: StaySearchFormFields;
}

const StaySearchForm: FC<StaySearchFormProps> = ({ defaultFieldFocus }) => {
   const [selectedAmenities, setSelectedAmenities] = useState([]);
   const [rangePrices, setRangePrices] = useState([100000, 4000000]);

  const renderForm = () => {
    return (
      <form className="relative flex rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
        <AmenitiesInput
          selectedAmenities={selectedAmenities}
          onChange={() => setSelectedAmenities}
          className="flex-[1.5]"
        />

        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <div className="flex-1">
          <PriceRangeInput defaultValue={rangePrices} onChange={setRangePrices} />
        </div>
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;
