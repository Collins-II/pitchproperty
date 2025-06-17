import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { Auction } from "@/lib/database/models/auction.model";
import { getSession } from "@/app/actions/getCurrentUser";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  await connectToDatabase();
  
  const session = await getSession();
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
  }

  try {
    const body = await request.json();
    const { listingId, listingModel, title, description, imageUrls, startingPrice, currentPrice, bidInterval, endTime } = body;
    // Server-side validation
    console.log("CreatiAUTION_DATA:", body);
   if (
      !listingId ||
      !listingModel ||
      !title ||
      !description ||
      !imageUrls ||
      typeof startingPrice !== "number" ||
      typeof currentPrice !== "number" ||
      typeof bidInterval !== "number" ||
      !endTime
    ) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400, headers: corsHeaders });
    }

    const newAuction = await Auction.create({
      listingId,
      listingModel,
      title,
      description,
      imageUrls,
      startingPrice,
      currentPrice,
      status: "active",
      bidInterval,
      endTime,
      user: session?.user.id,
      bids: [],
    });

    return NextResponse.json(newAuction, { status: 201, headers: corsHeaders });

  } catch (error) {
    console.log("Error creating auction:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: corsHeaders });
  }
}
