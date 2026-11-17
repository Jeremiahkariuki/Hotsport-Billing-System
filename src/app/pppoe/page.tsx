"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import {
  Network,
  Plus,
  Users,
  Search,
  CheckCircle2,
  RefreshCw,
  Clock,
  ShieldCheck,
  X
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function PppoePage() {
  const [customers, setCustomers] = useState([
    {
      id: "pp-01",
      name: "David Mwangi",
      phone: "0722123456",
      username: "david_home",
      profile: "10Mbps_Home",
      ipAddress: "10.10.10.25",
      price: 1500,
      status: "ACTIVE",
      expiresAt: "2026-12-15",
    },
    {
      id: "pp-02",
      name: "Mercy Chebet",
      phone: "0711987654",
      username: "mercy_office",
      profile: "20Mbps_Business",
      ipAddress: "10.10.10.42",
      price: 2800,
      status: "ACTIVE",
      expiresAt: "2026-12-01",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("10Mbps_Home");
  const [price, setPrice] = useState(1500);

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const newCust = {
      id: `pp-0${customers.length + 1}`,
      name,
      phone,
      username,
      profile,
      ipAddress: `10.10.10.${50 + customers.length}`,
      price,
      status: "ACTIVE",
      expiresAt: "2026-12-31",
    };
    setCustomers([...customers, newCust]);
    setModalOpen(false);
    setName("");
    setPhone("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 overflow-hidden font-sans">
      <Sidebar packageCount={9} sessionCount={1} voucherCount={4} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="px-8 pt-6 pb-4 border-b border-[#182133] bg-[#0c111d]/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">PPPoE Customers</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage your home & office fiber/wireless monthly subscribers
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add PPPoE Customer</span>
            </button>
          </div>
        </div>

        <div className="p-8 max-w-7xl space-y-4">
          <div className="bg-[#101624] border border-[#1d273a] rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0b101a] border-b border-[#1c2638] text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Customer Name</th>
                    <th className="px-4 py-3.5">PPPoE Username</th>
                    <th className="px-4 py-3.5">Phone</th>
                    <th className="px-4 py-3.5">Profile Plan</th>
                    <th className="px-4 py-3.5">Assigned IP</th>
                    <th className="px-4 py-3.5">Monthly Price</th>
                    <th className="px-4 py-3.5">Expiry Date</th>
                    <th className="px-4 py-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182133] text-slate-200">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-[#151d2e] transition-colors">
                      <td className="px-5 py-3.5 font-bold text-white">{c.name}</td>
                      <td className="px-4 py-3.5 font-mono text-indigo-400">{c.username}</td>
                      <td className="px-4 py-3.5 text-slate-400">{c.phone}</td>
                      <td className="px-4 py-3.5 font-semibold text-slate-300">{c.profile}</td>
                      <td className="px-4 py-3.5 font-mono text-slate-400">{c.ipAddress}</td>
                      <td className="px-4 py-3.5 font-bold text-white">{formatCurrency(c.price)}</td>
                      <td className="px-4 py-3.5 text-slate-400">{c.expiresAt}</td>
                      <td className="px-4 py-3.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-[#111726] border border-[#1f2b40] rounded-2xl shadow-2xl overflow-hidden text-slate-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1b253b]">
              <h3 className="text-sm font-semibold text-white">Create PPPoE Customer</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07XXXXXXXX"
                  className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">PPPoE Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">PPPoE Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Speed Profile</label>
                <select
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="5Mbps_Lite">5Mbps Lite (KSh 1,000/mo)</option>
                  <option value="10Mbps_Home">10Mbps Home (KSh 1,500/mo)</option>
                  <option value="20Mbps_Business">20Mbps Business (KSh 2,800/mo)</option>
                  <option value="50Mbps_Enterprise">50Mbps Enterprise (KSh 5,000/mo)</option>
                </select>
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
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold"
                >
                  Save PPPoE Secret
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
