import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getCsrfToken, getProviders } from "next-auth/react";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { AuthForm } from "@/lib/auth/components";

export const metadata: Metadata = {
  title: "Register",
};

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(`/auth/${session.user?.id}/user-details`);
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken();

  return (
    <AuthForm authType="register" providers={providers} csrfToken={csrfToken} />
  );
}
