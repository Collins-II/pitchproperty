"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, type FC, useEffect } from "react";
import type { BuiltInProviderType } from "next-auth/providers";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";

import { Button, Container, Input } from "@/lib/components";
import type { PasswordInputType } from "@/lib/types";

import { AuthError } from "./AuthError";
import {
  togglePasswordInputType,
  TogglePasswordVisibility,
} from "./TogglePasswordVisibility";

interface AuthFormProps {
  authType: "register" | "signin";
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
  csrfToken?: string;
}

export const AuthForm: FC<AuthFormProps> = ({
  authType,
  providers,
  csrfToken,
}) => {
  const [passwordInputType, setPasswordInputType] =
    useState<PasswordInputType>("password");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle redirect between register/signin pages if callbackUrl points to the wrong one
  useEffect(() => {
    if (authType === "signin" && callbackUrl.includes("/register")) {
      redirect(`${callbackUrl}${error ? `?error=${error}` : ""}`);
    }
    if (authType === "register" && callbackUrl.includes("/signin")) {
      redirect(`${callbackUrl}${error ? `?error=${error}` : ""}`);
    }
  }, [authType, callbackUrl, error]);

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

 const callback = new URL(callbackUrl, window.location.origin);
 setIsLoading(true);

 if (authType === "register") {
  callback.pathname = "/auth/signin"; // ensure it hits signin page
  callback.searchParams.set("isNewUser", "true");
}

// Final callbackUrl to use with signIn()
const finalCallbackUrl = callback.toString();

await signIn("credentials", {
  name,
  email,
  password,
  redirect: true,
  callbackUrl: finalCallbackUrl,
});
  setIsLoading(false);
};


  const formSettings = {
    title: authType === "register" ? "Register" : "Sign In",
    providerPrefix: authType === "register" ? "Register" : "Sign in",
    emailAction: authType === "register" ? "register" : "sign in",
    submitLabel: authType === "register" ? "Register" : "Sign In",
    passwordLabel:
      authType === "register" ? "Password (at least 5 chars)" : "Password",
    passwordAutoComplete:
      authType === "register" ? "new-password" : "current-password",
  };

  return (
    <Container maxWidth="max-w-md">
      <h1 className="font-bold text-3xl mb-7">{formSettings.title}</h1>

      {providers &&
        Object.values(providers).map((provider) => {
          if (provider.name === "Credentials") {
            return (
              <div key="credentials">
                <div className="inline-flex items-center justify-center w-full">
                  <hr className="w-full h-px my-8 bg-gray-300 border-0" />
                  <span className="absolute px-3 text-sm text-gray-500 bg-white -translate-x-1/2 left-1/2">
                    or {formSettings.emailAction} with email
                  </span>
                </div>

                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="csrfToken" value={csrfToken} />

                  {authType === "register" && (
                    <div className="mb-4">
                      <label htmlFor="name">Name</label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <label htmlFor="email">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password">{formSettings.passwordLabel}</label>
                    <div className="relative">
                      <TogglePasswordVisibility
                        title={
                          passwordInputType === "password"
                            ? "Show password"
                            : "Hide password"
                        }
                        onClick={() =>
                          togglePasswordInputType(passwordInputType, setPasswordInputType)
                        }
                        currentType={passwordInputType}
                      />
                      <Input
                        id="password"
                        name="password"
                        type={passwordInputType}
                        autoComplete={formSettings.passwordAutoComplete}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    {authType === "signin" && (
                      <p className="text-sm mt-2">
                        <Link href="/auth/forgotPassword">Forgot password?</Link>
                      </p>
                    )}
                  </div>

                  {error && <AuthError errorId={error} />}

                  <div className="mt-5 mb-3">
                    <Button type="submit" primary>
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.243A8.001 8.001 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.93-1.695zM12 20a8.001 8.001 0 01-6.93-4.243l-3.93 1.695A11.95 11.95 0 0012 24v-4zm6.93-2.243A8.001 8.001 0 0120 12h4c0 3.042-1.135 5.824-3 7.938l-3.93-1.695zM20 4a8.001 8.001 0 01-6.93 4.243l3.93-1.695A11.95 11.95 0 0024 12h-4z"
                            ></path>
                          </svg>
                          </span>) : null}
                      {formSettings.submitLabel}
                    </Button>
                  </div>

                  <p className="text-sm text-gray-500 text-center">
                    {authType === "register" ? (
                      <>
                        Already a member?{" "}
                        <Link href="/auth/signin">Sign In</Link>
                      </>
                    ) : (
                      <>
                        Not a member yet?{" "}
                        <Link href="/auth/register">Register</Link>
                      </>
                    )}
                  </p>
                </form>
              </div>
            );
          }

          // OAuth Providers
          return (
            <div key={provider.id} className="mt-3">
              <Button onClick={() => signIn(provider.id)}>
                <Image
                  src={`/${provider.name.toLowerCase()}.svg`}
                  width={24}
                  height={24}
                  alt={`${provider.name} logo`}
                  className="absolute left-3"
                />
                <span>
                  {formSettings.providerPrefix} with {provider.name}
                </span>
              </Button>
            </div>
          );
        })}
    </Container>
  );
};
