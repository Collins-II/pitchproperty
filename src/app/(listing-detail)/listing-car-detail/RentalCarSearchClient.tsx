"use client";

import React, { Dispatch, FC, SetStateAction, useState } from "react";
import LocationInput from "../(components)/LocationInput";

export interface RentalPickUpClientProps {
  pickUpLocation: string;
  setPickUpLocation: Dispatch<SetStateAction<string>>
}

const RentalPickUpClient: FC<RentalPickUpClientProps> = ({
  pickUpLocation,
  setPickUpLocation
}) => {
  const [dropOffLocationType, setDropOffLocationType] = useState<
    "same" | "different"
  >("different");


  const isDdropOffdifferent = dropOffLocationType === "different";

  return (
    <form className="w-full relative bg-white dark:bg-neutral-800">
        <LocationInput
          pickUpLocation={pickUpLocation}
          setPickUpLocation={setPickUpLocation}
          placeHolder="Pick up location"
          desc="Pick up location"
          className="flex-1"
        />
    </form>
  );
};

export default RentalPickUpClient;
