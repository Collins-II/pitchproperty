"use client";

import { useThemeMode } from "@/utils/useThemeMode";
import { Switch } from "@headlessui/react";
import React, { Dispatch, SetStateAction, useState } from "react";

export interface ToggleSubscribeProps {
    isSubscribe: boolean;
    setIsSubscribe: Dispatch<SetStateAction<boolean>>;
    className?: string;
   }

const ToggleSubscribe: React.FC<ToggleSubscribeProps> = ({
  className = "",
  isSubscribe,
  setIsSubscribe
}) => {

    function _toogleSubscribe() {
        if (isSubscribe) {
          setIsSubscribe(false)
        } else {
          setIsSubscribe(true)
        }
      }

  return (
    <div className="inline-flex">
      <span className="sr-only">Enable premium listing</span>
      <Switch
        checked={isSubscribe}
        onChange={_toogleSubscribe}
        className={`${isSubscribe ? "bg-teal-900" : "bg-teal-600"}
          relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-full border-4 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Enable premium listing</span>
        <span
          aria-hidden="true"
          className={`${isSubscribe ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};

export default ToggleSubscribe;
