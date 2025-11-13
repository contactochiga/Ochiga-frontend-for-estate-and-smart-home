"use client";

import React from "react";

type DynamicSuggestionCardProps = {
  suggestions: string[];
  isTyping: boolean;
  onSend: (text: string) => void;
};

export default function DynamicSuggestionCard({
  suggestions,
  isTyping,
  onSend,
}: DynamicSuggestionCardProps) {
  if (!suggestions.length || isTyping) return null;

  return (
    <div className="fixed bottom-24 left-0 w-full flex justify-center px-4 md:px-10 z-30">
      <div className="flex flex-wrap gap-3 max-w-3xl bg-gray-900/80 border border-gray-700 backdrop-blur-md rounded-2xl p-3 shadow-md">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => onSend(suggestion)}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white text-sm rounded-xl transition-all duration-200"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
