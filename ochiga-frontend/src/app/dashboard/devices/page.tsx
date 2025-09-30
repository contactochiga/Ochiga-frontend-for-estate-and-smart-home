// ochiga-frontend/src/app/dashboard/devices/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  LightBulbIcon,
  LockClosedIcon,
  LockOpenIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import mqtt, { MqttClient } from "mqtt";
import { IotApi } from "@/services/iotApi";

interface Device {
  id: string;
  name: string;
  type: string;
  status: boolean;
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [client, setClient] = useState<MqttClient | null>(null);

  // 🔌 Load devices from backend API
  useEffect(() => {
    const loadDevices = async () => {
      try {
        const data = await IotApi.getMyDevices();
        setDevices(data);
      } catch (err) {
        console.error("❌ Failed to load my devices:", err);
      }
    };
    loadDevices();
  }, []);

  // 📡 Connect to MQTT for real-time updates
  useEffect(() => {
    const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
      clientId: `resident-${Math.random().toString(16).slice(2)}`,
      clean: true,
      reconnectPeriod: 2000,
      connectTimeout: 30 * 1000,
    });

    setClient(mqttClient);

    mqttClient.on("connect", () => {
      console.log("✅ Resident connected to MQTT broker");
      mqttClient.subscribe("estate/devices/+/status", { qos: 1 });
    });

    mqttClient.on("message", (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        setDevices((prev) =>
          prev.map((d) => (d.id === data.id ? { ...d, status: data.status } : d))
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

  // 🔘 Toggle device (API + local update)
  const toggleDevice = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    try {
      await IotApi.controlDevice(id, {
        action: newStatus ? "on" : "off",
      });

      setDevices((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
      );
    } catch (err) {
      console.error("❌ Failed to control device:", err);
    }
  };

  const renderIcon = (type: string, status: boolean) => {
    switch (type) {
      case "light":
        return (
          <LightBulbIcon
            className={`h-10 w-10 transition-colors ${
              status ? "text-yellow-400 drop-shadow-glow" : "text-gray-400"
            }`}
          />
        );
      case "lock":
        return status ? (
          <LockOpenIcon className="h-10 w-10 text-green-500" />
        ) : (
          <LockClosedIcon className="h-10 w-10 text-red-500" />
        );
      case "ac":
        return (
          <DevicePhoneMobileIcon
            className={`h-10 w-10 ${
              status ? "text-blue-500 animate-pulse" : "text-gray-400"
            }`}
          />
        );
      default:
        return <DevicePhoneMobileIcon className="h-10 w-10 text-gray-600" />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Devices Control Panel
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <div
            key={device.id}
            className={`p-6 rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 cursor-pointer ${
              device.status
                ? "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-700"
                : "bg-white dark:bg-gray-800"
            }`}
          >
            {renderIcon(device.type, device.status)}
            <h3 className="mt-3 font-semibold text-lg text-gray-900 dark:text-gray-100">
              {device.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {device.type.toUpperCase()}
            </p>
            <button
              onClick={() => toggleDevice(device.id, device.status)}
              className={`mt-5 w-full py-2 rounded-lg font-medium shadow transition-colors ${
                device.status
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {device.status ? "Turn Off" : "Turn On"}
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px rgba(250, 204, 21, 0.8));
        }
      `}</style>
    </main>
  );
}
