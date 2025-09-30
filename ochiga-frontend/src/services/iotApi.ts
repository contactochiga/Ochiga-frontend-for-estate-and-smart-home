// src/services/iotApi.ts
import axios from 'axios';

// 👇 Change this to your backend URL (NestJS host)
const API = axios.create({
  baseURL: 'http://localhost:3000/iot',
});

// 🔑 Add JWT automatically to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or from cookies/secure storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const IotApi = {
  // Resident’s devices
  getMyDevices: async () => {
    const res = await API.get('/my-devices');
    return res.data;
  },

  // Manager’s estate devices
  getEstateDevices: async () => {
    const res = await API.get('/estate-devices');
    return res.data;
  },

  // Create/register a new device
  createDevice: async (data: {
    name: string;
    type: string;
    isEstateLevel?: boolean;
  }) => {
    const res = await API.post('/devices', data);
    return res.data;
  },

  // Control a device (on/off/set-temp)
  controlDevice: async (
    deviceId: string,
    data: { action: 'on' | 'off' | 'set-temp'; value?: any },
  ) => {
    const res = await API.patch(`/devices/${deviceId}/control`, data);
    return res.data;
  },

  // Fetch device logs
  getDeviceLogs: async (deviceId: string) => {
    const res = await API.get(`/devices/${deviceId}/logs`);
    return res.data;
  },
};
