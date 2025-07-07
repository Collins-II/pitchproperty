import { User } from "@/lib/database/models/user.model";
import { connectToDatabase } from "../../lib/database";
import Listing from "../../lib/database/models/property.model";
import Property, { IProperty } from "../../lib/database/models/property.model";
import { buildPropertySearchQuery } from "@/lib/utils";

const populateEvent = (query: any) => {
  return query.populate({
    path: "author",
    model: User,
    select: "_id name image email",
  });
};

export async function getPropertyBySearch(
  searchParams: Record<string, any>
): Promise<IProperty[]> {
  try {
    await connectToDatabase();

    const searchQuery = buildPropertySearchQuery(searchParams);

    const listings = await Property.find(searchQuery).lean().exec();

    const enrichedListings = listings
      .map((listing) => {
        const dates = listing.premiumDates ?? [];
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
      .sort((a, b) => b.premiumDuration - a.premiumDuration);

    const data = JSON.parse(JSON.stringify(enrichedListings as unknown as IProperty[])); 

    return data;  
  } catch (error: any) {
    console.error("Error fetching property listings by search:", error);
    throw new Error(error.message || "Unknown error");
  }
}

export default async function getPremiumListings(): Promise<IProperty[]> {
  try {
    await connectToDatabase();

    const listings = await Property.find().lean().exec();
   
    const sortedListings: IProperty[] = listings
      .map((listing: any) => {
        const premiumDuration =
          listing.premiumDates?.length > 1
            ? Math.abs(
                new Date(listing.premiumDates.at(-1)).getTime() -
                  new Date(listing.premiumDates[0]).getTime()
              ) / (1000 * 60 * 60 * 24)
            : 0;

        return {
          ...listing,
          _id: listing._id.toString(),
          author: listing.author?.toString?.(), // if populated
          date: new Date(listing.date).toISOString(),
          premiumDates: listing.premiumDates?.map((d: Date) => new Date(d).toISOString()),
          availableDate: listing.availableDate?.map((d: Date) => new Date(d).toISOString()),
          premiumDuration,
        };
      })
      .sort((a, b) => b.premiumDuration - a.premiumDuration);

      const data = JSON.parse(JSON.stringify(sortedListings)); 

      return data;
  } catch (error: any) {
    console.log("Error fetching premium listings:", error);
    throw new Error(error.message);
  }
}

export async function getPropertyById(id: string) {
  try {
    await connectToDatabase();

    if (!id) {
      throw new Error("Property ID is required");
    }

    const listing = await populateEvent(Property.findById(id));
    if (!listing) return null;

    const plainListing = {
      _id: listing._id.toString(),
      author: listing.author?.toString(),
      date: listing.date,
      href: listing.href,
      title: listing.title,
      description: listing.description,
      propertySize: listing.propertySize,
      rentalForm: listing.rentalForm,
      featuredImage: listing.featuredImage,
      premiumSubscription: listing.premiumSubscription,
      premiumDuration: listing.premiumDuration,
      premiumDates: listing.premiumDates,
      commentCount: listing.commentCount,
      viewCount: listing.viewCount,
      address: {
        country: listing.address.country,
        state: listing.address.state,
        state_district: listing.address.state_district,
        suburb: listing.address.suburb,
        street: listing.address.street,
      },
      amenities: listing.amenities,
      reviewStart: listing.reviewStart,
      reviewCount: listing.reviewCount,
      like: listing.like,
      galleryImgs: listing.galleryImgs,
      rules: listing.rules || [],
      price: listing.price,
      currency: listing.currency,
      discount: listing.discount,
      listingCategory: listing.listingCategory,
      listingType: listing.listingType,
      maxGuests: listing.maxGuests,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      availableDate: listing.availableDate || [],
      saleOff: listing.saleOff ?? null,
      isAds: listing.isAds ?? null,
      isAuction: listing.isAuction,
      isFeatured: listing.isFeatured,
      map: {
        lat: listing.map.lat,
        lng: listing.map.lng,
      },
    };

    return JSON.parse(JSON.stringify(plainListing));
  } catch (error: any) {
    console.error("List_Err:", error);
    throw new Error(error.message);
  }
}
