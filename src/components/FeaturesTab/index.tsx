"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import FeaturesTabItem from "./FeaturesTabItem";
import { featuresTabData } from "./featuresTabData";
import { motion } from "motion/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoMdArrowForward } from "react-icons/io";

interface FeaturesTabProps {
  className?: string;
  data: any[];
}

const FeaturesTab: React.FC<FeaturesTabProps> = ({ data, className }) => {
  const [currentTab, setCurrentTab] = useState("tabOne");
  const [isMonthly, setIsMonthly] = useState(true);
  const sliderRef = useRef<any>(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      //{ breakpoint: 1280, settings: { slidesToShow: 3 } },
    ],
  };

  const handleNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <section className="relative ">
      <div className="relative mx-auto max-w-7xl ">
        <div className="absolute -top-16 -z-10 h-[300px] w-full max-w-6xl mx-auto">
          <Image
            fill
            className="dark:hidden"
            src="/images/shape/shape-dotted-light.svg"
            alt="Dotted Shape"
          />
          <Image
            fill
            className="hidden dark:block"
            src="/images/shape/shape-dotted-dark.svg"
            alt="Dotted Shape"
          />
        </div>

        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white">
            Sponsored Offers
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Best offers by our clients.
          </p>
        </div>

        <div className="border-b border-neutral-200 dark:border-neutral-700 mt-6 mb-10"></div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span
              onClick={() => setIsMonthly(true)}
              className={`cursor-pointer text-base font-semibold ${
                isMonthly ? "text-primary" : "text-neutral-600 dark:text-neutral-300"
              }`}
            >
              Monthly
            </span>
            <div onClick={() => setIsMonthly(!isMonthly)} className="relative cursor-pointer">
              <div className="h-5 w-12 rounded-full bg-gray-300 shadow-inner"></div>
              <div
                className={`absolute top-[-4px] left-0 h-7 w-7 rounded-full bg-white shadow-md transform transition-transform ${
                  isMonthly ? "translate-x-0" : "translate-x-full"
                }`}
              ></div>
            </div>
            <span
              onClick={() => setIsMonthly(false)}
              className={`cursor-pointer text-base font-semibold ${
                !isMonthly ? "text-primary" : "text-neutral-600 dark:text-neutral-300"
              }`}
            >
              Yearly
            </span>
          </div>

          <IoMdArrowForward
            className="text-xl text-primary cursor-pointer"
            onClick={handleNextSlide}
          />
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="animate_top"
        >
          <Slider ref={sliderRef} {...sliderSettings}>
            {data.map((feature: any, key: number) => (
              <div key={key} className="">
                <FeaturesTabItem
                  key={`${feature.name}-${key}`}
                  title={feature.name}
                  thumbnail={feature.thumbnail}
                  packageName={feature.packageSubscription}
                  price={isMonthly ? feature.paymentPackages.monthly : feature.paymentPackages.yearly}
                  duration={isMonthly ? "mo" : "yr"}
                  subtitle={feature.type}
                  amenitiesIncluded={feature.amenitiesIncluded}
                  features={feature.features}
                />
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesTab;
