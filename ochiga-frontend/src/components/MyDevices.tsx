// ochiga-frontend/src/components/MyDevices.tsx
"use client";

import { useEffect, useState } from "react";
import { IotApi } from "../services/iotApi";
import mqtt, { MqttClient } from "mqtt";

interface Device {
  id: string;
  name: string;
  type: string;
  status: boolean;
}

export default function MyDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [client, setClient] = useState<MqttClient | null>(null);

  // 📡 Fetch devices from backend
  useEffect(() => {
    const loadDevices = async () => {
      try {
        const data = await IotApi.getMyDevices();
        setDevices(data);
      } catch (err) {
        console.error("❌ Failed to load devices:", err);
      }
    };
    loadDevices();
  }, []);

  // 🔌 Connect to MQTT for real-time updates
  useEffect(() => {
    const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
      clientId: `mydevices-${Math.random().toString(16).slice(2)}`,
      clean: true,
      reconnectPeriod: 2000,
      connectTimeout: 30 * 1000,
    });

    setClient(mqttClient);

    mqttClient.on("connect", () => {
      console.log("✅ MyDevices connected to MQTT");
      mqttClient.subscribe("estate/devices/+/status", { qos: 1 });
    });

    mqttClient.on("message", (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        setDevices((prev) =>
          prev.map((d) =>
            d.id === data.id ? { ...d, status: data.status } : d
          )
        );
      } catch (err) {
        console.error("MQTT parse error:", err);
      }
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT error:", err);
      mqttClient.end();
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  // 🔘 Toggle device
  const toggleDevice = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    try {
      await IotApi.controlDevice(id, {
        action: newStatus ? "on" : "off",
      });

      // Update immediately (don’t wait for MQTT)
      setDevices((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
      );
    } catch (err) {
      console.error("❌ Failed to control device:", err);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        My Devices
      </h2>
      <ul className="space-y-3">
        {devices.map((d) => (
          <li
            key={d.id}
            className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {d.name} — {d.status ? "ON" : "OFF"}
            </span>
            <button
              onClick={() => toggleDevice(d.id, d.status)}
              className={`px-3 py-1 rounded-md text-sm font-semibold shadow ${
                d.status
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {d.status ? "Turn Off" : "Turn On"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
