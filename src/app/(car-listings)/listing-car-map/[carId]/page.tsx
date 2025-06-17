import React, { FC } from "react";
import SectionGridHasMap from "../../SectionGridHasMap";
import { ICar } from "@/lib/database/models/car.model";
import getListingById from "@/app/actions/getCarListingById";

const ListingCarMapPage = async ({params}: {params: Promise<{ carId: string }>}) => {
  const { carId } = await params;

  const data = await getListingById(carId)

  return (
    <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
      <SectionGridHasMap data={data}/>
    </div>
  );
};

export default ListingCarMapPage;
