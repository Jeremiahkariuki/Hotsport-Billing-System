"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wifi,
  Radio,
  LayoutDashboard,
  Users,
  Layers,
  Palette,
  Settings,
  Sliders,
  ChevronLeft,
  Search,
  LogOut,
  Network,
  Ticket,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
  Activity,
  UserCheck,
  ShieldAlert,
  UserPlus,
  RefreshCw
} from "lucide-react";

interface SidebarProps {
  sessionCount?: number;
  voucherCount?: number;
  packageCount?: number;
}

export function Sidebar({ sessionCount = 1, voucherCount = 4, packageCount = 9 }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0d111a] border-r border-[#1a2233] flex flex-col h-screen select-none shrink-0 text-sm">
      {/* Brand Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-[#1a2233]">
        <Link href="/hotspot/overview" className="flex items-center gap-2.5 font-semibold text-white">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Radio className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-white">RadaLink</span>
        </Link>
        <button className="text-slate-400 hover:text-white p-1 rounded hover:bg-[#1a2336] transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Search Input */}
      <div className="px-3 py-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#131926] border border-[#1e293b] rounded-md pl-8 pr-7 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <span className="absolute right-2 top-2 text-[10px] bg-[#1c2436] border border-[#2b374e] text-slate-400 px-1 rounded font-mono">
            ⌘K
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 space-y-4 py-1">
        <div>
          <Link
            href="/hotspot/overview"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-md font-medium transition-colors ${
              pathname === "/dashboard" || pathname === "/hotspot/overview"
                ? "bg-[#182238] text-indigo-400"
                : "text-slate-300 hover:bg-[#141b29] hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-slate-400" />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Hotspot Section */}
        <div>
          <div className="flex items-center justify-between px-3 py-1 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <Wifi className="w-3.5 h-3.5 text-indigo-400" />
              <span>Hotspot</span>
            </div>
            <span className="text-[10px] text-slate-300">▾</span>
          </div>

          <div className="mt-1 space-y-0.5 pl-3 border-l border-[#1a2337] ml-3.5">
            <Link
              href="/hotspot/overview"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                pathname === "/hotspot/overview"
                  ? "bg-[#182238] text-indigo-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141b29]"
              }`}
            >
              <span>Overview</span>
            </Link>

            <Link
              href="/hotspot/sessions"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                pathname === "/hotspot/sessions"
                  ? "bg-[#182238] text-indigo-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141b29]"
              }`}
            >
              <span>Sessions</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-300 px-1.5 py-0.2 rounded font-mono">
                {sessionCount}
              </span>
            </Link>

            <Link
              href="/hotspot/vouchers"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                pathname === "/hotspot/vouchers"
                  ? "bg-[#182238] text-indigo-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141b29]"
              }`}
            >
              <span>Vouchers</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-300 px-1.5 py-0.2 rounded font-mono">
                {voucherCount}
              </span>
            </Link>

            <Link
              href="/hotspot/packages"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                pathname === "/hotspot/packages"
                  ? "bg-[#182238] text-indigo-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141b29]"
              }`}
            >
              <span>Packages</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-300 px-1.5 py-0.2 rounded font-mono">
                {packageCount}
              </span>
            </Link>

            <Link
              href="/hotspot/portal"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors relative ${
                pathname === "/hotspot/portal"
                  ? "bg-[#182238] text-indigo-400 font-medium before:content-[''] before:absolute before:-left-3.5 before:top-1 before:bottom-1 before:w-[2px] before:bg-indigo-500"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141b29]"
              }`}
            >
              <span>Portal design</span>
            </Link>

            <Link
              href="/hotspot/settings"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                pathname === "/hotspot/settings"
                  ? "bg-[#182238] text-indigo-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141b29]"
              }`}
            >
              <span>Hotspot settings</span>
            </Link>

            <Link
              href="/hotspot/setup"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                pathname === "/hotspot/setup"
                  ? "bg-[#182238] text-indigo-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141b29]"
              }`}
            >
              <span>Setup</span>
            </Link>
          </div>
        </div>

        {/* PPPoE Section */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
            Customers
          </div>
          <div className="flex items-center justify-between px-3 py-1 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <Network className="w-3.5 h-3.5 text-cyan-400" />
              <span>PPPoE</span>
            </div>
            <span className="text-[10px] text-slate-300">▾</span>
          </div>

          <div className="mt-1 space-y-0.5 pl-3 border-l border-[#1a2337] ml-3.5">
            <Link
              href="/pppoe"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                pathname === "/pppoe"
                  ? "bg-[#182238] text-indigo-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141b29]"
              }`}
            >
              <span>Customers</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-300 px-1.5 py-0.2 rounded font-mono">
                2
              </span>
            </Link>

            <Link
              href="/pppoe/online"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                pathname === "/pppoe/online"
                  ? "bg-[#182238] text-indigo-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141b29]"
              }`}
            >
              <span>Online now</span>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-1.5 py-0.2 rounded font-mono">
                2
              </span>
            </Link>

            <Link
              href="/pppoe/expiring"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                pathname === "/pppoe/expiring"
                  ? "bg-[#182238] text-indigo-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141b29]"
              }`}
            >
              <span>Expiring soon</span>
              <span className="text-[10px] bg-amber-500/15 text-amber-300 px-1.5 py-0.2 rounded font-mono">
                1
              </span>
            </Link>

            <Link
              href="/pppoe/plans"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                pathname === "/pppoe/plans"
                  ? "bg-[#182238] text-indigo-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141b29]"
              }`}
            >
              <span>Plans</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-300 px-1.5 py-0.2 rounded font-mono">
                4
              </span>
            </Link>

            <Link
              href="/pppoe/leads"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                pathname === "/pppoe/leads"
                  ? "bg-[#182238] text-indigo-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141b29]"
              }`}
            >
              <span>Leads</span>
              <span className="text-[10px] bg-indigo-500/15 text-indigo-300 px-1.5 py-0.2 rounded font-mono">
                3
              </span>
            </Link>

            <Link
              href="/pppoe/sync"
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                pathname === "/pppoe/sync"
                  ? "bg-[#182238] text-indigo-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#141b29]"
              }`}
            >
              <span>Router sync</span>
              <span className="text-[10px] text-emerald-400">●</span>
            </Link>
          </div>
        </div>
      </div>

      {/* User Footer with Link to Login / Logout */}
      <div className="p-3 border-t border-[#1a2233] flex items-center justify-between">
        <Link href="/login" className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
            JK
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-200 truncate leading-tight">Jeremy Kariuki</p>
            <p className="text-[10px] text-slate-400 truncate">RADALINK NETWORKS</p>
          </div>
        </Link>
        <Link
          href="/login"
          title="Sign out / Switch account"
          className="text-slate-400 hover:text-red-400 p-1.5 rounded hover:bg-[#1a2336] transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}
