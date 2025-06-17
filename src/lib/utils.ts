import { type ClassValue, clsx } from 'clsx'

import { twMerge } from 'tailwind-merge'
//import qs from 'query-string'

//import { UrlQueryParams, RemoveUrlQueryParams } from '@/app/types/index'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { ClassifiedFilterSchema } from "@/app/schemas/classified.schema";
import type { AwaitedPageProps } from "@/config/types";
import {
	BodyType,
	CarStatus,
	Colour,
	type CurrencyCode,

	FuelType,
	OdoUnit,
	Transmission,
	ULEZCompliance,
} from "@/lib/database/models/car.model";

import { format, parse } from "date-fns";
import prettyBytes from "pretty-bytes";

/**
 * Combines multiple class names and merges Tailwind CSS classes efficiently
 * @param inputs - Class names to combine and merge
 * @returns Merged class names string
 */

interface FormatPriceArgs {
	price: number | null;
	currency: CurrencyCode | null;
}

export function formatUlezCompliance(ulezCompliance: ULEZCompliance) {
	return ulezCompliance === ULEZCompliance.EXEMPT ? "Exempt" : "Non-Exempt";
}

export function formatBodyType(bodyType: BodyType) {
	switch (bodyType) {
		case BodyType.CONVERTIBLE:
			return "Convertible";
		case BodyType.COUPE:
			return "Coupe";
		case BodyType.HATCHBACK:
			return "Hatchback";
		case BodyType.SUV:
			return "SUV";
		case BodyType.WAGON:
			return "Wagon";
		case BodyType.SEDAN:
			return "Sedan";
		default:
			return "Unknown";
	}
}

/*export function formatPrice({ price, currency }: FormatPriceArgs) {
	if (!price) return "0";

	const formatter = new Intl.NumberFormat("en-GB", {
		style: "currency",
		currencyDisplay: "narrowSymbol",
		...(currency && { currency }),
		maximumFractionDigits: 0,
	}); 

	return formatter.format(price / 100);


} */

 export function serializeDoc(doc: any) {
    if (!doc) return null;
    const serialized = JSON.parse(JSON.stringify(doc));
  
    return serialized;
  }
  

export function formatNumber(
	num: number | null,
	options?: Intl.NumberFormatOptions,
) {
	if (!num) return "0";

	return new Intl.NumberFormat("en-GB", options).format(num);
}

export function formatOdometerUnit(unit: OdoUnit) {
	return unit === OdoUnit.MILES ? "mi" : "km";
}

export function formatTransmission(transmission: Transmission) {
	return transmission === Transmission.AUTOMATIC ? "Automatic" : "Manual";
}

export function formatFuelType(fuelType: FuelType) {
	switch (fuelType) {
		case FuelType.PETROL:
			return "Petrol";
		case FuelType.DIESEL:
			return "Diesel";
		case FuelType.ELECTRIC:
			return "Electric";
		case FuelType.HYBRID:
			return "Hybrid";
		default:
			return "Unknown";
	}
}

export function formatColour(colour: Colour) {
	switch (colour) {
		case Colour.BLACK:
			return "Black";
		case Colour.WHITE:
			return "White";
		case Colour.SILVER:
			return "Silver";
		case Colour.RED:
			return "Red";
		case Colour.BLUE:
			return "Blue";
		case Colour.BROWN:
			return "Brown";
		case Colour.GOLD:
			return "Gold";
		case Colour.GREEN:
			return "Green";
		case Colour.GREY:
			return "Grey";
		case Colour.ORANGE:
			return "Orange";
		case Colour.PINK:
			return "Pink";
		case Colour.PURPLE:
			return "Purple";
		case Colour.YELLOW:
			return "Yellow";
		default:
			return "Unknown";
	}
};

// Common car makes organized in a key-value object
export const VehicleMakes = {
  TOYOTA: "Toyota",
  HONDA: "Honda",
  FORD: "Ford",
  CHEVROLET: "Chevrolet",
  BMW: "BMW",
  MERCEDES: "Mercedes",
  AUDI: "Audi",
  VOLKSWAGEN: "Volkswagen",
  NISSAN: "Nissan",
  HYUNDAI: "Hyundai",
  KIA: "Kia",
  MAZDA: "Mazda",
  JEEP: "Jeep",
  SUBARU: "Subaru",
  TESLA: "Tesla",
  LEXUS: "Lexus",
  DODGE: "Dodge",
  RAM: "RAM",
  GMC: "GMC",
  CADILLAC: "Cadillac",
  INFINITI: "Infiniti",
  ACURA: "Acura",
  VOLVO: "Volvo",
  MINI: "Mini",
  LAND_ROVER: "Land Rover",
  JAGUAR: "Jaguar",
  MITSUBISHI: "Mitsubishi",
  FIAT: "Fiat",
  PEUGEOT: "Peugeot",
  RENAULT: "Renault",
  SKODA: "Skoda",
  SEAT: "SEAT",
  SUZUKI: "Suzuki",
  CITROEN: "Citroën",
  CHRYSLER: "Chrysler",
  LINCOLN: "Lincoln",
  BUICK: "Buick",
  GENESIS: "Genesis",
} as const;

export type VehicleMake = keyof typeof VehicleMakes;

export const VehicleModels: Record<keyof typeof VehicleMakes, string[]> = {
  TOYOTA: ["Corolla", "Camry", "RAV4", "Highlander", "Yaris"],
  HONDA: ["Civic", "Accord", "CR-V", "Pilot", "Fit"],
  FORD: ["F-150", "Escape", "Explorer", "Fusion", "Mustang"],
  CHEVROLET: ["Silverado", "Equinox", "Malibu", "Tahoe", "Camaro"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series"],
  MERCEDES: ["C-Class", "E-Class", "GLC", "GLE", "S-Class"],
  AUDI: ["A3", "A4", "A6", "Q5", "Q7"],
  VOLKSWAGEN: ["Golf", "Jetta", "Passat", "Tiguan", "Atlas"],
  NISSAN: ["Altima", "Sentra", "Rogue", "Murano", "Pathfinder"],
  HYUNDAI: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona"],
  KIA: ["Forte", "Optima", "Sportage", "Sorento", "Telluride"],
  MAZDA: ["Mazda3", "Mazda6", "CX-5", "CX-30", "MX-5 Miata"],
  JEEP: ["Wrangler", "Cherokee", "Grand Cherokee", "Compass", "Renegade"],
  SUBARU: ["Impreza", "Legacy", "Outback", "Forester", "Crosstrek"],
  TESLA: ["Model S", "Model 3", "Model X", "Model Y"],
  LEXUS: ["IS", "ES", "RX", "NX", "GX"],
  DODGE: ["Charger", "Challenger", "Durango", "Journey", "Grand Caravan"],
  RAM: ["1500", "2500", "3500"],
  GMC: ["Sierra", "Terrain", "Acadia", "Yukon"],
  CADILLAC: ["CT4", "CT5", "XT4", "XT5", "Escalade"],
  INFINITI: ["Q50", "Q60", "QX50", "QX60", "QX80"],
  ACURA: ["ILX", "TLX", "RDX", "MDX"],
  VOLVO: ["S60", "S90", "XC40", "XC60", "XC90"],
  MINI: ["Cooper", "Clubman", "Countryman"],
  LAND_ROVER: ["Range Rover", "Discovery", "Defender", "Evoque"],
  JAGUAR: ["XE", "XF", "F-PACE", "E-PACE", "F-TYPE"],
  MITSUBISHI: ["Mirage", "Lancer", "Outlander", "Eclipse Cross", "ASX"],
  FIAT: ["500", "500X", "Panda", "Tipo"],
  PEUGEOT: ["208", "308", "3008", "5008"],
  RENAULT: ["Clio", "Megane", "Captur", "Kadjar"],
  SKODA: ["Fabia", "Octavia", "Superb", "Karoq", "Kodiaq"],
  SEAT: ["Ibiza", "Leon", "Arona", "Ateca"],
  SUZUKI: ["Swift", "Baleno", "Vitara", "Ignis"],
  CITROEN: ["C3", "C4", "C5 Aircross"],
  CHRYSLER: ["300", "Pacifica", "Voyager"],
  LINCOLN: ["Corsair", "Nautilus", "Aviator", "Navigator"],
  BUICK: ["Encore", "Envision", "Enclave"],
  GENESIS: ["G70", "G80", "G90", "GV70", "GV80"],
};

export const buildPropertySearchQuery = (searchParams: Record<string, any>) => {
  const query: Record<string, any> = {};

  if (searchParams.q) {
    query.$or = [
      { title: new RegExp(searchParams.q, "i") },
      { description: new RegExp(searchParams.q, "i") },
      { "address.country": new RegExp(searchParams.q, "i") },
      { "address.state": new RegExp(searchParams.q, "i") },
      { "address.suburb": new RegExp(searchParams.q, "i") },
      { amenities: { $in: [new RegExp(searchParams.q, "i")] } },
    ];
  }

  if (searchParams.country) {
    query["address.country"] = new RegExp(searchParams.country, "i");
  }

  if (searchParams.state) {
    query["address.state"] = new RegExp(searchParams.state, "i");
  }

  if (searchParams.suburb) {
    query["address.suburb"] = new RegExp(searchParams.suburb, "i");
  }

  if (searchParams.street) {
    query["address.street"] = new RegExp(searchParams.street, "i");
  }

  if (searchParams.minSize || searchParams.maxSize) {
    query.propertySize = {};
    if (searchParams.minSize) {
      query.propertySize.$gte = parseFloat(searchParams.minSize);
    }
    if (searchParams.maxSize) {
      query.propertySize.$lte = parseFloat(searchParams.maxSize);
    }
  }

  if (searchParams.bedrooms) {
    query.bedrooms = parseInt(searchParams.bedrooms);
  }

  if (searchParams.bathrooms) {
    query.bathrooms = parseInt(searchParams.bathrooms);
  }

  if (searchParams.maxGuests) {
    query.maxGuests = parseInt(searchParams.maxGuests);
  }

  if (searchParams.minPrice || searchParams.maxPrice) {
    query.price = {};
    if (searchParams.minPrice) {
      query.price.$gte = parseFloat(searchParams.minPrice);
    }
    if (searchParams.maxPrice) {
      query.price.$lte = parseFloat(searchParams.maxPrice);
    }
  }

  if (searchParams.currency) {
    query.currency = searchParams.currency;
  }

  if (searchParams.rentalForm) {
    query.rentalForm = new RegExp(searchParams.rentalForm, "i");
  }

  if (searchParams.listingCategory) {
    query.listingCategory = searchParams.listingCategory;
  }

  if (searchParams.listingType) {
    query.listingType = searchParams.listingType;
  }

  if (searchParams.propertyType) {
    query.propertyType = searchParams.propertyType;
  }

  if (searchParams.amenities) {
    const amenitiesArray = Array.isArray(searchParams.amenities)
      ? searchParams.amenities
      : [searchParams.amenities];
    query.amenities = { $all: amenitiesArray.map((a: string) => new RegExp(a, "i")) };
  }

  if (searchParams.isPremium === "true") {
    query.premiumSubscription = true;
  }

  if (searchParams.isAuction === "true") {
    query.isAuction = true;
  }

  if (searchParams.isFeatured === "true") {
    query.isFeatured = true;
  }

  if (searchParams.isAds === "true") {
    query.isAds = true;
  }

  return query;
};

export const handleError = (error: unknown) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}

export const generateTimeOptions = () => {
	const times = [];
	const startHour = 8;
	const endHour = 18;

	for (let hour = startHour; hour < endHour; hour++) {
		const date = new Date();
		date.setDate(date.getDate() + 1);
		date.setHours(hour);
		date.setMinutes(0);

		const formattedTime = date.toLocaleTimeString("en-GB", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});

		times.push({
			label: formattedTime,
			value: formattedTime,
		});
	}
	return times;
};

export const generateDateOptions = () => {
	const today = new Date();
	const dates = [];
	for (let i = 0; i < 30; i++) {
		const date = new Date(today);
		date.setDate(today.getDate() + i);
		dates.push({
			label: format(date, "dd MMM yyyy"),
			value: format(date, "dd MMM yyyy"),
		});
	}
	return dates;
};

export const formatDate = (date: string, time: string) => {
	const parsedDate = parse(date, "dd MMM yyyy", new Date());
	const parsedTime = parse(time, "hh:mm aa", new Date());

	parsedDate.setHours(parsedTime.getHours(), parsedTime.getMinutes(), 0, 0);

	return parsedDate;
};

export function calculatePercentageChange(current: number, previous: number) {
	if (previous === 0) return current > 0 ? 100 : current < 0 ? -100 : 0;

	return ((current - previous) / Math.abs(previous)) * 100;
}

export const convertToMb = (bytes: number) => {
	return prettyBytes(bytes, {
		bits: false,
		maximumFractionDigits: 1,
		space: false,
	});
};

export function generateYears(minYear: number, maxYear?: number): string[] {
	const currentYear = maxYear ? maxYear : new Date().getFullYear();
	const years: string[] = [];

	for (let year = currentYear; year >= minYear; year--) {
		years.push(`${year}`);
	}

	return years;
}

export function formatCarStatus(status: CarStatus) {
	switch (status) {
		case CarStatus.LIVE:
			return "Live";
		case CarStatus.SOLD:
			return "Sold";
		case CarStatus.DRAFT:
			return "Draft";
	}
}

export const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");

export function formatClassifiedStatus(status: CarStatus) {
	switch (status) {
		case CarStatus.LIVE:
			return "Live";
		case CarStatus.SOLD:
			return "Sold";
		case CarStatus.DRAFT:
			return "Draft";
	}
}

export function formatCustomerStatus(status: CustomerStatus) {
	switch (status) {
		case CustomerStatus.COLD:
			return "Cold";
		case CustomerStatus.CONTACTED:
			return "Contacted";
		case CustomerStatus.INTERESTED:
			return "Interested";
		case CustomerStatus.PURCHASED:
			return "Purchased";
		case CustomerStatus.SUBSCRIBER:
			return "Subscriber";
	}
}

/*import confetti from 'canvas-confetti';

export const runFireworks = (): void => {
  const duration: number = 5 * 1000;
  const animationEnd: number = Date.now() + duration;
  const defaults: Record<string, number> = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval((): void => {
    const timeLeft: number = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount: number = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}; */

export const formatDateTimeObj = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const formattedDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions)

  const formattedDate: string = new Date(dateString).toLocaleString('en-US', dateOptions)

  const formattedTime: string = new Date(dateString).toLocaleString('en-US', timeOptions)

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

export const formatPrice = (price: string) => {
  const amount = parseFloat(price)
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

  return formattedPrice
}

export function formatPriceValue(value: number | null, isMin: boolean) {
  if (value === null || value === 0)
    return isMin ? "Any Min Price" : "Any Max Price";
  if (value >= 1000) {
    const kValue = value / 1000;
    return isMin ? `$${kValue}k+` : `<$${kValue}k`;
  }
  return isMin ? `$${value}+` : `<$${value}`;
}

export function formatEnumString(str: string) {
  return str.replace(/([A-Z])/g, " $1").trim();
}

export function cleanParams(params: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(params).filter(
      (
        [_, value] // eslint-disable-line @typescript-eslint/no-unused-vars
      ) =>
        value !== undefined &&
        value !== "any" &&
        value !== "" &&
        (Array.isArray(value) ? value.some((v) => v !== null) : value !== null)
    )
  );
}

export const formatRentalForm = (form: RentalForm) => {
  switch (form) {
    case RentalForm.RENT:
      return "Rent";
    case RentalForm.SALE:
      return "Sale";
    case RentalForm.LEASE:
      return "Lease";
    default:
      return form;
  }
};

export const formatPropertyAmenity = (amenity: PropertyAmenity) => {
  switch (amenity) {
    case PropertyAmenity.POOL:
      return "Swimming Pool";
    case PropertyAmenity.GYM:
      return "Gym";
    case PropertyAmenity.PARKING:
      return "Parking";
    case PropertyAmenity.GARDEN:
      return "Garden";
    case PropertyAmenity.FURNISHED:
      return "Furnished";
    case PropertyAmenity.SECURITY:
      return "Security";
    case PropertyAmenity.WIFI:
      return "Wi-Fi";
    case PropertyAmenity.ELEVATOR:
      return "Elevator";
    default:
      return amenity;
  }
};

/*export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params ?? ''); // Use nullish coalescing operator to handle potential 'undefined'


  currentUrl[key] = value!; // Use non-null assertion here

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params ?? ''); // Use nullish coalescing operator to handle potential 'undefined'


  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}
*/


/*import csc from 'countries-states-cities';

export const getProvinces = () => {
  const zambia = csc.getAllCountries().find(country => country.name === 'Zambia');
  if (zambia) {
    return csc.getStatesOfCountry(zambia.id);
  }
  return [];
};

export const getDistricts = (provinceId: number) => {
  return csc.getCitiesOfState(provinceId);
};

export const getTowns = (districtId: number) => {
  return csc.getCitiesOfState(districtId); // Adjust this method based on the actual API if needed
}; */

import { signInWithPhoneNumber, RecaptchaVerifier, Auth } from "firebase/auth";
import { auth } from "../lib/firebase";
import { CustomerStatus } from './database/models/customer.model';
import { PropertyAmenity, RentalForm } from './constants';

// utils/measurements.ts
export const validUnits = ["sqm", "sqft"] as const;
export type Unit = (typeof validUnits)[number];

const conversionRates: Record<Unit, number> = {
  sqm: 1,
  sqft: 10.764,
};

export const convertAreaUnit = (area: number, fromUnit: string, toUnit: string): number => {
  if (!validUnits.includes(fromUnit as Unit) || !validUnits.includes(toUnit as Unit)) {
    throw new Error(`Invalid unit. Supported units are: ${validUnits.join(", ")}`);
  }
  return (area * conversionRates[toUnit as Unit]) / conversionRates[fromUnit as Unit];
};

export const calculateArea = (length: number, width: number): number => {
  return length * width;
};

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " Bytes"; // Less than 1 KB, show in Bytes
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return sizeInKB.toFixed(digits || 1) + " KB"; // Less than 1 MB, show in KB
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(digits || 1) + " MB"; // Less than 1 GB, show in MB
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(digits || 1) + " GB"; // 1 GB or more, show in GB
  }
};

export const calculatePercentage = (sizeInBytes: number) => {
  const totalSizeInBytes = 2 * 1024 * 1024 * 1024; // 2GB in bytes
  const percentage = (sizeInBytes / totalSizeInBytes) * 100;
  return Number(percentage.toFixed(2));
};

export const getFileType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) return { type: "other", extension: "" };

  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "csv",
    "rtf",
    "ods",
    "ppt",
    "odp",
    "md",
    "html",
    "htm",
    "epub",
    "pages",
    "fig",
    "psd",
    "ai",
    "indd",
    "xd",
    "sketch",
    "afdesign",
    "afphoto",
    "afphoto",
  ];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExtensions = ["mp4", "avi", "mov", "mkv", "webm"];
  const audioExtensions = ["mp3", "wav", "ogg", "flac"];

  if (documentExtensions.includes(extension))
    return { type: "document", extension };
  if (imageExtensions.includes(extension)) return { type: "image", extension };
  if (videoExtensions.includes(extension)) return { type: "video", extension };
  if (audioExtensions.includes(extension)) return { type: "audio", extension };

  return { type: "other", extension };
};

export const formatDateTime = (isoString: string | null | undefined) => {
  if (!isoString) return "—";

  const date = new Date(isoString);

  // Get hours and adjust for 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the time and date parts
  const time = `${hours}:${minutes.toString().padStart(2, "0")}${period}`;
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  return `${time}, ${day} ${month}`;
};


// APPWRITE URL UTILS
// Construct appwrite file URL - https://appwrite.io/docs/apis/rest#images
export const constructFileUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

export const constructDownloadUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

// DASHBOARD UTILS
export const getUsageSummary = (totalSpace: any) => {
  return [
    {
      title: "Documents",
      size: totalSpace.document.size,
      latestDate: totalSpace.document.latestDate,
      icon: "/assets/icons/file-document-light.svg",
      url: "/documents",
    },
    {
      title: "Images",
      size: totalSpace.image.size,
      latestDate: totalSpace.image.latestDate,
      icon: "/assets/icons/file-image-light.svg",
      url: "/images",
    },
    {
      title: "Media",
      size: totalSpace.video.size + totalSpace.audio.size,
      latestDate:
        totalSpace.video.latestDate > totalSpace.audio.latestDate
          ? totalSpace.video.latestDate
          : totalSpace.audio.latestDate,
      icon: "/assets/icons/file-video-light.svg",
      url: "/media",
    },
    {
      title: "Others",
      size: totalSpace.other.size,
      latestDate: totalSpace.other.latestDate,
      icon: "/assets/icons/file-other-light.svg",
      url: "/others",
    },
  ];
};

export const getFileTypesParams = (type: string) => {
  switch (type) {
    case "documents":
      return ["document"];
    case "images":
      return ["image"];
    case "media":
      return ["video", "audio"];
    case "others":
      return ["other"];
    default:
      return ["document"];
  }
};
