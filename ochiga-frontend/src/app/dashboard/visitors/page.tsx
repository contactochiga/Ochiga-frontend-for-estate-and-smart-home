"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  UserIcon,
  ClipboardDocumentIcon,
  PaperAirplaneIcon,
  ClockIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

interface Visitor {
  id: number;
  name: string;
  phone: string;
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
      phone: "08012345678",
      purpose: "Plumber",
      status: "Pending",
      time: "10:00 AM",
      code: "123456",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "08198765432",
      purpose: "Friend",
      status: "Checked-in",
      time: "09:30 AM",
      code: "654321",
    },
  ]);

  const [newVisitor, setNewVisitor] = useState({
    name: "",
    phone: "",
    purpose: "",
    time: "",
  });

  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);

  const addVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newVisitor.name ||
      !newVisitor.phone ||
      !newVisitor.purpose ||
      !newVisitor.time
    )
      return;

    const newCode = Math.random().toString().slice(2, 8);
    const newEntry: Visitor = {
      id: visitors.length + 1,
      ...newVisitor,
      status: "Pending",
      code: newCode,
    };

    setVisitors([newEntry, ...visitors]);
    setNewVisitor({ name: "", phone: "", purpose: "", time: "" });
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  const shareWhatsApp = (visitor: Visitor) => {
    const message = `Hi, here’s your access code for Ochiga Estate:\n\nVisitor: ${visitor.name}\nPhone: ${visitor.phone}\nPurpose: ${visitor.purpose}\nTime: ${visitor.time}\nCode: ${visitor.code}\nStatus: ${visitor.status}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Visitor Management
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage, track, and invite visitors seamlessly.
        </p>
      </header>

      {/* Add Visitor Form */}
      <form
        onSubmit={addVisitor}
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg mb-10 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-base font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Invite a Visitor
        </h2>

        {/* Grid Inputs */}
        <div className="grid gap-3 sm:grid-cols-4">
          <input
            type="text"
            placeholder="Visitor Name"
            value={newVisitor.name}
            onChange={(e) =>
              setNewVisitor({ ...newVisitor, name: e.target.value })
            }
            className="w-full h-11 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 focus:ring-[#800000] focus:border-[#800000]"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={newVisitor.phone}
            onChange={(e) =>
              setNewVisitor({ ...newVisitor, phone: e.target.value })
            }
            className="w-full h-11 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 focus:ring-[#800000] focus:border-[#800000]"
          />
          <input
            type="text"
            placeholder="Purpose of Visit"
            value={newVisitor.purpose}
            onChange={(e) =>
              setNewVisitor({ ...newVisitor, purpose: e.target.value })
            }
            className="w-full h-11 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 focus:ring-[#800000] focus:border-[#800000]"
          />

          <select
            value={newVisitor.time}
            onChange={(e) =>
              setNewVisitor({ ...newVisitor, time: e.target.value })
            }
            className="w-full h-11 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 focus:ring-[#800000] focus:border-[#800000]"
          >
            <option value="">Select Time</option>
            {[
              "08:00 AM",
              "09:00 AM",
              "10:00 AM",
              "11:00 AM",
              "12:00 PM",
              "01:00 PM",
              "02:00 PM",
              "03:00 PM",
              "04:00 PM",
              "05:00 PM",
            ].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Invite button (new style) */}
        <button
          type="submit"
          className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#800000] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition shadow-sm"
        >
          <PlusIcon className="h-4 w-4 text-[#800000]" />
          Invite Visitor
        </button>
      </form>

      {/* Visitors List */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-base font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Visitor Log
        </h2>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {visitors.map((v) => (
            <li
              key={v.id}
              className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-base">
                  {v.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  📞 {v.phone}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  {v.purpose} — {v.time}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium ${
                    v.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : v.status === "Checked-in"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {v.status}
                </span>

                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => copyCode(v.code)}
                    className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg border border-[#800000] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    <ClipboardDocumentIcon className="h-4 w-4 text-[#800000]" />
                    Copy
                  </button>
                  <button
                    onClick={() => shareWhatsApp(v)}
                    className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-green-600 text-white hover:bg-green-700"
                  >
                    <PaperAirplaneIcon className="h-4 w-4" />
                    Share
                  </button>
                  <button
                    onClick={() => setSelectedVisitor(v)}
                    className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg border border-[#800000] bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    <UserIcon className="h-4 w-4 text-[#800000]" />
                    Details
                  </button>
                </div>
              </div>

              <div className="mt-4 sm:mt-0">
                <QRCodeCanvas
                  value={`Visitor:${v.name}|Phone:${v.phone}|Purpose:${v.purpose}|Time:${v.time}|Status:${v.status}|Code:${v.code}`}
                  size={72}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"M"}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
