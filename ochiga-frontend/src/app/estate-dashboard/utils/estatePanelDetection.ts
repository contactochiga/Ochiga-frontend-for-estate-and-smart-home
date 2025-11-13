// src/app/utils/estatePanelDetection.ts
export function detectEstatePanelType(message: string): string | null {
  const lower = message.toLowerCase();

  if (lower.includes("light") || lower.includes("lights")) return "estate_devices";
  if (lower.includes("gate") || lower.includes("boom gate")) return "estate_devices";
  if (lower.includes("door")) return "estate_devices";
  if (lower.includes("camera") || lower.includes("cctv")) return "estate_devices";
  if (lower.includes("ac") || lower.includes("air conditioner")) return "estate_devices";

  // Add more estate-level modules later if needed
  return null;
}
