"use client";

import { useState } from "react";
import { Tv, X, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";

interface SmartTvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SmartTvModal({ isOpen, onClose }: SmartTvModalProps) {
  const [mac, setMac] = useState("");
  const [label, setLabel] = useState("Living Room Smart TV");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleMacChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // auto-insert colons into MAC format
    let val = e.target.value.toUpperCase().replace(/[^A-F0-9]/g, "");
    if (val.length > 12) val = val.slice(0, 12);
    const parts = val.match(/.{1,2}/g) || [];
    setMac(parts.join(":"));
    setErrorMsg(null);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/tv-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ macAddress: mac, label }),
      });
      const data = await res.json();
      if (!data.success) {
        setErrorMsg(data.error || "Failed to register device");
      } else {
        setSuccessMsg(data.message);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-[#121927] border border-[#1f2b40] rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1b253b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Tv className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Smart TV & Device Setup</h3>
              <p className="text-[11px] text-slate-400">Direct internet bypass for devices without browsers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1a2336]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {successMsg ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Device Connected!</h4>
              <p className="text-xs text-slate-300 mt-1">{successMsg}</p>
            </div>
            <p className="text-[11px] text-slate-400 bg-[#0d131f] p-3 rounded-lg border border-[#1d273a]">
              Turn your Smart TV's Wi-Fi off and back on. You will have instant uninterrupted access.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="p-5 space-y-4">
            {errorMsg && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Device MAC Address
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 70:2C:1F:39:AB:01"
                value={mac}
                onChange={handleMacChange}
                className="w-full bg-[#182236] border border-[#243350] rounded-lg px-3.5 py-2 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 tracking-wider"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Find this in your TV: <span className="text-slate-300 font-mono">Settings &gt; Network &gt; Status &gt; MAC Address</span>.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Device Description
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Sony Bravia 55 inch"
                className="w-full bg-[#182236] border border-[#243350] rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || mac.length < 17}
                className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 active:scale-98 text-white rounded-lg text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50"
              >
                {loading ? "Activating MAC Bypass..." : "Activate TV / Device Access"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
