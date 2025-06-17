import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  propertyType?: string;
  priceRange?: [number, number];
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
}

const initialState: FilterState = {
  propertyType: undefined,
  priceRange: undefined,
  bedrooms: undefined,
  bathrooms: undefined,
  amenities: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setPropertyType: (state, action: PayloadAction<string>) => {
      state.propertyType = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setBedrooms: (state, action: PayloadAction<number>) => {
      state.bedrooms = action.payload;
    },
    setBathrooms: (state, action: PayloadAction<number>) => {
      state.bathrooms = action.payload;
    },
    setAmenities: (state, action: PayloadAction<string[]>) => {
      state.amenities = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setPropertyType,
  setPriceRange,
  setBedrooms,
  setBathrooms,
  setAmenities,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
