const BASE_URL = "http://localhost:4000"; // Update if using Codespace port

export async function pingBackend() {
  try {
    const res = await fetch(`${BASE_URL}/health`);
    const data = await res.json();
    console.log("✅ Backend Health:", data);
    return data;
  } catch (err) {
    console.error("❌ Backend Health Error:", err);
    return null;
  }
}

export async function getEstates() {
  try {
    const res = await fetch(`${BASE_URL}/estates`);
    const data = await res.json();
    console.log("🏘️ Estates Data:", data);
    return data;
  } catch (err) {
    console.error("❌ Estates Fetch Error:", err);
    return [];
  }
}
