"use client";

import { motion, useMotionValue, useTransform, animate, useMotionValueEvent, useInView } from "motion/react";
import { useEffect, useState, useRef } from "react";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ from = 0, to, duration = 2 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const [displayValue, setDisplayValue] = useState(from.toLocaleString());

  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useMotionValueEvent(count, "change", (latest) => {
    setDisplayValue(Math.round(latest).toLocaleString());
  });

  useEffect(() => {
    if (isInView) {
      animate(count, to, {
        duration,
        ease: "easeOut",
      });
    }
  }, [isInView, to, count, duration]);

  return (
    <motion.span ref={ref} className="text-gold font-semibold text-lg">
      {displayValue}
    </motion.span>
  );
};

export default Counter;
