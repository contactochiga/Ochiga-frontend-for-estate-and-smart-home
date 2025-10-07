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
    if (!newVisitor.name || !newVisitor.phone || !newVisitor.purpose || !newVisitor.time) return;

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
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg mb-10 border border-gray-100 dark:border-gray-800"
      >
        <h2 className="text-base font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Invite a Visitor
        </h2>

        {/* Grid Inputs */}
        <div className="grid gap-3 sm:grid-cols-4">
          <input
            type="text"
            placeholder="Visitor Name"
            value={newVisitor.name}
            onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })}
            className="w-full h-11 p-2.5 rounded-lg border text-sm dark:bg-gray-800 dark:border-gray-700 focus:ring-[#800000] focus:border-[#800000]"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={newVisitor.phone}
            onChange={(e) => setNewVisitor({ ...newVisitor, phone: e.target.value })}
            className="w-full h-11 p-2.5 rounded-lg border text-sm dark:bg-gray-800 dark:border-gray-700 focus:ring-[#800000] focus:border-[#800000]"
          />
          <input
            type="text"
            placeholder="Purpose of Visit"
            value={newVisitor.purpose}
            onChange={(e) => setNewVisitor({ ...newVisitor, purpose: e.target.value })}
            className="w-full h-11 p-2.5 rounded-lg border text-sm dark:bg-gray-800 dark:border-gray-700 focus:ring-[#800000] focus:border-[#800000]"
          />

          {/* Select Time Dropdown */}
          <select
            value={newVisitor.time}
            onChange={(e) => setNewVisitor({ ...newVisitor, time: e.target.value })}
            className="w-full h-11 p-2.5 rounded-lg border text-sm dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-300 focus:ring-[#800000] focus:border-[#800000]"
          >
            <option value="">Select Time</option>
            <option value="08:00 AM">08:00 AM</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="01:00 PM">01:00 PM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="03:00 PM">03:00 PM</option>
            <option value="04:00 PM">04:00 PM</option>
            <option value="05:00 PM">05:00 PM</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-2.5 rounded-xl font-semibold shadow bg-gradient-to-r from-[#800000] to-black text-white hover:opacity-90 transition flex items-center justify-center gap-2 text-sm"
        >
          <PlusIcon className="h-4 w-4" />
          Invite Visitor
        </button>
      </form>

      {/* Visitors List */}
      <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <h2 className="text-base font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Visitor Log
        </h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
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

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => copyCode(v.code)}
                    className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <ClipboardDocumentIcon className="h-4 w-4" />
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
                    className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-gradient-to-r from-[#800000] to-black text-white hover:opacity-90"
                  >
                    <UserIcon className="h-4 w-4" />
                    Details
                  </button>
                </div>
              </div>

              {/* QR Code */}
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

      {/* Modal */}
      {selectedVisitor && (
        <div className="fixed inset-0 bg-black/60 flex items-end z-50">
          <div className="bg-white dark:bg-gray-900 w-full rounded-t-2xl p-6 animate-slideUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                Visitor Details
              </h3>
              <button
                onClick={() => setSelectedVisitor(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <p><span className="font-medium">Name:</span> {selectedVisitor.name}</p>
              <p><span className="font-medium">Phone:</span> {selectedVisitor.phone}</p>
              <p><span className="font-medium">Purpose:</span> {selectedVisitor.purpose}</p>
              <p><span className="font-medium">Time:</span> {selectedVisitor.time}</p>
              <p><span className="font-medium">Status:</span> {selectedVisitor.status}</p>
              <p><span className="font-medium">Code:</span> {selectedVisitor.code}</p>
            </div>
            <div className="flex justify-center mt-6">
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
