"use client";

import { ReactNode } from "react";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <div
      className="w-screen h-screen overflow-hidden flex flex-col"
      style={{
        touchAction: "manipulation", // prevents double-tap zoom issues
      }}
    >
      {/* Main content area */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
