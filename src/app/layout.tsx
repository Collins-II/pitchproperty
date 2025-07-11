
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";
import { DM_Sans } from "next/font/google";
import { Roboto_Serif } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import SessionProvider from "@/lib/providers/session-provider";
import ReduxProvider from "@/utils/CurrencyStore/CurrencyProvider";
import ClientCommons from "./ClientCommons";
import { useEffect, useState } from "react";
import Script from "next/script";
import clsx from "clsx";
import Header3 from "./(client-components)/(Header)/Header3";
import LoadingProvider from "@/components/loader/Loader";
import { AppKnockProviders } from "./(account-pages)/account-auctions/components/knock-provider";
import PageConnectionError from "./(client-components)/PageConnectionError";
import { Metadata } from "next";
const currentUrl = process.env.NEXT_CURRENT_URL;

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});
export const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://yousell.zm";

export const metadata: Metadata = {
  title: "YouSell - Your Online Market",
  description:
    "Welcome to YouSell, your online market. We offer content marketing, graphic design, web design, IT consulting, and brand identity services.",
  metadataBase: new URL(BASE_URL),
  themeColor: "#0c0c0c",
  applicationName: "YouSell",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#0c0c0c",
      },
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
  openGraph: {
    title: "YouSell",
    description:
      "Welcome to YouSell, your digital partner. We offer content marketing, graphic design, web design, IT consulting, and brand identity services.",
    url: BASE_URL,
    siteName: "YouSell",
    images: [
      {
        url: `${BASE_URL}/favicon-32x32.png`,
        width: 32,
        height: 32,
        alt: "YouSell Icon",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "YouSell",
    description:
      "Welcome to YouSell, your digital partner for design, tech, and marketing.",
    images: [`${BASE_URL}/favicon-32x32.png`],
  },
};


export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  /*const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);*/


  return (
    <html lang="en-IN">
      <body
        className={clsx(
          "relative bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 overflow-y-scroll",
          dmSans.className // Apply font only after hydration
        )}
      >
        {/* Google Translate Element */}
        <div id="google_translate_element" className="absolute bottom-5 right-5"></div>

        {/* Providers 
        <PageConnectionError />*/}
        <NextTopLoader showSpinner={false} />
        <SessionProvider session={session as never}>
        <ReduxProvider>
        <AppKnockProviders>
          <LoadingProvider>
            <ClientCommons />
            <Header3 />
            <NuqsAdapter>
            {children}
            </NuqsAdapter>
            <Footer />
          </LoadingProvider>
          </AppKnockProviders>
        </ReduxProvider>
        </SessionProvider>

        {/* Footer Navigation */}

        {/* Move Scripts to the End of <body> */}
        <Script src="/assets/lang-config.js" strategy="beforeInteractive" />
        <Script src="/assets/translation.js" strategy="beforeInteractive" />
        <Script src="//translate.google.com/translate_a/element.js?cb=TranslateInit" strategy="afterInteractive" />
      </body>
    </html>
  );
}
