"use client";

import { imageGallery as listingCarImageGallery } from "../app/(listing-detail)/listing-car-detail/constant";
import { useKeenSlider } from "keen-slider/react";
import { motion } from "motion/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export const FeaturesSection = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 1 },
      },
    },
  });

  return (
    <section className="relative bg-white overflow-hidden pt-16 lg:pt-24">
      <div className="container mx-auto px-6 lg:px-12 text-center flex justify-between items-center flex-col lg:flex-row">
        <div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-slate-900 text-md font-semibold uppercase tracking-widest mb-2"
        >
          We've got what you need
        </motion.h3>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-gray-900"
        >
          No Car? <span className="text-blue-600">No Problem.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto"
        >
          Explore our premium fleet — luxury, speed, and reliability at your fingertips. Drive the best with zero hassle.
        </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Link
            href="/vehicles"
            className="inline-block bg-slate-900 text-white text-base font-medium px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
          >
            Explore Fleet
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="relative rounded-3xl overflow-hidden shadow-xl">
          <div ref={sliderRef} className="keen-slider">
            {listingCarImageGallery.slice(0, 5).map((img, index) => (
              <div
                key={index}
                className="keen-slider__slide flex items-center justify-center"
              >
                <img
                  src={img.url}
                  alt={`Featured car ${index + 1}`}
                  className="w-full h-[120px] sm:h-[220px] object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/50 to-transparent z-10 pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
};
