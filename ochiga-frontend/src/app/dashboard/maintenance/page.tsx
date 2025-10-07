"use client";

import { useState } from "react";
import { WrenchScrewdriverIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function MaintenancePage() {
  const [requests, setRequests] = useState([
    { id: 1, title: "Leaking Tap", status: "Resolved", date: "Oct 5, 2025" },
    { id: 2, title: "Light Outage - Block C", status: "Pending", date: "Oct 6, 2025" },
  ]);
  const [newIssue, setNewIssue] = useState("");

  const addRequest = () => {
    if (!newIssue.trim()) return;
    const newReq = {
      id: Date.now(),
      title: newIssue,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };
    setRequests([newReq, ...requests]);
    setNewIssue("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
        <WrenchScrewdriverIcon className="h-7 w-7 text-[#800000]" />
        Maintenance Requests
      </h1>

      {/* Add Maintenance Form */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-5 mb-8 border border-gray-200 dark:border-gray-700">
        <textarea
          value={newIssue}
          onChange={(e) => setNewIssue(e.target.value)}
          placeholder="Describe the issue..."
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-sm bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-[#800000] focus:outline-none"
          rows={3}
        />
        <button
          onClick={addRequest}
          className="mt-4 bg-gradient-to-r from-[#800000] to-black text-white px-5 py-2.5 rounded-lg font-medium shadow hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
          Submit Request
        </button>
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex justify-between items-center shadow-sm"
          >
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{req.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{req.date}</p>
            </div>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                req.status === "Resolved"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
              }`}
            >
              {req.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
