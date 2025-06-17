"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICar } from "../database/models/car.model";
import { Types } from "mongoose";
import {
  ULEZCompliance,
  Transmission,
  Colour,
  FuelType,
  BodyType,
  OdoUnit,
  CurrencyCode,
  CarStatus,
} from "../database/models/car.model"; // Adjust path if enums are exported separately

interface CarListingState {
  data: any;
}

const initialState: CarListingState = {
  data: {
    vrm: "",
    title: "",
    description: "",
    year: new Date().getFullYear(),
    odoReading: 0,
    doors: 4,
    seats: 5,
    price: 0,
    make: "",
    carModel: "",
    modelVariant: undefined,
    ulezCompliance: "UNKNOWN" as ULEZCompliance,
    transmission: "MANUAL" as Transmission,
    colour: "UNKNOWN" as Colour,
    fuelType: "PETROL" as FuelType,
    bodyType: "SEDAN" as BodyType,
    odoUnit: "KM" as OdoUnit,
    currency: "USD" as CurrencyCode,
    status: "DRAFT" as CarStatus,
    listingCategory: "",
    featuredImage: "",
    galleryImgs: [],
    isAuction: false,
    isFeatured: false,
    saleOff: "",
    isAds: "",
    isSubscription: {
      isState: false,
      date: [],
    },
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    map: {
      latitude: 0,
      longitude: 0,
    },
  },
};

const carListingSlice = createSlice({
  name: "carListing",
  initialState,
  reducers: {
    updateCarField: <K extends keyof ICar>(
      state: any,
      action: PayloadAction<{ key: K; value: ICar[K] }>
    ) => {
      const { key, value } = action.payload;
      state.data[key] = value;
    },

    updateAddressField: <K extends keyof ICar["address"]>(
      state: any,
      action: PayloadAction<{ key: K; value: ICar["address"][K] }>
    ) => {
      const { key, value } = action.payload;
      state.data.address[key] = value;
    },

    updateIsSubField: <K extends keyof ICar["isSubscription"]>(
      state: any,
      action: PayloadAction<{ key: K; value: ICar["isSubscription"][K] }>
    ) => {
      const { key, value } = action.payload;
      state.data.address[key] = value;
    },

    updateMapField: <K extends keyof ICar["mapAddress"]>(
      state: any,
      action: PayloadAction<{ key: K; value: ICar["mapAddress"][K] }>
    ) => {
      const { key, value } = action.payload;
      state.data.map[key] = value;
    },

    resetCarListing: (state) => {
      state.data = initialState.data;
    },
  },
});

export const { updateCarField, resetCarListing, updateAddressField, updateMapField, updateIsSubField } = carListingSlice.actions;

export default carListingSlice.reducer;
