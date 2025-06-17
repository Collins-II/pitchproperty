"use client";

import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currency-slice";
import filterReducer from "./filter-slice"
import propertyReducer from "../../lib/redux-slice/property-slice";
import carReducer from "../../lib/redux-slice/car-slice"

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    filters: filterReducer,
    property: propertyReducer,
    car: carReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
