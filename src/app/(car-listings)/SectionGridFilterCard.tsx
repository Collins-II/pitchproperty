"use client";

import React, { FC, useState } from "react";
import { DEMO_CAR_LISTINGS } from "@/data/listings";
import { CarDataType } from "@/data/types";
import Pagination from "@/shared/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import CarCard from "@/components/CarCard";
import SectionMagazine5 from "../blog/SectionMagazine5";
import { DEMO_POSTS } from "@/data/posts";
import SectionAds from "../blog/SectionAds";
import { ICar } from "@/lib/database/models/car.model";

export interface SectionGridFilterCardProps {
  className?: string;
  data: ICar[];
}

const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 8);
const DEMO_DATA: CarDataType[] = DEMO_CAR_LISTINGS.filter((_, i) => i < 12);
const ITEMS_PER_PAGE = 8;

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data,
}) => {
   const [currentPage, setCurrentPage] = useState(1);
     const [filteredData, setFilteredData] = useState<ICar[]>(data);
      
      const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);
    
      // Get paginated data
      const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      );

  return (
    <div className={`nc-SectionGridFilterCard ${className}`}>
      <Heading2
        heading="Cars in Lusaka"
        subHeading={
          <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
            233 cars
            <span className="mx-2">·</span>
            Aug 12 - 18
          </span>
        }
      />

      {/*<SectionMagazine5 posts={MAGAZINE1_POSTS} />

      <SectionAds />*/}

      <div className="mb-8 lg:mb-11">
        <TabFilters data={data} setFilteredData={setFilteredData}/>
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedData.map((car) => (
          <CarCard key={car._id} data={car} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
      <Pagination
         currentPage={currentPage} 
         totalPages={totalPages} 
         onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
