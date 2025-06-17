"use client";

import React, { ReactNode } from "react";

export interface ToggleGroupItemProps {
  value: string;
  selected?: boolean;
  onClick?: () => void;
  variant?: "default" | "outline";
  children: ReactNode; // ✅ Explicitly define children
}

const ToggleGroupItem: React.FC<ToggleGroupItemProps> = ({ value, selected, onClick, variant = "default", children }) => {
  return (
    <button
      className={`px-6 py-2 text-sm font-semibold rounded-full transition-all ${
        selected
          ? "bg-primary-600 text-white"
          : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
      } ${variant === "outline" ? "border border-gray-500" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ToggleGroupItem;
