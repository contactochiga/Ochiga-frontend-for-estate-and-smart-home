"use client";

import { useMemo, useState, useEffect } from "react";

interface Props {
  suggestions?: string[];
  onSend: (suggestion: string) => void;
  isTyping?: boolean;
}

/**
 * DynamicSuggestionCard
 * - Fixed above footer
 * - Auto-hides when typing or scrolling
 * - Minimal design
 */
export default function DynamicSuggestionCard({ suggestions = [], onSend, isTyping }: Props) {
  const [visible, setVisible] = useState(true);

  // default static suggestions
  const defaultSuggestions = useMemo(
    () => [
      "Turn on living room lights",
      "Fund my wallet",
      "View CCTV feed",
      "Check device status",
      "Lock all doors",
    ],
    []
  );

  const displayList = suggestions.length > 0 ? suggestions : defaultSuggestions;

  // hide suggestions when typing
  useEffect(() => {
    if (isTyping) {
      setVisible(false);
      return;
    }
    setVisible(true);
  }, [isTyping]);

  // hide suggestions on scroll
  useEffect(() => {
    const handleScroll = () => setVisible(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-0 w-full z-30 px-4 transition-opacity duration-300">
      <div className="max-w-3xl mx-auto">
        <div className="w-full flex flex-wrap justify-center gap-2 animate-fadeIn">
          {displayList.map((s, i) => (
            <button
              key={`${s}-${i}`}
              onClick={() => onSend(s)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs md:text-sm px-3 py-1.5 rounded-full border border-gray-700 transition"
              title={s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
