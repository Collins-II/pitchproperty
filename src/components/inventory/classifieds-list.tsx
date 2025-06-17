"use client";

import type { ClassifiedWithImages } from "@/config/types";
import { ClassifiedCard } from "./classified-card";
import { ICar } from "@/lib/database/models/car.model";

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
					<ClassifiedCard
						key={i}
						classified={classified}
						favourites={favourites}
					/>
				);
			})}
		</div>
	);
};
