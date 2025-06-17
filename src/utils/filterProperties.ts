import { StayDataType } from "@/data/types";

type Property = {
  id: number;
  price: number;
  type: string; // e.g., "apartment", "house", "villa"
  amenities: string[]; // e.g., ["pool", "garage", "garden"]
};

type FilterOptions = {
  minPrice: number;
  maxPrice: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  amenities?: string[];
};

function filterProperties(properties: StayDataType[], filters: FilterOptions): StayDataType[] {
  return properties?.filter(property => {
    // Ensure undefined filters do not restrict the results
    const withinPriceRange =
      (!filters.minPrice || Number(property.price) >= filters.minPrice) &&
      (!filters.maxPrice || Number(property.price) <= filters.maxPrice);

    const matchesType =
      !filters.propertyType || property.listingCategory?.toLowerCase() === filters.propertyType.toLowerCase();

    const hasAmenities =
      !filters.amenities || (property.amenities && filters.amenities.every(amenity => property.amenities?.includes(amenity)));

    const matchesBedrooms =
      filters.bedrooms === undefined || property.bedrooms === filters.bedrooms;

    const matchesBathrooms =
      filters.bathrooms === undefined || property.bathrooms === filters.bathrooms;

    // Only return properties that match at least one criterion
    return (
      withinPriceRange ||
      matchesType ||
      hasAmenities ||
      matchesBedrooms ||
      matchesBathrooms
    );
  });
}


type FilterCriteria = {
  minPrice: number;
  maxPrice: number;
  propertyType?: string;
  amenities?: string[];
};

const filterProperties2 = (properties: StayDataType[], filters: FilterCriteria): StayDataType[] => {
  return properties.filter((property) => {
    const matchesPrice =
      (filters.minPrice === undefined || Number(property.price) >= filters.minPrice) &&
      (filters.maxPrice === undefined || Number(property.price) <= filters.maxPrice);

    const matchesType =
      !filters.propertyType || property.listingCategory.toLowerCase() === filters.propertyType.toLowerCase();

    const matchesAmenities =
      !filters.amenities || filters.amenities.every((amenity) => property.amenities?.includes(amenity));

    return matchesPrice && matchesType && matchesAmenities;
  });
};


export {filterProperties, filterProperties2}