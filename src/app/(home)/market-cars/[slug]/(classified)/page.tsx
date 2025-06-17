import { ClassifiedView } from "@/components/classified/classified-view";
import { routes } from "@/config/routes";
import type { PageProps } from "@/config/types";
import { Car, CarStatus } from "@/lib/database/models/car.model";
import { notFound, redirect } from "next/navigation";

export default async function ClassifiedPage(props: PageProps) {
	const params = await props?.params;
	const slug = decodeURIComponent(params?.slug as string);

	if (!slug) notFound();

	const classified = await Car.findOne({ slug })
		.populate("make")
		.populate("images")
		.lean();

	if (!classified) notFound();

	/*if (classified.status === CarStatus.SOLD) {
		redirect(routes.notAvailable(classified.slug));
	}*/

	return <ClassifiedView {...classified} />;
}
