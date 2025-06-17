"use client";

import React, { FC } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { useDispatch } from "react-redux";
import { updateCarField } from "@/lib/redux-slice/car-slice";
import { useAppSelector } from "@/lib/redux-slice/hooks";
import { ICar } from "@/lib/database/models/car.model";

export interface PageAddListing1Props {}

const PageAddListing1: FC<PageAddListing1Props> = () => {
  const listingData = useAppSelector((state) => state.car?.data);
  const dispatch = useDispatch();

  const handleDispatch = <T extends keyof ICar>(key: T, value: ICar[T]) => {
    dispatch(updateCarField({ key, value }));
  };

  return (
    <section className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold">Choose Your Car Category</h2>
        <div className="h-1 w-20 bg-primary-600 mt-2 rounded"></div>
      </div>

      <div className="space-y-8">
        <FormItem
          label="Car Brand"
          desc="Select the brand category that best fits your car."
        >
          <Select
            onChange={(e) => handleDispatch("make", e.target.value)}
            value={listingData?.make}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3"
          >
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes">Mercedes</option>
          </Select>
        </FormItem>

        <FormItem
          label="Car Title"
          desc="Give your listing a catchy title."
        >
          <Input
            placeholder="e.g., 2021 Toyota Camry - Low Mileage"
            value={listingData?.title}
            onChange={(e) => handleDispatch("title", e.target.value)}
          />
        </FormItem>
      </div>
    </section>
  );
};

export default PageAddListing1;