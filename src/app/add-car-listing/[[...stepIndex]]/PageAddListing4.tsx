"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/redux-slice/hooks";
import { updateCarField } from "@/lib/redux-slice/car-slice";
import { BodyType, FuelType, ICar } from "@/lib/database/models/car.model";

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

// ✅ Define CarMake first (no circular reference)
type CarMake = "Toyota" | "Honda" | "Ford" | "BMW" | "Mercedes";

const carMakes: CarMake[] = ["Toyota", "Honda", "Ford", "BMW", "Mercedes"];

const carModels: Record<CarMake, string[]> = {
  Toyota: ["Camry", "Corolla", "RAV4"],
  Honda: ["Civic", "Accord", "CR-V"],
  Ford: ["Focus", "Escape", "Mustang"],
  BMW: ["3 Series", "5 Series", "X5"],
  Mercedes: ["C-Class", "E-Class", "GLA"],
};

const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
const bodyTypes = ["Sedan", "SUV", "Hatchback", "Coupe", "Truck"];

const PageAddListing4 = () => {
  const dispatch = useDispatch();
  const listingData = useAppSelector((state) => state.car?.data);
  const [selectedMake, setSelectedMake] = useState<CarMake | "">(listingData?.make || carMakes[0]);

  const handleDispatch = <T extends keyof ICar>(key: T, value: ICar[T]) => {
    dispatch(updateCarField({ key, value }));
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold">Choose Your Car Details</h2>
        <div className="h-1 w-20 bg-primary mt-2 rounded" />
      </div>

      <Card className="p-4 space-y-6">
        <CardHeader>
          <CardTitle>Car Information</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Car Make */}
          <div className="space-y-2">
            <Label>Car Make</Label>
            <Select
              value={listingData?.make}
              onValueChange={(value) => handleDispatch("make", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent>
                {carMakes.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Car Model */}
          <div className="space-y-2">
            <Label>Car Model</Label>
            <Select
              value={listingData?.carModel}
              onValueChange={(value) => handleDispatch("carModel", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
              {carMakes.includes(selectedMake as CarMake) &&
                carModels[selectedMake as CarMake]?.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fuel Type */}
          <div className="space-y-2">
            <Label>Fuel Type</Label>
            <Select
              value={listingData?.fuelType}
              onValueChange={(value) => handleDispatch("fuelType", value as FuelType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                {fuelTypes.map((fuel) => (
                  <SelectItem key={fuel} value={fuel}>
                    {fuel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Body Type */}
          <div className="space-y-2">
            <Label>Body Type</Label>
            <Select
              value={listingData?.bodyType}
              onValueChange={(value) => handleDispatch("bodyType", value as BodyType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select body type" />
              </SelectTrigger>
              <SelectContent>
                {bodyTypes.map((body) => (
                  <SelectItem key={body} value={body}>
                    {body}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Car Title */}
          <div className="space-y-2 col-span-full">
            <Label>Car Title</Label>
            <Input
              placeholder="e.g., 2021 Toyota Camry - Low Mileage"
              value={listingData?.title}
              onChange={(e) => handleDispatch("title", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PageAddListing4;
