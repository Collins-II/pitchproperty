import { Car, ICar } from "@/lib/database/models/car.model";
import { connectToDatabase } from "../../lib/database";

// This function builds a dynamic search query based on provided filters
export const buildSearchQuery = (searchParams: Record<string, any>) => {
  const query: Record<string, any> = {};

  if (searchParams.q) {
    query.$or = [
      { make: new RegExp(searchParams.q, "i") },
      { carModel: new RegExp(searchParams.q, "i") },
      { modelVariant: new RegExp(searchParams.q, "i") },
      { bodyType: new RegExp(searchParams.q, "i") },
      { fuelType: new RegExp(searchParams.q, "i") },
      { transmission: new RegExp(searchParams.q, "i") },
      { colour: new RegExp(searchParams.q, "i") },
    ];
  }

  if (searchParams.make) {
    query.make = new RegExp(searchParams.make, "i");
  }

  if (searchParams.model) {
    query.carModel = new RegExp(searchParams.model, "i");
  }

  if (searchParams.modelVariant) {
    query.modelVariant = new RegExp(searchParams.modelVariant, "i");
  }

  if (searchParams.minYear || searchParams.maxYear) {
    query.year = {};
    if (searchParams.minYear) {
      query.year.$gte = parseInt(searchParams.minYear);
    }
    if (searchParams.maxYear) {
      query.year.$lte = parseInt(searchParams.maxYear);
    }
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

  if (searchParams.minReading || searchParams.maxReading) {
    query.odoReading = {};
    if (searchParams.minReading) {
      query.odoReading.$gte = parseFloat(searchParams.minReading);
    }
    if (searchParams.maxReading) {
      query.odoReading.$lte = parseFloat(searchParams.maxReading);
    }
  }

  if (searchParams.currency) {
    query.currency = searchParams.currency;
  }

  if (searchParams.odoUnit) {
    query.odoUnit = searchParams.odoUnit;
  }

  if (searchParams.transmission) {
    query.transmission = new RegExp(searchParams.transmission, "i");
  }

  if (searchParams.fuelType) {
    query.fuelType = new RegExp(searchParams.fuelType, "i");
  }

  if (searchParams.bodyType) {
    query.bodyType = new RegExp(searchParams.bodyType, "i");
  }

  if (searchParams.colour) {
    query.colour = new RegExp(searchParams.colour, "i");
  }

  if (searchParams.doors) {
    query.doors = parseInt(searchParams.doors);
  }

  if (searchParams.seats) {
    query.seats = parseInt(searchParams.seats);
  }

  if (searchParams.ulezCompliance) {
    query.ulezCompliance = searchParams.ulezCompliance === "true";
  }

  if (searchParams.location) {
    query.location = new RegExp(searchParams.location, "i");
  }

  if (searchParams.status) {
    query.status = searchParams.status;
  }

  if (searchParams.isPremium === "true") {
    query.isSubscription = { $exists: true };
  }

  return query;
};


export async function getCarBySearch(
  searchParams: Record<string, any>
): Promise<ICar[]> {
  try {
    await connectToDatabase();

    const searchQuery = buildSearchQuery(searchParams);

    const listings = await Car.find(searchQuery).lean().exec();

    const enrichedListings = listings
      .map((listing) => {
        const dates = listing.isSubscription?.date ?? [];
        const duration =
          dates.length > 1
            ? Math.abs(
                new Date(dates[dates.length - 1]).getTime() -
                  new Date(dates[0]).getTime()
              ) / (1000 * 60 * 60 * 24)
            : 0;

        return {
          ...listing,
          premiumDuration: duration,
        };
      })
      .sort((a, b) => b.premiumDuration - a.premiumDuration);

    const data = JSON.parse(JSON.stringify(enrichedListings as unknown as ICar[])); 
    
    return data;
  } catch (error: any) {
    console.error("Error fetching car listings by search:", error);
    throw new Error(error.message || "Unknown error");
  }
}

export async function getCarPremium(): Promise<ICar[]> {
  try {
    await connectToDatabase();

    const listings = await Car.find().lean().exec();

    const sortedListings = listings
      .map((listing) => {
        const dates = listing.isSubscription?.date ?? [];
        const duration =
          dates.length > 1
            ? Math.abs(
                new Date(dates[dates.length - 1]).getTime() - new Date(dates[0]).getTime()
              ) / (1000 * 60 * 60 * 24)
            : 0;

        return {
          ...listing,
          premiumDuration: duration,
        };
      })
      .sort((a, b) => b.premiumDuration - a.premiumDuration)
      .map(({ premiumDuration, ...rest }) => rest as unknown as ICar);

    const data = JSON.parse(JSON.stringify(sortedListings)); 

    return data;
  } catch (error: any) {
    console.error("Error fetching premium listings:", error);
    throw new Error(error.message);
  }
};