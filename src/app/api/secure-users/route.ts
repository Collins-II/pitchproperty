import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { User } from "@/lib/database/models/user.model";

import { authOptions } from "../auth/[...nextauth]/authOptions";
import { connectToDatabase } from "@/lib/database";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    await connectToDatabase();

    const users = await User.find(
      {
        email: "my@email.com",
      },
      "name email loginCount lastLoginAt createdAt"
    );

    // 200 OK
    return NextResponse.json(
      {
        users,
      },
      {
        status: 200,
      }
    );
  } else {
    // 401 Unauthorized
    return NextResponse.json(
      {
        users: null,
      },
      {
        status: 401,
      }
    );
  }
}
