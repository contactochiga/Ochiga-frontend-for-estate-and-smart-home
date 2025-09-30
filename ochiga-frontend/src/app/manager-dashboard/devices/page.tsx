import { useState, useEffect } from "react";
import mqtt, { MqttClient } from "mqtt";

type Device = {
  id: number;
  name: string;
  status: boolean;
};

export default function ResidentDashboard() {
  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: "Living Room Light", status: false },
    { id: 2, name: "Bedroom Fan", status: true },
  ]);

  const [client, setClient] = useState<MqttClient | null>(null);

  useEffect(() => {
    const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
    setClient(mqttClient);

    mqttClient.on("connect", () => {
      console.log("✅ Resident connected to MQTT");
      mqttClient.subscribe("estate/devices/+/status");
    });

    mqttClient.on("message", (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        const deviceId = parseInt(topic.split("/")[2]); // estate/devices/:id/status

        setDevices((prev) =>
          prev.map((d) =>
            d.id === deviceId ? { ...d, status: data.status } : d
          )
        );
      } catch (err) {
        console.error("Resident MQTT parse error:", err);
      }
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  const toggleDevice = (id: number) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: !d.status } : d))
    );

    if (client) {
      const updatedDevice = devices.find((d) => d.id === id);
      if (updatedDevice) {
        const newStatus = !updatedDevice.status;

        client.publish(
          `estate/devices/${id}/toggle`,
          JSON.stringify({ status: newStatus }) // ✅ matches ControlDeviceDto
        );
      }
    }
  };

  return (
    <div>
      <h2>Resident Dashboard</h2>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            {device.name} - {device.status ? "On" : "Off"}
            <button onClick={() => toggleDevice(device.id)}>Toggle</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
