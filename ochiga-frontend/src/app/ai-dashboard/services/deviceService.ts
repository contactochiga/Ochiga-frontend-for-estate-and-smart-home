// src/app/ai-dashboard/services/deviceService.ts
import { apiRequest } from "./api";

/**
 * deviceService - simple wrappers to your backend /devices endpoints
 */

export const deviceService = {
  async getDevices(estateId?: string) {
    const q = estateId ? `?estateId=${encodeURIComponent(estateId)}` : "";
    try {
      const data = await apiRequest(`/devices${q}`, { method: "GET" });
      // your backend returns array as data (or data property). Normalize:
      return Array.isArray(data) ? data : data?.data || data;
    } catch (err) {
      console.warn("deviceService.getDevices error", err);
      return [];
    }
  },

  async createDevice(payload: { estate_id: string; name: string; type?: string; metadata?: any }) {
    try {
      const data = await apiRequest("/devices", { method: "POST", body: payload });
      return data;
    } catch (err) {
      throw err;
    }
  },
};
