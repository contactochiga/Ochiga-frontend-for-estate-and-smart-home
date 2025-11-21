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

const brandColor = "#8A0C0C"; // Ochiga maroon

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
  const statusColor = (s: PowerModule["status"]) => (s === "on" ? "text-green-500" : s === "off" ? "text-red-500" : "text-yellow-400");

  const Sparkline = ({ data }: { data: number[] }) => {
    const w = 200;
    const h = 50;
    const max = Math.max(...data, 1);
    const min = Math.min(...data, 0);
    const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`);
    return <svg width={w} height={h}><polyline fill="none" stroke={brandColor} strokeWidth={2} points={points.join(" ")} strokeLinecap="round" strokeLinejoin="round" /></svg>;
  };

  const totalConsumption = useMemo(() => metrics.reduce((a, b) => a + b, 0), [metrics]);
  const avg = useMemo(() => (metrics.length ? Math.round(totalConsumption / metrics.length) : 0), [metrics, totalConsumption]);

  return (
    <div className="w-full p-6 space-y-6 bg-gray-50">
      <div className="text-2xl font-light text-gray-800 flex items-center gap-2 mb-4"><FaBolt color={brandColor} />Estate Power Dashboard</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {modules.map((m) => (
          <div key={m.id} className="p-4 rounded-lg bg-white shadow-sm border border-gray-200 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 font-light text-gray-800 text-base">
                  {m.key === "grid" && <FaBolt />} {m.key === "generator" && <FaGasPump />} {m.key === "solar" && <FaSolarPanel />}
                  {m.title}
                </div>
                <div className="text-xs text-gray-400">{m.sub}</div>
              </div>
              <div className={`text-sm font-light ${statusColor(m.status)}`}>{m.status.toUpperCase()}</div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <button
                className="px-3 py-1 rounded-md bg-maroon text-white text-sm font-light flex items-center gap-1"
                onClick={() => toggleModule(m)}
                disabled={loading}
              >
                {m.status === "on" ? <FaPowerOff /> : <FaPlay />} {m.status === "on" ? "Turn Off" : "Turn On"}
              </button>
              <button
                className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 text-sm font-light"
                onClick={() => setExpanded((p) => ({ ...p, [m.key]: !p[m.key] }))}
              >
                Details
              </button>
            </div>

            {expanded[m.key] && (
              <div className="text-xs text-gray-500 space-y-1 border-t border-gray-200 pt-2">
                <div>Metric: {m.metricValue} {m.metricLabel}</div>
                <div>Auto-switch: <input type="checkbox" className="ml-1" onChange={() => toast("Toggled")} /></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <div className="flex items-center justify-between mb-2 font-light text-gray-700 text-base"><FaChartLine /> Power Analytics <span className="text-sm">{avg} kWh Avg</span></div>
          <Sparkline data={metrics} />
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center mb-2 text-gray-700 font-light text-base">Notifications <button className="text-xs text-gray-400" onClick={() => setNotifications([])}>Clear</button></div>
          <div className="space-y-1 max-h-32 overflow-auto text-xs">
            {notifications.length === 0 && <div className="text-gray-400">No incidents</div>}
            {notifications.map((n) => (
              <div key={n.id} className={`p-1 rounded ${n.level === "critical" ? "bg-red-200 text-red-800" : n.level === "warning" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-700"}`}>
                {n.message} <span className="text-[10px] opacity-70">{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
