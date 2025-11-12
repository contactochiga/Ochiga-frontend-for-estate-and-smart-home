// src/app/ai-dashboard/layout/LayoutWrapper.tsx
"use client";

import { ReactNode, useEffect } from "react";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Disable double-tap zoom / pinch
    const handler = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    document.addEventListener("touchstart", handler, { passive: false });
    return () => document.removeEventListener("touchstart", handler);
  }, []);

  return (
    <div
      className="w-screen h-screen flex flex-col overflow-hidden"
      style={{
        touchAction: "manipulation", // prevent pinch zoom
      }}
    >
      {children}
    </div>
  );
}
