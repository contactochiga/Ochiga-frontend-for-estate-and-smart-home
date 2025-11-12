"use client";

import { ReactNode, useEffect } from "react";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Prevent double-tap zoom
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    document.addEventListener("touchstart", preventZoom, { passive: false });

    // Prevent pinch zoom / scale
    const metaViewport = document.querySelector('meta[name=viewport]');
    if (metaViewport) {
      metaViewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      );
    }

    // Cleanup
    return () => {
      document.removeEventListener("touchstart", preventZoom);
      if (metaViewport) {
        metaViewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1"
        );
      }
    };
  }, []);

  return (
    <div
      className="w-screen h-screen overflow-hidden relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white"
      style={{
        touchAction: "pan-x pan-y",
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        msTouchAction: "none",
      }}
    >
      {children}
    </div>
  );
}
