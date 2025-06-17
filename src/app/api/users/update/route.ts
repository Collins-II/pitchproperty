import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { getSession } from "@/app/actions/getCurrentUser";
import { User } from "@/lib/database/models/user.model";
import { UserFormValidation } from "@/lib/validation";

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

    // ✅ Validate the incoming body using Zod
    const validatedData = UserFormValidation.parse(body);

    const userId = validatedData.id || session.user.id;

    // 🔄 Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, validatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json(updatedUser, { status: 200, headers: corsHeaders });
  } catch (error: any) {
    console.error("User update error:", error);
    const errorMessage = error?.errors || error?.message || "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500, headers: corsHeaders });
  }
}
