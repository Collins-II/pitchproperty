import { PageSchema } from "@/app/schemas/page.schema";
import { ClassifiedsList } from "@/components/inventory/classifieds-list";
import { DialogFilters } from "@/components/inventory/dialog-filters";
import { InventorySkeleton } from "@/components/inventory/inventory-skeleton";
import { Sidebar } from "@/components/inventory/sidebar";
import { CustomPagination } from "@/components/shared/custom-pagination";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { routes } from "@/config/routes";
import type { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import { connectToDatabase } from "@/lib/database";
import { CarStatus, Car } from "@/lib/database/models/car.model";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { Suspense } from "react";
import { buildSearchQuery, getCarBySearch } from "../../actions/getCarPremiums";

export const dynamic = 'force-dynamic';

export default async function InventoryPage(props: PageProps) {
  try {
    await connectToDatabase();

    const searchParams = await props.searchParams;

    const validPage = PageSchema.parse(searchParams?.page);
    const page = validPage || 1;
    const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;

    const [classifieds, count] = await Promise.all([
      getCarBySearch(searchParams),
      Car.countDocuments(buildSearchQuery(searchParams)),
    ]);
  
    const minMaxResult = await Car.aggregate([
      { $match: { status: CarStatus.LIVE } },
      {
        $group: {
          _id: null,
          minYear: { $min: "$year" },
          maxYear: { $max: "$year" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          minOdoReading: { $min: "$odoReading" },
          maxOdoReading: { $max: "$odoReading" },
        },
      },
      {
        $project: {
          _id: 0,
          _min: {
            year: "$minYear",
            price: "$minPrice",
            odoReading: "$minOdoReading",
          },
          _max: {
            year: "$maxYear",
            price: "$maxPrice",
            odoReading: "$maxOdoReading",
          },
        },
      },
    ]).then((res) => res[0] || { _min: {}, _max: {} });
  
    const sourceId = await getSourceId();
  
    let favourites: Favourites | null = null;
    try {
      favourites = await redis.get<Favourites>(sourceId ?? "");
    } catch (redisErr) {
      console.warn("Redis fetch failed:", redisErr);
    }
  
    const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

    return (
      <div className="flex overflow-y-auto">
        <Sidebar minMaxValues={minMaxResult} searchParams={searchParams} />

        <div className="flex-1 p-4 bg-neutral-100 dark:bg-neutral-900">
          <div className="flex space-y-2 items-center justify-between pb-4 -mt-1">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-sm md:text-base lg:text-xl font-semibold min-w-fit">
                We have found {count} classifieds
              </h2>
              <DialogFilters
                minMaxValues={minMaxResult}
                count={count}
                searchParams={searchParams}
              />
            </div>
            <CustomPagination
              baseURL={routes.inventory}
              totalPages={totalPages}
              styles={{
                paginationRoot: "justify-end hidden lg:flex",
                paginationPrevious: "",
                paginationNext: "",
                paginationLink: "border-none active:border text-black",
                paginationLinkActive: "",
              }}
            />
          </div>

          <Suspense fallback={<InventorySkeleton />}>
            <ClassifiedsList
              classifieds={classifieds}
              favourites={favourites ? favourites.ids : []}
            />
          </Suspense>

          <CustomPagination
            baseURL={routes.inventory}
            totalPages={totalPages}
            styles={{
              paginationRoot: "justify-center lg:hidden pt-12",
              paginationPrevious: "",
              paginationNext: "",
              paginationLink: "border-none active:border",
              paginationLinkActive: "",
            }}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("InventoryPage error:", error);
    throw new Error("Failed to load inventory page.");
  }
}
