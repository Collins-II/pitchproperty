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
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <>
      {/* <!-- ===== Features Tab Start ===== --> */}
      <section className="relative pt-18.5">
        <div className="relative mx-auto max-w-c-1390 px-0 2xl:px-0">
          <div className="absolute -top-16 -z-1 mx-auto h-[350px] w-[90%]">
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

          <div>
            <h2 className="text-2xl font-semibold text-silverGray">Sponsored Offers</h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              Best offers by our clients.
            </span>
          </div>
          <div className="w-50 border-b border-neutral-200 dark:border-neutral-700 mt-4 mb-8"></div>

          <div className="w-full flex justify-between items-center pb-5 pl-8 sm:pr-0 lg:pr-24 ">
            <div className="flex justify-start ">
              <span
                onClick={() => setIsMonthly(true)}
                className={`mr-4 cursor-pointer text-base font-semibold ${
                  isMonthly ? "pointer-events-none text-primary" : "text-dark dark:text-white"
                }`}
              >
                Monthly
              </span>
              <div
                onClick={() => setIsMonthly(!isMonthly)}
                className="flex cursor-pointer items-center"
              >
                <div className="relative">
                  <div className="h-5 w-12 rounded-full bg-[#c1c3d4] shadow-inner"></div>
                  <div
                    className={`shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-silverGray transition ${
                      isMonthly ? "" : "translate-x-full"
                    }`}
                  >
                    <span className="active h-4 w-4 rounded-full bg-white"></span>
                  </div>
                </div>
              </div>
              <span
                onClick={() => setIsMonthly(false)}
                className={`ml-4 cursor-pointer text-base font-semibold ${
                  isMonthly ? "text-dark dark:text-white" : "pointer-events-none text-primary"
                }`}
              >
                Yearly
              </span>
            </div>
            <IoMdArrowForward className="cursor-pointer" onClick={handleNextSlide} />
          </div>

          {/* <!-- Tab Content Start --> */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="animate_top max-w-c-1154"
          >
            <Slider ref={sliderRef} {...sliderSettings}>
              {data.map((feature: any, key: number) => (
                <div key={key}>
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
          {/* <!-- Tab Content End --> */}
        </div>
      </section>
      {/* <!-- ===== Features Tab End ===== --> */}
    </>
  );
};

export default FeaturesTab;
