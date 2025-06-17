import { CustomerBadgeMap } from "@/config/constants";
import type { CustomerWithClassified } from "@/config/types";
import { formatCustomerStatus } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { TableCell, TableRow } from "../ui/table";
import { ActionButtons } from "./action-buttons";
import { ICustomer } from "@/lib/database/models/customer.model";

export const CustomerTableRow = (customer: ICustomer) => {
	return (
		<TableRow className="text-muted/75 border-white/5 hover:bg-primary-300">
			<TableCell className="font-medium">{customer._id}</TableCell>
			<TableCell className="font-medium">
				<Badge
					className="text-muted/75"
					variant={CustomerBadgeMap[customer.status]}
				>
					{formatCustomerStatus(customer.status)}
				</Badge>
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{customer.firstName} {customer.lastName}
			</TableCell>
			<TableCell className="hidden md:table-cell">{customer.email}</TableCell>
			<TableCell className="hidden md:table-cell">{customer.mobile}</TableCell>
			<TableCell className="hidden md:table-cell">
				{customer.firstName} ({customer.firstName})
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{format(customer.createdAt, "do MMM yyy HH:mm")}
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{format(customer.updatedAt, "do MMM yyy HH:mm")}
			</TableCell>
			<TableCell>
				{customer.bookingDate
					? format(customer.bookingDate, "do MMM yyy HH:mm")
					: "N/A"}
			</TableCell>
			<TableCell className="flex gap-x-2">
				<ActionButtons customer={customer} />
			</TableCell>
		</TableRow>
	);
};
