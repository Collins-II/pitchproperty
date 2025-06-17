import mongoose, { Schema, model, Types, HydratedDocument, models } from "mongoose";

export enum CarStatus {
  LIVE = "LIVE",
  DRAFT = "DRAFT",
  SOLD = "SOLD",
  PURCHASED = "PURCHASED",
  SUBSCRIBER = "SUBSCRIBER",
}

export enum CurrencyCode {
  GBP = "GBP",
  EUR = "EUR",
  USD = "USD",
}

export enum OdoUnit {
  MILES = "MILES",
  KILOMETERS = "KILOMETERS",
}

export enum BodyType {
  SEDAN = "SEDAN",
  HATCHBACK = "HATCHBACK",
  SUV = "SUV",
  COUPE = "COUPE",
  CONVERTIBLE = "CONVERTIBLE",
  WAGON = "WAGON",
}

export enum FuelType {
  PETROL = "PETROL",
  DIESEL = "DIESEL",
  ELECTRIC = "ELECTRIC",
  HYBRID = "HYBRID",
}

export enum Colour {
  BLACK = "BLACK",
  BLUE = "BLUE",
  BROWN = "BROWN",
  GOLD = "GOLD",
  GREEN = "GREEN",
  GREY = "GREY",
  ORANGE = "ORANGE",
  PINK = "PINK",
  PURPLE = "PURPLE",
  RED = "RED",
  SILVER = "SILVER",
  WHITE = "WHITE",
  YELLOW = "YELLOW",
}

export enum ULEZCompliance {
  EXEMPT = "EXEMPT",
  NON_EXEMPT = "NON_EXEMPT",
}

export enum Transmission {
  MANUAL = "MANUAL",
  AUTOMATIC = "AUTOMATIC",
}

export interface ICar {
  _id: string;
  author: Types.ObjectId;
  views: number;
  slug?: string;
  vrm?: string;
  title?: string;
  description?: string;
  year: number;
  odoReading: number;
  doors: number;
  seats: number;
  price: number;
  make: string;
  carModel: string;
  modelVariant?: string;
  ulezCompliance: ULEZCompliance;
  transmission: Transmission;
  colour: Colour;
  fuelType: FuelType;
  bodyType: BodyType;
  address: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  mapAddress: {
    latitude: number;
    longitude: number;
  };
  odoUnit: OdoUnit;
  currency: CurrencyCode;
  status: CarStatus;
  featuredImage: string;
  galleryImgs: string[];
  images?: Types.ObjectId[]; // Will be populated
  customers: Types.ObjectId[];
  isAuction?: boolean;
  isFeatured?: boolean;
  createdAt: Date;
  updatedAt: Date;
  isSubscription: {
    isState: boolean;
    date: Date[];
  };
  premiumDuration?: number;
  listingCategory: string;
  listingType: string;
  saleOff?: string
  isAds?: string
  reviewCount?: number;
  reviewStart?: number;
}

export type CarDocument = HydratedDocument<ICar>;

// Extended type when 'images' is populated
export type CarWithImages = Omit<ICar, "images"> & {
  images: {
    _id: Types.ObjectId;
    url: string;
    key: string;
  }[];
};

const CarSchema = new Schema<ICar>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    views: { type: Number, default: 0 },
    slug: { type: String, unique: true },
    vrm: { type: String },
    title: { type: String },
    description: { type: String },
    year: { type: Number, required: true },
    odoReading: { type: Number, default: 0 },
    doors: { type: Number, default: 2 },
    seats: { type: Number, default: 5 },
    price: { type: Number, default: 0 },
    make: { type: String,required: true },
    carModel: { type: String,},
    modelVariant: { type: String },
    ulezCompliance: {
      type: String,
      enum: Object.values(ULEZCompliance),
      default: ULEZCompliance.EXEMPT,
    },
    transmission: {
      type: String,
      enum: Object.values(Transmission),
      default: Transmission.MANUAL,
    },
    colour: {
      type: String,
      enum: Object.values(Colour),
      default: Colour.BLACK,
    },
    fuelType: {
      type: String,
      enum: Object.values(FuelType),
      default: FuelType.PETROL,
    },
    bodyType: {
      type: String,
      enum: Object.values(BodyType),
      default: BodyType.SEDAN,
    },
    odoUnit: {
      type: String,
      enum: Object.values(OdoUnit),
      default: OdoUnit.MILES,
    },
    currency: {
      type: String,
      enum: Object.values(CurrencyCode),
      default: CurrencyCode.GBP,
    },
    status: {
      type: String,
      enum: Object.values(CarStatus),
      default: CarStatus.DRAFT,
    },
    address: {
      street: {type: String},
      city: {type: String},
      state: {type: String},
      postalCode: {type: String},
      country: {type: String},
    },
    mapAddress: {
      latitude: {type: Number},
      longitude: {type: Number}
    },
    featuredImage: { type: String },
    galleryImgs: [{ type: String }],
    images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
    customers: [{ type: Schema.Types.ObjectId, ref: "Customer" }],
    isAuction: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isSubscription: {
      state: { type: Boolean, default: false},
      date: [{ type: Date }],
    },
    premiumDuration: { type: Number },
    listingType: {
      type: String,
      required: true,
      enum: ["Car"]
    },
    listingCategory: {
      type: String,
      enum: ["SALE", "RENT"]
    },
    saleOff: {
        type: String,
    },
    isAds: {
        type: String,
      },
    reviewCount: { type: Number, default: 0 },
    reviewStart: { type: Number, default: 4.5 },
  },
  { timestamps: true }
);

export const Car = models?.Car || model<ICar>("Car", CarSchema);
