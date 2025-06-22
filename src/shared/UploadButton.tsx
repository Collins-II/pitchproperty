"use client";

import { motion } from "motion/react";
import { Upload } from "lucide-react"; // Lightweight icon
import { useRouter } from "next-nprogress-bar";

const UploadButton = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/upload-listing");
    };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 bg-slate-900 dark:bg-neutral-700 dark:text-white hover:bg-slate-700 text-white font-semibold px-6 py-1.5 rounded-full shadow-lg transition-all"
    >
      <Upload size={20} className="text-white" />
      Upload Listing
    </motion.button>
  );
};

export default UploadButton;
