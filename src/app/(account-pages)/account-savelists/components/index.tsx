"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import CarCard, { CarCardSkeleton } from "@/components/CarCard";
import ExperiencesCard from "@/components/ExperiencesCard";
import StayCard from "@/components/StayCard";
import {
  DEMO_CAR_LISTINGS,
  DEMO_EXPERIENCES_LISTINGS,
  DEMO_STAY_LISTINGS,
} from "@/data/listings";
import React, { Fragment, useState } from "react";
import ButtonSecondary from "@/shared/ButtonSecondary";
import getPremiumListings from "@/app/actions/getListings";
import { useRouter } from "next/navigation";
import { Route } from "next";

interface Props {
  cars: any[]; // ideally type these properly
  properties: any[];
}

const Index: React.FC<Props> = ({ cars, properties }) => {
  const router = useRouter();
  const handleDelete = (id: string) => {
    // Handle delete logic here
    console.log("Delete car with id:", id);
  }
  let [categories] = useState(["Stays","Cars"]);

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Save lists</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <TabGroup>
            <TabList className="flex space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-secondary-900 text-secondary-50 "
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              <TabPanel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {properties ? properties.filter((_, i) => i < 8).map((stay) => (
                    <StayCard 
                      key={stay._id} 
                      data={stay}
                      onEdit={(id) => router.push(`/account-edit/property/${id}` as Route)}
                      onDelete={(id) => handleDelete(id)}
                    />
                  )): (
                    <CarCardSkeleton />
                  )}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </TabPanel>
              <TabPanel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {cars ? cars.filter((_, i) => i < 8).map((car) => (
                    <CarCard
                      data={car}
                      onEdit={(id) => router.push(`/account-edit/car/${id}` as Route)}
                      key={car._id}
                      onDelete={(id) => handleDelete(id)}
                  />
                  
                  )): (
                    <CarCardSkeleton />
                  )}
                  
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    );
  };
  return renderSection1();
};

export default Index;
