"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import {
  Network,
  Activity,
  RefreshCw,
  Power,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  Users
} from "lucide-react";

export default function PppoeOnlinePage() {
  const [onlineSessions, setOnlineSessions] = useState([
    {
      id: "ses-01",
      name: "David Mwangi",
      username: "david_home",
      ipAddress: "10.10.10.25",
      callerId: "00:1E:67:84:9A:12",
      profile: "10Mbps_Home",
      uptime: "3d 14h 22m",
      rxRate: "8.4 Mbps",
      txRate: "1.2 Mbps",
      signal: "Stable",
    },
    {
      id: "ses-02",
      name: "Mercy Chebet",
      username: "mercy_office",
      ipAddress: "10.10.10.42",
      callerId: "74:83:C2:55:10:AE",
      profile: "20Mbps_Business",
      uptime: "12h 05m",
      rxRate: "16.8 Mbps",
      txRate: "3.5 Mbps",
      signal: "Stable",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleDisconnect = (username: string) => {
    if (!confirm(`Disconnect PPPoE session for ${username}?`)) return;
    setOnlineSessions(onlineSessions.filter((s) => s.username !== username));
  };

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 overflow-hidden font-sans">
      <Sidebar packageCount={9} sessionCount={2} voucherCount={4} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <div className="px-8 pt-6 pb-4 border-b border-[#182133] bg-[#0c111d]/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">PPPoE — Online Now</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                  ● 2 Active Tunnels
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time active PPPoE client sessions on MikroTik router
              </p>
            </div>

            <button
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 500);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#182338] hover:bg-[#22304d] text-xs font-semibold text-slate-300 border border-[#243350] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Status</span>
            </button>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-6 mt-5 text-xs font-medium border-b border-[#182133]">
            <Link href="/pppoe" className="pb-3 text-slate-400 hover:text-white transition-colors">
              All Customers
            </Link>
            <span className="pb-3 text-white border-b-2 border-indigo-500 font-semibold cursor-default flex items-center gap-1.5">
              <span>Online Now</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">2</span>
            </span>
            <Link href="/pppoe/expiring" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Expiring Soon
            </Link>
            <Link href="/pppoe/plans" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Plans
            </Link>
            <Link href="/pppoe/leads" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Leads
            </Link>
            <Link href="/pppoe/sync" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Router Sync
            </Link>
          </div>
        </div>

        {/* Content Table */}
        <div className="p-8 max-w-7xl">
          <div className="bg-[#101624] border border-[#1d273a] rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0b101a] border-b border-[#1c2638] text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Customer / Username</th>
                    <th className="px-4 py-3.5">Assigned IP</th>
                    <th className="px-4 py-3.5">Caller ID (MAC)</th>
                    <th className="px-4 py-3.5">Speed Plan</th>
                    <th className="px-4 py-3.5">Session Uptime</th>
                    <th className="px-4 py-3.5">Live Download</th>
                    <th className="px-4 py-3.5">Live Upload</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182133] text-slate-200">
                  {onlineSessions.map((s) => (
                    <tr key={s.id} className="hover:bg-[#151d2e] transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-white">{s.name}</div>
                        <div className="font-mono text-indigo-400 text-[11px]">{s.username}</div>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-white">{s.ipAddress}</td>
                      <td className="px-4 py-3.5 font-mono text-slate-400">{s.callerId}</td>
                      <td className="px-4 py-3.5">
                        <span className="font-semibold text-slate-300">{s.profile}</span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-300 font-mono">{s.uptime}</td>
                      <td className="px-4 py-3.5 font-mono text-emerald-400">{s.rxRate}</td>
                      <td className="px-4 py-3.5 font-mono text-sky-400">{s.txRate}</td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleDisconnect(s.username)}
                          className="px-3 py-1 bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 rounded-lg text-xs font-semibold transition-colors"
                        >
                          Disconnect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
