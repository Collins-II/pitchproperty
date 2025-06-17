import React from "react";
import { ReactNode } from "react";
import Counter from "./Counter";

export interface Heading2Props {
  heading?: ReactNode;
  subHeading?: ReactNode;
  className?: string;
  count?: number;
}

const Heading2: React.FC<Heading2Props> = ({
  className = "",
  heading ,
  subHeading,
  count
}) => {
  return (
    <div className={`mb-12 lg:mb-16 ${className}`}>
      <h2 className="text-4xl font-semibold text-silverGray ">{heading}</h2>
      
      {subHeading ? (
        subHeading
      ) : (
        <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
          
          <Counter from={0} to={count as number} duration={5}/> <span className="mx-2">·</span> <span className="text-md font-light text-neutral-600">Properties</span>
          {/*Aug 12 - 18
          <span className="mx-2">·</span>2 Guests*/}
        </span>
      )}
    </div>
  );
};

export default Heading2;
