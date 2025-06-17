"use client";

import { routes } from "@/config/routes";
import { type ICar } from "@/lib/database/models/car.model";
import {
	formatColour,
	formatFuelType,
	formatNumber,
	formatOdometerUnit,
	formatPrice,
	formatTransmission,
} from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Cog, Fuel, GaugeCircle, Paintbrush2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FavouriteButton } from "./favourite-button";
import { MultiStepFormEnum } from "@/config/types";
import Image from "next/image";
import { Route } from "next";

interface ClassifiedCardProps {
	classified: ICar;
	favourites: string[];
}

const getKeyClassifiedInfo = (classified: ICar) => {
	return [
		{
			id: "odoReading",
			icon: <GaugeCircle className="w-4 h-4" />,
			value: `${formatNumber(classified.odoReading)} ${formatOdometerUnit(classified.odoUnit)}`,
		},
		{
			id: "transmission",
			icon: <Cog className="w-4 h-4" />,
			value: classified.transmission ? formatTransmission(classified.transmission) : null,
		},
		{
			id: "fuelType",
			icon: <Fuel className="w-4 h-4" />,
			value: classified.fuelType ? formatFuelType(classified.fuelType) : null,
		},
		{
			id: "colour",
			icon: <Paintbrush2 className="w-4 h-4" />,
			value: classified.colour ? formatColour(classified.colour) : null,
		},
	];
};

export const ClassifiedCard = ({ classified, favourites }: ClassifiedCardProps) => {
	const pathname = usePathname();
	const [isFavourite, setIsFavourite] = useState(favourites.includes(classified._id));
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		if (!isFavourite && pathname === routes.favourites) {
			setIsVisible(false);
		}
	}, [isFavourite, pathname]);

	const firstImage = classified.galleryImgs?.[0];

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					className="bg-white relative rounded-md shadow-md overflow-hidden flex flex-col"
				>
					<div className="aspect-[3/2] relative">
						<Link href={`/listing-car-detail/${classified._id}` as Route} className="block">
								{firstImage ? (
									<Image
										src={firstImage}
										alt={classified.title || "Car image"}
										className="object-cover rounded-t-md"
										fill
										sizes="(max-width: 768px) 100vw, 50vw"
										priority
									/>
								) : (
									<div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
										No Image
									</div>
								)}
						</Link>

						<FavouriteButton
							setIsFavourite={setIsFavourite}
							isFavourite={isFavourite}
							id={classified._id}
						/>

						<div className="absolute top-2.5 right-3.5 bg-primary text-white font-bold px-2 py-1 rounded">
							<p className="text-xs lg:text-base xl:text-lg font-semibold">
								{formatPrice(classified.price.toString())}
							</p>
						</div>
					</div>

					<div className="p-4 flex flex-col space-y-3">
						<div>
							<Link
								href={routes.singleClassified(classified._id) as Route}
								className="text-sm md:text-base lg:text-lg font-semibold line-clamp-1 transition-colors hover:text-primary"
							>
								{classified.title}
							</Link>

							{classified.description && (
								<div className="text-xs md:text-sm xl:text-base text-gray-500 line-clamp-2">
									
								</div>
							)}

							<ul className="text-xs md:text-sm text-gray-600 xl:flex grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-4 items-center justify-between w-full mt-2">
								{getKeyClassifiedInfo(classified)
									.filter((v) => v.value)
									.map(({ id, icon, value }) => (
										<li
											key={id}
											className="font-semibold flex xl:flex-col items-center gap-x-1.5"
										>
											{icon} {value}
										</li>
									))}
							</ul>
						</div>

						<div className="mt-4 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:gap-x-2 w-full">
							<Button
								className="flex-1 hover:border-white hover:bg-primary hover:text-white py-2 lg:py-2.5 text-xs md:text-sm xl:text-base"
								asChild
								variant="outline"
								size="sm"
							>
								<Link
									href={routes.reserve(
										classified._id,
										MultiStepFormEnum.WELCOME
									) as Route}
								>
									Reserve
								</Link>
							</Button>

							<Button
								className="flex-1 py-2 lg:py-2.5 text-xs md:text-sm xl:text-base"
								asChild
								size="sm"
							>
								<Link href={routes.singleClassified(classified._id) as Route}>
									View Details
								</Link>
							</Button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
