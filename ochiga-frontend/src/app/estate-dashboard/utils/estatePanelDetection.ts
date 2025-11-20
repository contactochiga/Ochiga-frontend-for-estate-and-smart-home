// Detect which estate panel should open based on user message
export function detectEstatePanelType(message: string): string | null {
  const lower = message.toLowerCase();

  /* ---------------------------------------------------------
     HOME CREATION (new)
  --------------------------------------------------------- */
  if (
    lower.includes("create home") ||
    lower.includes("add home") ||
    lower.includes("new home") ||
    lower.includes("set up home") ||
    lower.includes("setup home") ||
    lower.includes("register home") ||
    lower.includes("add a unit") ||
    lower.includes("create a unit") ||
    lower.includes("add new unit") ||
    lower.includes("setup a house") ||
    lower.includes("set up a house") ||
    lower.includes("create apartment") ||
    lower.includes("add apartment") ||
    lower.includes("add flat") ||
    lower.includes("create flat")
  ) {
    return "home_creation";
  }

  /* ---------------------------------------------------------
     ESTATE DEVICES (security, access, lights, CCTV, AC, gates)
  --------------------------------------------------------- */
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

  /* ---------------------------------------------------------
     DEVICE DISCOVERY (new)
     Detect when user wants to discover or scan devices in homes
  --------------------------------------------------------- */
  if (
    lower.includes("discover devices") ||
    lower.includes("scan devices") ||
    lower.includes("device discovery") ||
    lower.includes("scan home devices") ||
    lower.includes("find devices") ||
    lower.includes("scan my home") ||
    lower.includes("discover home devices")
  ) {
    return "device_discovery";
  }

  /* ---------------------------------------------------------
     ESTATE POWER (water, electricity, general utilities)
  --------------------------------------------------------- */
  if (
    lower.includes("power") ||
    lower.includes("electricity") ||
    lower.includes("water") ||
    lower.includes("utility")
  ) {
    return "estate_power";
  }

  /* ---------------------------------------------------------
     ESTATE ACCOUNTING (payments, debts, service charges)
  --------------------------------------------------------- */
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

  /* ---------------------------------------------------------
     ESTATE COMMUNITY (residents, visitors, announcements)
  --------------------------------------------------------- */
  if (
    lower.includes("community") ||
    lower.includes("resident") ||
    lower.includes("visitors") ||
    lower.includes("visitor") ||
    lower.includes("announcement") ||
    lower.includes("event")
  ) {
    return "estate_community";
  }

  // Default: no panel detected
  return null;
}
