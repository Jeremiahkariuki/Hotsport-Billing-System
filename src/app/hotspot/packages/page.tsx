"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { PackageModal, PackageData } from "@/components/package-modal";
import {
  Plus,
  Edit2,
  Trash2,
  ArrowDown,
  ArrowUp,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Settings as SettingsIcon
} from "lucide-react";
import { formatCurrency, formatDurationLabel } from "@/lib/utils";

export default function PackagesPage() {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageData | null>(null);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/packages");
      const data = await res.json();
      if (data.packages) {
        setPackages(data.packages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSavePackage = async (pkg: PackageData) => {
    const isEdit = !!pkg.id;
    const url = isEdit ? `/api/packages/${pkg.id}` : "/api/packages";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pkg),
    });

    if (res.ok) {
      await fetchPackages();
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    const res = await fetch(`/api/packages/${id}`, { method: "DELETE" });
    if (res.ok) {
      await fetchPackages();
    }
  };

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 overflow-hidden font-sans">
      <Sidebar
        packageCount={packages.length}
        sessionCount={1}
        voucherCount={4}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <div className="px-8 pt-6 pb-4 border-b border-[#182133] bg-[#0c111d]/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Hotspot</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Everything your WiFi customers buy and use
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/hotspot/setup"
                className="px-3.5 py-1.5 rounded-lg bg-[#182338] hover:bg-[#22304d] text-xs font-semibold text-slate-300 border border-[#243350] transition-colors"
              >
                Set up
              </Link>
              <button
                onClick={() => {
                  setEditingPackage(null);
                  setModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/25 transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Create Package</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-6 mt-5 text-xs font-medium border-b border-[#182133]">
            <Link href="/hotspot/overview" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Overview
            </Link>
            <Link href="/hotspot/sessions" className="pb-3 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
              <span>Sessions</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-400 px-1.5 py-0.2 rounded font-mono">1</span>
            </Link>
            <Link href="/hotspot/vouchers" className="pb-3 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
              <span>Vouchers</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-400 px-1.5 py-0.2 rounded font-mono">4</span>
            </Link>
            <span className="pb-3 text-white border-b-2 border-indigo-500 font-semibold cursor-default flex items-center gap-1.5">
              <span>Packages</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono">
                {packages.length}
              </span>
            </span>
            <Link href="/hotspot/portal" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Portal
            </Link>
            <Link href="/hotspot/setup" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Setup
            </Link>
          </div>
        </div>

        {/* Content Table matching Image 2 background */}
        <div className="p-8 max-w-7xl">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Let customers make their own choices</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                A card on your login page where customers can choose how much data and how long it lasts.
              </p>
            </div>
          </div>

          <div className="bg-[#101624] border border-[#1d273a] rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0b101a] border-b border-[#1c2638] text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Name</th>
                    <th className="px-4 py-3.5">Speed Cap</th>
                    <th className="px-4 py-3.5">Duration</th>
                    <th className="px-4 py-3.5">Price</th>
                    <th className="px-4 py-3.5">Users / Devices</th>
                    <th className="px-4 py-3.5">Lock Mode</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182133] text-slate-200">
                  {packages.map((pkg) => {
                    const speedString =
                      pkg.downloadSpeedMbps === 0
                        ? "No speed cap"
                        : `${pkg.uploadSpeedMbps}M / ${pkg.downloadSpeedMbps}M`;

                    return (
                      <tr key={pkg.id} className="hover:bg-[#151d2e] transition-colors">
                        <td className="px-5 py-3.5 font-bold text-white">
                          <div className="flex items-center gap-2">
                            <span>{pkg.name}</span>
                            {pkg.tag && (
                              <span className="text-[10px] font-normal px-1.5 py-0.2 bg-amber-500/15 text-amber-300 rounded border border-amber-500/20">
                                {pkg.tag}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-3.5 font-mono text-indigo-400">
                          {speedString}
                        </td>

                        <td className="px-4 py-3.5 text-slate-300">
                          {formatDurationLabel(pkg.durationMinutes)}
                        </td>

                        <td className="px-4 py-3.5 font-bold text-white">
                          {formatCurrency(pkg.price)}
                        </td>

                        <td className="px-4 py-3.5 text-slate-300">
                          <span className="flex items-center gap-1 font-mono">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            {pkg.simultaneousDevices}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#182238] border border-[#232f48] text-slate-300">
                            {pkg.deviceLockMode === "STRICT" ? "Strict Lock" : "Flexible"}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Active
                          </span>
                        </td>

                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingPackage(pkg);
                                setModalOpen(true);
                              }}
                              className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1e2a40] rounded-lg transition-colors"
                              title="Edit Package"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => pkg.id && handleDeletePackage(pkg.id)}
                              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Delete Package"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit / Create Package Modal */}
      <PackageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSavePackage}
        initialData={editingPackage}
      />
    </div>
  );
}
