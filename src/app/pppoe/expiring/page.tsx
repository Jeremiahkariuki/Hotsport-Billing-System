"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import {
  Clock,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  MessageSquare
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function PppoeExpiringPage() {
  const [expiringUsers, setExpiringUsers] = useState([
    {
      id: "exp-01",
      name: "Mercy Chebet",
      username: "mercy_office",
      phone: "0711987654",
      profile: "20Mbps_Business",
      price: 2800,
      expiresAt: "2026-11-20",
      daysLeft: 2,
      status: "EXPIRING_SOON",
    },
    {
      id: "exp-02",
      name: "Brian Omondi",
      username: "brian_apt4",
      phone: "0723456789",
      profile: "10Mbps_Home",
      price: 1500,
      expiresAt: "2026-11-24",
      daysLeft: 6,
      status: "EXPIRING_SOON",
    },
  ]);

  const [notificationSent, setNotificationSent] = useState<string | null>(null);

  const handleSendReminder = (phone: string, name: string) => {
    setNotificationSent(`Payment reminder SMS dispatched to ${name} (${phone})`);
    setTimeout(() => setNotificationSent(null), 3000);
  };

  const handleRenew = (id: string) => {
    setExpiringUsers(expiringUsers.filter((u) => u.id !== id));
    setNotificationSent(`Subscription renewed for 30 days!`);
    setTimeout(() => setNotificationSent(null), 3000);
  };

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 overflow-hidden font-sans">
      <Sidebar packageCount={9} sessionCount={2} voucherCount={4} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="px-8 pt-6 pb-4 border-b border-[#182133] bg-[#0c111d]/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Expiring PPPoE Subscriptions</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Subscribers approaching renewal date within 7 days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-5 text-xs font-medium border-b border-[#182133]">
            <Link href="/pppoe" className="pb-3 text-slate-400 hover:text-white transition-colors">
              All Customers
            </Link>
            <Link href="/pppoe/online" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Online Now
            </Link>
            <span className="pb-3 text-white border-b-2 border-indigo-500 font-semibold cursor-default flex items-center gap-1.5">
              <span>Expiring Soon</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">
                {expiringUsers.length}
              </span>
            </span>
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

        <div className="p-8 max-w-7xl space-y-4">
          {notificationSent && (
            <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{notificationSent}</span>
            </div>
          )}

          <div className="bg-[#101624] border border-[#1d273a] rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0b101a] border-b border-[#1c2638] text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Customer Name</th>
                    <th className="px-4 py-3.5">Phone Number</th>
                    <th className="px-4 py-3.5">Plan / Monthly</th>
                    <th className="px-4 py-3.5">Expiry Date</th>
                    <th className="px-4 py-3.5">Days Left</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182133] text-slate-200">
                  {expiringUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-[#151d2e] transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-white">{u.name}</div>
                        <div className="font-mono text-slate-400 text-[11px]">{u.username}</div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-300 font-mono">{u.phone}</td>
                      <td className="px-4 py-3.5 font-semibold text-white">
                        {u.profile} ({formatCurrency(u.price)})
                      </td>
                      <td className="px-4 py-3.5 text-slate-300 font-mono">{u.expiresAt}</td>
                      <td className="px-4 py-3.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/25">
                          {u.daysLeft} days remaining
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleSendReminder(u.phone, u.name)}
                            className="flex items-center gap-1.5 px-3 py-1 bg-[#182338] hover:bg-[#202e47] text-slate-200 border border-[#273859] rounded-lg text-xs font-semibold transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Send SMS</span>
                          </button>
                          <button
                            onClick={() => handleRenew(u.id)}
                            className="px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/35 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold transition-colors"
                          >
                            Renew +1 Mo
                          </button>
                        </div>
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
