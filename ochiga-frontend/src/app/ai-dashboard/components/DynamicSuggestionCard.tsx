"use client";
import { useEffect, useRef, useState } from "react";
import { FaBolt, FaLightbulb, FaFan, FaDoorOpen } from "react-icons/fa";

export default function DynamicSuggestionCard({ isFooterVisible }: { isFooterVisible: boolean }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Auto-Scrolling Animation
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scroll = () => {
      if (direction === "right") {
        el.scrollLeft += 1;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
          setDirection("left");
        }
      } else {
        el.scrollLeft -= 1;
        if (el.scrollLeft <= 0) {
          setDirection("right");
        }
      }
    };

    const interval = setInterval(scroll, 40);
    return () => clearInterval(interval);
  }, [direction]);

  if (isFooterVisible) return null; // hides when touching ChatFooter

  // ● Estate-style card with Residence logic:
  //    - Header (big text)
  //    - Small subtitle
  //    - Small icon like estate UI

  const items = [
    {
      header: "Turn On",
      text: "Living Room Lights",
      icon: <FaLightbulb className="text-lg" />,
    },
    {
      header: "Turn Off",
      text: "All Bedroom Lights",
      icon: <FaBolt className="text-lg" />,
    },
    {
      header: "Activate",
      text: "Ceiling Fan",
      icon: <FaFan className="text-lg" />,
    },
    {
      header: "Open",
      text: "Main Door",
      icon: <FaDoorOpen className="text-lg" />,
    },
  ];

  return (
    <div className="w-full overflow-hidden px-3 py-2">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-scroll no-scrollbar scroll-smooth"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="
              min-w-[180px]
              bg-white dark:bg-neutral-900
              rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800
              p-3 flex flex-col justify-between
            "
          >
            <div className="flex items-center gap-2 text-ochiga font-semibold text-base">
              {item.icon}
              {item.header}
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
