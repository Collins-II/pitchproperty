
import { connectToDatabase } from "@/lib/database";
import { Car, CarStatus } from "@/lib/database/models/car.model";
 // assuming this is your Classified mongoose model

export async function setPremiumClassifiedAction(classifiedId: string) {
  try {
    await connectToDatabase(); // connect to your db if you need manual connection

    const classified = await Car.findById(classifiedId);

    if (!classified) {
      return { success: false, message: "Classified listing not found." };
    }

    classified.status = CarStatus; // setting status to Premium
    await classified.save();

    return { success: true };
  } catch (error: any) {
    console.error("[SET_PREMIUM_CLASSIFIED_ACTION]", error);
    return { success: false, message: "Something went wrong. Please try again later." };
  }
}
