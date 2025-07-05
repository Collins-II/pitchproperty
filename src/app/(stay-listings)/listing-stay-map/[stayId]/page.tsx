import React from "react";
import SectionGridHasMap from "../../SectionGridHasMap";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import { IProperty } from "@/lib/database/models/property.model";
import { getDistrictProperty } from "@/app/actions/getLocations";

interface ListingStayMapPageProps {
  searchParams: {
    district?: string;
  };
}

const ListingStayMapPage = async ({params}: {params: Promise<{ stayId: string }>}) => {
  const { stayId } = await params;

  // Optional: Fetch real data here instead of demo
  const listing = await getDistrictProperty(stayId as string)

  return (
    <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
      <SectionGridHasMap data={listing as unknown as IProperty[]} city={stayId || ""} />
    </div>
  );
};

export default ListingStayMapPage;
