"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Hero images
import heroCars from "@/images/cars/2.png";
import heroProps from "@/images/ests/est_2.jpg";
import LiveAuctionsTicker from "./components/bids-section";
import CompletedAuctionsFeed from "./components/completed-feed";

export default function LandingPage() {
  return (
    <main className="flex flex-col gap-24 pb-24">
      {/* -------------------------------------------------- */}
      {/* Hero */}
      {/* -------------------------------------------------- */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={heroCars}
          alt="Luxury cars"
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60 dark:opacity-40" />
        <div className="container flex flex-col items-center justify-center gap-10 py-32 text-center text-slate-700">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-4xl/tight font-extrabold sm:text-5xl lg:text-6xl">
            Bid on <span className="text-primary-500">dream rides</span> &
            <span className="text-secondary"> prime properties</span> — live, transparent, thrilling.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-lg sm:text-xl text-gray-200">
            Join Africa’s most trusted real‑time auction marketplace for vehicles and real estate.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-blue-500 hover:bg-white text-white hover:text-slate-900">
              <Link href="/auctions/live">Explore Live Auctions</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 text-gray-100 border-gray-200/50 hover:bg-white hover:text-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900">
              <Link href="/auctions">Sell with Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* Live activity ribbon */}
      {/* -------------------------------------------------- 
      <section className="container grid lg:grid-cols-2 gap-8">
        <LiveAuctionsTicker />
        <CompletedAuctionsFeed />
      </section>

       -------------------------------------------------- */}
      {/* Featured Categories */}
      {/* -------------------------------------------------- 
      <section className="container flex flex-col gap-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
          Featured Categories
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Cars 
          <Link href="/auctions/live" className="group relative block overflow-hidden rounded-3xl shadow-lg">
            <Image src={heroCars} alt="Cars" className="h-80 w-full object-cover transition-transform group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-6 left-6 text-2xl font-semibold text-white">Cars</span>
          </Link>

        
          <Link href="/auctions/live" className="group relative block overflow-hidden rounded-3xl shadow-lg">
            <Image src={heroProps} alt="Properties" className="h-80 w-full object-cover transition-transform group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-6 left-6 text-2xl font-semibold text-white">Properties</span>
          </Link>
        </div>
      </section>

       -------------------------------------------------- */}
      {/* How it works */}
      {/* -------------------------------------------------- 
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="container grid md:grid-cols-3 gap-12 text-center">
          {[
            {
              title: "Browse & Watch",
              text: "Filter thousands of listings, save favourites and set bid alerts in one click.",
              icon: "🔍",
            },
            {
              title: "Bid with Confidence",
              text: "Transparent increments, real‑time currency conversion and instant notifications.",
              icon: "⚡️",
            },
            {
              title: "Win & Close Securely",
              text: "Our escrow‑backed checkout guarantees safe payment and document transfer.",
              icon: "🏆",
            },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4 p-6 rounded-xl shadow-sm bg-white dark:bg-gray-900/70">
              <span className="text-4xl">{step.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-sm">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

       -------------------------------------------------- */}
      {/* Call to action */}
      {/* -------------------------------------------------- 
      <section className="container flex flex-col items-center gap-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 max-w-3xl">
          Ready to get the best price for your asset?
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
          List your vehicle or property today and reach thousands of verified bidders across the continent.
        </p>
        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link href="/auctions">Start Selling</Link>
        </Button>
      </section>
      */}
    </main>
  );
}
