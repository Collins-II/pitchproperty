"use client";

import React, { FC, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "@/shared/Logo";
import MenuBar from "@/shared/MenuBar";
import LangDropdown from "./LangDropdownSingle";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import TemplatesDropdown from "./TemplatesDropdown";
import CurrencyDropdown from "./CurrencyDropdown";
import HeroSearchForm2MobileFactory from "../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export interface MainNav2Props {
  className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className={`MainNav2 relative z-10 ${className}`}>
      <div className="px-4 h-20 lg:container flex justify-between">
        {/* Left Section */}
        <div className="flex justify-start flex-1 space-x-3 sm:space-x-8 lg:space-x-10">
          <Logo className="w-24 self-center" img="/images/cityLogo.jpg" />
          <div className="hidden lg:block self-center h-10 border-l border-neutral-300 dark:border-neutral-500"></div>
          <div className="hidden lg:flex space-x-2">
            <TemplatesDropdown />
          </div>
        </div>

        {/* Search Icon (Mobile) */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            aria-label="search"
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-800 dark:text-white focus:outline-none"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          <NotifyDropdown />
          <MenuBar />
        </div>

        {/* Right Section */}
        <div className="hidden md:flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden lg:flex space-x-1">
            <LangDropdown />
            <CurrencyDropdown />
            <NotifyDropdown />
            <AvatarDropdown />
          </div>
          <div className="flex space-x-2 lg:hidden">
            <NotifyDropdown />
            <AvatarDropdown />
            <MenuBar />
          </div>
        </div>
      </div>

      {/* Search Bar (Visible on Toggle) with Framer Motion */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            //className="self-center lg:hidden flex-[3] max-w-lg !mx-auto md:px-3 pb-2"
          >
            <HeroSearchForm2MobileFactory />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainNav2;
