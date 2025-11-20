// ochiga-frontend/src/services/deviceService.ts

import { apiRequest } from "@/lib/api";

/* -------------------------------------------------------------------
   BASE DEVICE SERVICE
   (keeps your old methods so nothing breaks)
------------------------------------------------------------------- */
export const deviceService = {
  /** Register a device inside a room/home */
  async registerDevice(data: { name: string; type: string; roomId?: string }) {
    return apiRequest("/devices/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /** Get all devices (home-level fallback) */
  async getDevices() {
    return apiRequest("/devices/all");
  },

  /* -------------------------------------------------------------------
     NEW — ESTATE DEVICE DISCOVERY
     Supports: EstateDevicePanel.tsx, DeviceDiscoveryPanel.tsx
  ------------------------------------------------------------------- */

  /** Estate-level scan for all devices (Zigbee, WiFi, SSDP, BLE, etc.) */
  async discoverEstateDevices() {
    return apiRequest("/estate/devices/discover");
  },

  /** Connect a discovered device to the estate */
  async connectEstateDevice(id: string | number) {
    return apiRequest(`/estate/devices/connect/${id}`, {
      method: "POST",
    });
  },

  /* -------------------------------------------------------------------
     NEW — ESTATE DEVICE MANAGEMENT
     Supports: EstateDevicePanel (list, toggle, remove)
  ------------------------------------------------------------------- */

  /** List all devices belonging to an estate */
  async listEstateDevices(estateId: string) {
    return apiRequest(`/estate/devices/list/${estateId}`);
  },

  /** Toggle switch / enable / disable device */
  async toggleDevice(id: string, newStatus: string) {
    return apiRequest(`/estate/devices/toggle/${id}`, {
      method: "POST",
      body: JSON.stringify({ status: newStatus }),
    });
  },

  /** Delete/remove an estate device */
  async removeDevice(id: string) {
    return apiRequest(`/estate/devices/remove/${id}`, {
      method: "DELETE",
    });
  },
};
