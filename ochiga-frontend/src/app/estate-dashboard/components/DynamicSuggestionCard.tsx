"use client";

import { useEffect, useRef, useState } from "react";

export default function DynamicSuggestionCard({
  suggestions,
  notification,
  showSuggestions,
  showNotification,
}: {
  suggestions: any[];
  notification: string | null;
  showSuggestions: boolean;
  showNotification: boolean;
}) {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const suggestionRef = useRef<HTMLDivElement | null>(null);

  const [footerHeight, setFooterHeight] = useState(70); // fallback default
  const [safeBottom, setSafeBottom] = useState(0);

  /* ---------------------------------------------------
      1. Detect the real ChatFooter height dynamically
     --------------------------------------------------- */
  useEffect(() => {
    const footer = document.getElementById("chat-footer");

    if (!footer) return;

    const updateHeight = () => {
      const rect = footer.getBoundingClientRect();
      setFooterHeight(rect.height);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => updateHeight());
    resizeObserver.observe(footer);

    return () => resizeObserver.disconnect();
  }, []);

  /* -----------------------------------------------
      2. Detect iPhone safe-area inset bottom
     ----------------------------------------------- */
  useEffect(() => {
    const tmp = parseInt(getComputedStyle(document.documentElement).getPropertyValue("env(safe-area-inset-bottom)") || "0");
    setSafeBottom(isNaN(tmp) ? 0 : tmp);
  }, []);

  /* ---------------------------------------------------
     3. Suggestion Row Position = footerHeight + safe area
     --------------------------------------------------- */
  const suggestionBottom = footerHeight + safeBottom;

  /* ---------------------------------------------------
     4. Notification sits 40px above suggestions
     --------------------------------------------------- */
  const notificationBottom = suggestionBottom + 40;

  return (
    <>
      {/* Notification Banner */}
      {showNotification && notification && (
        <div
          className="fixed left-0 w-full flex justify-center z-[60] px-4 pointer-events-auto transition-all duration-300"
          style={{ bottom: notificationBottom }}
        >
          <div className="bg-[#0f172a]/80 backdrop-blur-md text-white text-sm px-4 py-2 rounded-xl shadow-lg border border-white/10">
            {notification}
          </div>
        </div>
      )}

      {/* Suggestion Scroll Row */}
      {showSuggestions && (
        <div
          ref={suggestionRef}
          className="fixed left-0 right-0 z-[50] px-4 pointer-events-none transition-all duration-300"
          style={{
            bottom: suggestionBottom,
          }}
        >
          <div className="flex gap-3 overflow-x-auto pb-2 pointer-events-auto no-scrollbar">
            {suggestions?.map((item, i) => (
              <div
                key={i}
                className="min-w-[200px] bg-white text-black px-4 py-3 rounded-2xl shadow-lg flex flex-col justify-center"
              >
                <span className="font-semibold">{item.title}</span>
                <span className="text-xs opacity-70">{item.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
