"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import {
  Layers,
  Plus,
  ArrowDown,
  ArrowUp,
  Users,
  Edit2,
  Trash2,
  CheckCircle2,
  X
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function PppoePlansPage() {
  const [plans, setPlans] = useState([
    {
      id: "plan-1",
      name: "5Mbps Lite",
      downloadSpeed: "5M",
      uploadSpeed: "2M",
      price: 1000,
      subscribers: 8,
      localAddress: "10.10.10.1",
      remoteAddressPool: "pppoe-pool",
    },
    {
      id: "plan-2",
      name: "10Mbps Home",
      downloadSpeed: "10M",
      uploadSpeed: "5M",
      price: 1500,
      subscribers: 24,
      localAddress: "10.10.10.1",
      remoteAddressPool: "pppoe-pool",
    },
    {
      id: "plan-3",
      name: "20Mbps Business",
      downloadSpeed: "20M",
      uploadSpeed: "10M",
      price: 2800,
      subscribers: 12,
      localAddress: "10.10.10.1",
      remoteAddressPool: "pppoe-pool",
    },
    {
      id: "plan-4",
      name: "50Mbps Enterprise",
      downloadSpeed: "50M",
      uploadSpeed: "25M",
      price: 5000,
      subscribers: 3,
      localAddress: "10.10.10.1",
      remoteAddressPool: "pppoe-pool",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [downloadSpeed, setDownloadSpeed] = useState("15M");
  const [uploadSpeed, setUploadSpeed] = useState("5M");
  const [price, setPrice] = useState(2000);

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    setPlans([
      ...plans,
      {
        id: `plan-${Date.now()}`,
        name,
        downloadSpeed,
        uploadSpeed,
        price,
        subscribers: 0,
        localAddress: "10.10.10.1",
        remoteAddressPool: "pppoe-pool",
      },
    ]);
    setModalOpen(false);
    setName("");
  };

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 overflow-hidden font-sans">
      <Sidebar packageCount={9} sessionCount={2} voucherCount={4} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="px-8 pt-6 pb-4 border-b border-[#182133] bg-[#0c111d]/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">PPPoE Bandwidth Plans</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Speed profiles applied to MikroTik Simple Queues and PPPoE Profiles
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Profile Plan</span>
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
            <span className="pb-3 text-white border-b-2 border-indigo-500 font-semibold cursor-default flex items-center gap-1.5">
              <span>Plans</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono">
                {plans.length}
              </span>
            </span>
            <Link href="/pppoe/leads" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Leads
            </Link>
            <Link href="/pppoe/sync" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Router Sync
            </Link>
          </div>
        </div>

        <div className="p-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-[#111726] border border-[#1f2b40] shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-sm">{p.name}</h3>
                    <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {p.uploadSpeed}/{p.downloadSpeed}
                    </span>
                  </div>

                  <div className="mt-3">
                    <span className="text-2xl font-extrabold text-white">
                      {formatCurrency(p.price)}
                    </span>
                    <span className="text-xs text-slate-400"> / month</span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1a2336] text-xs text-slate-400 space-y-1.5">
                    <div className="flex justify-between">
                      <span>Rate Limit:</span>
                      <span className="font-mono text-white">{p.uploadSpeed}/{p.downloadSpeed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gateway Pool:</span>
                      <span className="font-mono text-slate-300">{p.remoteAddressPool}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subscribers:</span>
                      <span className="font-mono font-bold text-emerald-400">{p.subscribers} clients</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 py-1.5 bg-[#182338] hover:bg-[#202e47] text-slate-300 rounded-lg text-xs font-semibold">
                    Edit Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#111726] border border-[#1f2b40] rounded-2xl p-5 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-[#1b253b] pb-3">
              <h3 className="font-bold text-white text-sm">Create Speed Profile</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPlan} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Plan Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 15Mbps Family"
                  className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Download Speed</label>
                  <input
                    type="text"
                    required
                    value={downloadSpeed}
                    onChange={(e) => setDownloadSpeed(e.target.value)}
                    placeholder="15M"
                    className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Upload Speed</label>
                  <input
                    type="text"
                    required
                    value={uploadSpeed}
                    onChange={(e) => setUploadSpeed(e.target.value)}
                    placeholder="5M"
                    className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Monthly Price (KSh)</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#1b253b]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
