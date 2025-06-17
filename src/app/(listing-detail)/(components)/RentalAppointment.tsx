"use client";

import React, { Dispatch, Fragment, SetStateAction, useMemo, useState } from "react";
import { FC } from "react";
import DatePicker from "react-datepicker";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";
import { addDays, format } from 'date-fns';


export interface RentalAppointmentProps {
  setReservedDate: Dispatch<SetStateAction<Date | undefined>>;
  reservedDate?: Date;
  className?: string;
}

const RentalAppointment: FC<RentalAppointmentProps> = ({
  setReservedDate,
  reservedDate,
  className = "",
}) => {
 const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Current date
 const [selectedTime, setSelectedTime] = useState<string>(() => {
          const now = new Date();
          return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }); // Current time in HH:MM AM/PM format

    
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [isToday, setIsToday] = useState(true); // Toggle between "Today" or "Later" for the date
        const [isNow, setIsNow] = useState(true); // Toggle between "Now" or "Later" for the time
        const [isOpen, setIsOpen] = useState(false); // State to control calendar visibility
    
        const handleDateToggle = (option: 'today' | 'later') => {
            setIsToday(option === 'today');
            if (option === 'today') {
                setSelectedDate(new Date()); // Set date to today
                setIsOpen(false); // Close calendar when "Today" is selected
            } else {
                setIsOpen(true); // Open calendar when "Later" is selected
            }
        };
    
        const handleTimeToggle = (option: 'now' | 'later') => {
            setIsNow(option === 'now');
            if (option === 'now') {
                setSelectedTime(format(new Date(), 'HH:mm')); // Set time to current time
            }
        };
    
        const availableDates = useMemo(() => {
            if (!selectedDate) {
                return []; // Return an empty array or provide default dates if selectedDate is null or undefined
            }
            return Array.from({ length: 7 }, (_, i) => addDays(selectedDate, i + 1));
        }, [selectedDate]);
    
        const handleDateChange = (date: Date | null) => {
            if (date) {
                setReservedDate(date); // Update the selected date
                setSelectedDate(date);    // Set the date in the parent state
                setIsOpen(false);         // Close the calendar after selecting a date
            } else {
                setReservedDate(undefined); // Clear the date if null
            }
        };

  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2023/03/01")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2023/03/16"));

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
          {reservedDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            }) || "Set Appointment"}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {"Date"}
          </span>
        </div>
      </>
    );
  };

  return (
    <>
      <Popover
        className={`RentalCarDatesRangeInput relative flex w-full ${className}`}
      >
        {({ open }) => (
          <>
            <div
              className={`flex-1 flex items-center focus:outline-none rounded-2xl ${
                open ? "shadow-lg" : ""
              }`}
            >
              <Popover.Button
                className={`flex-1 flex relative p-3 items-center space-x-3 focus:outline-none `}
              >
                {renderInput()}

                {startDate && open && (
                  <ClearDataButton onClick={() => onChangeDate([null, null])} />
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
              <Popover.Panel className="absolute z-10 mt-3 top-full right-0 xl:-right-10 w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                    <DatePicker
                       selected={reservedDate}
                       onChange={handleDateChange}
                       includeDates={availableDates}
                       inline
                    />
                     <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

                {/*<Appointment setSelectedDate={setSelectedDate} setSelectedTime={setSelectedTime} selectedDate={selectedDate} selectedTime={selectedTime} /> */}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export default RentalAppointment;
