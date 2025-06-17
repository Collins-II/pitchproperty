"use client";

import React, { FC } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { useDispatch } from "react-redux";
import { updateCarField } from "@/lib/redux-slice/car-slice";
import { useAppSelector } from "@/lib/redux-slice/hooks";
import { ICar, Colour, ULEZCompliance, Transmission, OdoUnit } from "@/lib/database/models/car.model";
import { formatColour, formatUlezCompliance, formatTransmission } from "@/lib/utils";
import { FormField, FormItem as FormFieldItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {InputSelect} from "@/components/ui/input-select";

export interface PageAddListing6Props {}

const PageAddListing6: FC<PageAddListing6Props> = () => {
  const listingData = useAppSelector((state) => state.car?.data);
  const dispatch = useDispatch();

  const handleDispatch = <T extends keyof ICar>(key: T, value: ICar[T]) => {
    dispatch(updateCarField({ key, value }));
  };

  const form = {
    control: {
      /* Add your form control logic here if using React Hook Form or similar */
    },
  };

  return (
    <section className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold">Choose Your Car Category</h2>
        <div className="h-1 w-20 bg-primary-600 mt-2 rounded"></div>
      </div>

      <div className="space-y-8">
         <FormItem
                  label="Colour"
                  desc="Select the brand category that best fits your car."
                >
                  <Select
                    onChange={(e) => handleDispatch("colour", e.target.value as Colour)}
                    value={listingData?.colour}
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3"
                  >
                    {Object.values(Colour).map((value) => (
                      <option key={value} value={value}>
                        {formatColour(value)}
                      </option>
                   ))}
                  </Select>
                </FormItem>
        
                <FormItem
                  label="Vehicle Registration Mark"
                  desc="Select the brand category that best fits your car."
                >
                  <Input
                    placeholder="e.g., 2021 Toyota Camry - Low Mileage"
                    value={listingData?.vrm}
                    onChange={(e) => handleDispatch("vrm", e.target.value)}
                  />
                </FormItem>
                <FormItem
                  label="ULEZ Compliance"
                  desc="Select the brand category that best fits your car."
                >
                  <Select
                    onChange={(e) => handleDispatch("ulezCompliance", e.target.value as ULEZCompliance)}
                    value={listingData?.colour}
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3"
                  >
                    {Object.values(ULEZCompliance).map((value) => (
                      <option key={value} value={value}>
                        {formatUlezCompliance(value)}
                      </option>
                   ))}
                  </Select>
                </FormItem>

                <FormItem
                  label="Transmission"
                  desc="Select the brand category that best fits your car."
                >
                  <Select
                    onChange={(e) => handleDispatch("transmission", e.target.value as Transmission)}
                    value={listingData?.transmission}
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3"
                  >
                    {Object.values(Transmission).map((value) => (
                      <option key={value} value={value}>
                        {formatTransmission(value)}
                      </option>
                   ))}
                  </Select>
                </FormItem>

                <FormItem
  label="Odometer Unit"
  desc="Choose your odometer unit"
>
  <Select
    onChange={(e) => handleDispatch("odoUnit", e.target.value as OdoUnit)}
    value={listingData?.odoUnit || ""}
    className="w-full rounded-xl border border-neutral-300 px-4 py-3"
  >
    {Object.values(OdoUnit).map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ))}
  </Select>
</FormItem>


                <FormItem
  label="Odometer Reading"
  desc="Enter the vehicle's odometer reading"
>
  <Input
    type="number"
    inputMode="numeric"
    placeholder="0"
    value={listingData?.odoReading ?? ""}
    onChange={(e) => handleDispatch("odoReading", Number(e.target.value))}
    className="h-10"
  />
</FormItem>
      </div>
    </section>
  );
};

export default PageAddListing6;
