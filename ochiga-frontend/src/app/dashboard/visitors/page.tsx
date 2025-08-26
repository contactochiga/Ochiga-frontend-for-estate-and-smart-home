"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState([
    { id: 1, name: "John Doe", purpose: "Plumber", status: "Pending", time: "10:00 AM" },
    { id: 2, name: "Jane Smith", purpose: "Friend", status: "Checked-in", time: "09:30 AM" },
  ]);

  const [newVisitor, setNewVisitor] = useState({
    name: "",
    purpose: "",
    time: "",
  });

  const addVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisitor.name || !newVisitor.purpose) return;

    const newEntry = {
      id: visitors.length + 1,
      ...newVisitor,
      status: "Pending",
    };

    setVisitors([...visitors, newEntry]);
    setNewVisitor({ name: "", purpose: "", time: "" });
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Visitors
      </h1>

      {/* Add Visitor Form */}
      <form
        onSubmit={addVisitor}
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 grid gap-4 sm:grid-cols-3"
      >
        <input
          type="text"
          placeholder="Visitor Name"
          value={newVisitor.name}
          onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })}
          className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="text"
          placeholder="Purpose (e.g. Electrician)"
          value={newVisitor.purpose}
          onChange={(e) => setNewVisitor({ ...newVisitor, purpose: e.target.value })}
          className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="time"
          value={newVisitor.time}
          onChange={(e) => setNewVisitor({ ...newVisitor, time: e.target.value })}
          className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
        />
        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Visitor
        </button>
      </form>

      {/* Visitors List */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Visitor Log</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {visitors.map((v) => (
            <li key={v.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{v.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
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
              </div>

              {/* QR Code */}
              <div className="mt-3 sm:mt-0">
                <QRCodeCanvas
                  value={`Visitor:${v.name}|Purpose:${v.purpose}|Time:${v.time}|Status:${v.status}`}
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
    </main>
  );
}
