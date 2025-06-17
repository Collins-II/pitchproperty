import { ClassifiedBadgeMap } from "@/config/constants";
import type { ClassifiedWithImages } from "@/config/types";
import { formatClassifiedStatus, formatColour, formatPrice } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { TableCell, TableRow } from "../ui/table";
import { ActionButtons } from "./action-buttons";
import { ICar } from "@/lib/database/models/car.model";

interface ClassifiedsTableRowProps {
	classified: ICar;
};

export const ClassifiedsTableRow = ({classified}:ClassifiedsTableRowProps) => {
	return (
		<TableRow className="text-muted/75 border-white/5 hover:bg-primary-300">
			<TableCell className="font-medium">{classified._id}</TableCell>
			<TableCell className="p-0">
				<Image
					src={classified.galleryImgs[0]}
					alt={classified.title as string}
					width={120}
					height={80}
					quality={1}
					className="aspect-3/2 object-cover rounded p-0.5"
				/>
			</TableCell>
			<TableCell className="hidden md:table-cell">{classified.title}</TableCell>
			<TableCell className="hidden md:table-cell">
				{formatPrice(
					classified.price.toString())}
			</TableCell>
			<TableCell className="hidden md:table-cell">{classified.vrm}</TableCell>
			<TableCell className="hidden md:table-cell">
				{formatColour(classified.colour)}
			</TableCell>
			<TableCell className="hidden md:table-cell">
				<Badge variant={ClassifiedBadgeMap[classified.status]}>
					{formatClassifiedStatus(classified.status)}
				</Badge>
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{classified.createdAt
                  && format(typeof classified.createdAt === "string" ? parseISO(classified.createdAt) : classified.createdAt, "do MMM yyy HH:mm") }
			</TableCell>
			<TableCell>{classified.views}</TableCell>
			<TableCell className="flex gap-x-2">
				<ActionButtons classified={classified} />
			</TableCell>
		</TableRow>
	);
};
