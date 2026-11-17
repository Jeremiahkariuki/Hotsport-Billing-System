"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import {
  UserPlus,
  Plus,
  Phone,
  MapPin,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";

export default function PppoeLeadsPage() {
  const [leads, setLeads] = useState([
    {
      id: "lead-01",
      name: "Samuel Gitau",
      location: "Riverside Court, Block B #14",
      phone: "0720112233",
      desiredPlan: "10Mbps Home",
      status: "SURVEY_PENDING",
      createdAt: "2026-11-17",
    },
    {
      id: "lead-02",
      name: "Sarah Wanjiku",
      location: "Sunrise Plaza, 2nd Floor",
      phone: "0715889900",
      desiredPlan: "20Mbps Business",
      status: "SCHEDULED",
      createdAt: "2026-11-16",
    },
    {
      id: "lead-03",
      name: "Dennis Kiprono",
      location: "Greenwood Heights Apt 302",
      phone: "0798765432",
      desiredPlan: "10Mbps Home",
      status: "NEW",
      createdAt: "2026-11-18",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [desiredPlan, setDesiredPlan] = useState("10Mbps Home");

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    setLeads([
      {
        id: `lead-${Date.now()}`,
        name,
        phone,
        location,
        desiredPlan,
        status: "NEW",
        createdAt: new Date().toISOString().split("T")[0],
      },
      ...leads,
    ]);
    setModalOpen(false);
    setName("");
    setPhone("");
    setLocation("");
  };

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 overflow-hidden font-sans">
      <Sidebar packageCount={9} sessionCount={2} voucherCount={4} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="px-8 pt-6 pb-4 border-b border-[#182133] bg-[#0c111d]/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">PPPoE Installation Leads</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Prospective client inquiries, site surveys, and scheduled technician drop-ins
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Record New Lead</span>
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
            <span className="pb-3 text-white border-b-2 border-indigo-500 font-semibold cursor-default flex items-center gap-1.5">
              <span>Leads</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono">
                {leads.length}
              </span>
            </span>
            <Link href="/pppoe/sync" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Router Sync
            </Link>
          </div>
        </div>

        <div className="p-8 max-w-7xl">
          <div className="bg-[#101624] border border-[#1d273a] rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0b101a] border-b border-[#1c2638] text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Client Name</th>
                    <th className="px-4 py-3.5">Phone Number</th>
                    <th className="px-4 py-3.5">Building / Location</th>
                    <th className="px-4 py-3.5">Requested Plan</th>
                    <th className="px-4 py-3.5">Lead Status</th>
                    <th className="px-4 py-3.5">Date Inquired</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182133] text-slate-200">
                  {leads.map((l) => (
                    <tr key={l.id} className="hover:bg-[#151d2e] transition-colors">
                      <td className="px-5 py-3.5 font-bold text-white">{l.name}</td>
                      <td className="px-4 py-3.5 font-mono text-slate-300">{l.phone}</td>
                      <td className="px-4 py-3.5 text-slate-300 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{l.location}</span>
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-indigo-400">{l.desiredPlan}</td>
                      <td className="px-4 py-3.5">
                        {l.status === "NEW" && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/25">
                            New Lead
                          </span>
                        )}
                        {l.status === "SURVEY_PENDING" && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/25">
                            Survey Pending
                          </span>
                        )}
                        {l.status === "SCHEDULED" && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                            Install Scheduled
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-slate-400 font-mono">{l.createdAt}</td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          href="/pppoe"
                          className="px-3 py-1 bg-indigo-600/20 hover:bg-indigo-600/35 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold inline-block"
                        >
                          Convert to PPPoE
                        </Link>
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
