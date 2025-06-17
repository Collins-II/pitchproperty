import React, { FC } from "react";
import Heading from "@/shared/Heading";
import Counter from "@/shared/Counter";

export interface Statistic {
  id: string;
  heading: number;
  subHeading: string;
}

const FOUNDER_DEMO: Statistic[] = [
  {
    id: "1",
    heading: 50000,
    subHeading: "Residents in Kingsland City (as of Oct. 1, 2023)",
  },
  {
    id: "2",
    heading: 150,
    subHeading: "Businesses operating in Kingsland City (as of Oct. 1, 2023)",
  },
  {
    id: "3",
    heading: 20,
    subHeading: "Parks and recreational areas in Kingsland City (as of Oct. 1, 2023)",
  },
];

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <Heading
        desc="Building modern and luxurious infrastructure and shaping the world our way!"
      >
        Fast Facts 🚀
      </Heading>
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
        {FOUNDER_DEMO.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
          >
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
              <Counter from={0} to={Number(item.heading)} duration={10}/>
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
              {item.subHeading}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;
