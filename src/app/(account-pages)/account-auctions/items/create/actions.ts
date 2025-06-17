"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/database";
import { Auction } from "@/lib/database/models/auction.model"; // Mongoose Item model
import { getSession } from "@/app/actions/getCurrentUser";

export async function createUploadUrlAction(key: string, type: string) {
  //return await getSignedUrlForS3Object(key, type);
}

interface CreateItemInput {
  fileName: string;
  name: string;
  startingPrice: number;
  endDate: Date;
}

export async function createItemAction({
  fileName,
  name,
  startingPrice,
  endDate,
}: CreateItemInput) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await connectToDatabase();

  await Auction.create({
    name,
    startingPrice,
    fileKey: fileName,
    currentBid: startingPrice,
    userId: session.user.id,
    endDate,
  });

  redirect("/");
}
