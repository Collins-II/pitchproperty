import { routes } from "@/config/routes";
import { CarIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Route } from "next";

export const EndButtons = () => {
	return (
		<div className="mt-6 flex items-center justify-center gap-4">
			<Button
				variant="outline"
				className="transition-colors hover:border-white hover:bg-primary hover:text-white"
				asChild
			>
				<Link href={routes.home as Route}>
					<HomeIcon className="mr-2 h-5 w-5" /> Go to Homepage
				</Link>
			</Button>
			<Button asChild>
				<Link href={routes.inventory as Route}>
					<CarIcon className="mr-2 h-5 w-5" /> View Classifieds
				</Link>
			</Button>
		</div>
	);
};
