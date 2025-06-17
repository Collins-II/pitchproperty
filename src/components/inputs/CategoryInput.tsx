'use client';

import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon?: IconType,
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  onClick
}) => {
  return (
    <div
    onClick={() => onClick(label)}
    className={`
      rounded-full
      border-2
      w-full
      p-2
      flex
      items-center
      justify-center
      text-center
      font-semibold
      cursor-pointer
      transition
      ${
        selected
          ? 'border-black bg-black text-white'
          : 'border-neutral-200 bg-white text-neutral-600 hover:border-black'
      }
    `}
  >
    {label}
  </div>
  
  );
}

export default CategoryBox;