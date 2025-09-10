"use client";

import { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import WalletCard from "../../components/WalletCard"; // 👈 import your new wallet card

export default function ResidentDashboardPage() {
  // device states
  const [devices, setDevices] = useState({
    lights: false,
    ac: false,
    door: false,
  });

  // modal state
  const [modal, setModal] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({ open: false, title: "", message: "" });

  // toggle smart devices
  const toggleDevice = (device: keyof typeof devices) => {
    setDevices((prev) => {
      const updated = { ...prev, [device]: !prev[device] };
      const status = updated[device] ? "ON" : "OFF";
      showNotification(
        `${device.charAt(0).toUpperCase() + device.slice(1)} Control`,
        `${device.charAt(0).toUpperCase() + device.slice(1)} turned ${status}`
      );
      return updated;
    });
  };

  const inviteVisitor = () => {
    showNotification("Invite Visitor", "Visitor invitation sent successfully!");
  };

  const viewVisitor = (name: string) => {
    showNotification("Visitor Details", `Viewing details for ${name}`);
  };

  const viewUpdate = (title: string) => {
    showNotification("Community Update", `Viewing: ${title}`);
  };

  const showNotification = (title: string, message: string) => {
    setModal({ open: true, title, message });
  };

  return (
    <ProtectedRoute role="resident">
      <div className="min-h-screen bg-gray-100 text-gray-900 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ✅ Wallet (now using shared component) */}
        <WalletCard />

        {/* ✅ Smart Home Controls */}
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">SMART HOME CONTROLS</h2>
          <div className="flex space-x-4 mb-4">
            <button
              className="flex flex-col items-center bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={() => toggleDevice("lights")}
            >
              💡
              <span className="text-xs mt-1">Lights</span>
            </button>
            <button
              className="flex flex-col items-center bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={() => toggleDevice("ac")}
            >
              ❄️
              <span className="text-xs mt-1">AC</span>
            </button>
            <button
              className="flex flex-col items-center bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={() => toggleDevice("door")}
            >
              🔒
              <span className="text-xs mt-1">Door</span>
            </button>
          </div>
          <a href="#" className="text-xs text-blue-600 hover:text-blue-800">
            Rooms & Devices →
          </a>
        </div>

        {/* ✅ Visitors */}
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">VISITORS</h2>
          <button
            className="w-full bg-red-600 py-2 rounded-lg text-white font-semibold mb-4 hover:bg-red-700 transition-colors"
            onClick={inviteVisitor}
          >
            Invite Visitor
          </button>
          <div id="visitors-list">
            <div
              className="bg-gray-100 p-3 rounded-lg flex justify-between items-center mb-2 cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => viewVisitor("John Doe")}
            >
              <span>
                <strong>John Doe</strong>
                <br />
                <span className="text-xs text-gray-600">Visited 2 days ago</span>
              </span>
              <span>→</span>
            </div>
            <div
              className="bg-gray-100 p-3 rounded-lg flex justify-between items-center mb-2 cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => viewVisitor("Jane Smith")}
            >
              <span>
                <strong>Jane Smith</strong>
                <br />
                <span className="text-xs text-gray-600">Visited last week</span>
              </span>
              <span>→</span>
            </div>
          </div>
        </div>

        {/* ✅ Community */}
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">COMMUNITY</h2>
          <div
            className="bg-gray-100 p-3 rounded-lg flex justify-between items-center mb-2 cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => viewUpdate("Reminder")}
          >
            <span>
              <strong>Reminder</strong>
              <br />
              <span className="text-xs text-gray-600">
                Community meeting on Saturday at 5PM
              </span>
            </span>
            <span>→</span>
          </div>
          <div
            className="bg-gray-100 p-3 rounded-lg flex justify-between items-center mb-2 cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => viewUpdate("Notice")}
          >
            <span>
              <strong>Notice</strong>
              <br />
              <span className="text-xs text-gray-600">
                Pool maintenance tomorrow morning
              </span>
            </span>
            <span>→</span>
          </div>
        </div>

        {/* ✅ Notification Modal */}
        {modal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-lg max-w-sm mx-4">
              <h3 className="font-bold text-lg mb-2">{modal.title}</h3>
              <p className="mb-4">{modal.message}</p>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setModal({ ...modal, open: false })}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
