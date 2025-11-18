// src/app/ai-dashboard/services/aiService.ts
import { apiRequest } from "./api";

/**
 * aiService.chat:
 * - Calls backend automation AI endpoint (/automations/ai-suggest) as a best-effort AI assistant.
 * - If estateId is not present in localStorage, sends null; backend may reject — we handle errors gracefully.
 *
 * NOTE: For broader conversational AI endpoints you'd add /ai/chat on backend. For now we reuse automations endpoint.
 */
export const aiService = {
  async chat(prompt: string) {
    // try to get currently selected estate from localStorage
    const estateId = typeof window !== "undefined" ? localStorage.getItem("ochiga_estate") : null;

    try {
      const payload = { prompt, estateId };
      const data = await apiRequest("/automations/ai-suggest", { method: "POST", body: payload });
      // automations.ai-suggest returns the saved automation object; we adapt response for chat UI
      // if AI returns the automation, try to create a friendly reply
      const reply =
        data?.name && data?.action
          ? `Automation created: "${data.name}". Trigger: ${JSON.stringify(data.trigger)} Action: ${JSON.stringify(
              data.action
            )}`
          : data?.message || "I've processed your instruction.";
      // also allow backend to send panel hint if present (ai->panel)
      const panel = data?.metadata?.panel || null;
      return { reply, panel, raw: data };
    } catch (err: any) {
      // fallback: return friendly error as reply
      console.warn("aiService.chat error:", err?.message || err);
      return { reply: "Sorry — AI service unavailable or could not create automation.", panel: null, error: err?.message };
    }
  },

  // helper: convert NL and return structured automation JSON WITHOUT saving
  async previewAutomation(prompt: string) {
    try {
      const estateId = typeof window !== "undefined" ? localStorage.getItem("ochiga_estate") : null;
      const data = await apiRequest("/automations/ai-suggest", { method: "POST", body: { prompt, estateId } });
      return { ok: true, data };
    } catch (err: any) {
      return { ok: false, error: err?.message || String(err) };
    }
  },
};
