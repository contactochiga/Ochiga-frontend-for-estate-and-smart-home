"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FaBolt, FaGasPump, FaSolarPanel, FaPowerOff, FaPlay, FaChartLine } from "react-icons/fa";
import toast from "react-hot-toast";
import { deviceService } from "@/services/deviceService";

type SourceKey = "grid" | "generator" | "solar";

type PowerModule = {
  id: string;
  key: SourceKey;
  title: string;
  status: "on" | "off" | "starting" | "stopping";
  metricLabel: string;
  metricValue: number;
  sub?: string;
};

const maroon = "#8A0C0C";
const darkBlue = "#0A0F1F";
const cardBlue = "#111726";
const borderBlue = "#1E2638";

export default function EstatePowerPanel({ estateId = "current-estate" }: { estateId?: string }) {
  const [modules, setModules] = useState<PowerModule[]>([
    { id: "power_grid", key: "grid", title: "PHCN (Grid)", status: "on", metricLabel: "kWh", metricValue: 420, sub: "Main distribution" },
    { id: "generator", key: "generator", title: "Generator", status: "off", metricLabel: "L", metricValue: 72, sub: "Diesel generator" },
    { id: "solar", key: "solar", title: "Solar", status: "on", metricLabel: "%", metricValue: 78, sub: "Battery bank" },
  ]);

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<Record<SourceKey, boolean>>({ grid: false, generator: false, solar: false });
  const [notifications, setNotifications] = useState<{ id: string; level: "info" | "warning" | "critical"; message: string; time: string }[]>([]);
  const [metrics, setMetrics] = useState<number[]>([]);

  const createId = useCallback(() => Math.random().toString(36).substring(2, 9), []);
  const pushNotification = (level: "info" | "warning" | "critical", message: string) => {
    const n = { id: createId(), level, message, time: new Date().toLocaleTimeString() };
    setNotifications((p) => [n, ...p].slice(0, 10));
  };

  const loadStatus = useCallback(async () => {
    setLoading(true);
    try {
      const res = await deviceService.getDevices(estateId);
      if (!(res as any).error) {
        const list = (res as any).devices || [];
        setModules((prev) =>
          prev.map((m) => {
            const found = list.find((d: any) => d.external_id === m.id || d.id === m.id || d.name?.toLowerCase()?.includes(m.key));
            if (!found) return m;
            return { ...m, status: found.status === "connected" ? m.status : found.status, metricValue: found.metricValue ?? m.metricValue };
          })
        );
      }
      setMetrics(Array.from({ length: 12 }, () => Math.round(Math.random() * 100 + 50)));
    } catch {
      pushNotification("warning", "Failed to load device status");
    } finally {
      setLoading(false);
    }
  }, [estateId, createId]);

  useEffect(() => {
    loadStatus();
    const t = setInterval(loadStatus, 30_000);
    return () => clearInterval(t);
  }, [loadStatus]);

  const sendAction = async (module: PowerModule, action: string) => {
    setLoading(true);
    const prevStatus = module.status;
    setModules((p) => p.map((m) => (m.id === module.id ? { ...m, status: action === "on" ? "starting" : "stopping" } : m)));
    try {
      const res = await deviceService.triggerDeviceAction(module.id, action, { estateId });
      if ((res as any).error) throw new Error((res as any).error);
      setModules((p) => p.map((m) => (m.id === module.id ? { ...m, status: action === "on" ? "on" : "off" } : m)));
      pushNotification("info", `${module.title} ${action === "on" ? "started" : "stopped"}`);
      toast.success(`${module.title} ${action === "on" ? "started" : "stopped"}`);
    } catch {
      setModules((p) => p.map((m) => (m.id === module.id ? { ...m, status: prevStatus } : m)));
      pushNotification("critical", `Failed to ${action} ${module.title}`);
      toast.error(`Failed to ${action} ${module.title}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleModule = async (m: PowerModule) => (m.status === "on" ? sendAction(m, "off") : sendAction(m, "on"));
  const statusColor = (s: PowerModule["status"]) => (s === "on" ? "text-green-400" : s === "off" ? "text-red-400" : "text-yellow-300");

  const Sparkline = ({ data }: { data: number[] }) => {
    const w = 160;
    const h = 40;
    const max = Math.max(...data, 1);
    const min = Math.min(...data, 0);
    const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`);
    return <svg width={w} height={h}><polyline fill="none" stroke={maroon} strokeWidth={2} points={points.join(" ")} strokeLinecap="round" strokeLinejoin="round" /></svg>;
  };

  const totalConsumption = useMemo(() => metrics.reduce((a, b) => a + b, 0), [metrics]);
  const avg = useMemo(() => (metrics.length ? Math.round(totalConsumption / metrics.length) : 0), [metrics, totalConsumption]);

  return (
    <div className="w-full p-3 rounded-lg" style={{ backgroundColor: darkBlue, border: `1px solid ${borderBlue}` }}>
      <div className="mb-3 text-white font-semibold text-lg flex items-center gap-2"><FaBolt color={maroon} />Estate Power</div>

      <div className="grid grid-cols-1 gap-3">
        {modules.map((m) => (
          <div key={m.id} className="p-3 rounded-lg" style={{ backgroundColor: cardBlue, border: `1px solid ${borderBlue}` }}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-semibold text-sm text-white">
                  {m.key === "grid" && <FaBolt />} {m.key === "generator" && <FaGasPump />} {m.key === "solar" && <FaSolarPanel />}
                  {m.title}
                </div>
                <div className="text-xs text-gray-400">{m.sub}</div>
              </div>
              <div className={`text-xs ${statusColor(m.status)} font-medium`}>{m.status.toUpperCase()}</div>
            </div>

            <div className="flex items-center justify-between">
              <button className="px-2 py-1 text-xs rounded-md bg-maroon text-white flex items-center gap-1" onClick={() => toggleModule(m)} disabled={loading}>
                {m.status === "on" ? <FaPowerOff /> : <FaPlay />} {m.status === "on" ? "Turn Off" : "Turn On"}
              </button>
              <button className="px-2 py-1 text-xs rounded-md border border-gray-700 text-gray-300" onClick={() => setExpanded((p) => ({ ...p, [m.key]: !p[m.key] }))}>
                Details
              </button>
            </div>

            {expanded[m.key] && (
              <div className="mt-2 text-xs text-gray-300 border-t border-gray-700 pt-2">
                <div>Metric: {m.metricValue} {m.metricLabel}</div>
                <div>Auto-switch: <input type="checkbox" className="ml-1" onChange={() => toast("Toggled")} /></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Analytics + notifications */}
      <div className="mt-3 grid grid-cols-1 gap-3">
        <div className="p-3 rounded-lg" style={{ backgroundColor: cardBlue, border: `1px solid ${borderBlue}` }}>
          <div className="flex items-center justify-between text-white font-semibold mb-2"><FaChartLine />Analytics <span className="text-xs">Avg {avg} kWh</span></div>
          <Sparkline data={metrics} />
        </div>

        <div className="p-3 rounded-lg" style={{ backgroundColor: cardBlue, border: `1px solid ${borderBlue}` }}>
          <div className="flex justify-between items-center mb-2 text-white font-semibold">Notifications <button className="text-xs text-gray-400" onClick={() => setNotifications([])}>Clear</button></div>
          <div className="space-y-1 max-h-32 overflow-auto text-xs">
            {notifications.length === 0 && <div className="text-gray-400">No incidents</div>}
            {notifications.map((n) => (
              <div key={n.id} className={`p-1 rounded ${n.level === "critical" ? "bg-red-900 text-white" : n.level === "warning" ? "bg-yellow-900 text-black" : "bg-gray-900 text-gray-100"}`}>
                {n.message} <span className="text-[10px] opacity-75">{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
