// Detect which estate panel should open based on user message
export function detectEstatePanelType(message: string): string | null {
  const lower = message.toLowerCase();

  // Estate devices (security, access, lights, CCTV, AC, gates, doors)
  if (
    lower.includes("light") ||
    lower.includes("lights") ||
    lower.includes("gate") ||
    lower.includes("boom gate") ||
    lower.includes("door") ||
    lower.includes("camera") ||
    lower.includes("cctv") ||
    lower.includes("ac") ||
    lower.includes("air conditioner") ||
    lower.includes("security")
  ) {
    return "estate_devices";
  }

  // Estate power controls (water, electricity, general utilities)
  if (
    lower.includes("power") ||
    lower.includes("electricity") ||
    lower.includes("water") ||
    lower.includes("utility")
  ) {
    return "estate_power";
  }

  // Estate accounting (payments, debts, service charges)
  if (
    lower.includes("account") ||
    lower.includes("billing") ||
    lower.includes("payment") ||
    lower.includes("service charge") ||
    lower.includes("invoice") ||
    lower.includes("debt")
  ) {
    return "estate_accounting";
  }

  // Estate community (residents, visitor management, announcements)
  if (
    lower.includes("community") ||
    lower.includes("resident") ||
    lower.includes("visitors") ||
    lower.includes("announcement") ||
    lower.includes("event")
  ) {
    return "estate_community";
  }

  // Default: no panel detected
  return null;
}
