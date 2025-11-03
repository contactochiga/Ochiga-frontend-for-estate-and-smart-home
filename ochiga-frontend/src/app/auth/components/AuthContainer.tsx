// ochiga-frontend/src/app/(auth)/components/AuthContainer.tsx
"use client";

import React from "react";

export default function AuthContainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-black text-gray-100">
      <div className="w-full max-w-sm bg-gray-900/80 border border-gray-800 rounded-2xl p-6 shadow-xl backdrop-blur-md animate-fadeIn">
        <h1 className="text-xl font-semibold text-center mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}
