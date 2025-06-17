"use client";

import React, { useState } from "react";
import convertNumbThousand from "@/utils/convertNumbThousand";
import LocationInput from "../LocationInput";
import PriceRangeInput from "./PriceRangeInput";
import PropertyTypeSelect from "./PropertyTypeSelect";
import { ClassOfProperties } from "../../type";
import PropertyAmenitiesSearch from "../PropertyAmenitiesSearch";

const RealestateSearchForm = () => {
  const [fieldNameShow, setFieldNameShow] = useState<
    "location" | "propertyType" | "price" | "amenities"
  >("location");

  const [locationInputTo, setLocationInputTo] = useState("");
  const [rangePrices, setRangePrices] = useState([100000, 4000000]);
  const [typeOfProperty, setTypeOfProperty] = useState<ClassOfProperties[]>([
    { name: "Duplex House", description: "Have a place to yourself", checked: true },
    { name: "Ferme House", description: "Own room & shared spaces", checked: true },
    { name: "Chalet House", description: "Private/shared boutique hotel room", checked: true },
    { name: "Maison House", description: "Shared common space", checked: false },
  ]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const renderInputLocation = () => {
    const isActive = fieldNameShow === "location";
    return (
      <div className={`w-full bg-white dark:bg-neutral-800 ${isActive ? "rounded-2xl shadow-lg" : "rounded-xl shadow-sm"}`}>
        {!isActive ? (
          <button className="w-full flex justify-between text-sm font-medium p-4" onClick={() => setFieldNameShow("location")}>
            <span className="text-neutral-400">Where</span>
            <span>{locationInputTo || "Location"}</span>
          </button>
        ) : (
          <LocationInput
            headingText="Where to find?"
            defaultValue={locationInputTo}
            onChange={(value) => {
              setLocationInputTo(value);
              setFieldNameShow("propertyType");
            }}
          />
        )}
      </div>
    );
  };

  const renderInputPropertyType = () => {
    const isActive = fieldNameShow === "propertyType";
    const typeOfPropertyText = typeOfProperty.filter((item) => item.checked).map((item) => item.name).join(", ");

    return (
      <div className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${isActive ? "rounded-2xl shadow-lg" : "rounded-xl shadow-sm"}`}>
        {!isActive ? (
          <button className="w-full flex justify-between text-sm font-medium p-4" onClick={() => setFieldNameShow("propertyType")}>
            <span className="text-neutral-400">Property</span>
            <span className="truncate ml-5">{typeOfPropertyText || "Add property"}</span>
          </button>
        ) : (
          <PropertyTypeSelect defaultValue={typeOfProperty} onChange={setTypeOfProperty} />
        )}
      </div>
    );
  };

  const renderInputPrice = () => {
    const isActive = fieldNameShow === "price";

    return (
      <div className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${isActive ? "rounded-2xl shadow-lg" : "rounded-xl shadow-sm"}`}>
        {!isActive ? (
          <button className="w-full flex justify-between text-sm font-medium p-4" onClick={() => setFieldNameShow("price")}>
            <span className="text-neutral-400">Price</span>
            <span>
              {`$${convertNumbThousand(rangePrices[0] / 1000)}k ~ $${convertNumbThousand(rangePrices[1] / 1000)}k`}
            </span>
          </button>
        ) : (
          <PriceRangeInput defaultValue={rangePrices} onChange={setRangePrices} />
        )}
      </div>
    );
  };

  const renderInputAmenities = () => {
    const isActive = fieldNameShow === "amenities";
    const amenitiesText = selectedAmenities.length > 0 ? selectedAmenities.join(", ") : "Select amenities";

    return (
      <div className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${isActive ? "rounded-2xl shadow-lg" : "rounded-xl shadow-sm"}`}>
        {!isActive ? (
          <button className="w-full flex justify-between text-sm font-medium p-4" onClick={() => setFieldNameShow("amenities")}>
            <span className="text-neutral-400">Amenities</span>
            <span className="truncate ml-5">{amenitiesText}</span>
          </button>
        ) : (
          <PropertyAmenitiesSearch onSelect={setSelectedAmenities} />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="w-full space-y-5">
        {renderInputLocation()}
        {renderInputPropertyType()}
        {renderInputPrice()}
        {renderInputAmenities()}
      </div>
    </div>
  );
};

export default RealestateSearchForm;
