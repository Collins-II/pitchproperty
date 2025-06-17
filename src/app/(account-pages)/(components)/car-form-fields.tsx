"use client";

import {
    formatBodyType,
    formatColour,
    formatFuelType,
    formatTransmission,
    formatUlezCompliance,
    generateYears,
} from "@/lib/utils";
import {
    BodyType,
    Colour,
    CurrencyCode,
    FuelType,
    ICar,
    OdoUnit,
    Transmission,
    ULEZCompliance,
} from "@/lib/database/models/car.model";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../components/uix/form";
import { Input } from "../../../components/uix/input";
import { InputSelect } from "../../../components/ui/input-select";
import { NumberInput } from "../../../components/ui/number-input";
import { Select } from "../../../components/uix/select";
import { Skeleton } from "../../../components/uix/skeleton";
import { TaxonomySelects } from "../../../components/classified/taxonomy-selects";

const RichTextEditor = dynamic(
    () => import("../../../components/classified/rich-text-editor").then((mod) => mod.RichTextEditor),
    {
        ssr: false,
        loading: () => (
            <div className="space-y-2 flex flex-col">
                <Skeleton className="w-24 h-4 bg-white" />
                <Skeleton className="h-[200px] w-full bg-white" />
            </div>
        ),
    },
);

const years = generateYears(1925);

interface CarFormFieldsProps {
    car?: ICar;
}

export const CarFormFields = ({ car }: CarFormFieldsProps) => {
    const form = useFormContext();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted">
            {/* Year */}
            <FormField
                control={form.control}
                name="year"
                defaultValue={car?.year}
                render={({ field: { ref, ...rest } }) => (
                    <FormItem>
                        <FormLabel htmlFor="year">Year</FormLabel>
                        <FormControl>
                            <Select
                                selectClassName="text-muted/75 bg-white border-transparent"
                                options={years.map((year) => ({
                                    label: year,
                                    value: year,
                                }))}
                                {...rest}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Category / Tags 
            <TaxonomySelects car={car} /> */}

            {/* Price + Currency */}
            <InputSelect
                options={Object.values(CurrencyCode).map((value) => ({
                    label: value,
                    value,
                }))}
                label="Price"
                inputName="price"
                selectName="currency"
                inputMode="numeric"
                placeholder="0"
                //inputDefaultValue={car?.price?.toString()}
                //selectDefaultValue={car?.currency}
                className="h-10 bg-white placeholder:text-muted/75"
            />

            {/* Odometer */}
            <InputSelect
                options={Object.values(OdoUnit).map((value) => ({
                    label: value,
                    value,
                }))}
                label="Odometer Reading"
                inputName="odoReading"
                selectName="odoUnit"
                inputMode="numeric"
                placeholder="0"
                //inputDefaultValue={car?.odoReading?.toString()}
                //selectDefaultValue={car?.odoUnit}
                className="h-10 bg-white placeholder:text-muted/75"
            />

            {/* Transmission */}
            <FormField
                control={form.control}
                name="transmission"
                defaultValue={car?.transmission}
                render={({ field: { ref, ...rest } }) => (
                    <FormItem>
                        <FormLabel htmlFor="transmission">Transmission</FormLabel>
                        <FormControl>
                            <Select
                                selectClassName="text-muted/75 bg-white border-transparent"
                                options={Object.values(Transmission).map((value) => ({
                                    label: formatTransmission(value),
                                    value,
                                }))}
                                {...rest}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Fuel Type */}
            <FormField
                control={form.control}
                name="fuelType"
                defaultValue={car?.fuelType}
                render={({ field: { ref, ...rest } }) => (
                    <FormItem>
                        <FormLabel htmlFor="fuelType">Fuel Type</FormLabel>
                        <FormControl>
                            <Select
                                selectClassName="text-muted/75 bg-white border-transparent"
                                options={Object.values(FuelType).map((value) => ({
                                    label: formatFuelType(value),
                                    value,
                                }))}
                                {...rest}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Body Type */}
            <FormField
                control={form.control}
                name="bodyType"
                defaultValue={car?.bodyType}
                render={({ field: { ref, ...rest } }) => (
                    <FormItem>
                        <FormLabel htmlFor="bodyType">Body Type</FormLabel>
                        <FormControl>
                            <Select
                                selectClassName="text-muted/75 bg-white border-transparent"
                                options={Object.values(BodyType).map((value) => ({
                                    label: formatBodyType(value),
                                    value,
                                }))}
                                {...rest}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Colour */}
            <FormField
                control={form.control}
                name="colour"
                defaultValue={car?.colour}
                render={({ field: { ref, ...rest } }) => (
                    <FormItem>
                        <FormLabel htmlFor="colour">Colour</FormLabel>
                        <FormControl>
                            <Select
                                selectClassName="text-muted/75 bg-white border-transparent"
                                options={Object.values(Colour).map((value) => ({
                                    label: formatColour(value),
                                    value,
                                }))}
                                {...rest}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* ULEZ Compliance */}
            <FormField
                control={form.control}
                name="ulezCompliance"
                defaultValue={car?.ulezCompliance}
                render={({ field: { ref, ...rest } }) => (
                    <FormItem>
                        <FormLabel htmlFor="ulezCompliance">ULEZ Compliance</FormLabel>
                        <FormControl>
                            <Select
                                selectClassName="text-muted/75 bg-white border-transparent"
                                options={Object.values(ULEZCompliance).map((value) => ({
                                    label: formatUlezCompliance(value),
                                    value,
                                }))}
                                {...rest}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* VRM */}
            <FormField
                control={form.control}
                name="vrm"
                defaultValue={car?.vrm || ""}
                render={({ field: { ref, ...rest } }) => (
                    <FormItem>
                        <FormLabel htmlFor="vrm">Vehicle Registration Mark</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="LA16 PYW"
                                className="uppercase text-muted h-10 mt-1 bg-white placeholder:text-muted/75"
                                {...rest}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Doors */}
            <FormField
                control={form.control}
                name="doors"
                defaultValue={car?.doors}
                render={({ field: { onChange, ...rest } }) => (
                    <FormItem>
                        <FormLabel htmlFor="doors">Doors</FormLabel>
                        <FormControl>
                            <NumberInput
                                max={6}
                                min={1}
                                placeholder="0"
                                style={{  }}
                                className="text-muted placeholder:text-muted/75 bg-white"
                                onValueChange={(values) => {
                                    onChange(values.floatValue);
                                }}
                                {...rest}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Seats */}
            <FormField
                control={form.control}
                name="seats"
                defaultValue={car?.seats}
                render={({ field: { onChange, ...rest } }) => (
                    <FormItem>
                        <FormLabel htmlFor="seats">Seats</FormLabel>
                        <FormControl>
                            <NumberInput
                                max={8}
                                min={1}
                                placeholder="0"
                                style={{  }}
                                className="text-muted placeholder:text-muted/75 bg-white"
                                onValueChange={(values) => {
                                    onChange(values.floatValue);
                                }}
                                {...rest}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Description */}
            <div className="col-span-2">
                <FormField
                    control={form.control}
                    name="description"
                    defaultValue={car?.description || ""}
                    render={({ field: { onChange, ...rest } }) => (
                        <FormItem>
                            <FormControl>
                                <RichTextEditor
                                    label="Description"
                                    config={{
                                        init: { placeholder: "Enter your vehicle's description" },
                                    }}
                                    {...rest}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};
