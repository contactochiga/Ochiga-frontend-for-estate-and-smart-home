"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  UserIcon,
  ClipboardDocumentIcon,
  QrCodeIcon,
  PaperAirplaneIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface Visitor {
  id: number;
  name: string;
  purpose: string;
  time: string;
  status: string;
  code: string;
}

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: 1,
      name: "John Doe",
      purpose: "Plumber",
      status: "Pending",
      time: "10:00 AM",
      code: "123456",
    },
    {
      id: 2,
      name: "Jane Smith",
      purpose: "Friend",
      status: "Checked-in",
      time: "09:30 AM",
      code: "654321",
    },
  ]);

  const [newVisitor, setNewVisitor] = useState({
    name: "",
    purpose: "",
    time: "",
  });

  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);

  const addVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisitor.name || !newVisitor.purpose || !newVisitor.time) return;

    const newCode = Math.random().toString().slice(2, 8);

    const newEntry: Visitor = {
      id: visitors.length + 1,
      ...newVisitor,
      status: "Pending",
      code: newCode,
    };

    setVisitors([...visitors, newEntry]);
    setNewVisitor({ name: "", purpose: "", time: "" });
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  const shareWhatsApp = (visitor: Visitor) => {
    const message = `Hi, here’s your access code for Ochiga Estate:\n\nVisitor: ${visitor.name}\nPurpose: ${visitor.purpose}\nTime: ${visitor.time}\nCode: ${visitor.code}\nStatus: ${visitor.status}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Visitors
      </h1>

      {/* Add Visitor Form */}
      <form
        onSubmit={addVisitor}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Visitor Name
          </label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            value={newVisitor.name}
            onChange={(e) =>
              setNewVisitor({ ...newVisitor, name: e.target.value })
            }
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Purpose
          </label>
          <input
            type="text"
            placeholder="e.g. Electrician"
            value={newVisitor.purpose}
            onChange={(e) =>
              setNewVisitor({ ...newVisitor, purpose: e.target.value })
            }
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Time of Visit
          </label>
          <input
            type="time"
            value={newVisitor.time}
            onChange={(e) =>
              setNewVisitor({ ...newVisitor, time: e.target.value })
            }
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold shadow 
            bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
            hover:opacity-90 transition"
        >
          Invite Visitor
        </button>
      </form>

      {/* Visitors List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Visitor Log</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {visitors.map((v) => (
            <li
              key={v.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {v.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  {v.purpose} — {v.time}
                </p>
                <span
                  className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
                    v.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : v.status === "Checked-in"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {v.status}
                </span>
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => copyCode(v.code)}
                    className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    <ClipboardDocumentIcon className="h-4 w-4" />
                    Copy
                  </button>
                  <button
                    onClick={() => shareWhatsApp(v)}
                    className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-green-500 text-white"
                  >
                    <PaperAirplaneIcon className="h-4 w-4" />
                    Share
                  </button>
                  <button
                    onClick={() => setSelectedVisitor(v)}
                    className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-indigo-600 text-white"
                  >
                    <UserIcon className="h-4 w-4" />
                    Details
                  </button>
                </div>
              </div>

              {/* QR Code */}
              <div className="mt-3 sm:mt-0">
                <QRCodeCanvas
                  value={`Visitor:${v.name}|Purpose:${v.purpose}|Time:${v.time}|Status:${v.status}|Code:${v.code}`}
                  size={64}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"M"}
                  includeMargin={false}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Slide-up Details Modal */}
      {selectedVisitor && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white dark:bg-gray-900 w-full rounded-t-2xl p-6 animate-slideUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Visitor Details
              </h3>
              <button
                onClick={() => setSelectedVisitor(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {selectedVisitor.name}
              </p>
              <p>
                <span className="font-medium">Purpose:</span>{" "}
                {selectedVisitor.purpose}
              </p>
              <p>
                <span className="font-medium">Time:</span> {selectedVisitor.time}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {selectedVisitor.status}
              </p>
              <p>
                <span className="font-medium">Code:</span> {selectedVisitor.code}
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <QRCodeCanvas
                value={`Visitor:${selectedVisitor.name}|Code:${selectedVisitor.code}`}
                size={128}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"M"}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
