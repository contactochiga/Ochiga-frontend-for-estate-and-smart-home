"use client";

import { useMemo } from "react";

interface Props {
  suggestions?: string[];
  onSend: (suggestion: string) => void;
}

/**
 * DynamicSuggestionCard
 * Clean minimal version:
 * - Displays static suggestion chips only
 * - No labels, headers, or notifications
 */
export default function DynamicSuggestionCard({ suggestions = [], onSend }: Props) {
  // default static suggestions (if none passed)
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

  return (
    <div className="w-full px-4 mb-2">
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
