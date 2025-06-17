import { validateIdSchema } from "@/app/schemas/id.schema";
import { routes } from "@/config/routes";
import type { PageProps } from "@/config/types";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import { Car } from "@/lib/database/models/car.model";
import { CarForm } from "@/app/(account-pages)/(components)/car-form";
import getListingById from "@/app/actions/getCarListingById";

export default async function EditClassified(props: PageProps) {
    const params = await props.params;

    // Assume id is a string now (MongoDB ObjectId)
    const { data, success } = validateIdSchema.safeParse({
        id: params?.carId,
    });

    if (!success || !mongoose.Types.ObjectId.isValid(data.id)) {
        redirect(routes.admin.classifieds);
    }

    const classified = await getListingById(data.id);

    if (!classified) {
        redirect(routes.admin.classifieds);
    }

    return <CarForm classified={classified} />;
}
