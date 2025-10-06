// src/services/iotApi.ts
import axios from "axios";

// ✅ Dynamically choose correct backend URL
const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL?.replace(":3000", ":4000") + "/iot" ||
    "http://localhost:4000/iot",
});

// 🔑 Automatically attach JWT from localStorage (or cookies)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ IOT API functions
export const IotApi = {
  // Resident’s devices
  getMyDevices: async () => {
    const res = await API.get("/my-devices");
    return res.data;
  },

  // Manager’s estate devices
  getEstateDevices: async () => {
    const res = await API.get("/estate-devices");
    return res.data;
  },

  // Create/register a new device
  createDevice: async (data: {
    name: string;
    type: string;
    isEstateLevel?: boolean;
  }) => {
    const res = await API.post("/devices", data);
    return res.data;
  },

  // ✅ Control a device (must use POST not PATCH)
  controlDevice: async (
    deviceId: string,
    data: { action: "on" | "off" | "set-temp"; value?: any }
  ) => {
    const res = await API.post(`/devices/${deviceId}/control`, data);
    return res.data;
  },

  // Fetch device logs
  getDeviceLogs: async (deviceId: string) => {
    const res = await API.get(`/devices/${deviceId}/logs`);
    return res.data;
  },
};
