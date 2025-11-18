import { apiRequest } from "@/lib/api";

export const deviceService = {
  async registerDevice(data: { name: string; type: string; roomId?: string }) {
    return apiRequest("/devices/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getDevices() {
    return apiRequest("/devices/all");
  }
};
