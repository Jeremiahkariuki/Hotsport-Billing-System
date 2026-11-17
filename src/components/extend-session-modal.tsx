"use client";

import { useState } from "react";
import { Clock, X, PlusCircle, CheckCircle2, AlertCircle } from "lucide-react";

interface ExtendSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: {
    id: string;
    username: string;
    ipAddress: string;
    macAddress: string;
    packageName?: string;
    expiresAt?: string | null;
  } | null;
  onExtended: () => void;
}

export function ExtendSessionModal({
  isOpen,
  onClose,
  session,
  onExtended,
}: ExtendSessionModalProps) {
  const [minutes, setMinutes] = useState(60);
  const [customMinutes, setCustomMinutes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen || !session) return null;

  const presets = [
    { label: "+15 min", value: 15 },
    { label: "+30 min", value: 30 },
    { label: "+1 hour", value: 60 },
    { label: "+3 hours", value: 180 },
    { label: "+6 hours", value: 360 },
    { label: "+24 hours", value: 1440 },
  ];

  const currentExpiry = session.expiresAt ? new Date(session.expiresAt) : new Date();
  const baseTime = currentExpiry.getTime() > Date.now() ? currentExpiry.getTime() : Date.now();
  const calculatedExpiry = new Date(baseTime + minutes * 60 * 1000);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`/api/sessions/${session.id}/extend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ additionalMinutes: minutes }),
      });

      const data = await res.json();
      if (!data.success) {
        setErrorMsg(data.error || "Failed to extend time");
      } else {
        setSuccessMsg(data.message || `Added ${minutes} minutes successfully!`);
        setTimeout(() => {
          onExtended();
          onClose();
        }, 1200);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 text-slate-200">
      <div className="relative w-full max-w-md bg-[#111726] border border-[#1f2b40] rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1b253b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Extend Session Time</h3>
              <p className="text-[11px] text-slate-400">Grant additional internet browsing time</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1a2336]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Client Details Box */}
          <div className="p-3 rounded-xl bg-[#0b101a] border border-[#1b2538] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Client / Code:</span>
              <span className="font-mono font-bold text-white">{session.username}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">MAC / IP:</span>
              <span className="font-mono text-slate-300 text-[11px]">
                {session.macAddress} ({session.ipAddress})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Active Package:</span>
              <span className="text-indigo-400 font-semibold">{session.packageName || "Standard"}</span>
            </div>
          </div>

          {/* Preset Buttons */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Select Time to Add
            </label>
            <div className="grid grid-cols-3 gap-2">
              {presets.map((p) => {
                const isSelected = minutes === p.value;
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => {
                      setMinutes(p.value);
                      setCustomMinutes("");
                    }}
                    className={`py-2 rounded-lg border text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                        : "bg-[#161f31] border-[#222e45] text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Duration Input */}
          <div>
            <label className="block text-slate-400 text-[11px] mb-1">
              Or Custom Minutes:
            </label>
            <input
              type="number"
              min="1"
              max="43200"
              placeholder="e.g. 45"
              value={customMinutes}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                setCustomMinutes(e.target.value);
                if (val > 0) setMinutes(val);
              }}
              className="w-full bg-[#161f31] border border-[#222e45] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* New Expiry Preview */}
          <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex items-center justify-between">
            <span className="text-indigo-300 font-medium">New Expiration Time:</span>
            <span className="font-mono text-xs font-bold text-white">
              {calculatedExpiry.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}{" "}
              ({calculatedExpiry.toLocaleDateString([], { month: "short", day: "numeric" })})
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1b253b]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#182236] hover:bg-[#202c45] text-slate-300 rounded-lg text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || minutes <= 0}
              className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/30 disabled:opacity-50 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Extending..." : `Add ${minutes} Minutes`}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
