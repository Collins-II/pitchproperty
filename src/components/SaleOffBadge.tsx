import React, { FC } from "react";

export interface SaleOffBadgeProps {
  className?: string;
  desc?: string;
}

const SaleOffBadge: FC<SaleOffBadgeProps> = ({
  className = "",
  desc,
}) => {
  return (
    <div
      className={`nc-SaleOffBadge flex items-center justify-center text-xs py-0.5 px-3 bg-blue-700 text-white rounded-full ${className}`}
      data-nc-id="SaleOffBadge"
    >
      {desc}
    </div>
  );
};

export default SaleOffBadge;
