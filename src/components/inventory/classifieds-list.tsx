"use client";

import type { ClassifiedWithImages } from "@/config/types";
import { ClassifiedCard } from "./classified-card";
import { ICar } from "@/lib/database/models/car.model";
import CarCard3 from "../CarCard3";

interface ClassifiedsListProps {
	classifieds: ICar[];
	favourites: string[];
}

export const ClassifiedsList = (props: ClassifiedsListProps) => {
	const { classifieds, favourites } = props;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
			{classifieds.map((classified, i) => {
				return (
					<CarCard3
						key={i}
						data={classified}
					/>
				);
			})}
		</div>
	);
};
