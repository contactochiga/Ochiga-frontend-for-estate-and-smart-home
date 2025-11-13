"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QRPreview({ text }: { text: string }) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!text) return;
    QRCode.toDataURL(text).then(setDataUrl).catch(console.error);
  }, [text]);

  return (
    <div className="w-40 h-40 bg-white p-1 rounded">
      {dataUrl ? <img src={dataUrl} className="w-full h-full object-contain" alt="qr" /> : <div className="w-full h-full bg-gray-200" />}
    </div>
  );
}
