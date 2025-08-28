"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface Visitor {
  name: string;
  code: string;
}

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([
    { name: "John Doe", code: "123456" },
    { name: "Jane Smith", code: "654321" },
  ]);

  const addVisitor = () => {
    const newCode = Math.random().toString().slice(2, 8);
    setVisitors([
      ...visitors,
      { name: `Guest ${visitors.length + 1}`, code: newCode },
    ]);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  const shareWhatsApp = (visitor: Visitor) => {
    const message = `Hi, here’s your access code for Ochiga Estate:\n\nVisitor: ${visitor.name}\nCode: ${visitor.code}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Visitor Access
      </h1>

      <button
        onClick={addVisitor}
        className="mb-6 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
      >
        + Add Visitor
      </button>

      <div className="space-y-4">
        {visitors.map((visitor, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800"
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {visitor.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Code: {visitor.code}
              </p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => copyCode(visitor.code)}
                  className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  Copy
                </button>
                <button
                  onClick={() => shareWhatsApp(visitor)}
                  className="px-2 py-1 text-xs rounded bg-green-500 text-white"
                >
                  Share
                </button>
              </div>
            </div>
            <QRCodeCanvas value={visitor.code} size={64} />
          </div>
        ))}
      </div>
    </div>
  );
}
