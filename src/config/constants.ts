import type { BadgeProps } from "@/components/ui/badge";
import { routes } from "./routes";
import { CarStatus } from "@/lib/database/models/car.model";
import { CustomerStatus } from "@/lib/database/models/customer.model";

export const imageSources = {
	classifiedPlaceholder:
		"https://majestic-motors.s3.eu-west-2.amazonaws.com/uploads/classified-placeholder.jpeg",
	carLinup:
		"https://majestic-motors.s3.eu-west-2.amazonaws.com/uploads/car-lineup.jpeg",
	featureSection:
		"https://majestic-motors.s3.eu-west-2.amazonaws.com/uploads/feature-section.jpg",
};
export const CLASSIFIEDS_PER_PAGE = 3;

export const navLinks = [
	{ id: 1, href: routes.home, label: "Home" },
	{ id: 2, href: routes.inventory, label: "Inventory" },
];

export const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in seconds
export const MAX_IMAGE_SIZE = 20 * 1000 * 1000; // 2mb
export const MAX_IMAGES = 20;
export const sortOrder = ["asc", "desc"] as const;

export const ClassifiedBadgeMap: Record<
	CarStatus,
	BadgeProps["variant"]
> = {
	[CarStatus.DRAFT]: "secondary",
	[CarStatus.LIVE]: "default",
	[CarStatus.SOLD]: "destructive",
	[CarStatus.PURCHASED]: "warning",
	[CarStatus.SUBSCRIBER]: "warning",
};

export const CustomerBadgeMap: Record<CustomerStatus, BadgeProps["variant"]> = {
	[CustomerStatus.COLD]: "secondary",
	[CustomerStatus.CONTACTED]: "default",
	[CustomerStatus.INTERESTED]: "destructive",
	[CustomerStatus.PURCHASED]: "warning",
	[CustomerStatus.SUBSCRIBER]: "info",
};
