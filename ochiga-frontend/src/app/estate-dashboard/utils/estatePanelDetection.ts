// src/app/estate-dashboard/utils/estatePanelDetection.ts
export function detectEstatePanelType(message: string): string | null {
  const lower = message.toLowerCase();

  // ===== Estate Home & Resident Management =====
  const homeKeywords = ["create home", "new home", "add home", "register home"];
  const assignKeywords = ["assign resident", "add resident", "attach user", "link user", "assign user"];

  if (homeKeywords.some((kw) => lower.includes(kw))) return "create_home";
  if (assignKeywords.some((kw) => lower.includes(kw))) return "assign_resident";

  // ===== Estate Devices / Infrastructure =====
  const deviceKeywords = ["device", "gate", "boom gate", "door", "ac", "air conditioner"];
  if (deviceKeywords.some((kw) => lower.includes(kw))) return "estate_devices";

  // ===== CCTV / Security =====
  const cctvKeywords = ["cctv", "camera", "surveillance", "monitor security"];
  if (cctvKeywords.some((kw) => lower.includes(kw))) return "estate_cctv";

  // ===== Estate Lighting =====
  const lightingKeywords = ["light", "lights", "streetlight", "turn on light", "turn off light"];
  if (lightingKeywords.some((kw) => lower.includes(kw))) return "estate_lighting";

  // ===== Power / Water =====
  const powerKeywords = ["power", "electric", "generator", "water", "pump", "electricity"];
  if (powerKeywords.some((kw) => lower.includes(kw))) return "estate_power";

  // ===== Accounting / Billing =====
  const accountingKeywords = [
    "billing",
    "account",
    "payment",
    "arrears",
    "reminder",
    "send invoice",
    "check dues",
  ];
  if (accountingKeywords.some((kw) => lower.includes(kw))) return "estate_accounting";

  // ===== Community / Messaging =====
  const communityKeywords = ["community", "message", "notify", "announcement", "broadcast"];
  if (communityKeywords.some((kw) => lower.includes(kw))) return "estate_community";

  return null;
}
