// src/app/ai-dashboard/services/deviceService.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * deviceService - wrapper for backend /devices endpoints
 * Handles JWT from Supabase automatically
 */
export const deviceService = {
  // Get current user's JWT
  async getToken(): Promise<string | null> {
    const session = supabase.auth.session();
    return session?.access_token || null;
  },

  async getDevices(estateId?: string) {
    const token = await this.getToken();
    const q = estateId ? `?estateId=${encodeURIComponent(estateId)}` : "";
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/devices${q}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error(`Failed to fetch devices: ${res.statusText}`);
    const data = await res.json();
    return Array.isArray(data) ? data : data?.data || data;
  },

  async createDevice(payload: { estate_id: string; name: string; type?: string; metadata?: any }) {
    const token = await this.getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/devices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Failed to create device: ${res.statusText}`);
    return res.json();
  },

  async discoverDevices() {
    const token = await this.getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/devices/discover`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Device discovery failed");
    }
    const data = await res.json();
    return data.devices || [];
  },
};
