"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import {
  Settings as SettingsIcon,
  ShieldCheck,
  CreditCard,
  Building,
  CheckCircle2,
  Save,
  Lock,
  Phone
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: "ZEUGEN TECH SOLUTION LTD",
    tagline: "Fast, reliable internet access wherever you are",
    currency: "KSh",
    supportPhone: "+254 712 345 678",
    supportEmail: "billing@zeugentech.co.ke",
    mpesaShortcode: "174379",
    mpesaPasskey: "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
    mpesaConsumerKey: "sandbox_consumer_key",
    mpesaConsumerSecret: "sandbox_consumer_secret",
    mpesaEnv: "sandbox",
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.settings) {
          setSettings(data.settings);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 overflow-hidden font-sans">
      <Sidebar packageCount={9} sessionCount={1} voucherCount={4} />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="px-8 pt-6 pb-4 border-b border-[#182133] bg-[#0c111d]/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Hotspot Settings</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure your ISP brand, support contacts, and Safaricom M-Pesa Daraja keys
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 max-w-4xl space-y-6">
          {saved && (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Settings saved successfully! All updates reflect on your captive portal.</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6 text-xs">
            {/* Business Profile */}
            <div className="p-5 rounded-xl bg-[#111726] border border-[#1e2a40] space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#1b253b]">
                <Building className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">ISP Branding & Profile</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Company / Brand Name</label>
                  <input
                    type="text"
                    required
                    value={settings.companyName}
                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                    className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Currency Code</label>
                  <input
                    type="text"
                    required
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-300 font-medium mb-1">Portal Tagline / Header Text</label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Support Phone</label>
                  <input
                    type="text"
                    value={settings.supportPhone}
                    onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                    className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Support Email</label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* M-Pesa Daraja Gateway */}
            <div className="p-5 rounded-xl bg-[#111726] border border-[#1e2a40] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1b253b]">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Safaricom M-Pesa Daraja Settings</h3>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                  STK Push / Express
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Daraja Environment</label>
                  <select
                    value={settings.mpesaEnv}
                    onChange={(e) => setSettings({ ...settings, mpesaEnv: e.target.value })}
                    className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="sandbox">Sandbox (Testing / Simulator)</option>
                    <option value="production">Production (Live Safaricom)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Paybill / Till Shortcode</label>
                  <input
                    type="text"
                    value={settings.mpesaShortcode}
                    onChange={(e) => setSettings({ ...settings, mpesaShortcode: e.target.value })}
                    placeholder="174379"
                    className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-300 font-medium mb-1">Lipa Na M-Pesa Online Passkey</label>
                  <input
                    type="password"
                    value={settings.mpesaPasskey}
                    onChange={(e) => setSettings({ ...settings, mpesaPasskey: e.target.value })}
                    className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Consumer Key</label>
                  <input
                    type="text"
                    value={settings.mpesaConsumerKey}
                    onChange={(e) => setSettings({ ...settings, mpesaConsumerKey: e.target.value })}
                    className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Consumer Secret</label>
                  <input
                    type="password"
                    value={settings.mpesaConsumerSecret}
                    onChange={(e) => setSettings({ ...settings, mpesaConsumerSecret: e.target.value })}
                    className="w-full bg-[#172236] border border-[#243350] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold rounded-lg shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Settings"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
