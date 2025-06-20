"use client";

import React, { FC, RefObject, useCallback, useEffect, useRef, useState } from "react";
import Logo from "@/shared/Logo";
import useOutsideAlerter from "@/hooks/useOutsideAlerter";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import MenuBar from "@/shared/MenuBar";
import HeroSearchForm2MobileFactory from "../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import HeroSearchFormSmall, { SearchTab } from "../(HeroSearchFormSmall)/HeroSearchFormSmall";
import { StaySearchFormFields } from "../type";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import LangDropdown from "./LangDropdownSingle";
import CurrencyDropdown from "./CurrencyDropdown";
import TemplatesDropdown from "./TemplatesDropdown";
import { motion, AnimatePresence } from "motion/react";
import DropdownTravelers from "./DropdownTravelers";
import UploadButton from "@/shared/UploadButton";
import { useSession } from "next-auth/react";
import { Button } from "@/components/uix/button";

interface Header3Props {
  className?: string;
}

let WIN_PREV_POSITION = 0;
if (typeof window !== "undefined") {
  WIN_PREV_POSITION = (window as any).pageYOffset;
}

const Header3: FC<Header3Props> = ({ className = "" }) => {
  const session = useSession();
  const { data: user } = session;
  const router = useRouter();
  const onSign = useCallback(() => {
    router.push("/auth/signin");
  }, [router, user]);

  const [showSearch, setShowSearch] = useState(false);
  const headerInnerRef = useRef<HTMLDivElement | null>(null);
  const [showHeroSearch, setShowHeroSearch] = useState<StaySearchFormFields | null>(null);
  const [currentTab, setCurrentTab] = useState<SearchTab>("Search panel");

  useOutsideAlerter(headerInnerRef as RefObject<HTMLDivElement>, () => {
    setShowHeroSearch(null);
    setCurrentTab("Search panel");
  });

  const pathname = usePathname();

  useEffect(() => {
    setShowHeroSearch(null);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleEvent);
    return () => {
      window.removeEventListener("scroll", handleEvent);
    };
  }, []);

  const handleEvent = () => {
    window.requestAnimationFrame(handleHideSearchForm);
  };

  const handleHideSearchForm = () => {
    if (!document.querySelector("#nc-Header-3-anchor")) return;

    let currentScrollPos = window.pageYOffset;
    if (Math.abs(WIN_PREV_POSITION - currentScrollPos) > 100) {
      setShowHeroSearch(null);
    }
    WIN_PREV_POSITION = currentScrollPos;
  };

  const renderHeroSearch = () => (
    <div className={`absolute top-[90px] inset-x-0 transition-all ${showHeroSearch ? "visible" : "invisible opacity-0 pointer-events-none scale-75"}`}>
      <div className="w-full max-w-4xl mx-auto pb-6 px-4 sm:px-6 lg:px-8">
        <HeroSearchFormSmall defaultFieldFocus={showHeroSearch || undefined} onTabChange={setCurrentTab} defaultTab={currentTab} />
      </div>
    </div>
  );

  return (
    <>
      {showHeroSearch && <div id="nc-Header-3-anchor"></div>}
      <header ref={headerInnerRef} className={`sticky top-0 z-40 bg-white dark:bg-neutral-900 shadow-sm ${className}`}>
        <div className="relative flex items-center justify-between h-[80px] px-4 md:px-6 lg:px-10">
          <div className="flex items-center space-x-4">
            <Logo className="w-16" img="/YouSell_Logo.png" />
            <div className="hidden lg:block h-10 border-l border-neutral-300 dark:border-neutral-500"></div>
            <div className="hidden lg:flex space-x-3 items-center">
              <DropdownTravelers />
              <TemplatesDropdown />
            </div>
          </div>

          <div className="flex-1 hidden lg:flex justify-center">
            {renderHeroSearch()}
          </div>

          <div className="flex items-center space-x-4 text-neutral-700 dark:text-neutral-100">
            <div className="hidden md:flex items-center space-x-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full px-3 py-1 text-sm">
              <LangDropdown />
              <div className="h-4 border-l border-neutral-300 dark:border-neutral-500 mx-2"></div>
              <CurrencyDropdown />
            </div>

            {user ? (
              <>
                <div className="hidden lg:flex items-center space-x-3">
                  <UploadButton />
                  <NotifyDropdown />
                  <AvatarDropdown />
                  <MenuBar />
                </div>
                <div className="lg:hidden flex items-center space-x-2">
                  <NotifyDropdown />
                  <AvatarDropdown />
                  <MenuBar />
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-1">
                <Button onClick={onSign} className="px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full text-sm text-gray-700 dark:text-neutral-300">
                  Sign In
                </Button>
                <MenuBar />
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header3;
