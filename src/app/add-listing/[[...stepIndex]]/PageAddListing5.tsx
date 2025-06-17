"use client";

import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector } from "@/lib/redux-slice/hooks";
import { useDispatch } from "react-redux";
import { updateListingData } from "@/lib/redux-slice/property-slice";
import { StayDataType } from "@/data/types";

export interface PageAddListing5Props {}

const PageAddListing5: FC<PageAddListing5Props> = () => {
  const { control } = useForm(); // Initialize control with useForm
  const listingData = useAppSelector((state) => state.property.data);
  const dispatch = useDispatch();

  // Handler to dispatch data updates
  const handleDispatch = <T extends keyof StayDataType>(key: T, value: StayDataType[T]) => {
    dispatch(updateListingData({ key, value }));
  };

  const [newRule, setNewRule] = useState("");
  const rules = listingData.rules || []; // Ensure rules is always an array

  const addRule = () => {
    if (newRule.trim()) {
      const updatedRules = [...rules, newRule.trim()];
      handleDispatch("rules", updatedRules); // Dispatch updated rules
      setNewRule("");
    }
  };

  const removeRule = (index: number) => {
    const updatedRules = rules.filter((_rule: any, i: number) => i !== index);
    handleDispatch("rules", updatedRules); // Dispatch updated rules
  };

  const handleRadioSelection = (name: string, value: string) => {
    const updatedRules = rules.filter((rule :any) => !rule.startsWith(name));
    updatedRules.push(`${name}: ${value}`);
    handleDispatch("rules", updatedRules);
  };

  const renderRadio = (name: string, id: string, label: string, value: string) => (
    <div className="flex items-center">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={id}
            type="radio"
            className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
            value={value}
            checked={rules.some((rule : any) => rule === `${name}: ${value}`)}
            onChange={() => handleRadioSelection(name, value)}
          />
        )}
      />
      <label
        htmlFor={id}
        className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        {label}
      </label>
    </div>
  );

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Set house rules for your guests</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Guests must agree to your house rules before they book.
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      {/* FORM */}
      <div className="space-y-8">
        {/* Smoking */}
        <div>
          <label className="text-lg font-semibold">Smoking</label>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("Smoking", "DoNotAllowSmoking", "Do not allow", "Do not allow")}
            {renderRadio("Smoking", "AllowSmoking", "Allow", "Allow")}
            {renderRadio("Smoking", "ChargeSmoking", "Charge", "Charge")}
          </div>
        </div>

        {/* Pet */}
        <div>
          <label className="text-lg font-semibold">Pet</label>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("Pet", "DoNotAllowPet", "Do not allow", "Do not allow")}
            {renderRadio("Pet", "AllowPet", "Allow", "Allow")}
            {renderRadio("Pet", "ChargePet", "Charge", "Charge")}
          </div>
        </div>

        {/* Party Organizing */}
        <div>
          <label className="text-lg font-semibold">Party organizing</label>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("Partyorganizing", "DoNotAllowParty", "Do not allow", "Do not allow")}
            {renderRadio("Partyorganizing", "AllowParty", "Allow", "Allow")}
            {renderRadio("Partyorganizing", "ChargeParty", "Charge", "Charge")}
          </div>
        </div>

        {/* Cooking */}
        <div>
          <label className="text-lg font-semibold">Cooking</label>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("Cooking", "DoNotAllowCooking", "Do not allow", "Do not allow")}
            {renderRadio("Cooking", "AllowCooking", "Allow", "Allow")}
            {renderRadio("Cooking", "ChargeCooking", "Charge", "Charge")}
          </div>
        </div>

        {/* Additional Rules */}
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <span className="block text-lg font-semibold">Additional rules</span>
        <div className="flow-root">
          <div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
            {rules.map((rule: string, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between py-3"
              >
                <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                  {rule}
                </span>
                <i
                  className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"
                  onClick={() => removeRule(index)}
                ></i>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-5">
          <Input
            className="!h-full"
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            placeholder="No smoking..."
          />
          <ButtonPrimary className="flex-shrink-0" type="button" onClick={addRule}>
            <i className="text-xl las la-plus"></i>
            <span className="ml-3">Add tag</span>
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default PageAddListing5;
