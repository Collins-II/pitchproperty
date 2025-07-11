import { RadioFilter } from "@/components/shared/radio-filter";
import type { AwaitedPageProps } from "@/config/types";
//import { CreateClassifiedDialog } from "./create-classified-dialog";
import { CarStatus } from "@/lib/database/models/car.model";

export const AdminClassifiedsHeader = ({ searchParams }: AwaitedPageProps) => {
	return (
		<div className="flex flex-col p-6 space-y-4 text-muted">
			<div className="flex items-center justify-between">
				<h1 className="font-semibold text-lg md:text-2xl">All Classifieds</h1>
				<div className="flex items-center justify-between">
					<RadioFilter
						items={["ALL", ...Object.values(CarStatus)]}
						searchParams={searchParams}
					/>
					{/*<CreateClassifiedDialog />*/}
				</div>
			</div>
		</div>
	);
};
