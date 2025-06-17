"use client";

import React, { Dispatch, FC, SetStateAction } from "react";
import { TimePicker } from "react-time-picker-typescript";
import "react-time-picker-typescript/dist/style.css";

export interface TimeProps {
  setTimeSlot: Dispatch<SetStateAction<string>>;
  timeSlot: string;
  className?: string;
}

const TimeSelection: FC<TimeProps> = ({ setTimeSlot, timeSlot }) => {
  const validateTime = (time: string): boolean => {
    const [hours] = time.split(":").map(Number);
    return hours >= 9 && hours <= 17; // Only allow business hours
  };

  const handleChange = (time: string | null) => {
    if (validateTime(time as string)) {
      setTimeSlot(time as string);
    } else {
      alert("Please select a time between 9:00 AM and 5:00 PM");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <label className="block mb-2 text-sm font-medium text-gray-800">
        Select Time
      </label>
      <div className="border rounded-md p-2 bg-white shadow-md">
        <TimePicker onChange={handleChange} value={timeSlot} />
      </div>
    </div>
  );
};

export default TimeSelection;
