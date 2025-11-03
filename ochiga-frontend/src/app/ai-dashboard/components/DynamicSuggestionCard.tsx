"use client";

import { useEffect, useState } from "react";

interface Props {
  userActions: string[];
  onSelect: (suggestion: string) => void;
  isTyping: boolean;
}

export default function DynamicSuggestionCard({ userActions, onSelect, isTyping }: Props) {
  const [suggestions, setSuggestions] = useState<string[]>([
    "Turn on living room lights",
    "Fund my wallet",
    "View CCTV feed",
    "Check device status",
    "Lock all doors",
  ]);

  // 🧠 Adapt suggestions based on user behavior
  useEffect(() => {
    if (userActions.length > 0) {
      const last = userActions[userActions.length - 1].toLowerCase();
      const smartSuggestions = suggestions.filter((s) =>
        !last.includes(s.toLowerCase().split(" ")[0])
      );

      // Add most recent command first for quick repeat
      setSuggestions([`Repeat: "${last}"`, ...smartSuggestions].slice(0, 5));
    }
  }, [userActions]);

  if (isTyping) return null; // hide while typing

  return (
    <div className="w-full flex flex-wrap justify-center gap-2 px-4 mb-2 animate-fadeIn">
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(s)}
          className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs md:text-sm px-3 py-1.5 rounded-full border border-gray-700 transition"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
