"use client";
import { routes } from "@/config/routes";
import type { Variants } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import {
	CarFrontIcon,
	LayoutDashboardIcon,
	SettingsIcon,
	UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { ActiveLink } from "../ui/active-link";
import { Route } from "next";

const navigation = [
	{
		name: "Dashboard",
		href: routes.admin.dashboard,
		icon: LayoutDashboardIcon,
	},
	{
		name: "Classifieds",
		href: routes.admin.classifieds,
		icon: CarFrontIcon,
	},
	{
		name: "Customers",
		href: routes.admin.customers,
		icon: UsersIcon,
	},
	{
		name: "Settings",
		href: routes.admin.settings,
		icon: SettingsIcon,
	},
];

export const AdminSidebar = () => {
	const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
	const handleSidebarHover = useCallback((expanded: boolean) => {
		setIsSidebarExpanded(expanded);
	}, []);

	const sidebarVariants: Variants = {
		expanded: { width: 256 },
		collapsed: { width: "fit-content" },
	};

	const menuTextVariants: Variants = {
		expanded: {
			opacity: 1,
			width: "auto",
			marginLeft: 10,
		},
		collapsed: { opacity: 0, width: 0 },
	};

	const logoVariants: Variants = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	};

	return (
		<motion.div
			className="bg-silverGray h-screen pt-12 overflow-hidden flex flex-col rounded-md"
			animate={isSidebarExpanded ? "expanded" : "collapsed"}
			variants={sidebarVariants}
			initial="collapsed"
			transition={{ duration: 0.3, ease: "easeInOut" }}
			onMouseEnter={() => handleSidebarHover(true)}
			onMouseLeave={() => handleSidebarHover(false)}
		>
			<div className="flex flex-col grow px-4">
				
				<nav className="flex flex-col gap-2">
					{navigation.map((item) => {
						return (
							<ActiveLink
								key={item.name}
								href={item.href}
								className="flex items-center p-2 rounded-lg transition-colors duration-200 w-full cursor-pointer"
							>
								<div className="flex items-center justify-center">
									<item.icon aria-hidden="true" className="h-6 w-6 shrinnk-0" />
									<motion.span
										variants={menuTextVariants}
										animate={isSidebarExpanded ? "expanded" : "collapsed"}
										initial="collapsed"
										transition={{ duration: 0.3, ease: "easeInOut" }}
										className="whitespace-nowrap overflow-hidden"
									>
										{item.name}
									</motion.span>
								</div>
							</ActiveLink>
						);
					})}
				</nav>
			</div>
		</motion.div>
	);
};
