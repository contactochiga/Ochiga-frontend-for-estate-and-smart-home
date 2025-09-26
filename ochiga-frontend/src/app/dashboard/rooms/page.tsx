// ochiga-frontend/src/app/dashboard/rooms/page.tsx
"use client";

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function RoomsPage() {
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showAddDevice, setShowAddDevice] = useState(false);

  const rooms = [
    { name: "Living Room", devices: 4 },
    { name: "Bedroom", devices: 2 },
    { name: "Kitchen", devices: 3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Rooms
        </h1>
        <button
          onClick={() => setShowAddRoom(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#800000] to-black text-white shadow-md hover:opacity-90 transition"
        >
          <PlusIcon className="w-4 h-4" />
          Add Room
        </button>
      </div>

      {/* Rooms list */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {rooms.map((room, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white dark:bg-gray-900 shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#800000] to-black flex items-center justify-center text-white mb-2">
              🏠
            </div>
            <p className="font-medium text-gray-900 dark:text-white">
              {room.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {room.devices} devices
            </p>
          </div>
        ))}
      </div>

      {/* Floating Add Device button */}
      <button
        onClick={() => setShowAddDevice(true)}
        className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#800000] to-black text-white flex items-center justify-center shadow-lg hover:opacity-90 transition"
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      {/* Add Room Modal */}
      {showAddRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-2xl p-6 shadow-xl animate-scaleUp">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add New Room
            </h3>
            <input
              type="text"
              placeholder="Room name"
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddRoom(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddRoom(false)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#800000] to-black text-white font-semibold"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Device Modal (Industry-Standard UI) */}
      {showAddDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-2xl p-6 shadow-xl animate-scaleUp">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add New Device
            </h3>

            <div className="space-y-4">
              {/* Auto Discovery */}
              <button
                onClick={() => alert("Scanning local Wi-Fi network...")}
                className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <span className="text-xl">📡</span>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">
                    Auto Discover (Wi-Fi)
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Scan your local network for supported devices
                  </p>
                </div>
              </button>

              {/* Bluetooth */}
              <button
                onClick={() => alert("Scanning for Bluetooth devices...")}
                className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <span className="text-xl">🔵</span>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">
                    Nearby via Bluetooth
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Detect devices broadcasting over BLE
                  </p>
                </div>
              </button>

              {/* Manual */}
              <button
                onClick={() => alert("Manual add (QR/Code/Category)...")}
                className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <span className="text-xl">➕</span>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">
                    Manual Add
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Add by QR code, device ID, or select category
                  </p>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowAddDevice(false)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#800000] to-black text-white font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
