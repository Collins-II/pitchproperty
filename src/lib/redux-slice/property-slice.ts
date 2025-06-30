"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StayDataType, AuthorType, TaxonomyType } from "@/data/types";
import { Route } from "@/routers/types";

interface ListingState {
  data: StayDataType;
}

const initialState: ListingState = {
  data: {
    id: "", // Default empty or placeholder value
    user: {} as AuthorType, // Ensure proper typing
    date: "",
    href: "" as Route<string>,
    title: "",
    description: "",
    propertySize: 0,
    rentalForm: "",
    featuredImage: "",
    premiumSubscription: false,
    premiumDates: [],
    commentCount: 0,
    viewCount: 0,
    address: {
      country: "",
      state: "",
      state_district: "",
      suburb: "",
      street: "",
    },
    amenities: [],
    reviewStart: 0,
    reviewCount: 0,
    like: false,
    galleryImgs: [],
    rules: [],
    price: "",
    currency: "",
    discount: 0,
    category: "",
    listingCategory: "",
    maxGuests: 1,
    bedrooms: 1,
    bathrooms: 1,
    saleOff: null,
    isAds: null,
    map: {
      lat: 0,
      lng: 0,
    },
  },
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    // Update specific parts of the listing data
    updateListingData: <T extends keyof StayDataType>(
      state: ListingState,
      action: PayloadAction<{ key: T; value: StayDataType[T] }>
    ) => {
      const { key, value } = action.payload;
      state.data[key] = value;
    },

    // Update nested address fields
    updateAddressData: <K extends keyof StayDataType["address"]>(
      state: ListingState,
      action: PayloadAction<{ key: K; value: StayDataType["address"][K] }>
    ) => {
      const { key, value } = action.payload;
      if (state.data.address) {
        state.data.address[key] = value;
      }
    },
     // Update nested address fields
     updateMapData: <K extends keyof StayDataType["map"]>(
      state: ListingState,
      action: PayloadAction<{ key: K; value: StayDataType["map"][K] }>
    ) => {
      const { key, value } = action.payload;
      if (state.data.map) {
        state.data.map[key] = value;
      }
    },
    // Reset the entire listing data to its initial state
    resetListingData: (state) => {
      state.data = initialState.data;
    },
  },
});

export const { updateListingData, updateAddressData, updateMapData, resetListingData } = listingSlice.actions;

export default listingSlice.reducer;
