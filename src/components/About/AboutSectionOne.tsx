"use client";

import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { motion } from "motion/react";

import aboutImg from "../../images/ests/est_6.jpg";
import aboutImg1 from "../../images/ests/est_4.jpg";
import VideoPlayer from "../video_player";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const List = ({ text}:any ) => (
    <motion.div
    className="flex items-center gap-3 rounded-lg p-3 text-lg font-medium transition-all duration-300"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
  >
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white dark:bg-primary-400 dark:text-black shadow-md">
      <CheckCircleIcon className="h-20 w-20" />
    </span>
    <p className="text-gray-800 dark:text-gray-200">{text}</p>
  </motion.div>
  );

  return (
    <section id="about" className="">
      <div className="">
        <div className="border-b border-white/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center ">
            <div className="z-10 w-full px-4 lg:w-1/2">
              <SectionTitle
                title="Playtime, fun at the Central Park."
                paragraph="Enjoy safe workouts and joyful playtime at Kingsland City’s Central Park – your secure haven for a healthy lifestyle. 🌳✨"
                mb="44px"
              />

              <div
                className="mb-12 max-w-[570px] lg:mb-0"
                data-wow-delay=".15s"
              >
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Conference & Banquet" />
                    <List text="Children’s Play Areas" />
                    <List text="Luxury Accommodations" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Nature Trails & Parks" />
                    <List text="Restaurants & Cafés" />
                    <List text="Transportation Services" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
            <VideoPlayer url="/videos/cityVid3.mp4" title="Kingsland City's Central Park"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
