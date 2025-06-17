import { NextResponse } from "next/server";
import Listing from "@/lib/database/models/property.model";
import { handleError } from "@/lib/utils";
import Appointment from "@/lib/database/models/appointment";

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
    const body = await request.json();
    const {
        listingId,
        reservedDate,
        timeSlot,
        pickUpLocation,
        bookingPeriod
    } = body;

    console.log("LISTING_BODY", body);

    /*const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: corsHeaders }
      );
    } */

    // Validate required fields
   const requiredFields = [
        "listingId",
        "reservedDate",
        "timeSlot",
        "pickUpLocation",
        "bookingPeriod"
    ];
    for (const field of requiredFields) {
      const value = field.split('.').reduce((o, key) => o?.[key], body);
      if (!value) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400, headers: corsHeaders }
        );
      }
    } 

    // Create the listing
    const listing = await Appointment.create({
      userId: 1,
      listingId,
      reservedDate,
      timeSlot,
      pickUpLocation,
      bookingPeriod
    });

    return NextResponse.json(listing, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("LISTING_ERR", error);
    handleError(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
