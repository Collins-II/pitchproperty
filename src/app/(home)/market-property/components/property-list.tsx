"use client";

import StayCard2 from "@/components/StayCard2";
import type { ClassifiedWithImages } from "@/config/types";
import { IProperty } from "@/lib/database/models/property.model";

interface PropertyListProps {
    classifieds: IProperty[];
    favourites: string[];
}

export const PropertyList = (props: PropertyListProps) => {
    const { classifieds, favourites } = props;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {classifieds.map((classified, i) => {
                return (
                    <StayCard2
                        key={i}
                        data={classified}
                        //key={classified._id}
                        //favourites={favourites}
                    />
                );
            })}
        </div>
    );
};
