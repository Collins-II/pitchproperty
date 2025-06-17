import { Document, Schema, model, models } from "mongoose";
import { IUser } from "./user.model";

interface TaxonomyType {
  id?: string | number;
  name: string;
  href: string;
  count?: number;
  thumbnail?: string;
  description?: string;
  color?: string;
  taxonomy: "category" | "tag";
  listingType?: "property" | "car";
}

export interface IProperty extends Document {
  _id: string;
  author: Schema.Types.ObjectId;
  date: string;
  href: string;
  title: string;
  description: string;
  propertySize: number;
  rentalForm: string;
  featuredImage: string;
  premiumSubscription: boolean;
  premiumDuration?: number;
  premiumDates: Date[];
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
  galleryImgs: string[];
  rules: string[];
  price: string;
  currency: string;
  discount: number;
  listingCategory: string;
  listingType: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  availableDate?: Date[];
  saleOff?: string | null;
  isAds: boolean | null;
  isAuction: boolean;
  isFeatured: boolean;
  map: {
    lat: number;
    lng: number;
  };
}

const PropertySchema = new Schema<IProperty>({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: String },
  href: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  propertySize: { type: Number, required: true },
  rentalForm: { type: String, required: true },
  featuredImage: { type: String },
  premiumSubscription: { type: Boolean, default: false },
  premiumDuration: { type: Number },
  premiumDates: [{ type: Date }],
  commentCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  address: {
    country: { type: String, required: true },
    state: { type: String, required: true },
    state_district: { type: String, required: true },
    suburb: { type: String, required: true },
    street: { type: String, required: true },
  },
  amenities: [{ type: String }],
  reviewStart: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  like: { type: Boolean, default: false },
  galleryImgs: [{ type: String }],
  rules: [{ type: String }],
  price: { type: String, required: true },
  currency: { type: String, required: true },
  discount: { type: Number, default: 0 },
  listingType: {
    type: String,
    required: true,
    enum: ["Property"]
  },
  listingCategory: {
    type: String,
    enum: ["Sale", "Rent"]
  },
  maxGuests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  availableDate: [{ type: Date }],
  saleOff: { type: String, default: null },
  isAds: { type: Boolean, default: null },
  isAuction: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  map: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

const Property = models?.Property || model<IProperty>("Property", PropertySchema);

export default Property;
