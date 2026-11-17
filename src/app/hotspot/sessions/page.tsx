"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import {
  Wifi,
  Power,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  HardDrive
} from "lucide-react";
import { formatBytes } from "@/lib/utils";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [kickingId, setKickingId] = useState<string | null>(null);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/sessions");
      const data = await res.json();
      if (data.sessions) {
        setSessions(data.sessions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleKick = async (id: string, mac: string) => {
    if (!confirm(`Are you sure you want to disconnect MAC ${mac}?`)) return;
    setKickingId(id);
    try {
      const res = await fetch(`/api/sessions/${id}/kick`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSessions((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setKickingId(null);
    }
  };

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 overflow-hidden font-sans">
      <Sidebar
        packageCount={9}
        sessionCount={sessions.length}
        voucherCount={4}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="px-8 pt-6 pb-4 border-b border-[#182133] bg-[#0c111d]/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Active Sessions</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Live devices authenticated and browsing on your MikroTik Hotspot
              </p>
            </div>

            <button
              onClick={fetchSessions}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#182338] hover:bg-[#22304d] text-xs font-semibold text-slate-300 border border-[#243350] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Sessions</span>
            </button>
          </div>

          <div className="flex items-center gap-6 mt-5 text-xs font-medium border-b border-[#182133]">
            <Link href="/hotspot/overview" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Overview
            </Link>
            <span className="pb-3 text-white border-b-2 border-indigo-500 font-semibold cursor-default flex items-center gap-1.5">
              <span>Sessions</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono">
                {sessions.length}
              </span>
            </span>
            <Link href="/hotspot/vouchers" className="pb-3 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
              <span>Vouchers</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-400 px-1.5 py-0.2 rounded font-mono">4</span>
            </Link>
            <Link href="/hotspot/packages" className="pb-3 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
              <span>Packages</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-400 px-1.5 py-0.2 rounded font-mono">9</span>
            </Link>
            <Link href="/hotspot/portal" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Portal
            </Link>
            <Link href="/hotspot/setup" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Setup
            </Link>
          </div>
        </div>

        <div className="p-8 max-w-7xl">
          <div className="bg-[#101624] border border-[#1d273a] rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0b101a] border-b border-[#1c2638] text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">User / Phone / Code</th>
                    <th className="px-4 py-3.5">IP Address</th>
                    <th className="px-4 py-3.5">MAC Address</th>
                    <th className="px-4 py-3.5">Package</th>
                    <th className="px-4 py-3.5">Data Downloaded</th>
                    <th className="px-4 py-3.5">Data Uploaded</th>
                    <th className="px-4 py-3.5">Signal</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182133] text-slate-200">
                  {sessions.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-5 py-8 text-center text-slate-500">
                        No active client sessions on router.
                      </td>
                    </tr>
                  ) : (
                    sessions.map((s) => (
                      <tr key={s.id} className="hover:bg-[#151d2e] transition-colors">
                        <td className="px-5 py-3.5 font-bold text-white font-mono">
                          {s.username}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-slate-300">
                          {s.ipAddress}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-slate-400">
                          {s.macAddress}
                        </td>
                        <td className="px-4 py-3.5 text-indigo-400 font-semibold">
                          {s.packageName || "VIEW ONCE 1 HOUR"}
                        </td>
                        <td className="px-4 py-3.5 text-slate-300 font-mono">
                          {formatBytes(s.bytesOut)}
                        </td>
                        <td className="px-4 py-3.5 text-slate-300 font-mono">
                          {formatBytes(s.bytesIn)}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                            {s.signal || "-58 dBm"}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => handleKick(s.id, s.macAddress)}
                            disabled={kickingId === s.id}
                            className="px-2.5 py-1 bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                          >
                            {kickingId === s.id ? "Disconnecting..." : "Kick / Disconnect"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
