"use client";

import React from "react";
import { PathName } from "@/routers/types";
import HeroSearchForm2Mobile from "./HeroSearchForm2Mobile";
import HeroSearchForm2RealEstateMobile from "./HeroSearchForm2RealEstateMobile";
import { usePathname } from "next/navigation";
import SearchForm from "./SearchForm";

const PAGES_REAL_ESTATE: PathName[] = [
  "/",
];

const HeroSearchForm2MobileFactory = () => {
  
  return <SearchForm />;
};

export default HeroSearchForm2MobileFactory;
