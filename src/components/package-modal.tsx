"use client";

import { useState } from "react";
import { X, ArrowDown, ArrowUp } from "lucide-react";

export interface PackageData {
  id?: string;
  name: string;
  durationMinutes: number;
  price: number;
  downloadSpeedMbps: number;
  uploadSpeedMbps: number;
  simultaneousDevices: number;
  deviceLockMode: "STRICT" | "FLEXIBLE";
  tag?: string | null;
  isActive?: boolean;
}

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pkg: PackageData) => Promise<void>;
  initialData?: PackageData | null;
}

export function PackageModal({ isOpen, onClose, onSave, initialData }: PackageModalProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [downloadSpeed, setDownloadSpeed] = useState<number>(initialData?.downloadSpeedMbps ?? 1);
  const [uploadSpeed, setUploadSpeed] = useState<number>(initialData?.uploadSpeedMbps ?? 1);
  const [noSpeedCap, setNoSpeedCap] = useState(initialData ? initialData.downloadSpeedMbps === 0 : false);
  const [durationMinutes, setDurationMinutes] = useState<number>(initialData?.durationMinutes ?? 60);
  const [price, setPrice] = useState<number>(initialData?.price ?? 5);
  const [simultaneousDevices, setSimultaneousDevices] = useState<number>(initialData?.simultaneousDevices ?? 1);
  const [deviceLockMode, setDeviceLockMode] = useState<"STRICT" | "FLEXIBLE">(initialData?.deviceLockMode ?? "STRICT");
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const durationPresets = [
    { label: "15m", value: 15 },
    { label: "30m", value: 30 },
    { label: "1h", value: 60 },
    { label: "3h", value: 180 },
    { label: "6h", value: 360 },
    { label: "12h", value: 720 },
    { label: "24h", value: 1440 },
    { label: "1W", value: 10080 },
  ];

  const handleDurationClick = (val: number) => {
    setDurationMinutes(val);
    if (!name || name.startsWith("VIEW") || name.startsWith("SOLO") || name.startsWith("PASS")) {
      const hours = val >= 60 ? `${val / 60} Hour${val > 60 ? "s" : ""}` : `${val} Minutes`;
      setName(`SOLO ${hours}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({
        id: initialData?.id,
        name: name.trim() || `PACKAGE ${durationMinutes}M`,
        durationMinutes,
        price,
        downloadSpeedMbps: noSpeedCap ? 0 : downloadSpeed,
        uploadSpeedMbps: noSpeedCap ? 0 : uploadSpeed,
        simultaneousDevices,
        deviceLockMode,
      });
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const routerRateString = noSpeedCap ? "Unlimited" : `${uploadSpeed}M/${downloadSpeed}M`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#111726] border border-[#1e293d] rounded-xl shadow-2xl overflow-hidden my-8 text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b253b]">
          <h2 className="text-base font-semibold text-white">
            {initialData?.id ? "Edit Package" : "Create New Package"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1a2336] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Package Name */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Package Display Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. VIEW ONCE 1 HOUR or SOLO 3 Hours"
              className="w-full bg-[#161f31] border border-[#232f48] rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Speed Controls */}
          <div className="space-y-3 bg-[#0d1320] p-4 rounded-xl border border-[#1b253b]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <ArrowDown className="w-3.5 h-3.5 text-indigo-400" /> Download Speed
              </span>
              <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={noSpeedCap}
                  onChange={(e) => setNoSpeedCap(e.target.checked)}
                  className="rounded border-[#2a3854] bg-[#161f31] text-indigo-600 focus:ring-0"
                />
                No speed cap
              </label>
            </div>

            {!noSpeedCap && (
              <div className="space-y-2">
                <input
                  type="range"
                  min="0.5"
                  max="50"
                  step="0.5"
                  value={downloadSpeed}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setDownloadSpeed(v);
                    setUploadSpeed(Math.max(0.5, Math.round(v * 0.75)));
                  }}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-300 px-0.5">
                  <span>256K</span>
                  <span>1M</span>
                  <span>5M</span>
                  <span>20M</span>
                  <span>50M+</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-300">Download Limit:</span>
                  <div className="flex items-center gap-1 bg-[#161f31] border border-[#232f48] px-2.5 py-1 rounded-md text-xs font-mono text-white">
                    <span>{downloadSpeed}</span>
                    <span className="text-slate-300">Mbps</span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-[#182337] flex items-center justify-between text-xs text-slate-300">
              <span>Applied to router as:</span>
              <span className="font-mono text-indigo-400 font-semibold">{routerRateString}</span>
            </div>
          </div>

          {/* Duration Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Duration</label>
            <div className="grid grid-cols-4 gap-2">
              {durationPresets.map((preset) => {
                const isSelected = durationMinutes === preset.value;
                return (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => handleDurationClick(preset.value)}
                    className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                      isSelected
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-sm"
                        : "bg-[#141b2b] border-[#222e45] text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-amber-400/80 mt-1.5">
              Changing duration also applies to vouchers already sold but not yet used.
            </p>
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Price (KSh)</label>
            <input
              type="number"
              step="1"
              min="1"
              required
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#161f31] border border-[#232f48] rounded-lg px-3.5 py-2 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[11px] text-slate-300 mt-1">
              Applies to new purchases from the next portal refresh.
            </p>
          </div>

          {/* Simultaneous Devices */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Simultaneous Devices</label>
            <input
              type="number"
              min="1"
              max="10"
              value={simultaneousDevices}
              onChange={(e) => setSimultaneousDevices(parseInt(e.target.value) || 1)}
              className="w-full bg-[#161f31] border border-[#232f48] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Device Locking Mode */}
          <div className="space-y-3 pt-2">
            <label
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                deviceLockMode === "STRICT"
                  ? "bg-[#162138] border-indigo-500/80"
                  : "bg-[#111726] border-[#1f2b42] hover:border-[#2f3f5e]"
              }`}
            >
              <input
                type="radio"
                name="deviceLock"
                checked={deviceLockMode === "STRICT"}
                onChange={() => setDeviceLockMode("STRICT")}
                className="mt-0.5 text-indigo-600 focus:ring-0"
              />
              <div className="text-xs">
                <span className="font-semibold text-white block">Lock voucher to the first device that uses it</span>
                <span className="text-slate-400 mt-0.5 block leading-relaxed">
                  A shared code stops working on every other phone - within about 2 minutes of first use the voucher is tied to that one device.
                </span>
              </div>
            </label>

            <label
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                deviceLockMode === "FLEXIBLE"
                  ? "bg-[#162138] border-indigo-500/80"
                  : "bg-[#111726] border-[#1f2b42] hover:border-[#2f3f5e]"
              }`}
            >
              <input
                type="radio"
                name="deviceLock"
                checked={deviceLockMode === "FLEXIBLE"}
                onChange={() => setDeviceLockMode("FLEXIBLE")}
                className="mt-0.5 text-indigo-600 focus:ring-0"
              />
              <div className="text-xs">
                <span className="font-semibold text-white block">Flexible - one device at a time</span>
                <span className="text-slate-400 mt-0.5 block leading-relaxed">
                  If that device is off the network for 30 minutes, the next device to log in takes over. Recommended: phones change their Wi-Fi address, and a strict lock can shut a paying customer out of a multi-day plan.
                </span>
              </div>
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1b253b]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-[#182236] hover:bg-[#202c45] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 rounded-lg shadow-md transition-all disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
