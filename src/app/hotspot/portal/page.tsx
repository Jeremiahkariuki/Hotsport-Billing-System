"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { CaptivePortalPreview, PortalPackage } from "@/components/captive-portal-preview";
import {
  Sparkles,
  Smartphone,
  Check,
  Eye,
  ExternalLink,
  Laptop,
  CheckCircle2,
  Palette,
  Sliders,
  Save
} from "lucide-react";

export default function PortalDesignPage() {
  const [packages, setPackages] = useState<PortalPackage[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("midnight");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Template options matching Image 1
  const templates = [
    {
      id: "classic",
      name: "Classic",
      category: "Everyday",
      color: "bg-blue-600",
      description: "Clean white card layout for high contrast environments",
    },
    {
      id: "minimal",
      name: "Minimal / Modern",
      category: "Everyday",
      color: "bg-zinc-800",
      description: "Minimalist black and white design with crisp borders",
    },
    {
      id: "midnight",
      name: "Midnight / Premium",
      category: "Everyday",
      color: "bg-indigo-600",
      description: "Sleek dark gradient theme with vibrant neon highlights",
    },
    {
      id: "sales",
      name: "Sales / Conversion",
      category: "Sell more",
      color: "bg-pink-600",
      description: "High-energy gradients optimized to increase voucher purchases",
    },
    {
      id: "forest",
      name: "Forest / Natural",
      category: "Everyday",
      color: "bg-emerald-600",
      description: "Soothing emerald theme for parks, cafes, and outdoor lodges",
    },
    {
      id: "corporate",
      name: "Corporate / Business",
      category: "Business",
      color: "bg-sky-600",
      description: "Polished corporate navy styling for hotels and office hubs",
    },
    {
      id: "voucher",
      name: "Voucher / Reseller",
      category: "Special use",
      color: "bg-purple-600",
      description: "Focuses prominently on voucher code redemption",
    },
    {
      id: "loyalty",
      name: "Loyalty / Rewards",
      category: "Sell more",
      color: "bg-amber-600",
      description: "Warm gold tones highlighting VIP packages and points",
    },
  ];

  useEffect(() => {
    async function loadData() {
      try {
        const [pkgRes, setRes] = await Promise.all([
          fetch("/api/packages"),
          fetch("/api/settings"),
        ]);
        const pkgData = await pkgRes.json();
        const setData = await setRes.json();

        if (pkgData.packages) setPackages(pkgData.packages);
        if (setData.settings) {
          setSettings(setData.settings);
          setSelectedTemplate(setData.settings.activeTemplate || "midnight");
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  const handleSaveTemplate = async (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activeTemplate: templateId }),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar
        packageCount={packages.length || 9}
        sessionCount={1}
        voucherCount={4}
      />

      {/* Main Content Area */}
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
                href="/portal"
                target="_blank"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#182338] hover:bg-[#22304d] text-xs font-semibold text-slate-200 border border-[#243350] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                <span>Open Live Customer Portal</span>
              </Link>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-6 mt-5 text-xs font-medium border-b border-[#182133]">
            <Link
              href="/hotspot/overview"
              className="pb-3 text-slate-400 hover:text-white transition-colors"
            >
              Overview
            </Link>
            <Link
              href="/hotspot/sessions"
              className="pb-3 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Sessions</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-400 px-1.5 py-0.2 rounded font-mono">1</span>
            </Link>
            <Link
              href="/hotspot/vouchers"
              className="pb-3 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Vouchers</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-400 px-1.5 py-0.2 rounded font-mono">4</span>
            </Link>
            <Link
              href="/hotspot/packages"
              className="pb-3 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Packages</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-400 px-1.5 py-0.2 rounded font-mono">
                {packages.length || 9}
              </span>
            </Link>
            <span className="pb-3 text-white border-b-2 border-indigo-500 font-semibold cursor-default">
              Portal
            </span>
            <Link
              href="/hotspot/setup"
              className="pb-3 text-slate-400 hover:text-white transition-colors"
            >
              Setup
            </Link>
          </div>
        </div>

        {/* Content Body: Left Phone Mockup + Right Template Selector */}
        <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl">
          {/* LEFT: Phone Mockup Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-3 px-2">
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                <span>Live Phone Preview: <strong className="text-slate-200 capitalize">{selectedTemplate}</strong></span>
              </span>
              <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Interactive
              </span>
            </div>

            {/* Realistic Mobile Device Frame */}
            <div className="w-full max-w-[340px] h-[640px] bg-[#131926] border-4 border-[#25324c] rounded-[42px] p-2.5 shadow-2xl relative overflow-hidden flex flex-col ring-1 ring-white/10">
              {/* Speaker / Camera Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#080c14] rounded-full z-30 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#151d2e] mr-2" />
                <div className="w-10 h-1.5 rounded-full bg-[#151d2e]" />
              </div>

              {/* Screen Content */}
              <div className="flex-1 bg-black rounded-[32px] overflow-y-auto relative pt-6 custom-scrollbar">
                <CaptivePortalPreview
                  template={selectedTemplate}
                  companyName={settings?.companyName || "ZEUGEN TECH SOLUTION LTD"}
                  tagline={settings?.tagline || "Fast, reliable internet access wherever you are"}
                  packages={packages}
                  currency={settings?.currency || "KSh"}
                  isInteractive={true}
                />
              </div>

              {/* Bottom Home Indicator */}
              <div className="h-4 flex items-center justify-center pt-1">
                <div className="w-24 h-1 bg-slate-600 rounded-full" />
              </div>
            </div>
          </div>

          {/* RIGHT: Template Selector Grid matching Image 1 */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between border-b border-[#1b253b] pb-3">
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide uppercase">Template</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Each template has its own layout. Your packages, prices, name and logo are used in all of them.
                </p>
              </div>
              <button className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                View all templates
              </button>
            </div>

            {saveSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Portal template updated and applied to captive portal!</span>
              </div>
            )}

            {/* Template Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {templates.map((tpl) => {
                const isSelected = selectedTemplate === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => handleSaveTemplate(tpl.id)}
                    className={`group cursor-pointer rounded-xl border p-3 flex flex-col justify-between transition-all relative overflow-hidden ${
                      isSelected
                        ? "bg-[#18233a] border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500"
                        : "bg-[#111726] border-[#1f2c44] hover:border-slate-500 hover:bg-[#151c2e]"
                    }`}
                  >
                    {/* Visual Card Preview Mini */}
                    <div className="w-full h-24 rounded-lg bg-[#0a0e17] border border-[#212c42] p-2 flex flex-col justify-between overflow-hidden relative mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-3.5 h-3.5 rounded-full ${tpl.color} shrink-0`} />
                        <div className="h-1.5 w-12 bg-slate-700 rounded-full" />
                      </div>

                      <div className="space-y-1">
                        <div className="h-1.5 w-16 bg-slate-800 rounded-full" />
                        <div className="h-1.5 w-10 bg-slate-800 rounded-full" />
                      </div>

                      <div className="h-3 w-full bg-slate-800/80 rounded flex items-center justify-center">
                        <div className="h-1 w-6 bg-slate-600 rounded-full" />
                      </div>

                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white truncate">
                          {tpl.name}
                        </h4>
                      </div>
                      <span className="text-[10px] text-slate-300 block mt-0.5">
                        {tpl.category}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="mt-2 text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded text-center">
                        Active Template
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Customization Details Box */}
            <div className="mt-6 p-4 rounded-xl bg-[#121827] border border-[#1d273a] space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-indigo-400" />
                <span>Portal Branding Settings</span>
              </h4>
              <p className="text-xs text-slate-400">
                Customers see your company name (<strong>{settings?.companyName}</strong>) and currency (<strong>{settings?.currency || "KSh"}</strong>) across all packages and receipts.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/hotspot/settings"
                  className="px-3.5 py-1.5 bg-[#1a2438] hover:bg-[#23314c] border border-[#273859] rounded-lg text-xs font-semibold text-slate-200 transition-colors"
                >
                  Edit Branding & M-Pesa Keys
                </Link>
                <Link
                  href="/hotspot/packages"
                  className="px-3.5 py-1.5 bg-[#1a2438] hover:bg-[#23314c] border border-[#273859] rounded-lg text-xs font-semibold text-slate-200 transition-colors"
                >
                  Edit Packages & Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
