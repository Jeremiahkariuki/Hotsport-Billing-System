"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import {
  RefreshCw,
  Server,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  Copy,
  Check
} from "lucide-react";

export default function PppoeSyncPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const [copied, setCopied] = useState(false);

  const pppoeTerminalScript = `# ==============================================================
# RADALINK - PPPoE SERVER & IP POOL SETUP SCRIPT FOR MIKROTIK
# ==============================================================

# 1. Create IP Pool for PPPoE Clients
/ip pool add name=pppoe-pool ranges=10.10.10.10-10.10.10.250

# 2. Add PPPoE Speed Profiles
/ppp profile
add name=5Mbps_Lite local-address=10.10.10.1 remote-address=pppoe-pool rate-limit=2M/5M dns-server=8.8.8.8,1.1.1.1
add name=10Mbps_Home local-address=10.10.10.1 remote-address=pppoe-pool rate-limit=5M/10M dns-server=8.8.8.8,1.1.1.1
add name=20Mbps_Business local-address=10.10.10.1 remote-address=pppoe-pool rate-limit=10M/20M dns-server=8.8.8.8,1.1.1.1
add name=50Mbps_Enterprise local-address=10.10.10.1 remote-address=pppoe-pool rate-limit=25M/50M dns-server=8.8.8.8,1.1.1.1

# 3. Enable PPPoE Server Service on LAN Interface
/interface pppoe-server server
add service-name=RadaLink-PPPoE interface=ether2 max-mtu=1480 max-mru=1480 default-profile=10Mbps_Home one-session-per-host=yes disabled=no

:put "=========================================================="
:put "RADALINK PPPoE SERVER & PROFILES CONFIGURED!"
:put "=========================================================="`;

  const handleSync = () => {
    setIsSyncing(true);
    setSynced(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSynced(true);
      setTimeout(() => setSynced(false), 4000);
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pppoeTerminalScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 overflow-hidden font-sans">
      <Sidebar packageCount={9} sessionCount={2} voucherCount={4} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="px-8 pt-6 pb-4 border-b border-[#182133] bg-[#0c111d]/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">PPPoE Router Sync</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Synchronize subscribers, speed limits, and credentials directly to MikroTik RouterOS
              </p>
            </div>

            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/25 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Syncing with MikroTik..." : "Sync All Secrets Now"}</span>
            </button>
          </div>

          <div className="flex items-center gap-6 mt-5 text-xs font-medium border-b border-[#182133]">
            <Link href="/pppoe" className="pb-3 text-slate-400 hover:text-white transition-colors">
              All Customers
            </Link>
            <Link href="/pppoe/online" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Online Now
            </Link>
            <Link href="/pppoe/expiring" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Expiring Soon
            </Link>
            <Link href="/pppoe/plans" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Plans
            </Link>
            <Link href="/pppoe/leads" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Leads
            </Link>
            <span className="pb-3 text-white border-b-2 border-indigo-500 font-semibold cursor-default">
              Router Sync
            </span>
          </div>
        </div>

        <div className="p-8 max-w-5xl space-y-6">
          {synced && (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All 2 PPPoE subscriber secrets and 4 speed profiles synchronized with MikroTik RouterOS successfully!</span>
            </div>
          )}

          {/* Router Health Card */}
          <div className="p-5 rounded-2xl bg-[#111726] border border-[#1f2b40] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Main MikroTik Gateway (PPPoE & Hotspot)</h3>
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                    Synchronized
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  IP: 192.168.88.1 • Model: RB750Gr3 (hEX) • RouterOS v7.16.1
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-400 text-right">
              <span className="block text-white font-mono font-bold">Last Sync: Just now</span>
              <span>API Port 8728 Active</span>
            </div>
          </div>

          {/* Terminal Script */}
          <div className="bg-[#090d15] border border-[#1b253b] rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-4 py-2.5 bg-[#0f1523] border-b border-[#1b253b] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> MikroTik PPPoE Server Configuration Script
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="text-xs text-indigo-400 hover:text-white flex items-center gap-1 font-mono"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Script"}</span>
              </button>
            </div>

            <pre className="p-5 text-xs font-mono text-cyan-400/90 leading-relaxed overflow-x-auto whitespace-pre selection:bg-indigo-500 selection:text-white">
              {pppoeTerminalScript}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
