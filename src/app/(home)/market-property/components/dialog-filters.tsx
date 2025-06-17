"use client";

import { routes } from "@/config/routes";
import type { SidebarProps } from "@/config/types";
import { cn, formatPropertyAmenity, formatRentalForm } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { type ChangeEvent, useEffect, useState } from "react";
import { SearchInput } from "@/components/shared/search-input";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Select as OptSelect } from "@/components/ui/select"
import PriceRangeSelector from "./price-range-input";
import { Select } from "@/components/uix/select";
import { RangeFilter } from "@/components/inventory/range-filters";
import { AmenityEnum, AmenityIcons, PropertyTypeEnum, PropertyTypeIcons, RentalForm } from "@/lib/constants";
import { Route } from "next";

interface DialogFiltersProps extends SidebarProps {
	count: number;
}

export const DialogFilters = (props: DialogFiltersProps) => {
	const { minMaxValues, searchParams, count } = props;
	const { _min, _max } = minMaxValues;
	const [open, setIsOpen] = useState(false);
	const router = useRouter();
	const [filterCount, setFilterCount] = useState(0);

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
		const filterCount = Object.entries(
			searchParams as Record<string, string>,
		).filter(([key, value]) => key !== "page" && value).length;
		setFilterCount(filterCount);
	}, [searchParams]);

	const clearFilters = () => {
		const url = new URL("/market-property", process.env.NEXT_PUBLIC_APP_URL);
		router.replace(url.toString() as Route);
		setFilterCount(0);
	};

	const handleChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setQueryStates({ [name]: value || null });
		router.refresh();
	};

	return (
		<Dialog open={open} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon" className="lg:hidden">
					<i className="w-4 h-4">🔍</i>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[425px] h-[90vh] overflow-y-auto rounded-xl bg-white">
				<div className="space-y-6">
					<div className="text-lg font-semibold flex justify-between">
						<DialogTitle>Property Filters</DialogTitle>
					</div>
					<SearchInput
						placeholder="Search by address..."
						className="w-full px-3 py-2 border rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
					/>
					 <div className="flex flex-row items-center justify-between w-full">
								<OptSelect
							  name="propertyType"
							  value={queryStates.propertyType || "any"}
							  onValueChange={(value) =>
								handleChange({
								  target: { name: "propertyType", value },
								} as any) // 👈 use `as any` to fake the event shape
							  }
							>
							  <SelectTrigger className="w-32 rounded-xl border-primary-400">
								<SelectValue placeholder="Home Type" />
							  </SelectTrigger>
							  <SelectContent className="bg-white">
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
					
							<OptSelect
							  name="amenities"
							  value={queryStates.amenities || "any"}
							  onValueChange={(value) =>
								handleChange({
								  target: { name: "amenities", value },
								} as any) // 👈 use `as any` to fake the event shape
							  }
							>
							  <SelectTrigger className="w-32 rounded-xl border-primary-400">
								<SelectValue placeholder="Amenity" />
							  </SelectTrigger>
							  <SelectContent className="bg-white">
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
					
							<div className="flex flex-row items-center justify-between w-full">
							<OptSelect
							  name="bathrooms"
							  value={queryStates.bathrooms || "any"}
							  onValueChange={(value) =>
								handleChange({
								  target: { name: "bathrooms", value },
								} as any) // 👈 use `as any` to fake the event shape
							  }
							>
							  <SelectTrigger className="w-32 rounded-xl border-primary-400">
								<SelectValue placeholder="Rooms" />
							  </SelectTrigger>
							  <SelectContent className="bg-white">
								<SelectItem value="any">Rooms</SelectItem>
								{Array.from({ length: 10 }).map((_, idx) => (
								  <SelectItem key={idx} value={`${idx + 1} `}>
									<div className="flex items-center">
									  <span>{idx + 1}</span>
									</div>
								  </SelectItem>
								))}
							  </SelectContent>
							</OptSelect>
					
							<OptSelect
							  name="bedrooms"
							  value={queryStates.bedrooms || "any"}
							  onValueChange={(value) =>
								handleChange({
								  target: { name: "bedrooms", value },
								} as any) // 👈 use `as any` to fake the event shape
							  }
							>
							  <SelectTrigger className="w-32 rounded-xl border-primary-400">
								<SelectValue placeholder="Bedrooms" />
							  </SelectTrigger>
							  <SelectContent className="bg-white">
								<SelectItem value="any">Bedrooms</SelectItem>
								{Array.from({ length: 10 }).map((_, idx) => (
								  <SelectItem key={idx} value={`${idx + 1} `}>
									<div className="flex items-center">
									  <span>{idx + 1}</span>
									</div>
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
								  currencySymbol="USD" // or "¥", "€", etc.
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
					<div className="flex flex-col space-y-2">
						<Button type="button" onClick={() => setIsOpen(false)} className="w-full">
							Search{count > 0 ? ` (${count})` : null}
						</Button>
						{filterCount > 0 && (
							<Button
								type="button"
								variant="outline"
								onClick={clearFilters}
								className={cn(
									"text-sm py-1",
									!filterCount ? "disabled opacity-50 pointer-events-none cursor-default" : "hover:underline",
								)}
							>
								Clear all {filterCount ? `(${filterCount})` : null}
							</Button>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
