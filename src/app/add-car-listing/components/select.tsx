import { FC, useState, ReactNode } from "react";

interface SelectProps {
  onValueChange: (value: string) => void;
  children: ReactNode;
}

export const Select: FC<SelectProps> = ({ onValueChange, children }) => {
  return <div>{children}</div>;
};

export const SelectTrigger: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <button className={`border px-4 py-2 rounded w-full ${className}`}>
    {children}
  </button>
);

export const SelectContent: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="border rounded mt-2 shadow-md p-2">{children}</div>
);

export const SelectItem: FC<{ value: string; children: ReactNode }> = ({
  value,
  children,
}) => {
  const handleClick = () => {
    console.log("Selected:", value);
  };
  return (
    <div
      onClick={handleClick}
      className="hover:bg-neutral-100 p-2 cursor-pointer"
    >
      {children}
    </div>
  );
};

export const SelectValue: FC<{ placeholder: string }> = ({ placeholder }) => (
  <span>{placeholder}</span>
);
