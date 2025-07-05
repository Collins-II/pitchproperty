import { connectToDatabase } from "@/lib/database";
import { Car } from "@/lib/database/models/car.model";
import Property from "@/lib/database/models/property.model";
import { extractCityName } from "@/lib/utils";

export type LocationItem = {
  id: string;
  name: string;
  thumbnail: string;
  count: number;
  href: string;
  listingType: string;
};

const getPropertiesGroupedByDistrict = async (): Promise<LocationItem[]> => {
  await connectToDatabase();

  try {
    const properties = await Property.find({}, "address.state_district galleryImgs").lean();

    const groupedMap = new Map<string, { count: number; thumbnail: string }>();

    for (const property of properties) {
      const district = extractCityName(property.address?.state_district);
      if (!district) continue;

      if (!groupedMap.has(district)) {
        groupedMap.set(district, {
          count: 1,
          thumbnail: property.galleryImgs?.[0] || "",
        });
      } else {
        const existing = groupedMap.get(district)!;
        existing.count += 1;
      }
    }

    const groupedArray: LocationItem[] = Array.from(groupedMap.entries()).map(([district, data], index) => ({
      id: String(index + 1),
      name: district,
      thumbnail: data.thumbnail,
      count: data.count,
      href: `/listing-stay-map/${encodeURIComponent(district)}`,
      listingType: "property",
    }));

    return groupedArray;
  } catch (error) {
    console.error("❌ Failed to group properties by district:", error);
    return [];
  }
};

const getCarLocations = async (): Promise<LocationItem[]> => {
  await connectToDatabase();

  try {
    const cars = await Car.find({}, "address.state_district galleryImgs").lean();

    const groupedMap = new Map<string, { count: number; thumbnail: string }>();

    for (const car of cars) {
      const district = extractCityName(car.address?.state_district);
      if (!district) continue;

      if (!groupedMap.has(district)) {
        groupedMap.set(district, {
          count: 1,
          thumbnail: car.galleryImgs?.[0] || "",
        });
      } else {
        const existing = groupedMap.get(district)!;
        existing.count += 1;
      }
    }

    const groupedArray: LocationItem[] = Array.from(groupedMap.entries()).map(([district, data], index) => ({
      id: String(index + 1),
      name: district,
      thumbnail: data.thumbnail,
      count: data.count,
      href: `/listing-car-map/${encodeURIComponent(district)}`,
      listingType: "car",
    }));

    return groupedArray;
  } catch (error) {
    console.error("❌ Failed to group properties by district:", error);
    return [];
  }
};

const getDistrictProperty = async (district: string) => {
  await connectToDatabase();
  const name = `${district} District`;

  try {
    const property = await Property.find({ "address.state_district": name }).lean();

    return property;
  } catch (error) {
    console.error("❌ Failed to group properties by district:", error);
    return [];
  }
};

const getDistrictCars = async (district: string) => {
  await connectToDatabase();
  const name = `${district} District`;

  try {
    const car = await Car.find({ "address.state_district": name }).lean();

    return car;
  } catch (error) {
    console.error("❌ Failed to group cars by district:", error);
    return [];
  }
};

export { getPropertiesGroupedByDistrict, getCarLocations, getDistrictCars, getDistrictProperty };
