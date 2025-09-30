"use client";

import { useState, useEffect } from "react";
import {
  LightBulbIcon,
  LockClosedIcon,
  LockOpenIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import mqtt, { MqttClient } from "mqtt";

export default function DevicesPage() {
  const [devices, setDevices] = useState([
    { id: 1, name: "Living Room Light", type: "light", status: true },
    { id: 2, name: "Main Door Lock", type: "lock", status: false },
    { id: 3, name: "AC Unit", type: "ac", status: true },
  ]);

  const [client, setClient] = useState<MqttClient | null>(null);

  useEffect(() => {
    const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
      clientId: `resident-${Math.random().toString(16).slice(2)}`,
      clean: true, // ephemeral session for frontend
      reconnectPeriod: 2000,
      connectTimeout: 30 * 1000,
      will: {
        topic: "estate/clients/resident/disconnect",
        payload: JSON.stringify({ client: "resident-ui", timestamp: Date.now() }),
        qos: 1,
        retain: false,
      },
    });

    setClient(mqttClient);

    mqttClient.on("connect", () => {
      console.log("✅ Connected to MQTT broker");
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
      console.error("MQTT connection error:", err);
      mqttClient.end();
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  const toggleDevice = (id: number) => {
    const updatedDevice = devices.find((d) => d.id === id);
    if (!updatedDevice || !client) return;

    const newStatus = !updatedDevice.status;

    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );

    client.publish(
      `estate/devices/${id}/set`,
      JSON.stringify({
        id,
        type: updatedDevice.type,
        status: newStatus,
        source: "resident-ui",
        timestamp: Date.now(),
      }),
      { qos: 1, retain: false }
    );
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
              onClick={() => toggleDevice(device.id)}
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
