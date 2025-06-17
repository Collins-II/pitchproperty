"use client";

import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Popover, PopoverButton, PopoverPanel, Transition, TransitionChild } from "@headlessui/react";
import { motion, } from "motion/react";
import NcInputNumber from "@/components/NcInputNumber";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonThird from "@/shared/ButtonThird";
import ButtonClose from "@/shared/ButtonClose";
import Checkbox from "@/shared/Checkbox";
import convertNumbThousand from "@/utils/convertNumbThousand";
import Slider from "rc-slider";


import {
  CAR_BRAND_OPTIONS,
  CAR_CONDITION_OPTIONS,
  CAR_FUEL_TYPE_OPTIONS,
  CAR_MODEL_OPTIONS,
  CAR_PRICE_RANGE_OPTIONS,
  CAR_YEAR_RANGE_OPTIONS,
} from "@/constants/car-options";
import { ICar } from "@/lib/database/models/car.model";

// DEMO DATA
const typeOfCar = [
  { name: "Small", description: "$68" },
  { name: "Medium", description: "$128" },
  { name: "Large", description: "$268" },
  { name: "SUV", description: "$268" },
  { name: "Van", description: "$268" },
  { name: "Luxury", description: "$268" },
];

const carSpecifications = [
  { label: "With air conditioning" },
  { label: "Automatic transmission" },
  { label: "Manual transmission" },
  { label: "2 doors" },
  { label: "4+ doors" },
];

//
const mileage = [{ label: "Unlimited" }, { label: "Limited" }];
const supplier = [
  { label: "Alamo", defaultChecked: true },
  { label: "Avis", defaultChecked: true },
  { label: "Budget" },
  { label: "Dollar" },
];
const insurance = [
  { label: "No insurance", defaultChecked: true },
  { label: "Zero excess " },
  { label: "Inclusive" },
];

interface TabProps {
  data: ICar[];
  setFilteredData: Dispatch<SetStateAction<ICar[]>>;
}

const TabFilters = ({ data, setFilteredData }: TabProps) => {
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false);
  const [rangePrices, setRangePrices] = useState([0, 1000]);
  const [isOnSale, setIsOnSale] = useState(true);
  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);
  //
  const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false);
  const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true);

  const renderXClear = () => {
    return (
      <span className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const renderCheckIcon = () => {
    return (
      <span className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };
  

  const renderTabsTypeOfCars = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <PopoverButton
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Brand</span>
              <i className="las la-angle-down ml-2"></i>
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {CAR_BRAND_OPTIONS.map((item) => (
                      <div key={item.value} className="">
                        <Checkbox
                          name={item.label}
                          label={item.label}
                          //subLabel={item.value}
                          handleDispatch={(name, isChecked) => {
                            console.log(`Checkbox ${name} is now ${isChecked ? "checked" : "unchecked"}`);
                            // You can add state update or dispatch logic here
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsModelsOfCars = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <PopoverButton
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Model</span>
              <i className="las la-angle-down ml-2"></i>
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {CAR_MODEL_OPTIONS.map((item) => (
                      <div key={item.value} className="">
                        <Checkbox
                          name={item.label}
                          label={item.label}
                          //subLabel={item.value}
                          handleDispatch={(name, isChecked) => {
                            console.log(`Checkbox ${name} is now ${isChecked ? "checked" : "unchecked"}`);
                            // You can add state update or dispatch logic here
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsYearsOfCars = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <PopoverButton
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Year</span>
              <i className="las la-angle-down ml-2"></i>
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {CAR_YEAR_RANGE_OPTIONS.map((item) => (
                      <div key={item.value} className="">
                        <Checkbox
                          name={item.label}
                          label={item.label}
                          //subLabel={item.value}
                          handleDispatch={(name, isChecked) => {
                            console.log(`Checkbox ${name} is now ${isChecked ? "checked" : "unchecked"}`);
                            // You can add state update or dispatch logic here
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsConditionOfCars = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <PopoverButton
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Condition</span>
              <i className="las la-angle-down ml-2"></i>
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {CAR_CONDITION_OPTIONS.map((item) => (
                      <div key={item.value} className="">
                        <Checkbox
                          name={item.label}
                          label={item.label}
                          //subLabel={item.value}
                          handleDispatch={(name, isChecked) => {
                            console.log(`Checkbox ${name} is now ${isChecked ? "checked" : "unchecked"}`);
                            // You can add state update or dispatch logic here
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsFuelTypeOfCars = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <PopoverButton
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Fuel type</span>
              <i className="las la-angle-down ml-2"></i>
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {CAR_FUEL_TYPE_OPTIONS.map((item) => (
                      <div key={item.value} className="">
                        <Checkbox
                          name={item.label}
                          label={item.label}
                          //subLabel={item.value}
                          handleDispatch={(name, isChecked) => {
                            console.log(`Checkbox ${name} is now ${isChecked ? "checked" : "unchecked"}`);
                            // You can add state update or dispatch logic here
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsPriceRage = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <PopoverButton
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none `}
            >
              <span>
                {`$${convertNumbThousand(
                  rangePrices[0]
                )} - $${convertNumbThousand(rangePrices[1])}`}{" "}
              </span>
              {renderXClear()}
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <span className="font-medium">Price per day</span>
                      <Slider
                        range
                        className="text-red-400"
                        min={0}
                        max={2000}
                        defaultValue={[rangePrices[0], rangePrices[1]]}
                        allowCross={false}
                        onChange={(e) => setRangePrices(e as number[])}
                      />
                    </div>

                    <div className="flex justify-between space-x-5">
                      <div>
                        <label
                          htmlFor="minPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Min price
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              $
                            </span>
                          </div>
                          <input
                            type="text"
                            name="minPrice"
                            disabled
                            id="minPrice"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                            value={rangePrices[0]}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="maxPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Max price
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              $
                            </span>
                          </div>
                          <input
                            type="text"
                            disabled
                            name="maxPrice"
                            id="maxPrice"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                            value={rangePrices[1]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabOnSale = () => {
    return (
      <div
        className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer transition-all ${
          isOnSale
            ? "border-primary-500 bg-primary-50 text-primary-700"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
        onClick={() => setIsOnSale(!isOnSale)}
      >
        <span>{isOnSale? "On sale" : "On rent"} </span>
        {renderCheckIcon()}
      </div>
    );
  };

  const renderTabsGuestsAndBags = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <PopoverButton
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Guests & Bags</span>
              <i className="las la-angle-down ml-2"></i>
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900   border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    <NcInputNumber label="Passengers" max={40} />
                    <NcInputNumber label="Bags" max={40} />
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderMoreFilterItem = (
    data: {
      label: string;
      description?: string;
      defaultChecked?: boolean;
    }[]
  ) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid grid-cols-2 gap-y-7 gap-x-4 sm:gap-8">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={item.label}
              name={item.label}
              subLabel={item.description}
              label={item.label}
              defaultChecked={!!item.defaultChecked}
              handleDispatch={(name, isChecked) => {
                console.log(`Checkbox ${name} is now ${isChecked ? "checked" : "unchecked"}`);
                // You can add state update or dispatch logic here
              }}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={item.label}
              name={item.label}
              subLabel={item.description}
              label={item.label}
              defaultChecked={!!item.defaultChecked}
              handleDispatch={(name, isChecked) => {
                console.log(`Checkbox ${name} is now ${isChecked ? "checked" : "unchecked"}`);
                // You can add state update or dispatch logic here
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  // Morefilter for mobile mode
  const renderTabMobileFilter = () => {
    return (
      <div>
        <div
          className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none cursor-pointer`}
          onClick={openModalMoreFilterMobile}
        >
          <span>
            <span className="hidden sm:inline">Car</span> filters (3)
          </span>
          {renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilterMobile} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilterMobile}
          >
            <div className="min-h-screen text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <motion.div className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </TransitionChild>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block py-8 px-2 h-screen w-full max-w-4xl">
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Experiences filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilterMobile} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-4 sm:px-6 divide-y divide-neutral-200 dark:divide-neutral-800">
                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Type of car</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(CAR_BRAND_OPTIONS)}
                        </div>
                      </div>

                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          Car Model
                        </h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(CAR_MODEL_OPTIONS)}
                        </div>
                      </div>

                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          Car Condition
                        </h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(CAR_CONDITION_OPTIONS)}
                        </div>
                      </div>

                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          Fuel Type
                        </h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(CAR_FUEL_TYPE_OPTIONS)}
                        </div>
                      </div>

                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          Model Year
                        </h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(CAR_YEAR_RANGE_OPTIONS)}
                        </div>
                      </div>

                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          Car specifications
                        </h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(carSpecifications)}
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Range Prices</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-8">
                            <div className="space-y-5">
                              <Slider
                                range
                                className="text-red-400"
                                min={0}
                                max={2000}
                                defaultValue={[0, 1000]}
                                allowCross={false}
                                onChange={(e) => setRangePrices(e as number[])}
                              />
                            </div>

                            <div className="flex justify-between space-x-5">
                              <div>
                                <label
                                  htmlFor="minPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Min price
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    name="minPrice"
                                    disabled
                                    id="minPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={rangePrices[0]}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="maxPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Max price
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    disabled
                                    name="maxPrice"
                                    id="maxPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={rangePrices[1]}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          Passengers & Bags
                        </h3>
                        <div className="mt-6 relative flex-col px-5 py-6 space-y-5">
                          <NcInputNumber label="Passengers" max={40} />
                          <NcInputNumber label="Bags" max={40} />
                        </div>
                      </div>

                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Mileage</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(mileage)}
                        </div>
                      </div>

                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Supplier</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(supplier)}
                        </div>
                      </div>

                      {/* ------ */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Insurance</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(insurance)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={closeModalMoreFilterMobile}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={closeModalMoreFilterMobile}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
                </div>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  //
  const renderTabMoreFilter = () => {
    return (
      <div>
        <div
          className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none cursor-pointer`}
          onClick={openModalMoreFilter}
        >
          <span>More filters (3)</span>
          {renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilter}
          >
            <div className="min-h-screen text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <motion.div className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </TransitionChild>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block py-8 px-2 h-screen w-full max-w-4xl">
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      More filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-4 sm:px-6 divide-y divide-neutral-200 dark:divide-neutral-800">
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          Car specifications
                        </h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(carSpecifications)}
                        </div>
                      </div>
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Mileage</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(mileage)}
                        </div>
                      </div>
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Supplier</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(supplier)}
                        </div>
                      </div>
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Insurance</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(insurance)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={closeModalMoreFilter}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={closeModalMoreFilter}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
                </div>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return (
    <div className="flex lg:space-x-4">
      <div className="hidden lg:flex space-x-4">
        {renderTabsTypeOfCars()}
        {renderTabsPriceRage()}
        {renderTabsModelsOfCars()}
        {renderTabsYearsOfCars()}
        {renderTabsConditionOfCars()}
        {renderTabsFuelTypeOfCars()}
        {/*renderTabsGuestsAndBags()*/}
        {renderTabMoreFilter()}
      </div>
      <div className="flex lg:hidden space-x-4">
        {renderTabMobileFilter()}
        {renderTabOnSale()}
      </div>
    </div>
  );
};

export default TabFilters;
