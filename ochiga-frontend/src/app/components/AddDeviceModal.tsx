"use client";

import React, { useEffect, useState, useRef } from "react";
import mqtt from "mqtt"; // browser build
import { XMarkIcon } from "@heroicons/react/24/outline";

type DiscoveredDevice = {
  id: string;
  name?: string;
  type?: string;
  ip?: string;
  meta?: any;
};

type AddDeviceModalProps = {
  open: boolean;
  onClose: () => void;
  onPaired?: (device: DiscoveredDevice) => void;
};

export default function AddDeviceModal({ open, onClose, onPaired }: AddDeviceModalProps) {
  const [discovering, setDiscovering] = useState(false);
  const [devices, setDevices] = useState<DiscoveredDevice[]>([]);
  const clientRef = useRef<mqtt.MqttClient | null>(null);
  const subTopic = "ochiga/discovery/response";
  const reqTopic = "ochiga/discovery/request";

  useEffect(() => {
    if (!open) return;

    const MQTT_WS = process.env.NEXT_PUBLIC_MQTT_WS_URL || "";
    if (!MQTT_WS) {
      console.warn("NEXT_PUBLIC_MQTT_WS_URL not set — discovery disabled");
      return;
    }

    setDevices([]);
    setDiscovering(true);

    const clientId = `ochiga-web-${Math.random().toString(16).slice(2, 9)}`;
    const client = mqtt.connect(MQTT_WS, {
      clientId,
      connectTimeout: 5 * 1000,
      reconnectPeriod: 2000,
      clean: true,
    });

    clientRef.current = client;

    const onConnect = () => {
      // subscribe to responses
      client.subscribe(subTopic, { qos: 0 }, (err) => {
        // ignore
      });

      // send a discovery request (payload can include filters / user id)
      const payload = JSON.stringify({ requestId: clientId, ts: Date.now() });
      client.publish(reqTopic, payload, { qos: 0, retain: false });
      vibrate(8);
    };

    const onMessage = (_topic: string, raw: Uint8Array) => {
      try {
        const str = new TextDecoder().decode(raw);
        const parsed = JSON.parse(str);
        // expected { id, name, type, ip, meta }
        const dev: DiscoveredDevice = {
          id: parsed.id || parsed.deviceId || parsed.ip || `${Date.now()}-${Math.random()}`,
          name: parsed.name || parsed.deviceName || parsed.id,
          type: parsed.type || parsed.deviceType || "unknown",
          ip: parsed.ip,
          meta: parsed,
        };

        setDevices((prev) => {
          // deduplicate by id
          if (prev.find((p) => p.id === dev.id)) return prev;
          vibrate(10);
          return [...prev, dev];
        });
      } catch (err) {
        console.warn("Malformed discovery message", err);
      }
    };

    client.on("connect", onConnect);
    client.on("message", onMessage);
    client.on("error", (e) => {
      console.warn("MQTT error", e);
    });

    // safety stop discovery after 12s
    const stopTimer = setTimeout(() => {
      setDiscovering(false);
      try {
        // send a stop indicator (optional)
      } catch {}
    }, 12_000);

    return () => {
      clearTimeout(stopTimer);
      try {
        client.end(true);
      } catch {}
      clientRef.current = null;
      setDiscovering(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const vibrate = (ms: number) => {
    try {
      if ("vibrate" in navigator) navigator.vibrate(ms);
    } catch {}
  };

  const pairDevice = async (d: DiscoveredDevice) => {
    vibrate(20);
    try {
      const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${BASE.replace(/\/$/, "")}/iot/devices/pair`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device: d }),
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text().catch(() => res.statusText);
        throw new Error(text || `Pair failed ${res.status}`);
      }

      const json = await res.json().catch(() => ({}));
      onPaired?.(d);
      onClose();
    } catch (err: any) {
      console.error("Pair error:", err);
      alert("Pairing failed: " + (err?.message || "unknown"));
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          try {
            clientRef.current?.end(true);
          } catch {}
          onClose();
        }}
      />
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add device</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Searching your local network for devices. Make sure device is in pairing mode.
            </p>
          </div>
          <button
            onClick={() => {
              try {
                clientRef.current?.end(true);
              } catch {}
              onClose();
            }}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* status */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${discovering ? "bg-emerald-400" : "bg-gray-300"}`} />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {discovering ? "Searching for devices..." : "Search complete"}
              </span>
            </div>

            <button
              onClick={() => {
                // trigger manual re-scan: reconnect + publish
                if (clientRef.current && clientRef.current.connected) {
                  try {
                    const payload = JSON.stringify({ requestId: `rescan-${Date.now()}`, ts: Date.now() });
                    clientRef.current.publish(reqTopic, payload);
                    setDiscovering(true);
                    setTimeout(() => setDiscovering(false), 9000);
                    vibrate(6);
                  } catch {}
                } else {
                  // just reopen the modal (will reconnect via effect)
                  vibrate(6);
                  setDevices([]);
                  setDiscovering(true);
                }
              }}
              className="text-sm px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
            >
              Rescan
            </button>
          </div>

          {/* discovered list */}
          <div className="mt-3 grid gap-2 max-h-64 overflow-auto">
            {devices.length === 0 && (
              <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                No devices discovered yet.
                <div className="mt-2 text-xs text-gray-400">Make sure the device is powered and in pairing mode.</div>
              </div>
            )}

            {devices.map((d) => (
              <div key={d.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {d.name || d.id}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {d.type || "unknown"} {d.ip ? `· ${d.ip}` : ""}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => pairDevice(d)}
                    className="px-3 py-1 rounded-md bg-[#800000] hover:bg-[#9a0000] text-white text-sm"
                  >
                    Pair
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* manual entry */}
          <div className="mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">Manual / Advanced</p>
            <div className="flex gap-2 mt-2">
              <input id="manualIp" placeholder="Device IP or ID" className="flex-1 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
              <button
                onClick={() => {
                  // quick manual pair attempt
                  const el = document.getElementById("manualIp") as HTMLInputElement | null;
                  const val = el?.value?.trim();
                  if (!val) return alert("Enter device IP or ID");
                  const fake: DiscoveredDevice = { id: val, name: val, ip: val, type: "manual" };
                  pairDevice(fake);
                }}
                className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-sm"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => {
              try {
                clientRef.current?.end(true);
              } catch {}
              onClose();
            }}
            className="px-3 py-1 rounded-md text-sm border border-gray-200 dark:border-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
