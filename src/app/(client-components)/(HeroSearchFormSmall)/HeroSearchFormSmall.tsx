"use client";

import React, { FC, useEffect, useState } from "react";
import { StaySearchFormFields } from "../type";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";
import ExperiencesSearchForm from "./(experiences-search-form)/ExperiencesSearchForm";
import RentalCarSearchForm from "./(car-search-form)/RentalCarSearchForm";
import FlightSearchForm from "./(flight-search-form)/FlightSearchForm";
import EstateSearch from "./EstateSearch";

export type SearchTab = "Search panel";

export interface HeroSearchFormSmallProps {
  className?: string;
  defaultTab?: SearchTab;
  onTabChange?: (tab: SearchTab) => void;
  defaultFieldFocus?: StaySearchFormFields;
}
const TABS: SearchTab[] = ["Search panel"];

const HeroSearchFormSmall: FC<HeroSearchFormSmallProps> = ({
  className = "",
}) => {
  
  return (
    <div
      className={`nc-HeroSearchFormSmall self-center ${className}`}
      data-nc-id="HeroSearchFormSmall"
    >
      <div className="mt-2">
        <EstateSearch  />
      </div>
    </div>
  );
};

export default HeroSearchFormSmall;
