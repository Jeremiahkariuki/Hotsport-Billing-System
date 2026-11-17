"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import {
  Ticket,
  Plus,
  Printer,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  QrCode,
  X
} from "lucide-react";
import { formatCurrency, formatDurationLabel } from "@/lib/utils";

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generator form
  const [selectedPkgId, setSelectedPkgId] = useState("");
  const [count, setCount] = useState(10);
  const [prefix, setPrefix] = useState("RL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [vRes, pRes] = await Promise.all([
        fetch("/api/vouchers"),
        fetch("/api/packages"),
      ]);
      const vData = await vRes.json();
      const pData = await pRes.json();

      if (vData.vouchers) setVouchers(vData.vouchers);
      if (pData.packages) {
        setPackages(pData.packages);
        if (pData.packages.length > 0 && !selectedPkgId) {
          setSelectedPkgId(pData.packages[0].id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const res = await fetch("/api/vouchers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: selectedPkgId,
          count: Number(count),
          prefix: prefix.trim() || "ZG",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredVouchers = vouchers.filter((v) => {
    const matchStatus = filterStatus === "ALL" || v.status === filterStatus;
    const matchQuery =
      !searchQuery ||
      v.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.batchId && v.batchId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchStatus && matchQuery;
  });

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 overflow-hidden font-sans">
      <Sidebar
        packageCount={packages.length || 9}
        sessionCount={1}
        voucherCount={vouchers.length}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="px-8 pt-6 pb-4 border-b border-[#182133] bg-[#0c111d]/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Voucher Management</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Generate, manage, and print prepaid hotspot voucher cards
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#182338] hover:bg-[#22304d] text-xs font-semibold text-slate-300 border border-[#243350] transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Print Voucher Sheets</span>
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/25 transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Bulk Generate Vouchers</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-5 text-xs font-medium border-b border-[#182133]">
            <Link href="/hotspot/overview" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Overview
            </Link>
            <Link href="/hotspot/sessions" className="pb-3 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
              <span>Sessions</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-400 px-1.5 py-0.2 rounded font-mono">1</span>
            </Link>
            <span className="pb-3 text-white border-b-2 border-indigo-500 font-semibold cursor-default flex items-center gap-1.5">
              <span>Vouchers</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono">
                {vouchers.length}
              </span>
            </span>
            <Link href="/hotspot/packages" className="pb-3 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
              <span>Packages</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-400 px-1.5 py-0.2 rounded font-mono">
                {packages.length || 9}
              </span>
            </Link>
            <Link href="/hotspot/portal" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Portal
            </Link>
            <Link href="/hotspot/setup" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Setup
            </Link>
          </div>
        </div>

        <div className="p-8 max-w-7xl space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {["ALL", "UNUSED", "ACTIVE", "EXPIRED"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    filterStatus === status
                      ? "bg-indigo-600 text-white"
                      : "bg-[#141b29] text-slate-400 hover:text-white border border-[#212c42]"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search voucher code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#121827] border border-[#212c42] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-64"
              />
            </div>
          </div>

          {/* Vouchers Table */}
          <div className="bg-[#101624] border border-[#1d273a] rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0b101a] border-b border-[#1c2638] text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Voucher Code</th>
                    <th className="px-4 py-3.5">Package</th>
                    <th className="px-4 py-3.5">Price</th>
                    <th className="px-4 py-3.5">Duration</th>
                    <th className="px-4 py-3.5">Batch ID</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182133] text-slate-200">
                  {filteredVouchers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-5 py-8 text-center text-slate-500">
                        No vouchers match the criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredVouchers.map((v) => (
                      <tr key={v.id} className="hover:bg-[#151d2e] transition-colors">
                        <td className="px-5 py-3.5 font-mono font-bold text-white tracking-wider">
                          <span className="bg-[#18243b] px-2.5 py-1 rounded-md border border-[#253654] text-indigo-300">
                            {v.code}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-slate-200">
                          {v.package?.name || "VIEW ONCE 1 HOUR"}
                        </td>
                        <td className="px-4 py-3.5 font-bold text-white">
                          {formatCurrency(v.package?.price || 5)}
                        </td>
                        <td className="px-4 py-3.5 text-slate-400">
                          {formatDurationLabel(v.package?.durationMinutes || 60)}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-slate-500">
                          {v.batchId || "BATCH-001"}
                        </td>
                        <td className="px-4 py-3.5">
                          {v.status === "UNUSED" && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/25">
                              Unused
                            </span>
                          )}
                          {v.status === "ACTIVE" && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                              Active
                            </span>
                          )}
                          {v.status === "EXPIRED" && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/15 text-red-400 border border-red-500/25">
                              Expired
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-right text-slate-500">
                          {new Date(v.createdAt).toLocaleDateString()}
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

      {/* Bulk Generator Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-[#111726] border border-[#1f2b40] rounded-2xl shadow-2xl overflow-hidden text-slate-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1b253b]">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-semibold text-white">Bulk Voucher Generator</h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGenerate} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1.5">Target Package</label>
                <select
                  value={selectedPkgId}
                  onChange={(e) => setSelectedPkgId(e.target.value)}
                  className="w-full bg-[#172134] border border-[#243350] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} — {formatCurrency(pkg.price)} ({formatDurationLabel(pkg.durationMinutes)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1.5">Number of Vouchers</label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 10)}
                  className="w-full bg-[#172134] border border-[#243350] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1.5">Code Prefix</label>
                <input
                  type="text"
                  maxLength={4}
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value.toUpperCase())}
                  placeholder="ZG"
                  className="w-full bg-[#172134] border border-[#243350] rounded-lg px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-indigo-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Example generated code: <span className="text-indigo-400 font-mono">{prefix}-8472</span>
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#1b253b]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold disabled:opacity-50"
                >
                  {isGenerating ? "Generating..." : `Generate ${count} Vouchers`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
