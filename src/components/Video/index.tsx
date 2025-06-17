"use client";
import { motion } from "motion/react";
import VideoPlayer from "../video_player";

interface PropertyVideoProps {
  videoSrc: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const PropertyVideo: React.FC<PropertyVideoProps> = ({
  videoSrc,
  title,
  description,
  buttonText = "View More",
  buttonLink = "/properties",
}) => {

  return (
    <div >
    <div>
      <h2 className="text-2xl font-semibold text-silverGray">Welcome view of Kingsland City </h2>
      <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {`Enjoying the best of life`}
      </span>
    </div>
    <div className="w-50 border-b border-neutral-200 dark:border-neutral-700 my-8"></div>
    
    <div
      className="relative w-full h-auto md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl shadow-lg"
    >
      {/* Video */}
      <VideoPlayer
        //ref={videoRef}
        url={videoSrc}
        title=""
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-2 text-lg md:text-xl max-w-2xl"
          >
            {description}
          </motion.p>
        )}
        {/* Button 
        <motion.a
          href={buttonLink}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 bg-gold text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-500 transition"
        >
          {buttonText}
        </motion.a>
        */}
      </div>
    </div>
    </div>
  );
};

export default PropertyVideo;
