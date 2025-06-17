import { getServerSession } from "next-auth";
import { Session } from "next-auth";
import { User } from "@/lib/database/models/user.model";
import handler, { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectToDatabase } from "@/lib/database";

// Retrieves the session using the configured auth options
export async function getSession(): Promise<Session | null> {
  return await getServerSession(handler);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    console.log("SessionServer:", session);

    const email = session?.user?.email;
    if (!email) return null;

    await connectToDatabase(); // Ensure DB is connected before query
    const currentUser = await User.findOne({ email });

    if (!currentUser) return null;

    return currentUser.toObject();
  } catch (error) {
    console.log("Error in getCurrentUser:", error);
    return null;
  }
}
