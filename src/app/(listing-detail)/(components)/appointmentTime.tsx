"use client";

import React, { Fragment, FC, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";
import { TimePicker } from "react-time-picker-typescript";
import "react-time-picker-typescript/dist/style.css";

interface AppointmentTimeProps {
    availableTimes?: string[];
    onSelectTime?: (selectedTime: string) => void;
  }
  
  const defaultTimeSlots = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
  ];

const AppointmentTime: FC<AppointmentTimeProps> = ({availableTimes = defaultTimeSlots,
    onSelectTime}) => {
   const [value, setValue] = useState('10:00');
  
     const onChange = (timeValue: any) => {
        setValue(timeValue);
     }
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    onSelectTime?.(time); // Call parent callback if provided
  };

  const handleClearTime = (close: () => void) => {
    setSelectedTime(null);
    close();
  };

  return (
    <Popover className={`flex relative flex-1`}>
      {({ open, close }) => (
        <>
          <div
            className={`flex-1 flex items-center focus:outline-none rounded-b-3xl ${
              open ? "shadow-lg" : ""
            }`}
          >
            <Popover.Button className="relative z-10 flex-1 flex text-left items-center p-3 space-x-3 focus:outline-none">
              <div className="text-neutral-300 dark:text-neutral-400">
                <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                {selectedTime ? (
                  <span className="block mt-1 text-sm text-neutral-800 dark:text-neutral-100 leading-none font-medium">
                    {selectedTime}
                  </span>
                ) : (
                  <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                    Set Time
                  </span>
                )}
              </div>
              {selectedTime && open && (
                <ClearDataButton onClick={() => handleClearTime(close)} />
              )}
            </Popover.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black ring-opacity-5">
              <TimePicker onChange={onChange} value={value} />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default AppointmentTime;
