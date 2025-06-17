
import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: Route<string> | string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: Route<string> | string;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  listingType?: "car" | "properties";
}

export interface AuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  name: string;
  image: string | StaticImageData;
  bgImage?: string | StaticImageData;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: Route<string>;
  starRating?: number;
}

export interface PostDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  categories: TaxonomyType[];
  title: string;
  featuredImage: StaticImageData | string;
  desc?: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//
export interface StayDataType {
  id?: string | number;
  user: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  desc: string;
  role?: string;
  listingType?: string
  propertySize: number,
  rentalForm: string
  featuredImage: StaticImageData | string;
  premiumSubscription: boolean,
  premiumDates: number[],
  premiumDuration?: number;
  commentCount: number;
  viewCount: number;
  address: {
    country: string;
    state: string;
    state_district: string;
    suburb: string;
    street: string;
  };
  amenities: string[];
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  rules: string[];
  price: string;
  currency: string;
  discount: number;
  category: string;
  listingCategory: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface ExperiencesDataType {
  id: string | number;
  author?: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface CarDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  desc: string;
  address: {
    country: string;
    state: string;
    state_district: string;
    suburb: string;
    street: string;
  };
  carType: string;
  premiumSubscription: boolean,
  premiumDates: [],
  rules?: string[];
  utilities: string[];
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: TaxonomyType;
  seats: number;
  gearshift: string;
  currency: string;
  category: string;
  availableDate?: Date[];
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

// QuickProperty data Types
import { IConversation } from "../lib/database/models/conversation.model";
import { IProperty } from "../lib/database/models/property.model";
import { IMessage } from "../lib/database/models/message.model";
import { IReservation } from "../lib/database/models/reservation.model";
import { IUser } from "../lib/database/models/user.model";

export type SafeListing = Omit<IProperty, "createdAt"> & {
  createdAt: string;
};

export type CreateUserParams = {
  name: string
  email: string
  image: string
  accessToken: string
}

export type SafeReservation = Omit<
  IReservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type FullMessageType = IMessage & {
  sender: IUser;
  seen: IUser[];
};

export type FullConversationType = IConversation & {
  users: IUser[];
  messages: FullMessageType[];
};


export type MessageType = {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
}

export type SafeUser = Omit<
  CreateUserParams,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  favoriteIds: string[]
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params?: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params?: string
  keysToRemove: string[]
}

export interface Business {
  id: number;
  name: string;
  geometry: any; // Replace `any` with the correct type if known
  formatted_address: string;
  rating: number;
  [key: string]: any; // Allow additional properties if necessary
}

export interface RatingItem {
  name: number; // Updated to match the actual type
  icon: React.ReactNode;
}

// types/properties.ts
export interface Measurement {
  area: number; // in square meters
  unit: string; // e.g., "sqft" or "sqm"
  dimensions?: {
    length: number; // in meters
    width: number; // in meters
  };
}

export interface ResidentialProperty {
  id: string;
  type: "Apartment" | "House" | "Villa" | "Townhouse" | "Penthouse";
  bedrooms: number;
  bathrooms: number;
  area: Measurement;
  amenities: string[];
}

export interface CommercialProperty {
  id: string;
  type: "Office Space" | "Retail Space" | "Warehouse" | "Industrial Property";
  floors: number;
  totalArea: Measurement;
  amenities: string[];
  loadingCapacity?: number; // in tons for warehouses
}
