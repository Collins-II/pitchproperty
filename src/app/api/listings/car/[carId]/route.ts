import { NextResponse } from "next/server";

//import getCurrentUser from "@/app/actions/getCurrentUser";
import Listing from "@/lib/database/models/property.model";
//import { getUserByEmail } from "@/app/actions/user.actions";
import { handleError } from "@/lib/utils";
import { Car } from "@/lib/database/models/car.model";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}


export async function DELETE(
  request: Request
) {
  const body = await request.json();
  const {carId, email } = body;
  const currentUser = await { email: email };

  if (!currentUser) {
    return NextResponse.error();
  }


  if (!carId || typeof carId !== "string") {
    throw new Error("Invalid ID");
  }

  try {
    const result = await Car.deleteOne({
      _id: carId,
      userId: 1,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        new Error("Listing not found or user not authorized to delete it")
      );
    }

    return NextResponse.json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting listing:", error);
    return NextResponse.json(
      new Error("An error occurred while deleting the listing")
    );
  }
};

export async function PATCH(
  request: Request
) {
  try {
    const body = await request.json();
    const {carId, email } = body;

    const currentUser = await { email: email };

    if (!currentUser) {
      return NextResponse.json(new Error("Unauthorized"), { status: 401 });
    }


    if (!carId || typeof carId !== "string") {
      throw new Error("Invalid ID");
    }

    const requiredFields = [
      "title",
      "description",
      "imageSrc",
      "category",
      "roomCount",
      "bathroomCount",
      "guestCount",
      "location",
      "price",
      "costRange",
      "province",
      "district",
      "compound",
      "property_type",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(new Error(`Missing field: ${field}`), {
          status: 400,
        });
      }
    }

    const existingListing = await Car.findById(carId);

    if (!existingListing || existingListing.userId !== 1) {
      return NextResponse.json(
        new Error("Listing not found or user not authorized to update it"),
        { status: 404 }
      );
    }

    existingListing.title = body.title;
    existingListing.description = body.description;
    existingListing.imageSrc = body.imageSrc;
    existingListing.category = body.category;
    existingListing.province = body.province;
    existingListing.district = body.district;
    existingListing.compound = body.compound;
    existingListing.roomCount = body.roomCount;
    existingListing.bathroomCount = body.bathroomCount;
    existingListing.guestCount = body.guestCount;
    existingListing.locationValue = body.location.value;
    existingListing.costRange = body.costRange;
    existingListing.property_type = body.property_type;
    existingListing.price = parseInt(body.price, 10);

    const updatedListing = await existingListing.save();

    return NextResponse.json(updatedListing, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.log("LISTING_ERR", error);
    handleError(error);
  }
}
