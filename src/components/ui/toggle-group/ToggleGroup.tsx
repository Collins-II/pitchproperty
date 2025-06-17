"use client";

import React, { ReactElement } from "react";
import { ToggleGroupItemProps } from "./ToggleGroupItem";

interface ToggleGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({ value, onValueChange, children, className }) => {
  return (
    <div className={`flex bg-transparent p-1 rounded-lg ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ToggleGroupItemProps>(child)) {
          return React.cloneElement(child as ReactElement<ToggleGroupItemProps>, {
            selected: child.props.value === value,
            onClick: () => onValueChange(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
};

export default ToggleGroup;
