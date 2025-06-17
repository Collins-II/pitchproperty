"use client";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { FC, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/CurrencyStore/store";
import { parseCookies, setCookie } from "nookies";
import Flag from "react-world-flags"; // 📌 Flag library (Optional, you can also use images)

const COOKIE_NAME = "googtrans";

interface LanguageDescriptor {
  name: string;
  title: string;
  flagCode: string; // Add flagCode (e.g., "us", "cn", "zm")
}

declare global {
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}

const detectBrowserLanguage = (): string => {
  const browserLang = navigator.language.split("-")[0];
  return (
    global.__GOOGLE_TRANSLATION_CONFIG__?.languages.find(
      (lang) => lang.name === browserLang
    )?.name || global.__GOOGLE_TRANSLATION_CONFIG__?.defaultLanguage || "en"
  );
};

interface LangDropdownProps {
  panelClassName?: string;
}

const LangDropdown: FC<LangDropdownProps> = ({
  panelClassName = "z-10 w-screen max-w-[280px] px-4 mt-4 right-0 sm:px-0",
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<any>();

  useEffect(() => {
    const cookies = parseCookies();
    let languageValue = cookies[COOKIE_NAME]?.split("/")[2];

    if (!languageValue && global.__GOOGLE_TRANSLATION_CONFIG__) {
      languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }

    if (languageValue) {
      setCurrentLanguage(languageValue);
    }

    if (global.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
    }
  }, []);

  const switchLanguage = (lang: string) => {
    setCookie(null, COOKIE_NAME, `/auto/${lang}`);
    window.location.reload();
  };

  const getCurrentFlag = () => {
    return languageConfig?.languages.find(
      (lang: LanguageDescriptor) => lang.name === currentLanguage
    )?.flagCode;
  };

  return (
    <div className="LangDropdown flex h-full items-center">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button className="group px-3 py-1.5 border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              {/* 🌍 Show the Flag of the Current Language */}
              {getCurrentFlag() && (
                <img
                  src={`https://flagcdn.com/w40/${getCurrentFlag()}.png`} // Uses flagcdn API
                  alt={currentLanguage}
                  className="w-5 h-5 rounded-full"
                />
              )}
              <span className="ml-2 select-none">{currentLanguage}</span>
              <ChevronDownIcon
                className={`${
                  open ? "-rotate-180" : "text-opacity-70"
                } ml-1 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className={`absolute ${panelClassName}`}>
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 lg:grid-cols-2">
                    {languageConfig?.languages?.map((item: LanguageDescriptor) => (
                      <div
                        key={item.name}
                        onClick={() => {
                          switchLanguage(item.name);
                          close();
                        }}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        {/* 🇺🇸 Display the Flag */}
                        <img
                          src={`https://flagcdn.com/w40/${item.flagCode}.png`}
                          alt={item.name}
                          className="w-5 h-5 mr-2 rounded-full"
                        />
                        <p className="text-sm font-medium">{item.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default LangDropdown;
