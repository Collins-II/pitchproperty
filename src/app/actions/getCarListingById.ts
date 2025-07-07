import { Schema } from "mongoose";
import { Car } from "@/lib/database/models/car.model";
import { connectToDatabase } from "../../lib/database";
import { User } from "../../lib/database/models/user.model";

interface IParams {
  carId?: string;
}

const populateEvent = (query: any) => {
  return query.populate({
    path: "author",
    model: User,
    select: "_id name image email",
  });
};

export default async function getCarListingById(id: string) {
  try {
    await connectToDatabase();

    if (!id) {
      throw new Error("Car ID is required");
    }

    const listing = await populateEvent(Car.findById(id));

    if (!listing) {
      return null;
    }

    // Convert the listing object to a plain structure
    const plainListing = {
      _id: listing._id.toString(),
      author: listing.author?.toString(),
      date: listing.date,
      href: listing.href,
      title: listing.title,
      featuredImage: listing.featuredImage,
      commentCount: listing.commentCount,
      viewCount: listing.viewCount,
      desc: listing.desc,
      address: listing.address,
      carType: listing.carType,
      premiumSubscription: listing.premiumSubscription,
      premiumDates: listing.premiumDates,
      premiumDuration: listing.premiumDuration,
      rules: listing.rules,
      utilities: listing.utilities,
      reviewStart: listing.reviewStart,
      reviewCount: listing.reviewCount,
      like: listing.like,
      galleryImgs: listing.galleryImgs,
      price: listing.price,
      listingCategory: listing.listingCategory,
      listingType: listing.listingType,
      seats: listing.seats,
      gearshift: listing.gearshift,
      currency: listing.currency,
      category: listing.category,
      availableDate: listing.availableDate,
      saleOff: listing.saleOff,
      isAds: listing.isAds,
      map: listing.map,
      user: listing.user?.toString(),
      reservations: listing.reservations,
    };

    return JSON.parse(JSON.stringify(plainListing));
  } catch (error: any) {
    console.log("List_Err", error);
    throw new Error(error.message);
  }
}
