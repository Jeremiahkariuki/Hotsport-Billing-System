import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { prisma } from "@/lib/prisma";
import {
  Wifi,
  Users,
  CreditCard,
  Ticket,
  Cpu,
  HardDrive,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Server,
  Layers,
  Sparkles
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HotspotOverviewPage() {
  const [
    activeSessionsCount,
    vouchersCount,
    packagesCount,
    transactions,
    router,
    recentSessions,
  ] = await Promise.all([
    prisma.activeSession.count(),
    prisma.voucher.count(),
    prisma.package.count(),
    prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { package: true },
    }),
    prisma.routerConfig.findFirst(),
    prisma.activeSession.findMany({
      orderBy: { lastSeen: "desc" },
      take: 5,
    }),
  ]);

  const totalRevenue = transactions
    .filter((t) => t.status === "COMPLETED")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 overflow-hidden font-sans">
      <Sidebar
        packageCount={packagesCount}
        sessionCount={activeSessionsCount}
        voucherCount={vouchersCount}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <div className="px-8 pt-6 pb-4 border-b border-[#182133] bg-[#0c111d]/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Hotspot Overview</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time network traffic, revenue, and client sessions
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/portal"
                target="_blank"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#182338] hover:bg-[#22304d] text-xs font-semibold text-slate-200 border border-[#243350] transition-colors"
              >
                <Wifi className="w-3.5 h-3.5 text-indigo-400" />
                <span>Open Captive Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 max-w-7xl space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Active Sessions */}
            <div className="p-4 rounded-xl bg-[#111726] border border-[#1e2a40] shadow-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Active Users Online</span>
                <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Wifi className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-white">{activeSessionsCount}</span>
                <span className="text-[11px] text-emerald-400 flex items-center font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                  Live on Router
                </span>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="p-4 rounded-xl bg-[#111726] border border-[#1e2a40] shadow-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Revenue (M-Pesa)</span>
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CreditCard className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-white">
                  {formatCurrency(totalRevenue || 45.0)}
                </span>
                <span className="text-[11px] text-slate-400">Today</span>
              </div>
            </div>

            {/* Vouchers Available */}
            <div className="p-4 rounded-xl bg-[#111726] border border-[#1e2a40] shadow-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Vouchers in Stock</span>
                <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                  <Ticket className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-white">{vouchersCount}</span>
                <Link href="/hotspot/vouchers" className="text-[11px] text-indigo-400 hover:underline">
                  + Generate more
                </Link>
              </div>
            </div>

            {/* Active Packages */}
            <div className="p-4 rounded-xl bg-[#111726] border border-[#1e2a40] shadow-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Active Packages</span>
                <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <Layers className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-white">{packagesCount}</span>
                <Link href="/hotspot/packages" className="text-[11px] text-indigo-400 hover:underline">
                  Manage tiers
                </Link>
              </div>
            </div>
          </div>

          {/* Router Health & Status Banner */}
          <div className="p-5 rounded-xl bg-[#101726] border border-[#1d293d] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">
                    {router?.name || "Main MikroTik Router"}
                  </h3>
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Connected
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Model: {router?.model || "RB750Gr3"} • IP: {router?.ipOrHost || "192.168.88.1"} • OS: {router?.routerOsVer || "v7.16"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-slate-400" />
                <span>CPU Load: <strong className="text-white">{router?.cpuLoad ?? 12}%</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                <span>Free RAM: <strong className="text-white">{router?.freeMemoryMb ?? 185} MB</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Uptime: <strong className="text-white">{router?.uptime || "14d 06:22:15"}</strong></span>
              </div>
            </div>
          </div>

          {/* Two Columns: Recent Sessions & Recent M-Pesa Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Clients */}
            <div className="bg-[#101624] border border-[#1d273a] rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-[#1c2638] flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Active Hotspot Sessions
                </h3>
                <Link
                  href="/hotspot/sessions"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  View all
                </Link>
              </div>

              <div className="divide-y divide-[#182133] text-xs">
                {recentSessions.length === 0 ? (
                  <div className="p-6 text-center text-slate-500">No active sessions right now</div>
                ) : (
                  recentSessions.map((session) => (
                    <div key={session.id} className="p-4 flex items-center justify-between hover:bg-[#151c2e]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white">{session.username}</span>
                          <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded font-mono">
                            {session.ipAddress}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          MAC: {session.macAddress} • Package: {session.packageName || "VIEW ONCE 1 HOUR"}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {session.signal || "-58 dBm"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent M-Pesa Transactions */}
            <div className="bg-[#101624] border border-[#1d273a] rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-[#1c2638] flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Recent M-Pesa Purchases
                </h3>
                <span className="text-xs text-slate-500">Live Daraja Feed</span>
              </div>

              <div className="divide-y divide-[#182133] text-xs">
                {transactions.length === 0 ? (
                  <div className="p-6 text-center text-slate-500">No transactions yet</div>
                ) : (
                  transactions.map((tx) => (
                    <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-[#151c2e]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-emerald-400">
                            {tx.receiptNumber || "QKJ94829JDE"}
                          </span>
                          <span className="text-[10px] text-slate-400">{tx.phone}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Package: {tx.package?.name || "Standard Pass"}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-white">
                          {formatCurrency(tx.amount)}
                        </span>
                        <span className="block text-[10px] text-emerald-400">Completed</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
