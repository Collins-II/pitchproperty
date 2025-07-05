import React, { FC } from "react";
import SectionGridHasMap from "../../SectionGridHasMap";
import { ICar } from "@/lib/database/models/car.model";
import { getDistrictCars } from "@/app/actions/getLocations";

const ListingCarMapPage = async ({params}: {params: Promise<{ carId: string }>}) => {
  const { carId } = await params;
  
    // Optional: Fetch real data here instead of demo
    const listing = await getDistrictCars(carId as string)
  
    return (
      <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
        <SectionGridHasMap data={listing as unknown as ICar[]} city={carId || ""} />
      </div>
    );
  };

export default ListingCarMapPage;
