"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/redux-slice/hooks";
import { updateCarField } from "@/lib/redux-slice/car-slice";
import { ICar, CurrencyCode } from "@/lib/database/models/car.model";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NumberInput } from "@/components/ui/number-input";
import { Skeleton } from "@/components/ui/skeleton";
import { generateYears } from "@/lib/utils";

const RichTextEditor = dynamic(
  () =>
    import("@/components/classified/rich-text-editor").then(
      (mod) => mod.RichTextEditor
    ),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-2 flex flex-col">
        <Skeleton className="w-24 h-4 bg-white dark:bg-neutral-800" />
        <Skeleton className="h-[200px] w-full bg-white dark:bg-neutral-800" />
      </div>
    ),
  }
);

const PageAddListing5 = () => {
  const dispatch = useDispatch();
  const listingData = useAppSelector((state) => state.car?.data);

  const handleDispatch = <T extends keyof ICar>(key: T, value: ICar[T]) => {
    dispatch(updateCarField({ key, value }));
  };

  const years = generateYears(1925);

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Benefits for Your Clients</CardTitle>
          <p className="text-sm text-muted-foreground">
            Set customer benefits and additional rules for your listing.
          </p>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted">
          {/* Year */}
          <div className="space-y-1.5">
            <Label htmlFor="year">Year</Label>
            <Select
              onValueChange={(value) => handleDispatch("year", Number(value))}
              value={listingData?.year?.toString() || ""}
            >
              <SelectTrigger className="bg-white dark:bg-neutral-800">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              placeholder="0"
              value={listingData?.price || ""}
              onChange={(e) => handleDispatch("price", parseFloat(e.target.value))}
              className="h-10 bg-white dark:bg-neutral-800"
            />
          </div>

          {/* Currency */}
          <div className="space-y-1.5">
            <Label htmlFor="currency">Currency</Label>
            <Select
              onValueChange={(value) =>
                handleDispatch("currency", value as CurrencyCode)
              }
              value={listingData?.currency || ""}
            >
              <SelectTrigger className="bg-white dark:bg-neutral-800">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CurrencyCode).map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="md:col-span-2 space-y-1.5">
            
            <RichTextEditor
              label="Description"
              config={{
                init: {
                  placeholder: "Enter your vehicle's description",
                },
              }}
              name={listingData?.description as string || ""}
              /*onEditorChange={(value: string) =>
                handleDispatch("description", value)
              }*/
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PageAddListing5;
