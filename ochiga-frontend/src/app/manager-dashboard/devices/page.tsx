"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import mqtt, { MqttClient } from "mqtt";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function ManagerDevicesPage() {
  const [devices, setDevices] = useState<
    { id: number; name: string; type: string; status: boolean; online: boolean }[]
  >([]);
  const [alerts, setAlerts] = useState<{ id: number; message: string; time: string }[]>([]);
  const [powerUsage, setPowerUsage] = useState<number[]>([]);
  const [waterUsage, setWaterUsage] = useState<number[]>([]);

  const [client, setClient] = useState<MqttClient | null>(null);

  useEffect(() => {
    const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
      clientId: `manager-${Math.random().toString(16).slice(2)}`,
      clean: true,
      reconnectPeriod: 2000,
      connectTimeout: 30 * 1000,
      will: {
        topic: "estate/clients/manager/disconnect",
        payload: JSON.stringify({ client: "manager-ui", timestamp: Date.now() }),
        qos: 1,
        retain: false,
      },
    });

    setClient(mqttClient);

    mqttClient.on("connect", () => {
      console.log("✅ Manager connected to MQTT broker");

      // Subscribe to all device statuses + analytics + alerts
      mqttClient.subscribe("estate/devices/+/status", { qos: 1 });
      mqttClient.subscribe("estate/analytics/power", { qos: 1 });
      mqttClient.subscribe("estate/analytics/water", { qos: 1 });
      mqttClient.subscribe("estate/alerts", { qos: 1 });
    });

    mqttClient.on("message", (topic, message) => {
      try {
        const payload = JSON.parse(message.toString());

        if (topic.startsWith("estate/devices/")) {
          setDevices((prev) => {
            const exists = prev.find((d) => d.id === payload.id);
            if (exists) {
              return prev.map((d) =>
                d.id === payload.id
                  ? { ...d, status: payload.status, online: true }
                  : d
              );
            } else {
              return [
                ...prev,
                {
                  id: payload.id,
                  name: payload.name || `Device ${payload.id}`,
                  type: payload.type || "unknown",
                  status: payload.status,
                  online: true,
                },
              ];
            }
          });
        }

        if (topic === "estate/analytics/power") {
          setPowerUsage(payload.values || []);
        }

        if (topic === "estate/analytics/water") {
          setWaterUsage(payload.values || []);
        }

        if (topic === "estate/alerts") {
          setAlerts((prev) => [
            { id: Date.now(), message: payload.message, time: new Date().toLocaleString() },
            ...prev,
          ]);
        }
      } catch (err) {
        console.error("MQTT parse error:", err);
      }
    });

    mqttClient.on("error", (err) => {
      console.error("Manager MQTT error:", err);
      mqttClient.end();
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  // Charts
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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-gray-600 dark:text-gray-300">Devices Online</h3>
          <p className="text-2xl font-bold text-green-500">
            {devices.filter((d) => d.online).length}/{devices.length}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-gray-600 dark:text-gray-300">Active Alerts</h3>
          <p className="text-2xl font-bold text-red-500">{alerts.length}</p>
        </div>
      </div>

      {/* Device Controls */}
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Devices Status
      </h2>
      <div className="space-y-4 mb-8">
        {devices.map((device) => (
          <div
            key={device.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow rounded-lg"
          >
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {device.name} ({device.type}) —{" "}
              {device.online ? (
                <span className="text-green-500">Online</span>
              ) : (
                <span className="text-red-500">Offline</span>
              )}
            </span>
            <span
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                device.status
                  ? "bg-green-500 text-white"
                  : "bg-gray-400 text-gray-800"
              }`}
            >
              {device.status ? "On" : "Off"}
            </span>
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
