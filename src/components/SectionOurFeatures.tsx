"use client";

import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import rightImgPng from "@/images/our-features.png";
import Badge from "@/shared/Badge";
import { ShieldCheck } from "lucide-react";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: StaticImageData;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "py-16 lg:py-24",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <section
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      {/* Image Section */}
      <div className="flex-grow w-full lg:w-1/2">
        <Image
          src={rightImg}
          alt="Feature Preview"
          className="rounded-2xl w-full h-auto"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Text Content */}
      <div
        className={`max-w-2xl flex-shrink-0 mt-12 lg:mt-0 lg:w-1/2 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-silverGray dark:text-white">
          Why Choose Us
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 mt-4 text-lg">
          Discover how we provide value for your listings and offer seamless booking experiences.
        </p>

        <ul className="mt-10 space-y-10">
          <li className="space-y-3">
            <Badge icon={ShieldCheck} name="Advertising" color="gray"/>
            <h3 className="text-2xl font-semibold text-neutral-800 dark:text-white">
              Cost-effective advertising
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400">
              List your rentals for free and enjoy visibility without any upfront investment.
            </p>
          </li>

          <li className="space-y-3">
            <Badge icon={ShieldCheck} name="Exposure" color="green" />
            <h3 className="text-2xl font-semibold text-neutral-800 dark:text-white">
              Reach millions with ease
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400">
              Tap into a global audience seeking unique and trustworthy rentals and sales.
            </p>
          </li>

          <li className="space-y-3">
            <Badge icon={ShieldCheck} name="Secure" color="yellow" />
            <h3 className="text-2xl font-semibold text-neutral-800 dark:text-white">
              Secure and seamless bookings
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400">
              Use our safe and reliable system to manage bookings and receive payments effortlessly.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SectionOurFeatures;
