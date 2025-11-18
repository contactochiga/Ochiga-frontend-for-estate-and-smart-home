import { apiRequest } from "@/lib/api";

export const authService = {
  async register(data: { name: string; email: string; password: string }) {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async login(data: { email: string; password: string }) {
    const res = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // Store JWT
    localStorage.setItem("ochiga_token", res.access_token);
    return res;
  },

  logout() {
    localStorage.removeItem("ochiga_token");
  }
};
