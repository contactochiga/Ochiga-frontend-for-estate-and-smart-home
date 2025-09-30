// src/components/MyDevices.tsx
import { useEffect, useState } from 'react';
import { IotApi } from '../services/iotApi';

export default function MyDevices() {
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {
    IotApi.getMyDevices().then(setDevices).catch(console.error);
  }, []);

  return (
    <div>
      <h2>My Devices</h2>
      <ul>
        {devices.map((d) => (
          <li key={d.id}>
            {d.name} - {d.isOn ? 'ON' : 'OFF'}
            <button onClick={() => IotApi.controlDevice(d.id, { action: 'on' })}>
              Turn On
            </button>
            <button onClick={() => IotApi.controlDevice(d.id, { action: 'off' })}>
              Turn Off
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
