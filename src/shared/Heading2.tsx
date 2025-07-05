import React from "react";
import { ReactNode } from "react";
import Counter from "./Counter";

export interface Heading2Props {
  heading?: ReactNode;
  subHeading?: ReactNode;
  className?: string;
  count?: number;
  type?: string;
}

const Heading2: React.FC<Heading2Props> = ({
  className = "",
  heading ,
  subHeading,
  count,
  type
}) => {
  return (
    <div className={`mb-8 lg:mb-10 ${className}`}>
      <h2 className="text-3xl font-light text-slate-900 ">{heading}</h2>
      <div className="border-b border-slate-900 border-[2px] dark:border-neutral-700 mb-3 w-14"></div>
      
      {subHeading ? (
        subHeading
      ) : (
        <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
          
          <Counter from={0} to={count as number} duration={5}/> <span className="mx-2">·</span> <span className="text-md font-light text-neutral-600">{type === "Property" ? "Properties" : "Cars" }</span>
          {/*Aug 12 - 18
          <span className="mx-2">·</span>2 Guests*/}
        </span>
      )}
    </div>
  );
};

export default Heading2;
