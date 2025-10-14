"use client";
import React, { useEffect } from "react";
import { app } from "@/lib/firebase";

export default function TestFirebase() {
  useEffect(() => {
    console.log("✅ Firebase initialized:", app.name);
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Firebase Test</h1>
      <p>Check your browser console for connection status.</p>
    </div>
  );
}
