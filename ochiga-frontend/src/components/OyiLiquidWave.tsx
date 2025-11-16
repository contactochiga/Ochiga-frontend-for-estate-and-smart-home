"use client";

import { motion } from "framer-motion";
import React from "react";

/**
 * OyiLiquidWave
 * A reusable "jelly / amoeba" wave strip used in ChatFooter.
 * Props:
 * - color: wave color
 * - size: visual scale (small, medium, large)
 * - barCount: number of bars in the wave
 */
export default function OyiLiquidWave({
  color = "#e11d48",
  size = "medium",
  barCount = 100,
}: {
  color?: string;
  size?: "small" | "medium" | "large";
  barCount?: number;
}) {
  const heightBase = size === "small" ? 6 : size === "large" ? 12 : 8;
  const gap = size === "small" ? 1 : size === "large" ? 3 : 2;
  const widthPx = size === "small" ? 2 : size === "large" ? 3.5 : 2.5;

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex items-end"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: "linear" }}
        style={{ gap: `${gap}px` }}
      >
        {Array.from({ length: barCount }).map((_, i) => {
          // create a subtle height variation pattern
          const step = (i % 8) - 4;
          const h = heightBase + step * 0.6;
          const opacity = 0.75 - Math.abs(step) * 0.07;
          return (
            <div
              key={i}
              style={{
                width: `${widthPx}px`,
                height: `${h}px`,
                background: color,
                borderRadius: 999,
                opacity,
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
