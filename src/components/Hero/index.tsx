"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import estateImage from "@/images/hero-right.png";
import carImage from "@/images/hero-right-car.png";
import { useRouter } from "next/navigation";

const fadeIn = (direction = "up", delay = 0) => {
  return {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : 0,
      x: direction === "left" ? 40 : 0,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        delay,
        type: "spring",
        stiffness: 50,
      },
    },
  };
};

const Hero: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/listing-car");
  };
  const handleButtonClick2 = () => {
    router.push("/estates");
  };

  return (
    <div className="w-full">
      {/* Estate Section */}
      <section className="relative py-20 px-4 md:px-10 xl:px-32 flex flex-col-reverse lg:flex-row items-center gap-10">
        <motion.div
          className="w-full lg:w-1/2 space-y-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeIn("left", 0.2)}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Find Your <span className="text-primary-600">Dream Home</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover premium estates for rent or sale, curated for your lifestyle.
          </p>
          <div className="flex gap-4">
            <Button onClick={handleButtonClick2} variant="secondary" className="bg-slate-900 text-white" size="lg">Browse Estates</Button>
          </div>
        </motion.div>
        <motion.div
          className="w-full lg:w-1/2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeIn("up", 0.4)}
        >
          <Image
            src={estateImage}
            alt="Estate Showcase"
            className="rounded-3xl w-full h-auto object-cover"
            priority
          />
        </motion.div>
      </section>

      {/* Car Dealer Section */}
      <section className="relative bg-gradient-to-bl from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 py-10 px-4 md:px-10 xl:px-32 flex flex-col lg:flex-row items-center gap-10 rounded-3xl">
        <motion.div
          className="w-full lg:w-1/2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeIn("up", 0.2)}
        >
          <Image
            src={carImage}
            alt="Car Showcase"
            className="rounded-3xl w-full h-auto object-cover"
            priority
          />
        </motion.div>
        <motion.div
          className="w-full lg:w-1/2 space-y-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeIn("right", 0.4)}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Drive Your <span className="text-primary-600">Dream Car</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Buy or rent quality vehicles with ease and convenience.
          </p>
          <div className="flex gap-4">
            <Button onClick={handleButtonClick} variant="secondary" className="bg-slate-900 text-white" size="lg">Browse Cars</Button>
          </div>
        </motion.div>
      </section>

      {/* Optional Hero Filter Section 
      <div className="px-4 py-10 md:px-10 xl:px-32">
        <HeroFilter />
      </div>
      */}
      <div className="border-b border-[2px] border-neutral-900 dark:border-neutral-700 mb-10"></div>
    </div>
  );
};

export default Hero;
