"use client";

import { TwMainColor } from "@/data/types";
import { Route } from "@/routers/types";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { motion } from "motion/react"; // optional if using framer-motion
import { LucideIcon } from "lucide-react"; // optional if using Lucide icons

export interface BadgeProps {
  className?: string;
  name: ReactNode;
  color?: TwMainColor;
  href?: Route<string>;
  icon?: LucideIcon; // optional icon prop
}

const badgeColors: Record<TwMainColor, { base: string; hover: string }> = {
  pink: {
    base: "bg-pink-100 text-pink-800",
    hover: "hover:bg-pink-700 hover:text-white",
  },
  red: {
    base: "bg-red-100 text-red-800",
    hover: "hover:bg-red-700 hover:text-white",
  },
  gray: {
    base: "bg-gray-100 text-gray-800",
    hover: "hover:bg-gray-700 hover:text-white",
  },
  green: {
    base: "bg-green-100 text-green-800",
    hover: "hover:bg-green-700 hover:text-white",
  },
  purple: {
    base: "bg-purple-100 text-purple-800",
    hover: "hover:bg-purple-700 hover:text-white",
  },
  indigo: {
    base: "bg-indigo-100 text-indigo-800",
    hover: "hover:bg-indigo-700 hover:text-white",
  },
  yellow: {
    base: "bg-yellow-100 text-yellow-800",
    hover: "hover:bg-yellow-600 hover:text-white",
  },
  blue: {
    base: "bg-blue-100 text-blue-800",
    hover: "hover:bg-blue-700 hover:text-white",
  },
};

const Badge: FC<BadgeProps> = ({
  className = "",
  name,
  color = "pink",
  href,
  icon: Icon,
}) => {
  const colorClasses = badgeColors[color] || badgeColors.pink;

  const baseStyles =
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ease-in-out";
  const fullClass = `${baseStyles} ${colorClasses.base} ${className}`;
  const hoverClass = `${colorClasses.hover}`;

  const content = (
    <motion.span
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className={`${fullClass} ${hoverClass}`}
    >
      {Icon && <Icon size={14} strokeWidth={2} />}
      {name}
    </motion.span>
  );

  return href ? (
    <Link href={href} aria-label={`Badge link to ${href}`}>
      {content}
    </Link>
  ) : (
    content
  );
};

export default Badge;
