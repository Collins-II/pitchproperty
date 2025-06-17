"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import HeroSearchForm, { SearchTab } from "../(client-components)/(HeroSearchForm)/HeroSearchForm";
import carImage from "@/images/hero-right-car.png";
import ToggleListingType from "../(client-components)/ToggleListingType";
import PickupDropoffForm from "../(client-components)/PickUpDropOff";
import HeroFilter from "../(web)/_components/_common/hero-filter";

export interface SectionHeroArchivePageProps {
  className?: string;
  currentPage: "Sale" | "Rent";
  currentTab: SearchTab;
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  className = "",
  currentPage,
  currentTab,
}) => {
  const [listingType, setListingType] = useState<"Sale" | "Rent">(currentPage);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");

  return (
    <div className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}>  
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row lg:items-center">
        {/* Left Content */}
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col space-y-6 lg:space-y-10 pb-20 xl:pr-14 lg:mr-10 xl:mr-0">
          <Card className="!max-w-[49rem] w-full bg-transparent">
            <CardContent className="py-10 px-5 text-center lg:text-left">
              <h2 className="text-[30px] md:text-[46px] font-extrabold leading-10 md:leading-[50px]">
                {listingType === "Sale" ? (
                  <>
                    <span>Drive Home Your Dream Car </span>
                    <span className="text-primary-600">At the Best Price</span>
                  </>
                ) : (
                  <>
                    <span>Rent the Perfect Car </span>
                    <span className="text-primary-600">For Your Journey</span>
                  </>
                )}
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-lg mt-4">
                {listingType === "Sale"
                  ? "Explore a wide selection of new and used cars at unbeatable prices."
                  : "Book a rental car effortlessly with flexible pickup and drop-off locations."}
              </p>

              <div className="mt-6">
                <HeroFilter /> 
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Image */}
        <div className="flex-grow">
          <Image className="w-full" src={carImage} alt="Car Showcase" priority sizes="50vw" />
        </div>
      </div>

      {/* Search & Toggle Section */}
      <div className="hidden lg:block w-full">
        <div className="z-10 lg:-mt-60 xl:-mt-76 w-full space-y-6">
          {/* Toggle between Rent & Sale 
          <ToggleListingType listingType={listingType} onChange={setListingType} /> */}

          {/* Pickup & Dropoff Form when Rent is selected
          {listingType === "Rent" && (
            <PickupDropoffForm
              pickupLocation={pickupLocation}
              dropoffLocation={dropoffLocation}
              onPickupChange={setPickupLocation}
              onDropoffChange={setDropoffLocation}
            />
          )}  */}

          {/* Hero Search Form 
          {listingType === "Rent" && (
          <HeroSearchForm currentPage={listingType} currentTab="Rent" />
          )}

          {listingType === "Sale" && (
          <HeroSearchForm currentPage={listingType} currentTab="Sale" />
          )} */}
          
        </div>
      </div>
    </div>
  );
};

export default SectionHeroArchivePage;
