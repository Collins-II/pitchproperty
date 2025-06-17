"use client";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { NAVIGATION_DATA, NAVIGATION_DEMO_2 } from "@/data/navigation";
import { NavItemType } from "@/shared/Navigation/NavigationItem";
import Link from "next/link";
import Collection from "@/components/Collection";
import { Route } from "next";

export default function TemplatesDropdown() {
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  const renderMegaMenuNavlink = (item: NavItemType, index: number, close: () => void) => (
    <li key={item.id} className={`${item.isNew ? "menuIsNew" : ""}`}>
      <Link
        target={item.targetBlank ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="font-normal text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white"
        href={item.href as Route}
        onClick={close}
      >
        {item.name}
      </Link>
    </li>
  );

  return (
    <Popover className="TemplatesDropdown hidden lg:block self-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <>
        <div className="group h-10 sm:h-12 px-3 py-1.5 inline-flex items-center text-sm text-gray-800 dark:text-slate-300 font-medium">
          <span>Insights</span>
          <ChevronDownIcon className={`${open ? "-rotate-180" : ""} ml-1 h-4 w-4 transition ease-in-out duration-150`} aria-hidden="true" />
        </div>

        <Transition
          as={Fragment}
          show={open}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-20 top-full w-full inset-x-0">
            <div className="bg-white dark:bg-neutral-900 shadow-lg">
              <div className="container">
                <div className="flex text-sm border-t border-slate-200 dark:border-slate-700 py-14">
                  <div className="flex-1 grid grid-cols-5 gap-6 xl:gap-8 pr-6 xl:pr-8">
                    {NAVIGATION_DATA.map((item, index) => (
                      <div key={index}>
                        <p className="font-medium text-slate-900 dark:text-neutral-200">{item.name}</p>
                        <ul className="grid space-y-4 mt-4">
                          {item.children?.map((child, i) => renderMegaMenuNavlink(child, i, () => setOpen(false)))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="w-[35%] xl:w-[30%]">
                    <Collection />
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    </Popover>
  );
}
