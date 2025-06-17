"use client";
import { usePathname } from "next/navigation";
import { SearchInput } from "../shared/search-input";

export const AdminSearch = () => {
	const pathname = usePathname();
	return (
		<SearchInput
			placeholder={`Search ${pathname.split("/")[2]}...`}
			className="w-full focus-visible:ring-0 placeholder:text-muted text-muted appearance-none bg-white border border-primary-800 pl-8"
		/>
	);
};
