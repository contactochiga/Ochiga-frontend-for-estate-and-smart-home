"use client";

import { useEffect, useState } from "react";

interface Suggestion {
  label: string;
  count: number; // frequency of use
}

export default function DynamicSuggestionCard({
  userActions,
  onSelect,
  isTyping,
}: {
  userActions: string[];
  onSelect: (suggestion: string) => void;
  isTyping: boolean;
}) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [visible, setVisible] = useState(true);

  // --- Track scroll to hide box ---
  useEffect(() => {
    const handleScroll = () => setVisible(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isTyping) setVisible(false);
    else setVisible(true);
  }, [isTyping]);

  // --- Learn user behavior dynamically ---
  useEffect(() => {
    if (userActions.length === 0) return;

    const frequencyMap: Record<string, number> = {};

    userActions.forEach((action) => {
      frequencyMap[action] = (frequencyMap[action] || 0) + 1;
    });

    const sorted = Object.entries(frequencyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([label, count]) => ({ label, count }));

    setSuggestions(sorted);
  }, [userActions]);

  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl bg-gray-900/90 backdrop-blur-md border border-gray-800 rounded-2xl shadow-lg p-3 md:p-4 transition-all duration-300 animate-fadeIn">
      <p className="text-xs text-gray-400 mb-2 px-2">💡 Suggested for you</p>
      <div className="flex flex-wrap justify-center gap-2">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelect(s.label)}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs md:text-sm px-3 py-1.5 rounded-full border border-gray-700 transition"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
