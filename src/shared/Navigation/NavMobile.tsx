"use client";

import React from "react";
import ButtonClose from "@/shared/ButtonClose";
import Logo from "@/shared/Logo";
import { Disclosure } from "@headlessui/react";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DATA } from "@/data/navigation";
import SocialsList from "@/shared/SocialsList";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import Link from "next/link";
import LangDropdown from "@/app/(client-components)/(Header)/LangDropdownSingle";
import CurrencyDropdown from "@/app/(client-components)/(Header)/CurrencyDropdown";
import { Route } from "next";
import UploadButton from "../UploadButton";

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DATA,
  onClickClose,
}) => {
  const renderMenuChild = (item: NavItemType) => (
    <ul className="pl-6 pb-2 space-y-1 text-sm">
      {item.children?.map((child, index) => (
        <Disclosure key={child.href as Route + index} as="li">
          <Link
            href={child.href as Route || "#"}
            className="block px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            · {child.name}
          </Link>
          {child.children && (
            <Disclosure.Panel>{renderMenuChild(child)}</Disclosure.Panel>
          )}
        </Disclosure>
      ))}
    </ul>
  );

  const renderNavItem = (item: NavItemType) => (
    <Disclosure key={item.id} as="li">
      <div className="flex items-center justify-between">
        <Link
          href={item.href as Route || "#"}
          className="flex-1 px-4 py-2 font-medium uppercase text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          {item.name}
        </Link>
        {item.children && (
          <Disclosure.Button className="pr-4">
            <ChevronDownIcon className="w-5 h-5 text-neutral-500" />
          </Disclosure.Button>
        )}
      </div>
      {item.children && <Disclosure.Panel>{renderMenuChild(item)}</Disclosure.Panel>}
    </Disclosure>
  );

  return (
    <div className="h-full w-full overflow-y-auto bg-white dark:bg-neutral-900 shadow-xl divide-y divide-neutral-100 dark:divide-neutral-800 transition-all">
      {/* Header Section */}
      <div className="relative py-6 px-6">
        <div className="flex items-center justify-between">
          <Logo className="w-24" />
          <span className="absolute right-4 top-4">
            <ButtonClose onClick={onClickClose} />
          </span>
        </div>

        {/* Utility Bar */}
        <div className="mt-6 flex items-center justify-between rounded-full text-sm text-neutral-600 dark:text-neutral-300 shadow-inner">
          <UploadButton />
        </div>

        {/* Slogan */}
        <p className="mt-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          Discover outstanding luxury properties. <br /> Your dream home awaits.
        </p>

        {/* Socials + Theme */}
        <div className="mt-5 flex items-center justify-between">
          <SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-200 text-lg dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300" />
          <SwitchDarkMode className="bg-neutral-200 dark:bg-neutral-700" />
        </div>
      </div>

      {/* Navigation Section */}
      <ul className="px-4 py-6 space-y-1">{data.map(renderNavItem)}</ul>
       <div className="mx-4 mt-6 flex items-center justify-between rounded-full px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-600 dark:text-neutral-300 shadow-inner">
          <LangDropdown />
          <div className="w-px h-6 bg-neutral-400/30 mx-3" />
          <CurrencyDropdown />
        </div>
    </div>
  );
};

export default NavMobile;
