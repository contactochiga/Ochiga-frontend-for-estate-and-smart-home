// ochiga-frontend/src/app/manager-dashboard/devices/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { IotApi } from "@/services/iotApi";
import mqtt, { MqttClient } from "mqtt";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface Device {
  id: string;
  name: string;
  type?: string;
  status: boolean;
}

export default function ManagerDevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [client, setClient] = useState<MqttClient | null>(null);

  // 🔌 Fetch devices from backend
  useEffect(() => {
    const loadDevices = async () => {
      try {
        const data = await IotApi.getEstateDevices();
        setDevices(data);
      } catch (err) {
        console.error("❌ Failed to load estate devices:", err);
      }
    };
    loadDevices();
  }, []);

  // 📡 Optional: connect to MQTT/WebSocket for real-time updates
  useEffect(() => {
    const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
    setClient(mqttClient);

    mqttClient.on("connect", () => {
      console.log("✅ Connected to MQTT broker");
      mqttClient.subscribe("estate/devices/+/status");
    });

    mqttClient.on("message", (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        // Example payload: { id: "1", status: true }
        setDevices((prev) =>
          prev.map((d) => (d.id === data.id ? { ...d, status: data.status } : d))
        );
      } catch (err) {
        console.error("MQTT parse error:", err);
      }
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  // 🔘 Toggle device using API + sync to backend
  const toggleDevice = async (id: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      await IotApi.controlDevice(id, {
        action: newStatus ? "on" : "off",
      });

      // Update UI instantly
      setDevices((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
      );
    } catch (err) {
      console.error("❌ Failed to control device:", err);
    }
  };

  // Mock analytics data (could come from API later)
  const powerUsage = [30, 45, 50, 40, 60, 70, 55];
  const waterUsage = [1000, 1200, 950, 1300, 1250, 1400, 1100];

  const powerChart = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Power (kWh)",
        data: powerUsage,
        borderColor: "rgb(34,197,94)",
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const waterChart = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Water (Litres)",
        data: waterUsage,
        borderColor: "rgb(59,130,246)",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Estate Devices Control & Analytics
      </h1>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-gray-600 dark:text-gray-300">Power Usage Today</h3>
          <p className="text-2xl font-bold text-green-600">72 kWh</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-gray-600 dark:text-gray-300">Water Consumption</h3>
          <p className="text-2xl font-bold text-blue-600">1,250 L</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-gray-600 dark:text-gray-300">Devices Online</h3>
          <p className="text-2xl font-bold text-green-500">
            {devices.length > 0
              ? `${Math.round(
                  (devices.filter((d) => d.status).length / devices.length) * 100
                )}%`
              : "0%"}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-gray-600 dark:text-gray-300">Alerts</h3>
          <p className="text-2xl font-bold text-red-500">{alerts.length}</p>
        </div>
      </div>

      {/* Device Controls */}
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Control Devices
      </h2>
      <div className="space-y-4 mb-8">
        {devices.map((device) => (
          <div
            key={device.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow rounded-lg"
          >
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {device.name}
            </span>
            <button
              onClick={() => toggleDevice(device.id, device.status)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                device.status
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {device.status ? "On" : "Off"}
            </button>
          </div>
        ))}
      </div>

      {/* Usage Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Power Usage (Last 7 Days)
          </h3>
          <Line data={powerChart} />
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Water Consumption (Last 7 Days)
          </h3>
          <Line data={waterChart} />
        </div>
      </div>

      {/* Alerts Section */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-gray-700 dark:text-gray-300 font-semibold mb-3">
          Recent Alerts
        </h3>
        <ul className="space-y-2">
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className="p-3 bg-red-50 dark:bg-red-900/30 rounded-md text-red-600 dark:text-red-400"
            >
              <span className="font-medium">{alert.message}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">
                {alert.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
