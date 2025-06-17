"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "motion/react";

interface CTAProps {
  title: string;
  subtitle: string;
  imageSrc: string | StaticImageData;
  imageAlt?: string;
  buttonText?: string;
  buttonLink?: string;
}
const CTA: React.FC<CTAProps> = ({ title, subtitle, imageSrc, imageAlt, buttonLink, buttonText }) => {

  return (
    <>
      {/* <!-- ===== Kingsland City Estates CTA Start ===== --> */}
      <section className="overflow-hidden 2xl:px-0">
        <div className="max-w-c-1390 rounded-lg bg-gradient-to-t from-[#121212] to-[#1B365D] px-7.5 py-12.5  md:px-12.5 xl:px-17.5 xl:py-0">
          <div className="flex flex-wrap gap-8 md:flex-nowrap md:items-center md:justify-between md:gap-0">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-[70%] lg:w-1/2"
            >
              <h2 className="mb-4 w-11/12 text-3xl font-bold text-silverGray xl:text-sectiontitle4">
                {title}
              </h2>
              <p className="text-lightGray">
                {subtitle}
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right lg:w-[45%]"
            >
              <div className="flex items-center justify-end xl:justify-between">
                <Image
                  width={299}
                  height={299}
                  src={imageSrc}
                  alt="Kingsland City Estates"
                  className="hidden xl:block"
                />
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2.5 rounded-full bg-gold px-4 py-3 font-medium text-white hover:opacity-90 "
                >
                  Get in Touch
                  <Image
                    width={20}
                    height={20}
                    src="/images/icon/icon-arrow-dark.svg"
                    alt="Arrow"
                    className=""
                  /> 
                 {/* <Image
                    width={20}
                    height={20}
                    src="/images/icon/icon-arrow-light.svg"
                    alt="Arrow"
                    className="block"
                  />
                  */}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Kingsland City Estates CTA End ===== --> */}
    </>
  );
};

export default CTA;
