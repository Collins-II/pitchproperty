"use client";

import React, { FC } from "react";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import { useAppSelector } from "@/lib/redux-slice/hooks";
import { useDispatch } from "react-redux";
import { updateCarField } from "@/lib/redux-slice/car-slice";
import { ICar } from "@/lib/database/models/car.model";

export interface PageAddListing3Props {}

const PageAddListing3: FC = () => {
  const carData = useAppSelector((state) => state.car.data);
  const dispatch = useDispatch();

  const handleDispatch = <T extends keyof ICar>(key: T, value: ICar[T]) => {
    dispatch(updateCarField({ key, value }));
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h2 className="text-2xl font-semibold">Car Amenities</h2>
        <div className="w-14 mt-2 border-b border-neutral-200 dark:border-neutral-700"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Label className="mb-2">Seats number</Label>
          <Input
            type="number"
            value={carData.seats}
            onChange={(e) => handleDispatch("seats", Number(e.target.value))}
            placeholder="Enter number"
          />
        </div>

        <div>
          <Label className="mb-2">Doors</Label>
          <Input
            type="number"
            value={carData.doors}
            onChange={(e) => handleDispatch("doors", Number(e.target.value))}
            placeholder="Enter number"
          />
        </div>
      </div>
    </div>
  );
};

export default PageAddListing3;
