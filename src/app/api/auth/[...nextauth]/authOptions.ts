import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { DefaultSession } from "next-auth";

import { connectToDatabase } from "@/lib/database";
import { User } from "@/lib/database/models/user.model";

// ✅ Extend Session and User
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
  }
}

// ✅ NextAuth Options
export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectToDatabase();
        if (!credentials) return null;

        const { name, email, password } = credentials;
        console.log("Credentials auth:", { name, email, password });
        const isRegister = req.body?.callbackUrl?.includes("isNewUser=true");

        if (!email || !password) return null;

        try {
          if (isRegister) {
            if (!name) return null;
            const newUser = await User.add({ name, email, hashedPassword: password });
            return { ...newUser, isNewUser: true }; // <--- Add this
          } else {
            const user = await User.login(email, password);
            return user;
          }
        } catch (error) {
          console.error("Credentials auth error:", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
   async signIn({ user, account }) {
  try {
    await connectToDatabase();

    const { name, email, image } = user;

    if (account?.type === "oauth") {
      if (!email || !name) return false;

      let existingUser = await User.findOne({ email });

      if (existingUser) {
        existingUser.loginCount = (existingUser.loginCount || 0) + 1;
        existingUser.lastLoginAt = new Date();
        await existingUser.save();
        (user as any).id = existingUser._id.toString();
        (user as any).isNewUser = false; // <-- important
      } else {
        const newUser = await User.add({ name, email, image } as any);
        (user as any).id = newUser.id.toString();
        (user as any).isNewUser = true; // <-- important
      }
    }

    return true;
  } catch (error) {
    console.error("signIn callback error:", error);
    return false;
  }
},
    async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.isNewUser = (user as any).isNewUser || false;
    }
    return token;
  },

    async session({ session }) {
      try {
        if (session.user) {
          await connectToDatabase();

          const userDoc = await User.findOne({ email: session.user.email });

          if (userDoc) {
            session.user.id = userDoc._id.toString();
          } else {
            const newUser = await User.create(session.user);
            session.user.id = newUser._id.toString();
            (session as any).isNewUser = newUser.toObject() || false;
          }
        }

        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },

  async redirect({ url, baseUrl }) {
  try {
    const urlObj = new URL(url, baseUrl);

    const isNewUser = urlObj.searchParams.get("isNewUser");
    const userId = urlObj.searchParams.get("id");

    // Redirect newly registered users to the user-details page
    if (isNewUser === "true" && userId) {
      return `${baseUrl}/auth/${userId}/user-details`;
    }

    if (url.startsWith("/")) return `${baseUrl}${url}`;
    if (urlObj.origin === baseUrl) return url;
    return baseUrl;
  } catch {
    return baseUrl;
  }
}
  },
};

// ✅ App Router Handler Export
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export default handler;
