"use client";

import { useState } from "react";

type Visitor = {
  name: string;
  time: string;
  code: string;
  status: "Pending" | "Allowed" | "Denied";
};

export default function VisitorsPanel() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newVisitor, setNewVisitor] = useState({ name: "", time: "" });

  const handleAddVisitor = () => {
    if (!newVisitor.name || !newVisitor.time) return;
    const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
    const visitor: Visitor = {
      name: newVisitor.name,
      time: newVisitor.time,
      code: accessCode,
      status: "Pending",
    };
    setVisitors([visitor, ...visitors]);
    setNewVisitor({ name: "", time: "" });
    setShowForm(false);
  };

  const updateStatus = (index: number, status: "Allowed" | "Denied") => {
    const updated = [...visitors];
    updated[index].status = status;
    setVisitors(updated);
  };

  return (
    <div className="mt-2 p-3 bg-gray-900 border border-gray-700 rounded-xl text-xs md:text-sm animate-fadeIn transition-all duration-300">
      <p className="mb-2 text-yellow-300 font-semibold">👥 Visitor Access</p>

      {/* Add Visitor Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded-full text-white text-xs"
        >
          + Add Visitor
        </button>
      )}

      {/* Add Visitor Form */}
      {showForm && (
        <div className="mt-2 p-2 bg-gray-800 border border-gray-700 rounded-lg space-y-2">
          <input
            type="text"
            placeholder="Visitor name"
            value={newVisitor.name}
            onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })}
            className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-gray-200 placeholder-gray-500 text-xs"
          />
          <input
            type="time"
            value={newVisitor.time}
            onChange={(e) => setNewVisitor({ ...newVisitor, time: e.target.value })}
            className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-gray-200 text-xs"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-200 text-[11px]"
            >
              Cancel
            </button>
            <button
              onClick={handleAddVisitor}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-full text-[11px]"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Visitor List */}
      <div className="mt-3 space-y-2">
        {visitors.map((v, i) => (
          <div
            key={i}
            className="bg-gray-800 border border-gray-700 rounded-lg p-2 flex flex-col gap-1 text-xs"
          >
            <div className="flex justify-between text-gray-300">
              <span>{v.name}</span>
              <span>{v.time}</span>
            </div>
            <div className="text-gray-500 text-[11px]">Code: {v.code}</div>
            <div className="flex justify-between items-center mt-1">
              <span
                className={`text-[11px] ${
                  v.status === "Allowed"
                    ? "text-green-400"
                    : v.status === "Denied"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {v.status}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => updateStatus(i, "Allowed")}
                  className="bg-green-700 hover:bg-green-600 text-white px-2 py-[2px] rounded-full text-[10px]"
                >
                  Allow
                </button>
                <button
                  onClick={() => updateStatus(i, "Denied")}
                  className="bg-red-700 hover:bg-red-600 text-white px-2 py-[2px] rounded-full text-[10px]"
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        ))}

        {visitors.length === 0 && (
          <p className="text-gray-500 text-[11px] italic text-center">
            No visitors added yet.
          </p>
        )}
      </div>
    </div>
  );
}
