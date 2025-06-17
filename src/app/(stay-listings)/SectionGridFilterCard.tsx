"use client";

import React, { FC, useState } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import Pagination from "@/shared/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import StayCard2 from "@/components/StayCard2";
import PropertyCardH from "@/components/PropertyCardH";
import { IProperty } from "@/lib/database/models/property.model";

export interface SectionGridFilterCardProps {
  className?: string;
  data: IProperty[];
}
const ITEMS_PER_PAGE = 8;
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data,
}) => {
   const [currentPage, setCurrentPage] = useState(1);
   const [filteredData, setFilteredData] = useState<IProperty[]>(data);
    
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  
    // Get paginated data
    const paginatedData = filteredData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  
  return (
    <div
      className={`nc-SectionGridFilterCard ${className} xl:px-8 pt-4`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 heading="Premium" count={data.length} className="!mb-8"/>

      <div className="mb-8 lg:mb-11">
        <TabFilters data={data} setFilteredData={setFilteredData}/>
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedData.map((stay) => (
          <StayCard2 data={stay} key={stay.id} />
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
