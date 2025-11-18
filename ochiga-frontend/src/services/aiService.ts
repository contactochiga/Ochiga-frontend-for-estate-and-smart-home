import { apiRequest } from "@/lib/api";

export const aiService = {
  async chat(message: string) {
    return apiRequest("/ai/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  },

  async analyze(payload: any) {
    return apiRequest("/ai/analyze", {
      method: "POST",
      body: JSON.stringify({ payload }),
    });
  }
};
