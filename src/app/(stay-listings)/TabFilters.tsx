"use client";

import React, { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogTitle, Popover, Transition, TransitionChild } from "@headlessui/react";
import { motion } from "motion/react";
import NcInputNumber from "@/components/NcInputNumber";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonThird from "@/shared/ButtonThird";
import ButtonClose from "@/shared/ButtonClose";
import Checkbox from "@/shared/Checkbox";
import Slider from "rc-slider";
import convertNumbThousand from "@/utils/convertNumbThousand";
import { filterProperties2 } from "@/utils/filterProperties";
import { StayDataType } from "@/data/types";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/hooks/filters";
import { setAmenities, setBathrooms, setBedrooms, setPriceRange, setPropertyType } from "@/utils/CurrencyStore/filter-slice";
import { useConvertPrice } from "@/utils/CurrencyStore/currency-utils";
import { RootState } from "@/utils/CurrencyStore/store";
import { IProperty } from "@/lib/database/models/property.model";

// DEMO DATA
const typeOfPaces = [
  {
    name: "Entire place",
    description: "Have a place to yourself",
  },
  {
    name: "Private room",
    description: "Have your own room and share some common spaces",
  },
  {
    name: "Hotel room",
    description:
      "Have a private or shared room in a boutique hotel, hostel, and more",
  },
  {
    name: "Shared room",
    description: "Stay in a shared space, like a common room",
  },
];

const moreFilter1 = [
  { name: "Kitchen", defaultChecked: true },
  { name: "Air conditioning", defaultChecked: true },
  { name: "Heating" },
  { name: "Dryer" },
  { name: "Washer" },
  { name: "Wifi" },
  { name: "Indoor fireplace" },
  { name: "Breakfast" },
  { name: "Hair dryer" },
  { name: " Dedicated workspace" },
];

const moreFilter2 = [
  { name: " Free parking on premise" },
  { name: "Hot tub" },
  { name: "Gym" },
  { name: " Pool" },
  { name: " EV charger" },
];

const moreFilter3 = [
  { name: " House" },
  { name: "Bed and breakfast" },
  { name: "Apartment", defaultChecked: true },
  { name: " Boutique hotel" },
  { name: " Bungalow" },
  { name: " Chalet", defaultChecked: true },
  { name: " Condominium", defaultChecked: true },
  { name: " Cottage" },
  { name: " Guest suite" },
  { name: " Guesthouse" },
];

const moreFilter4 = [{ name: " Pets allowed" }, { name: "Smoking allowed" }];

interface TabProps {
  data: IProperty[];
  setFilteredData: Dispatch<SetStateAction<IProperty[]>>;
}

interface FilterOptions {
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
}

// Filter function
const filterProperties = (properties: IProperty[], filters: FilterOptions): IProperty[] => {
  return properties.filter((property) => {
    console.log("Checking property:", property);

    // Ensure property price is a valid number
    const price = Number(property.price);
    if (isNaN(price)) {
      console.log("Invalid price:", property.price);
      return false;
    }

    const withinPriceRange =
      (filters.minPrice === undefined || price >= filters.minPrice) &&
      (filters.maxPrice === undefined || price <= filters.maxPrice);

    // Ensure property type comparison is valid
    const propertyType = property.listingType?.trim().toLowerCase() || "";
    const filterPropertyType = filters.propertyType?.trim().toLowerCase() || "";
    const matchesType = !filterPropertyType || propertyType === filterPropertyType;

     // Normalize amenities comparison
    const propertyAmenities = property.amenities?.map((a) => a.trim().toLowerCase()) || [];
    const filterAmenities = filters.amenities?.map((a) => a.trim().toLowerCase()) || [];
    const hasAmenities =
      filterAmenities.length === 0 || filterAmenities.every((amenity) => propertyAmenities.includes(amenity));

    // Ensure bedrooms and bathrooms are numbers and match filters
    const propertyBedrooms = property.bedrooms ?? 0; 
    const propertyBathrooms = property.bathrooms ?? 0;

    const matchesBedrooms = filters.bedrooms === undefined || propertyBedrooms >= filters.bedrooms;
    const matchesBathrooms = filters.bathrooms === undefined || propertyBathrooms >= filters.bathrooms;


    const isMatch = withinPriceRange && matchesType && hasAmenities && matchesBedrooms && matchesBathrooms;

    if (!isMatch) {
      console.log("Filtered out:", property);
    }

    return isMatch;
  });
};



const TabFilters = ({data, setFilteredData}: TabProps) => {
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);
  const convertPrice = useConvertPrice();
  const dispatch = useAppDispatch();
  const priceRange = useAppSelector((state) => state.filters.priceRange) || [0, 1000];
  const {bedrooms, bathrooms , propertyType, amenities} = useAppSelector((state) => state.filters) as any

  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false);

  // FILTERS STATE
  const [filters, setFilters] = useState<FilterOptions>({
    propertyType: propertyType,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    amenities: amenities,
  });

// ✅ Prevent Infinite Loop: Only update filters if values change
useEffect(() => {
  setFilters((prev) => {
    const updatedFilters = {
      ...prev,
      bedrooms,
      bathrooms,
      propertyType,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      amenities: amenities
    };

    // 🔹 Only update state if values are different to prevent infinite loop
    if (JSON.stringify(prev) !== JSON.stringify(updatedFilters)) {
      return updatedFilters;
    }

    return prev;
  });
}, [bedrooms, bathrooms, propertyType, priceRange, amenities]);
  
  useEffect(() => {
    console.log("Applying filters:", filters);
    const filteredProperties = filterProperties(data, filters);
    setFilteredData(filteredProperties);
    console.log("Filtered Properties: ", filteredProperties);
  }, [filters, data]);


  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);
  //
  const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false);
  const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true);

  const renderXClear = () => {
    return (
      <span className="w-4 h-4 rounded-md bg-slate-900 text-white flex items-center justify-center ml-3 cursor-pointer">
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

  const renderTabsTypeOfPlace = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${
                open ? "!border-slate-900 " : ""
              }`}
            >
              <span>Type of place</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {moreFilter3.map((item) => (
                      <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          subLabel={item.name}
                          defaultChecked={propertyType === item.name}
                          handleDispatch={() => dispatch(setPropertyType(item.name))}
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
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsRoomAndBeds = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${
                open ? "!border-slate-900 " : ""
              }`}
            >
              <span>Rooms of Beds</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900   border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                  <NcInputNumber label="Bedrooms" max={10} defaultValue={bedrooms} onChange={(value) => dispatch(setBedrooms(value))} />
                  <NcInputNumber label="Bathrooms" max={10} defaultValue={bathrooms} onChange={(value) => dispatch(setBathrooms(value))} />
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
              </Popover.Panel>
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
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-md border border-slate-900 bg-neutral-200 text-slate-700 focus:outline-none `}
            >
              <span>
                {`$${convertNumbThousand(
                  priceRange[0]
                )} - $${convertNumbThousand(priceRange[1])}`}{" "}
              </span>
              {renderXClear()}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <span className="font-medium">Price per day</span>
                      <Slider
                        range
                        className="text-red-400"
                        min={0}
                        max={2000}
                        defaultValue={[priceRange[0], priceRange[1]]}
                        allowCross={false}
                        onChange={(values) => dispatch(setPriceRange(values as [number, number]))}
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
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-md text-neutral-900"
                            value={priceRange[0]}
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
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-md text-neutral-900"
                            value={priceRange[1]}
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
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderMoreFilterItem = (data: { name: string }[]) => {
    const dispatch = useAppDispatch();
    const selectedAmenities = useAppSelector((state) => state.filters.amenities || []);
  
    const handleCheckboxChange = (name: string) => {
      // Toggle selection
      const updatedAmenities = selectedAmenities.includes(name)
        ? selectedAmenities.filter((amenity) => amenity !== name) // Remove if already selected
        : [...selectedAmenities, name]; // Add if not selected
  
      dispatch(setAmenities(updatedAmenities)); // Dispatch updated state
    };
  
    const list1 = data.slice(0, Math.ceil(data.length / 2));
    const list2 = data.slice(Math.ceil(data.length / 2));
  
    return (
      <div className="grid grid-cols-2 gap-8">
        {[list1, list2].map((list, index) => (
          <div key={index} className="flex flex-col space-y-5">
            {list.map((item) => (
              <Checkbox
                key={item.name}
                name={item.name}
                label={item.name}
                defaultChecked={selectedAmenities.includes(item.name)} // Sync with Redux state
                handleDispatch={() => handleCheckboxChange(item.name)} // Dispatch updates
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderTabMoreFilter = () => {
    return (
      <div>
        <div
          className={`flex items-center justify-center px-4 py-2 text-sm rounded-md border border-slate-900 bg-neutral-200 text-slate-700 focus:outline-none cursor-pointer`}
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
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      More filters
                    </DialogTitle>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Amenities</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(moreFilter1)}
                        </div>
                      </div>
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Facilities</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(moreFilter2)}
                        </div>
                      </div>
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Property type</h3>
                        <div className="mt-6 relative ">
                        {moreFilter3.map((item) => (
                        <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          subLabel={item.name}
                          defaultChecked={propertyType === item.name}
                          handleDispatch={() => dispatch(setPropertyType(item.name))}
                        />
                      </div>
                    ))}
                        </div>
                      </div>
                      <div className="py-7">
                        <h3 className="text-xl font-medium">House rules</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(moreFilter4)}
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

  const renderTabMoreFilterMobile = () => {
    return (
      <div>
        <div
          className={`flex lg:hidden items-center justify-center px-4 py-2 text-sm rounded-md border border-slate-900 bg-neutral-200 text-slate-700 focus:outline-none cursor-pointer`}
          onClick={openModalMoreFilterMobile}
        >
          <span>More filters (3)</span>
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
                      More filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilterMobile} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-4 sm:px-6 divide-y divide-neutral-200 dark:divide-neutral-800">
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Type of place</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(typeOfPaces)}
                        </div>
                      </div>

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
                                onChange={(values) => dispatch(setPriceRange(values as [number, number]))} // ✅ Fix: Cast to tuple
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
                                      {selectedCurrency}
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    name="minPrice"
                                    disabled
                                    id="minPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-md text-neutral-900"
                                    value={priceRange[0]}
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
                                      {selectedCurrency}
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    disabled
                                    name="maxPrice"
                                    id="maxPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-md text-neutral-900"
                                    value={priceRange[1]}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Rooms and beds</h3>
                        <div className="mt-6 relative flex flex-col space-y-5">
                          <NcInputNumber label="Beds" max={10} />
                          <NcInputNumber label="Bedrooms" max={10} />
                          <NcInputNumber label="Bathrooms" max={10} />
                        </div>
                      </div>

                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Amenities</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(moreFilter1)}
                        </div>
                      </div>

                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Facilities</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(moreFilter2)}
                        </div>
                      </div>

                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Property type</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(moreFilter3)}
                        </div>
                      </div>

                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">House rules</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(moreFilter4)}
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

  return (
    <div className="flex lg:space-x-4">
      <div className="hidden lg:flex space-x-4">
        {renderTabsTypeOfPlace()}
        {renderTabsPriceRage()}
        {renderTabsRoomAndBeds()}
        {renderTabMoreFilter()}
      </div>
      {renderTabMoreFilterMobile()}
    </div>
  );
};

export default TabFilters;
