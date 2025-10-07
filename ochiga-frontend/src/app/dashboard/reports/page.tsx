"use client";

import { useState } from "react";
import { ExclamationTriangleIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function ReportsPage() {
  const [reports, setReports] = useState([
    { id: 1, title: "Broken streetlight near Block D", status: "Open", date: "Oct 3, 2025" },
  ]);
  const [newReport, setNewReport] = useState("");

  const submitReport = () => {
    if (!newReport.trim()) return;
    setReports([
      { id: Date.now(), title: newReport, status: "Open", date: new Date().toLocaleDateString() },
      ...reports,
    ]);
    setNewReport("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
        <ExclamationTriangleIcon className="h-6 w-6 text-[#800000]" />
        Incident Reports
      </h1>

      {/* Report Form */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-5 mb-8 border border-gray-200 dark:border-gray-700">
        <textarea
          value={newReport}
          onChange={(e) => setNewReport(e.target.value)}
          placeholder="Describe what happened..."
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-sm bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-[#800000] focus:outline-none"
          rows={3}
        />
        <button
          onClick={submitReport}
          className="mt-4 bg-gradient-to-r from-[#800000] to-black text-white px-5 py-2.5 rounded-lg font-medium shadow hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
          Submit Report
        </button>
      </div>

      {/* Report History */}
      <div className="space-y-4">
        {reports.map((r) => (
          <div
            key={r.id}
            className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex justify-between items-center shadow-sm"
          >
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{r.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{r.date}</p>
            </div>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                r.status === "Open"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              }`}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
