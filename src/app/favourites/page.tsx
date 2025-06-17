import { PageSchema } from "@/app/schemas/page.schema";
import { ClassifiedCard } from "@/components/inventory/classified-card";
import { CustomPagination } from "@/components/shared/custom-pagination";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { routes } from "@/config/routes";
import type { Favourites, PageProps } from "@/config/types";
import { Car, ICar } from "@/lib/database/models/car.model";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";

export default async function FavouritesPage(props: PageProps) {
	const searchParams = await props.searchParams;
	const validPage = PageSchema.parse(searchParams?.page);

	const page = validPage ? validPage : 1;
	const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;

	const sourceId = await getSourceId();
	const favourites = await redis.get<Favourites>(sourceId ?? "");

	const favouriteIds = favourites?.ids ?? [];

	// Fetch classifieds with pagination
	const classifieds = await Car.find({
		_id: { $in: favouriteIds },
	})
		.skip(offset)
		.limit(CLASSIFIEDS_PER_PAGE)
		.lean() as unknown as ICar[];

	// Count total
	const count = await Car.countDocuments({
		_id: { $in: favouriteIds },
	});

	const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

	return (
		<div className="container mx-auto px-4 py-8 min-h-[80dvh]">
			<h1 className="text-3xl font-bold mb-6">Your Favourite Classifieds</h1>
			<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
				{classifieds.map((classified: any) => {
					return (
						<ClassifiedCard
							key={classified._id as string}
							classified={classified}
							favourites={favouriteIds}
						/>
					);
				})}
			</div>
			<div className="mt-8 flex">
				<CustomPagination
					baseURL={routes.favourites}
					totalPages={totalPages}
					styles={{
						paginationRoot: "justify-center",
						paginationPrevious: "",
						paginationNext: "",
						paginationLinkActive: "",
						paginationLink: "border-none active:border",
					}}
				/>
			</div>
		</div>
	);
}
