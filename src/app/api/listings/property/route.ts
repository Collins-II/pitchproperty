import { NextResponse } from "next/server";
//import getCurrentUser from "@/app/actions/getCurrentUser";
import Listing from "@/lib/database/models/property.model";
import { handleError } from "@/lib/utils";
import { connectToDatabase } from "@/lib/database";
//import { getUserByEmail } from "@/app/actions/user.actions";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const {
      email,
      title,
      description,
      propertyType,
      propertySize,
      rentalForm,
      featuredImage,
      premiumSubscription,
      premiumDates,
      commentCount,
      viewCount,
      address,
      amenities,
      reviewStart,
      reviewCount,
      like,
      galleryImgs,
      rules,
      price,
      currency,
      discount,
      listingCategory,
      maxGuests,
      bedrooms,
      bathrooms,
      saleOff,
      isAds,
      map,
    } = body;

    console.log("LISTING_BODY", body);

    const currentUser = await { email: email }; //getCurrentUser();

    /*if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: corsHeaders }
      );
    }*/

    // Validate required fields
  /*  const requiredFields = [
      "title",
      "description",
      "propertyType",
      "propertySize",
      "rentalForm",
      "price",
      "currency",
      "maxGuests",
      "bedrooms",
      "bathrooms",
      "address.country",
      "address.state",
      "address.state_district",
      "address.suburb",
      "address.street",
      "map.lat",
      "map.lng",
    ];
    for (const field of requiredFields) {
      const value = field.split('.').reduce((o, key) => o?.[key], body);
      if (!value) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400, headers: corsHeaders }
        );
      }
    } */

    // Create the listing
    const listing = await Listing.create({
      //author: currentUser._id,
      date: new Date().toISOString(),
      title,
      description,
      propertyType,
      propertySize: parseInt(propertySize, 10),
      rentalForm,
      featuredImage,
      premiumSubscription: premiumSubscription || false,
      premiumDates: premiumDates || [],
      commentCount: parseInt(commentCount, 10) || 0,
      viewCount: parseInt(viewCount, 10) || 0,
      address: {
        country: address.country,
        state: address.state,
        state_district: address.state_district,
        suburb: address.suburb,
        street: address.street,
      },
      amenities,
      reviewStart: parseInt(reviewStart, 10) || 0,
      reviewCount: parseInt(reviewCount, 10) || 0,
      like: !!like,
      galleryImgs,
      rules,
      price,
      currency,
      discount: parseFloat(discount) || 0,
      listingCategory,
      listingType: "Property",
      maxGuests: parseInt(maxGuests, 10),
      bedrooms: parseInt(bedrooms, 10),
      bathrooms: parseInt(bathrooms, 10),
      saleOff: saleOff || null,
      isAds: isAds || null,
      map: {
        lat: parseFloat(map.lat),
        lng: parseFloat(map.lng),
      },
      user: currentUser,
    });

    return NextResponse.json(listing, {
      headers: corsHeaders,
    });
  } catch (error: any) {
    if (error.code === 'ECONNRESET') {
      console.log('Connection was reset. Retrying or alerting...');
    }
    handleError(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
