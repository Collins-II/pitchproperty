import { carBrands } from "@/data/dummy";
import Image from "next/image";
import Link from "next/link";

export const OurBrandsSection = async () => {

	const count = 234; // Placeholder for the count of vehicles in stock

	return (
		<div className="py-16 sm:py-24">
			<div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
				<div className="px-6 lg:px-8 sm:text-center">
					<h2 className="mt-2 uppercase text-2xl font-bold tracking-tight text-silverGray sm:text-4xl">
						Our Brands
					</h2>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						We have {count} vehicles in stock, ready for same-day drive away.
					</p>
				</div>
				<div className="grid grid-cols-3 lg:grid-cols-5 gap-4 bg-white dark:bg-neutral-800 px-4 py-6 rounded-lg">
					{carBrands.map(({ id, image, name }) => (
						<Link
							key={id}
							href={`/`}
							className="hover:scale-110 transition-all duration-100 ease-in-out relative h-24 flex items-center justify-center"
						>
							<Image
								src={image}
								alt={name}
								className="object-contain aspect-1/1"
								fill={true}
							/>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};
