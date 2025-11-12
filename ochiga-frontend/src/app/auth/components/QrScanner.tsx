"use client";

import { useEffect } from "react";

export default function QrScanner({ onScan }: { onScan: (data: string | null) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // simulate detecting QR code
      onScan("mock_qr_verified");
    }, 4000);
    return () => clearTimeout(timer);
  }, [onScan]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-900">
      <video
        className="absolute w-full h-full object-cover opacity-50"
        autoPlay
        playsInline
        muted
      />
      <div className="relative border-4 border-emerald-500 rounded-xl w-64 h-64 animate-pulse"></div>
    </div>
  );
}
