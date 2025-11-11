export const detectPanelType = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes("cctv") || t.includes("camera")) return "cctv";
  if (t.includes("light")) return "lights";
  if (t.includes("wallet") || t.includes("fund")) return "wallet";
  if (t.includes("visitor")) return "visitors";
  if (t.includes("estate")) return "estate";
  if (t.includes("home")) return "home";
  if (t.includes("room")) return "room";
  if (t.includes("payment")) return "payments";
  if (t.includes("utility")) return "utilities";
  if (t.includes("community")) return "community";
  if (t.includes("notification")) return "notifications";
  if (t.includes("health")) return "health";
  if (t.includes("message")) return "message";
  if (t.includes("iot")) return "iot";
  if (t.includes("assistant") || t.includes("ai")) return "assistant";
  return null;
};
