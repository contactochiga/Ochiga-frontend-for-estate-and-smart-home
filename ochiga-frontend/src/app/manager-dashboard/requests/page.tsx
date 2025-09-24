"use client";

import React, { useState } from "react";

interface Request {
  id: number;
  resident: string;
  type: string;
  status: "Pending" | "In Progress" | "Completed" | "Rejected";
  date: string;
}

const sampleRequests: Request[] = [
  {
    id: 1,
    resident: "John Doe",
    type: "Plumbing Issue",
    status: "Pending",
    date: "2025-09-20",
  },
  {
    id: 2,
    resident: "Mary Johnson",
    type: "Security Access",
    status: "In Progress",
    date: "2025-09-21",
  },
  {
    id: 3,
    resident: "Samuel Ade",
    type: "Payment Confirmation",
    status: "Completed",
    date: "2025-09-18",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>(sampleRequests);

  const updateStatus = (id: number, newStatus: Request["status"]) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Requests</h1>
          <p className="text-gray-600 text-sm">
            Manage all estate service and resident requests
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
          + New Request
        </button>
      </div>

      {/* Requests List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((req) => (
          <div
            key={req.id}
            className="border rounded-lg shadow-sm p-4 bg-white flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{req.type}</h2>
              <p className="text-sm text-gray-600">Resident: {req.resident}</p>
              <p className="text-sm text-gray-500">Date: {req.date}</p>
              <span
                className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  req.status
                )}`}
              >
                {req.status}
              </span>
            </div>

            {/* Action Buttons */}
            {req.status === "Pending" || req.status === "In Progress" ? (
              <div className="flex gap-2 mt-4">
                <button
                  className="flex-1 bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200"
                  onClick={() => updateStatus(req.id, "Completed")}
                >
                  Approve
                </button>
                <button
                  className="flex-1 bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200"
                  onClick={() => updateStatus(req.id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
