// HeroWithListings.tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Building, CarFront, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import clsx from "clsx";
import estateImage from "@/images/hero-right.png";
import carImage from "@/images/hero-right-car.png";
import GridCarAuctions from "./GridCarAuctions";
import { IAuction } from "@/lib/database/models/auction.model";
import GridPropertyAuctions from "./GridPropertyAuctions";

// Placeholder types – replace with your actual types
interface Car {
  id: string;
  [key: string]: any;
}

interface Property {
  id: string;
  [key: string]: any;
}

interface AuctionsHeroProps {
  cars: IAuction[];
  properties: IAuction[];
}

const categoryImages = {
  property: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", // Modern house exterior
  car: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",      // Sports car in sunset
};


const AuctionsHero = ({ cars, properties }: AuctionsHeroProps) => {
  const [category, setCategory] = useState<"property" | "car">("property");

  const featuredListings = {
    property: properties?.slice(0, 4),
    car: cars?.slice(0, 4),
  };

  console.log("Featured Listings:", featuredListings);

  const listings = featuredListings[category];

  return (
    <section className="overflow-hidden py-24 px-4 sm:px-6 xl:px-0 bg-white dark:bg-neutral-950">
      
      <div className="relative py-4">
  {/* Background image */}
  <div className="absolute inset-0 z-10 pointer-events-none">
    <Image
      src={categoryImages[category]}
      alt="Category Background"
      fill
      className="object-cover opacity-50 blur-sm"
    />
  </div>

  {/* Foreground content */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10 max-w-5xl mx-auto text-center"
  >
    <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-800 dark:text-white mb-4">
      Discover Elite Auctions for
      <motion.span
        key={category}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="ml-2 text-primary-600 dark:text-primary-400"
      >
        {category === "property" ? "Properties" : "Cars"}
      </motion.span>
    </h1>

    <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto text-lg sm:text-xl mb-8">
      Bid on premium assets with confidence. Transparent, secure, and real-time auctioning experience.
    </p>

    <div className="flex justify-center gap-4 mb-6">
      <Button
        variant={category === "property" ? "default" : "outline"}
        onClick={() => setCategory("property")}
        className={clsx(
          "flex items-center gap-2 px-5 py-2 rounded-xl",
          category === "property" && "scale-105 bg-slate-900 text-white"
        )}
      >
        <Building className="w-5 h-5" /> Properties
      </Button>
      <Button
        variant={category === "car" ? "default" : "outline"}
        onClick={() => setCategory("car")}
        className={clsx(
          "flex items-center gap-2 px-5 py-2 rounded-xl",
          category === "car" && "scale-105 bg-slate-900 text-white"
        )}
      >
        <CarFront className="w-5 h-5" /> Cars
      </Button>
    </div>

    <div className="max-w-xl mx-auto flex items-center bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-full px-4 py-2 shadow-md">
      <Search className="text-neutral-500 dark:text-neutral-400 w-5 h-5 mr-2" />
      <Input
        type="text"
        placeholder={`Search ${category === "property" ? "Properties" : "Cars"}...`}
        className="flex-1 bg-transparent border-none focus:ring-0"
      />
      <Button className="rounded-full px-6 py-2 ml-2">Search</Button>
    </div>

    <motion.div
      key={category}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="mt-6 text-sm text-neutral-500 dark:text-neutral-400"
    >
      {category === "property" ? "120+" : "85+"} Active Listings
    </motion.div>
  </motion.div>
</div>


      {/* Featured Listings Grid */}
      <div className="mt-12 max-w-6xl mx-auto">
        <div className="">
          <h2 className="relative text-2xl font-semibold text-slate-700">Live Auctions
          <span className="absolute -top-1 -left-2 w-3 h-3 rounded-full bg-red-400 animate-ping"></span>
          <span className="absolute -top-1 -left-2 w-3 h-3 rounded-full bg-red-400"></span>
          </h2>
        </div>
        <div className="w-50 border-b border-neutral-200 dark:border-neutral-700 my-4"></div>
        {category === "car" ? (
          <GridCarAuctions carListings={featuredListings.car} />
        ) : (
          <GridPropertyAuctions data={featuredListings.property} />
        )}
      </div>
    </section>
  );
};

export default AuctionsHero;
