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
import { ArrowRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import LangDropdown from "./LangDropdownSingle";
import CurrencyDropdown from "./CurrencyDropdown";
import TemplatesDropdown from "./TemplatesDropdown";
import {motion, AnimatePresence } from "motion/react";
import { FaCloudUploadAlt, FaUpload } from "react-icons/fa";
import DropdownTravelers from "./DropdownTravelers";
import UploadButton from "@/shared/UploadButton";
import { signIn, useSession } from "next-auth/react";
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

    router.push('/auth/signin');
  }, [router, user]);
  const [showSearch, setShowSearch] = useState(false);
  const headerInnerRef = useRef<HTMLDivElement | null>(null);
  //
  const [showHeroSearch, setShowHeroSearch] =
    useState<StaySearchFormFields | null>();
  //
  const [currentTab, setCurrentTab] = useState<SearchTab>("Search panel");
  //
  useOutsideAlerter(headerInnerRef as RefObject<HTMLDivElement>, () => {
    setShowHeroSearch(null);
    setCurrentTab("Search panel");
  });
    

  let pathname = usePathname();
  //

  useEffect(() => {
    setShowHeroSearch(null);
  }, [pathname]);

  // HIDDEN WHEN SCROLL EVENT
  useEffect(() => {
    window.addEventListener("scroll", handleEvent);
    return () => {
      window.removeEventListener("scroll", handleEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEvent = () => {
    window.requestAnimationFrame(handleHideSearchForm);
  };

  const handleHideSearchForm = () => {
    if (!document.querySelector("#nc-Header-3-anchor")) {
      return;
    }
    //
    let currentScrollPos = window.pageYOffset;
    if (
      WIN_PREV_POSITION - currentScrollPos > 100 ||
      WIN_PREV_POSITION - currentScrollPos < -100
    ) {
      setShowHeroSearch(null);
    } else {
      return;
    }
    WIN_PREV_POSITION = currentScrollPos;
  };

  //
  const renderHeroSearch = () => {
    return (
      <div
        className={`absolute top-22 inset-x-0 transition-all will-change-[transform,opacity] ${
          showHeroSearch
            ? "visible"
            : "-translate-x-0 -translate-y-[90px] scale-x-[0.395] scale-y-[0.6] opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className={`w-full max-w-4xl mx-auto pb-6`}>
          <HeroSearchFormSmall
            defaultFieldFocus={showHeroSearch || undefined}
            onTabChange={setCurrentTab}
            defaultTab={currentTab}
          />
        </div>
      </div>
    );
  };

  const renderButtonOpenHeroSearch = () => {
    return (
      <div
        className={`relative flex items-center justify-between rounded-full hover:scale-90 transition-all ${
          showHeroSearch
            ? "-translate-x-0 translate-y-20 scale-x-[2.55] scale-y-[1.8] opacity-0 pointer-events-none invisible"
            : "visible"
        }`}
      >
        <div
          className="flex-shrink-0 ml-auto pr-2 cursor-pointer"
          onClick={() => setShowHeroSearch("location")}
        >
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-600  text-white">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-Header nc-Header-3 fixed z-40 top-0 inset-0 bg-black/30 dark:bg-black/50 shadow-sm transition-opacity will-change-[opacity] ${
          showHeroSearch ? "visible" : "invisible opacity-0 pointer-events-none"
        }`}
      ></div>
      {showHeroSearch && <div id="nc-Header-3-anchor"></div>}
      <header ref={headerInnerRef} className={`sticky top-0 z-40 ${className}`}>
        <div
          className={`bg-white dark:bg-neutral-900 absolute h-full inset-x-0 top-0 transition-transform will-change-[transform,opacity]
          ${showHeroSearch ? "duration-75" : ""} 
          `}
        ></div>
        <div className="relative px-4 h-[88px] flex">
          <div className="flex-1 flex justify-between">
            {/* Logo (lg+) */}
          <div className="flex justify-start flex-1 space-x-3 sm:space-x-8 lg:space-x-10">
          <Logo className="w-24 self-center ml-0 md:ml-10" img="/YouSell_Logo.png" />
          <div className="hidden lg:block self-center h-10 border-l border-neutral-300 dark:border-neutral-500"></div>
          <div className="hidden lg:flex space-x-3 items-center">
            <DropdownTravelers />
            <TemplatesDropdown />    
          </div>
          </div>
            <div className="flex flex-[2] lg:flex-none mx-auto">
              
              {/*<div className="self-center flex-1 lg:hidden w-full max-w-lg mx-auto">
                <HeroSearchForm2MobileFactory />
              </div>*/}
              {renderHeroSearch()}
            </div>

            {/* NAV */}
            <div className="flex relative z-10 flex-1 justify-end text-neutral-700 dark:text-neutral-100">
              <div className=" flex space-x-1 mr-0 md:mr-10">
              {/*<div className="self-center">
                {renderButtonOpenHeroSearch()}
              </div>*/}
                <div
                  className="self-center hidden md:flex xl:inline-flex px-1 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full items-center text-sm text-gray-700 dark:text-neutral-300 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  <LangDropdown />
                  <div className=" self-center h-6 border-l border-neutral-300 dark:border-neutral-500"></div>
                  <CurrencyDropdown />
                </div>
                {user ? (<>
          <div className="hidden md:flex flex-shrink-0 items-center justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden lg:flex space-x-1">
          <div
                  className="self-center hidden mr-5 md:flex xl:inline-flex rounded-full items-center font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                   <UploadButton />
                </div>

                <NotifyDropdown />
                <AvatarDropdown />
                <div className="flex md:hidden items-center h-full">
                  <MenuBar />
                </div>
          </div>
          <div className="flex items-center space-x-2 lg:hidden">
            <NotifyDropdown />
            <AvatarDropdown />
            <MenuBar />
          </div>
        </div>
        </>) : (
          <div className="max-w-24 max-h-full hidden md:flex flex-shrink-0 justify-end items-center flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <Button onClick={onSign} type="submit" className="self-center text-opacity-90 group px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Sign In
          </Button>
          </div>
        )}
              </div>
            </div>
          </div>
        </div>{/* Search Bar (Visible on Toggle) with Framer Motion */}
      </header>
    </>
  );
};

export default Header3;
