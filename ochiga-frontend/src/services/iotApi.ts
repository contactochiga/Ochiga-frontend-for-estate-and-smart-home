// src/services/iotApi.ts
import axios from "axios";

// ✅ Unified base URL
const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL + "/iot" ||
    "http://localhost:4000/api/iot",
});

// 🔑 Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ IOT API methods
export const IotApi = {
  getMyDevices: async () => {
    const res = await API.get("/my-devices");
    return res.data;
  },

  getEstateDevices: async () => {
    const res = await API.get("/estate-devices");
    return res.data;
  },

  createDevice: async (data: {
    name: string;
    type: string;
    isEstateLevel?: boolean;
  }) => {
    const res = await API.post("/devices", data);
    return res.data;
  },

  controlDevice: async (
    deviceId: string,
    data: { action: "on" | "off" | "set-temp"; value?: any }
  ) => {
    const res = await API.post(`/devices/${deviceId}/control`, data);
    return res.data;
  },

  getDeviceLogs: async (deviceId: string) => {
    const res = await API.get(`/devices/${deviceId}/logs`);
    return res.data;
  },
};
