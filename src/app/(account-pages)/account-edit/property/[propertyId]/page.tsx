import { validateIdSchema } from "@/app/schemas/id.schema";
import { routes } from "@/config/routes";
import type { PageProps } from "@/config/types";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import { Car } from "@/lib/database/models/car.model";
import { CarForm } from "@/app/(account-pages)/(components)/car-form";
import getListingById from "@/app/actions/getCarListingById";
import { getPropertyById } from "@/app/actions/getListings";
import { PropertyForm } from "@/app/(account-pages)/(components)/property-form";

export default async function EditClassified(props: PageProps) {
    const params = await props.params;

    // Assume id is a string now (MongoDB ObjectId)
    const { data, success } = validateIdSchema.safeParse({
        id: params?.propertyId,
    });

    if (!success || !mongoose.Types.ObjectId.isValid(data.id)) {
        redirect("/account-savelists");
    }

    const classified = await getPropertyById(data.id);

    if (!classified) {
        redirect("/account-savelists");
    }

    return <PropertyForm property={classified} />;
}
