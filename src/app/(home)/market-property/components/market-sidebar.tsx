"use client";

import { routes } from "@/config/routes";
import type { SidebarProps } from "@/config/types";
import { cn } from "@/lib/utils";
import { formatRentalForm } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { ChangeEvent, useEffect, useState } from "react";
import { SearchInput } from "@/components/shared/search-input";
import { Select } from "@/components/uix/select";
import { RangeFilter } from "@/components/inventory/range-filters";
import { AmenityIcons, PropertyTypeIcons, RentalForm } from "@/lib/constants";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Select as OptSelect } from "@/components/ui/select";
import PriceRangeSelector from "./price-range-input";

export const PropertySidebar = ({ minMaxValues, searchParams }: SidebarProps) => {
  const router = useRouter();
  const [filterCount, setFilterCount] = useState(0);
  const { _min, _max } = minMaxValues;

  const [queryStates, setQueryStates] = useQueryStates(
    {
      address: parseAsString.withDefault(""),
      propertyType: parseAsString.withDefault(""),
      rentalForm: parseAsString.withDefault(""),
      minPrice: parseAsString.withDefault(""),
      maxPrice: parseAsString.withDefault(""),
      minSize: parseAsString.withDefault(""),
      maxSize: parseAsString.withDefault(""),
      bathrooms: parseAsString.withDefault(""),
      bedrooms: parseAsString.withDefault(""),
      rooms: parseAsString.withDefault(""),
      amenities: parseAsString.withDefault(""),
      isPremium: parseAsString.withDefault(""),
    },
    {
      shallow: false,
    },
  );

  useEffect(() => {
    const count = Object.entries(searchParams as Record<string, string>).filter(
      ([key, value]) => key !== "page" && value
    ).length;
    setFilterCount(count);
  }, [searchParams]);

  const clearFilters = () => {
    const url = new URL("/market-property", process.env.NEXT_PUBLIC_APP_URL);
    window.location.replace(url.toString());
    setFilterCount(0);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQueryStates({ [name]: value || null });
    router.refresh();
  };

  return (
    <aside className="bg-white dark:bg-neutral-800 border-r border-muted dark:border-neutral-800 lg:w-[21.25rem] w-full h-screen lg:block hidden py-4 overflow-y-auto">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={clearFilters}
          disabled={!filterCount}
          className={cn(
            "text-sm text-gray-500 py-1",
            !filterCount ? "opacity-50 cursor-default" : "hover:underline"
          )}
        >
          Clear all {filterCount ? `(${filterCount})` : null}
        </button>
      </div>

      <div className="p-4">
        <SearchInput
          placeholder="Search by address..."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="p-4 grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <OptSelect name="propertyType" value={queryStates.propertyType || "any"} onValueChange={(value) => handleChange({ target: { name: "propertyType", value } } as any)}>
            <SelectTrigger className="rounded-xl border">
              <SelectValue placeholder="Home Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Property Type</SelectItem>
              {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
                <SelectItem key={type} value={type}>
                  <div className="flex items-center">
                    <Icon className="w-4 h-4 mr-2" />
                    <span>{type}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </OptSelect>

          <OptSelect name="amenities" value={queryStates.amenities || "any"} onValueChange={(value) => handleChange({ target: { name: "amenities", value } } as any)}>
            <SelectTrigger className="rounded-xl border">
              <SelectValue placeholder="Amenity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Amenity</SelectItem>
              {Object.entries(AmenityIcons).map(([type, Icon]) => (
                <SelectItem key={type} value={type}>
                  <div className="flex items-center">
                    <Icon className="w-4 h-4 mr-2" />
                    <span>{type}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </OptSelect>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <OptSelect name="bathrooms" value={queryStates.bathrooms || "any"} onValueChange={(value) => handleChange({ target: { name: "bathrooms", value } } as any)}>
            <SelectTrigger className="rounded-xl border">
              <SelectValue placeholder="Bathrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Bathrooms</SelectItem>
              {Array.from({ length: 10 }).map((_, idx) => (
                <SelectItem key={idx} value={`${idx + 1}`}>
                  {idx + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </OptSelect>

          <OptSelect name="bedrooms" value={queryStates.bedrooms || "any"} onValueChange={(value) => handleChange({ target: { name: "bedrooms", value } } as any)}>
            <SelectTrigger className="rounded-xl border">
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Bedrooms</SelectItem>
              {Array.from({ length: 10 }).map((_, idx) => (
                <SelectItem key={idx} value={`${idx + 1}`}>
                  {idx + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </OptSelect>
        </div>

        <PriceRangeSelector
          priceRange={[Number(queryStates.minPrice), Number(queryStates.maxPrice)]}
          min={_min.price}
          max={_max.price}
          onChange={(values) => {
            setQueryStates({
              minPrice: values[0].toString(),
              maxPrice: values[1].toString(),
            });
          }}
          currencySymbol="USD"
          label="Price Range"
        />

        <Select
          label="Rental Form"
          name="rentalForm"
          value={queryStates.rentalForm}
          onChange={handleChange}
          options={Object.values(RentalForm).map((value) => ({
            label: formatRentalForm(value),
            value,
          }))}
        />

        <RangeFilter
          label="Property Size (sqft)"
          minName="minSize"
          maxName="maxSize"
          defaultMin={_min.size || 0}
          defaultMax={_max.size || 10000}
          handleChange={handleChange}
          searchParams={searchParams}
          increment={50}
        />

        <Select
          label="Premium Status"
          name="isPremium"
          value={queryStates.isPremium || ""}
          onChange={handleChange}
          options={[
            { label: "Any", value: "" },
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
        />
      </div>
    </aside>
  );
};
