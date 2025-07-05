import { NextResponse } from "next/server";
import { handleError, slugify } from "@/lib/utils";
import { Car } from "@/lib/database/models/car.model";
import { connectToDatabase } from "@/lib/database";

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
      vrm,
      title,
      description,
      year,
      odoReading,
      odoUnit,
      doors,
      seats,
      price,
      make,
      carModel,
      modelVariant,
      ulezCompliance,
      transmission,
      colour,
      fuelType,
      bodyType,
      currency,
      status,
      listingCategory,
      featuredImage,
      galleryImgs,
      isAuction,
      isFeatured,
      saleOff,
      isAds,
      isSubscription,
      address,
      map,
      email,
    } = body;

    const currentUser = { email };

    const carListingData = {
      slug: slugify(title),
      vrm,
      title,
      description,
      year: Number(year),
      odoReading: Number(odoReading),
      odoUnit,
      doors: Number(doors),
      seats: Number(seats),
      price: Number(price),
      make,
      carModel,
      modelVariant: modelVariant || "STANDARD",
      ulezCompliance: ulezCompliance?.toUpperCase?.() || "UNKNOWN",
      transmission: transmission?.toUpperCase?.() || "MANUAL",
      colour: colour?.toUpperCase?.() || "UNKNOWN",
      fuelType: fuelType?.toUpperCase?.() || "PETROL",
      bodyType: bodyType?.toUpperCase?.() || "SEDAN",
      currency: currency?.toUpperCase?.() || "USD",
      status: status?.toUpperCase?.() || "DRAFT",
      listingCategory: listingCategory?.toUpperCase?.() || "SALE",
      listingType: "Car",
      featuredImage,
      galleryImgs: galleryImgs || [],
      isAuction: isAuction || false,
      isFeatured: isFeatured || false,
      saleOff: saleOff || null,
      isAds: isAds || null,
      premiumSubscription: isSubscription?.state || false,
      premiumDates: isSubscription?.date || [],
      address: {
        street: address?.street || "",
        state_district: address?.state_district || "",
        state: address?.state || "",
        suburb: address?.suburb || "",
        country: address?.country || "",
      },
      map: {
        lat: map?.latitude || 0,
        lng: map?.longitude || 0,
      },
      user: currentUser,
    };

    const carListing = await Car.create(carListingData);

    return NextResponse.json(carListing, { headers: corsHeaders });
  } catch (error) {
    console.log("CAR_LISTING_ERROR", error);
    handleError(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
