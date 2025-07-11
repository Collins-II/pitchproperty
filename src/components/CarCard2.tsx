import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { createSlug, formatCurrency } from "@/lib/helper";
import {
  CogIcon,
  FuelIcon,
  GaugeIcon,
  Tag,
} from "lucide-react";
import { CAR_CONDITION_OPTIONS } from "@/constants/car-options";

type CarCardProps = {
  data: {
    _id: string;
    slug?: string;
    featuredImage: string;
    galleryImgs?: string[];
    title?: string;
    description?: string;
    price: number;
    fuelType: string;
    odoReading: number;
    odoUnit: string;
    status: string;
    transmission: string;
    currency: string;
  };
  layout?: "grid" | "list";
};

const CarCard2: React.FC<CarCardProps> = ({ data, layout = "grid" }) => {
  const {
    _id,
    slug,
    featuredImage,
    galleryImgs,
    title,
    description,
    price,
    fuelType,
    odoReading,
    odoUnit,
    status,
    transmission,
    currency,
  } = data;

  const urlSlug = slug || createSlug(title || "car");
  const conditionLabel =
    CAR_CONDITION_OPTIONS.find((opt) => opt.value === status)?.label || status;

  return (
    <div>
      <Link href={`/detail/${urlSlug}/${_id}`}>
        <Card
          className={cn(
            `border rounded-lg shadow-sm p-0 flex flex-col gap-4`,
            layout === "list" &&
              "flex-row border-primary/30 gap-0 md:gap-4"
          )}
        >
          {/* Image Section */}
          <div
            className={cn(
              `relative w-full min-h-28 !h-[210px] bg-primary/10 overflow-hidden`,
              layout === "list" &&
                `w-[152px] !h-auto md:w-[220px] md:h-[210px] shrink-0`
            )}
          >
            <Image
              src={galleryImgs?.[0] as string}
              alt={title || "car image"}
              className={cn(
                `rounded-t-lg w-full h-full object-cover`,
                layout === "list" && "!rounded-r-none"
              )}
              width={layout === "list" ? 300 : 800}
              height={layout === "list" ? 200 : 500}
            />
          </div>

          {/* Content Section */}
          <CardContent
            className={cn(
              `!p-4 !pt-0 space-y-1`,
              layout === "list" &&
                "flex-1 !p-[10px_16px_18px_16px] md:!p-[18px_16px_18px_0px]"
            )}
          >
            <div className="flex flex-col gap-0">
              <h3
                className={cn(
                  `font-bold text-xs sm:text-base text-gray-800 capitalize truncate whitespace-normal`,
                  layout === "list" &&
                    "w-auto tracking-tighter sm:tracking-normal"
                )}
              >
                {title}
              </h3>

              <div
                className={cn(
                  `h-auto mt-1 text-xs sm:text-sm text-gray-500 line-clamp-2 text-ellipsis`,
                  layout === "list" &&
                    "w-auto h-auto whitespace-break-spaces"
                )}
              >
                {description}
              </div>
            </div>

            <div className="flex items-center !mt-2">
              <p className="font-bold text-base sm:text-lg lg:text-xl text-primary">
                {formatCurrency(price)}
              </p>
            </div>

            <div
              className={cn(
                `flex flex-wrap items-center gap-2`,
                layout === "list" && "mt-1 hidden sm:flex"
              )}
            >
              <Badge
                variant="outline"
                className="border-primary items-center gap-1.5 text-[11px] capitalize !font-medium py-[3px] px-2"
              >
                <FuelIcon className="size-3 mb-px" />
                {fuelType?.toLowerCase()}
              </Badge>

              <Badge
                variant="outline"
                className="border-primary gap-1.5 text-[11px] capitalize !font-medium py-[3px] px-2"
              >
                <GaugeIcon className="size-3 mb-px" />
                {odoReading} {odoUnit}
              </Badge>

              <Badge
                variant="outline"
                className="border-primary gap-1.5 text-[11px] capitalize !font-medium py-[3px] px-2"
              >
                <Tag className="size-3 mb-px" />
                {conditionLabel}
              </Badge>

              <Badge
                variant="outline"
                className="border-primary gap-1.5 text-[11px] capitalize !font-medium py-[3px] px-2"
              >
                <CogIcon className="size-3 mb-px" />
                {transmission?.toLowerCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default CarCard2;
