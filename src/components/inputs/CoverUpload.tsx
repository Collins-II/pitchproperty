"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

export const uploadPreset = "jxrisjxq";

interface CoverUploadProps {
  onChange: (value: string) => void;
  value: string;
  maxFiles: number;
}

const CoverUpload: React.FC<CoverUploadProps> = ({
  onChange,
  value,
  maxFiles,
}) => {
 const handleUpload = useCallback(
     (result: any) => {
       const newImageUrl = result.info.secure_url;
       if (maxFiles === 1) {
         onChange(newImageUrl); // Single image case
       }
     },
     [onChange, value, maxFiles]
   );
  const handleRemove = () => {
  
      onChange(""); // Clear the single image
  };

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {/* Display Images */}
            {value && (
              <div className="absolute inset-0 w-full h-full rounded-md grid grid-cols-3 gap-2">
                  <div className="relative w-full h-full">
                    <Image
                      fill
                      style={{ objectFit: "cover" }}
                      src={value}
                      alt={`Uploaded cover image`}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove();
                      }}
                      className="
                        absolute 
                        top-2 
                        right-2 
                        bg-white 
                        text-red-500 
                        rounded-full 
                        p-1 
                        shadow-md 
                        hover:bg-red-500 
                        hover:text-white 
                        transition
                      "
                    >
                      ✕
                    </button>
                  </div>
              </div>
            )}

            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default CoverUpload;
