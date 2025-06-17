import {
	BodyType,
	CarStatus,
	Colour,
	CurrencyCode,
	FuelType,
	OdoUnit,
	Transmission,
	ULEZCompliance,
} from "@/lib/database/models/car.model";
import { z } from "zod";

export const ClassifiedFilterSchema = z.object({
	q: z.string().optional(),
  
	// Direct filters
	make: z.string().optional(),
	model: z.string().optional(),
	modelVariant: z.string().optional(),
	listingCategory: z.string().optional(),
	listingType: z.string().optional(),
  
	// Range filters
	minYear: z.string().optional(),
	maxYear: z.string().optional(),
	minPrice: z.string().optional(),
	maxPrice: z.string().optional(),
	minReading: z.string().optional(),
	maxReading: z.string().optional(),
  
	// Enum filters (will be transformed to uppercase in logic)
	currency: z.string().optional(),
	odoUnit: z.string().optional(),
	transmission: z.string().optional(),
	fuelType: z.string().optional(),
	bodyType: z.string().optional(),
	colour: z.string().optional(),
	ulezCompliance: z.string().optional(),
  
	// Numeric filters
	doors: z.string().optional(),
	seats: z.string().optional(),
  
	// Boolean flags (from URL as string)
	isAuction: z.string().optional(),
	isFeatured: z.string().optional(),
	isAds: z.string().optional(),
  });
  

export const updateClassifiedSchema = z.object({
	id: z.string(),
	year: z.string(),
	make: z.string(),
	model: z.string(),
	modelVariant: z.string().optional(),
	description: z.string(),
	vrm: z.string(),
	odoReading: z.number(),
	doors: z.number().min(1).max(8),
	seats: z.number().min(1).max(12),
	ulezCompliance: z.nativeEnum(ULEZCompliance, {
		message: "Invalid ULEZ Compliance",
	}),
	transmission: z.nativeEnum(Transmission, { message: "Invalid Transmission" }),
	colour: z.nativeEnum(Colour, { message: "Invalid Colour" }),
	fuelType: z.nativeEnum(FuelType, { message: "Invalid Fuel Type" }),
	bodyType: z.nativeEnum(BodyType, { message: "Invalid Body Type" }),
	odoUnit: z.nativeEnum(OdoUnit, { message: "Invalid Odo Unit" }),
	status: z.nativeEnum(CarStatus),
	currency: z.nativeEnum(CurrencyCode, { message: "Invalid Currency Code" }),
	price: z.number(),
	featuredImage: z.string(),
    galleryImgs: z.array(z.string()).optional(),
	/*images: z.array(
		z.object({
			id: z.string().optional(),
			src: z.string().url(),
			alt: z.string(),
			uuid: z.string().uuid().optional(),
			base64: z.string().optional(),
			done: z.boolean().optional(),
		}),
	),*/
});

export type UpdateClassifiedType = z.infer<typeof updateClassifiedSchema>;
