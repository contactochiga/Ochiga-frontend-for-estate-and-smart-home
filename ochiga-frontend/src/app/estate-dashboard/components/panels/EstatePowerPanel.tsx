// src/app/estate-dashboard/components/panels/EstatePowerPanel.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FaBolt, FaGasPump, FaSolarPanel, FaPowerOff, FaPlay, FaChartLine } from "react-icons/fa";
import toast from "react-hot-toast";
import { deviceService } from "@/services/deviceService";

/**
 * EstatePowerPanel
 * - Multi-source power dashboard for Nigeria (NIPA / Generator / Solar)
 * - Controls: on/off, start/stop generator, force grid/solar
 * - Analytics: live-ish small charts + summaries
 *
 * Brand:
 * - Maroon: #8A0C0C (Ochiga red)
 * - Dark blue: #0A0F1F (panel bg)
 * - Card blue: #111726
 * - Border blue: #1E2638
 */

type SourceKey = "grid" | "generator" | "solar";

type PowerModule = {
  id: string; // internal device id
  key: SourceKey;
  title: string;
  status: "on" | "off" | "starting" | "stopping";
  metricLabel: string; // e.g., "kWh", "L", "%"
  metricValue: number;
  sub?: string;
};

const maroon = "#8A0C0C";
const darkBlue = "#0A0F1F";
const cardBlue = "#111726";
const borderBlue = "#1E2638";

export default function EstatePowerPanel({
  estateId = "current-estate",
}: {
  estateId?: string;
}) {
  // --- power modules state
  const [modules, setModules] = useState<PowerModule[]>([
    {
      id: "power_grid",
      key: "grid",
      title: "NIPA (Grid)",
      status: "on",
      metricLabel: "kWh",
      metricValue: 420, // units consumed or supply
      sub: "Main distribution",
    },
    {
      id: "generator",
      key: "generator",
      title: "Generator",
      status: "off",
      metricLabel: "L (fuel)",
      metricValue: 72, // liters remaining
      sub: "Diesel generator",
    },
    {
      id: "solar",
      key: "solar",
      title: "Solar",
      status: "on",
      metricLabel: "%",
      metricValue: 78, // battery %
      sub: "Battery bank",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<Record<SourceKey, boolean>>({
    grid: false,
    generator: false,
    solar: false,
  });

  const [notifications, setNotifications] = useState<
    { id: string; level: "info" | "warning" | "critical"; message: string; time: string }[]
  >([]);

  // analytics mock data (last 12 datapoints)
  const [metrics, setMetrics] = useState<number[]>([]);

  // --- helpers
  const createId = useCallback(() => Math.random().toString(36).substring(2, 9), []);

  const pushNotification = (level: "info" | "warning" | "critical", message: string) => {
    const n = { id: createId(), level, message, time: new Date().toLocaleTimeString() };
    setNotifications((p) => [n, ...p].slice(0, 10));
  };

  // fetch current module states & metrics from backend (replace with real API)
  const loadStatus = useCallback(async () => {
    setLoading(true);
    try {
      // Example: call backend to list devices and filter by power modules
      const res = await deviceService.getDevices(estateId);
      // deviceService returns { devices: [...] } or { error }
      if ((res as any).error) {
        console.warn("getDevices error:", (res as any).error);
      } else {
        const list = (res as any).devices || [];
        // map to modules where possible (you may match by external_id or name)
        setModules((prev) =>
          prev.map((m) => {
            const found = list.find(
              (d: any) => d.external_id === m.id || d.id === m.id || d.name?.toLowerCase()?.includes(m.key)
            );
            if (!found) return m;
            return {
              ...m,
              status: found.status === "connected" ? m.status : (found.status as any) || m.status,
              metricValue: typeof found.metricValue === "number" ? found.metricValue : m.metricValue,
            };
          })
        );
      }
      // mock metrics
      setMetrics(Array.from({ length: 12 }, () => Math.round(Math.random() * 100 + 50)));
    } catch (err: any) {
      console.warn("loadStatus error:", err);
      pushNotification("warning", "Failed to load device status");
    } finally {
      setLoading(false);
    }
  }, [estateId, createId]);

  useEffect(() => {
    loadStatus();
    const t = setInterval(loadStatus, 30_000); // refresh every 30s
    return () => clearInterval(t);
  }, [loadStatus]);

  // send action to backend
  const sendAction = async (module: PowerModule, action: string) => {
    setLoading(true);
    const prevStatus = module.status;
    // optimistic update: set to starting/stopping or new status
    setModules((p) => p.map((m) => (m.id === module.id ? { ...m, status: action === "on" ? "starting" : "stopping" } : m)));
    try {
      const res = await deviceService.triggerDeviceAction(module.id, action, { estateId });
      if ((res as any).error) {
        throw new Error((res as any).error);
      }
      // assume backend will apply new status — set it
      setModules((p) => p.map((m) => (m.id === module.id ? { ...m, status: action === "on" ? "on" : "off" } : m)));
      pushNotification("info", `${module.title} ${action === "on" ? "started" : "stopped"}`);
      toast.success(`${module.title} ${action === "on" ? "started" : "stopped"}`);
    } catch (err: any) {
      console.error("sendAction error:", err);
      setModules((p) => p.map((m) => (m.id === module.id ? { ...m, status: prevStatus } : m)));
      pushNotification("critical", `Failed to ${action} ${module.title}`);
      toast.error(`Failed to ${action} ${module.title}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleModule = async (m: PowerModule) => {
    if (m.status === "on") await sendAction(m, "off");
    else await sendAction(m, "on");
  };

  // quick helpers for UI
  const statusColor = (s: PowerModule["status"]) =>
    s === "on" ? "text-green-400" : s === "off" ? "text-red-400" : "text-yellow-300";

  // simple svg sparkline for metrics
  const Sparkline = ({ data }: { data: number[] }) => {
    const w = 160;
    const h = 40;
    const max = Math.max(...data, 1);
    const min = Math.min(...data, 0);
    const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`);
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block">
        <polyline fill="none" stroke="#8A0C0C" strokeWidth={2} points={points.join(" ")} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  // summary numbers
  const totalConsumption = useMemo(() => metrics.reduce((a, b) => a + b, 0), [metrics]);
  const avg = useMemo(() => (metrics.length ? Math.round(totalConsumption / metrics.length) : 0), [metrics, totalConsumption]);

  return (
    <div className="w-full p-4 rounded-lg" style={{ backgroundColor: darkBlue, border: `1px solid ${borderBlue}` }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FaBolt color={maroon} />
          <h2 className="text-white font-semibold">Estate Power — Live Dashboard</h2>
          <div className="ml-3 text-xs text-gray-400">Manage Grid, Generator & Solar (Nigeria)</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-300 mr-2">Avg consumption</div>
          <div className="px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: cardBlue, border: `1px solid ${borderBlue}`, color: "#fff" }}>
            {avg} kWh
          </div>
        </div>
      </div>

      {/* Top modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {modules.map((m) => (
          <div key={m.id} className="p-3 rounded-lg" style={{ backgroundColor: cardBlue, border: `1px solid ${borderBlue}` }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {m.key === "grid" && <FaBolt className="text-gray-300" />}
                  {m.key === "generator" && <FaGasPump className="text-gray-300" />}
                  {m.key === "solar" && <FaSolarPanel className="text-gray-300" />}
                  <div className="text-sm text-white font-semibold">{m.title}</div>
                </div>
                <div className="text-xs text-gray-400 mt-1">{m.sub}</div>
              </div>

              <div className="text-right">
                <div className={`text-xs ${statusColor(m.status)} font-medium`}>{m.status.toUpperCase()}</div>
                <div className="text-sm text-white font-semibold mt-1">{m.metricValue} <span className="text-gray-400 text-xs">{m.metricLabel}</span></div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 text-xs rounded-md"
                  style={{ backgroundColor: maroon, color: "#fff" }}
                  onClick={() => toggleModule(m)}
                  disabled={loading}
                >
                  {m.status === "on" ? (<><FaPowerOff className="inline mr-1" />Turn Off</>) : (<><FaPlay className="inline mr-1" />Turn On</>)}
                </button>

                <button
                  className="px-2 py-1 text-xs rounded-md bg-transparent border border-gray-700 text-gray-300"
                  onClick={() => setExpanded((p) => ({ ...p, [m.key]: !p[m.key] }))}
                >
                  Details
                </button>
              </div>

              <div className="hidden md:block">
                <Sparkline data={metrics} />
              </div>
            </div>

            {expanded[m.key] && (
              <div className="mt-3 text-xs text-gray-300 border-t border-gray-700 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <div>Last maintenance</div>
                  <div>2 days ago</div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div>Health</div>
                  <div className="text-sm">{m.metricValue > 70 ? "Good" : m.metricValue > 40 ? "Fair" : "Needs attention"}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div>Auto-switch</div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={false}
                        // TODO: wire to backend auto-switch setting
                        onChange={() => toast("Auto-switch toggled (not wired)")}
                      />
                      <span className="text-xs text-gray-300">Enabled</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom: analytics + notifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* analytics */}
        <div className="md:col-span-2 p-3 rounded-lg" style={{ backgroundColor: cardBlue, border: `1px solid ${borderBlue}` }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FaChartLine className="text-gray-300" />
              <div className="text-sm text-white font-semibold">Power Analytics</div>
              <div className="text-xs text-gray-400 ml-2">Last 12 intervals</div>
            </div>

            <div className="text-xs text-gray-300">Total: <span className="font-semibold text-white">{totalConsumption} kWh</span></div>
          </div>

          <div className="w-full h-36 flex items-center justify-center">
            {/* large sparkline */}
            <div className="w-full">
              <Sparkline data={metrics} />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-400">
            <div className="p-2 rounded" style={{ backgroundColor: darkBlue, border: `1px solid ${borderBlue}` }}>
              <div className="text-[10px]">Peak</div>
              <div className="text-white font-semibold">{Math.max(...metrics)} kWh</div>
            </div>
            <div className="p-2 rounded" style={{ backgroundColor: darkBlue, border: `1px solid ${borderBlue}` }}>
              <div className="text-[10px]">Off-peak</div>
              <div className="text-white font-semibold">{Math.min(...metrics)} kWh</div>
            </div>
            <div className="p-2 rounded" style={{ backgroundColor: darkBlue, border: `1px solid ${borderBlue}` }}>
              <div className="text-[10px]">Average</div>
              <div className="text-white font-semibold">{avg} kWh</div>
            </div>
          </div>
        </div>

        {/* notifications */}
        <div className="p-3 rounded-lg" style={{ backgroundColor: cardBlue, border: `1px solid ${borderBlue}` }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-white font-semibold">Notifications</div>
            <button className="text-xs text-gray-400" onClick={() => setNotifications([])}>Clear</button>
          </div>

          <div className="space-y-2 max-h-48 overflow-auto">
            {notifications.length === 0 && <div className="text-gray-400 text-xs">No incidents</div>}
            {notifications.map((n) => (
              <div key={n.id} className={`p-2 rounded text-xs ${n.level === "critical" ? "bg-red-900 text-white" : n.level === "warning" ? "bg-yellow-900 text-black" : "bg-gray-900 text-gray-100"}`}>
                <div className="flex items-center justify-between">
                  <div>{n.message}</div>
                  <div className="text-[10px] opacity-75">{n.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-xs text-gray-400">
            Incidents auto-surface here. Click module controls to generate notifications.
          </div>
        </div>
      </div>
    </div>
  );
}
