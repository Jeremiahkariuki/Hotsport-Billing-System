"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import {
  Server,
  Copy,
  Check,
  Download,
  Terminal,
  ShieldCheck,
  ExternalLink,
  Info
} from "lucide-react";
import { MikroTikService } from "@/lib/mikrotik";

export default function SetupPage() {
  const [copied, setCopied] = useState(false);

  const sampleScript = `# ==============================================================
# ZEUGEN TECH / HOTSPOT BILLING SYSTEM - MIKROTIK AUTO SETUP SCRIPT
# Run this directly in MikroTik WinBox Terminal
# ==============================================================

# 1. Enable API Service for Billing System
/ip service set api port=8728 disabled=no
/ip service set api-ssl port=8729 disabled=no

# 2. Create Billing API User
/user group add name=billing-group policy=read,write,api,test,reboot
/user add name=billing password="ChangeMeSecurely123" group=billing-group comment="Hotspot Billing API"

# 3. Add Walled Garden entries (Allows M-Pesa & Portal access before payment)
/ip hotspot walled-garden
add dst-host=*.safaricom.co.ke comment="Daraja M-Pesa API"
add dst-host=*.daraja.co.ke comment="Daraja Portal"
add dst-host=*.vunaflow.co.ke comment="Billing Cloud API"

/ip hotspot walled-garden ip
add action=accept dst-address=196.201.214.0/24 comment="Safaricom Daraja IP Range"
add action=accept dst-address=196.201.213.0/24 comment="Safaricom Daraja IP Range"

# 4. Set Hotspot Login HTML Redirect to External Portal
/ip hotspot profile
set [find default=yes] login-by=http-chap,http-pap,mac-cookie use-radius=no

:put "=========================================================="
:put "HOTSPOT BILLING CONFIGURATION APPLIED SUCCESSFULLY!"
:put "=========================================================="`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 overflow-hidden font-sans">
      <Sidebar
        packageCount={9}
        sessionCount={1}
        voucherCount={4}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="px-8 pt-6 pb-4 border-b border-[#182133] bg-[#0c111d]/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">MikroTik Router Setup</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Quick terminal script to connect your MikroTik router to this billing platform
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/api/router/setup-script"
                download="mikrotik-setup.rsc"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#182338] hover:bg-[#22304d] text-xs font-semibold text-slate-300 border border-[#243350] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .rsc Script</span>
              </a>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/25 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Script"}</span>
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
            <Link href="/hotspot/vouchers" className="pb-3 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
              <span>Vouchers</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-400 px-1.5 py-0.2 rounded font-mono">4</span>
            </Link>
            <Link href="/hotspot/packages" className="pb-3 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
              <span>Packages</span>
              <span className="text-[10px] bg-[#1a253d] text-slate-400 px-1.5 py-0.2 rounded font-mono">9</span>
            </Link>
            <Link href="/hotspot/portal" className="pb-3 text-slate-400 hover:text-white transition-colors">
              Portal
            </Link>
            <span className="pb-3 text-white border-b-2 border-indigo-500 font-semibold cursor-default">
              Setup
            </span>
          </div>
        </div>

        <div className="p-8 max-w-5xl space-y-6">
          {/* Instructions banner */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">How to connect your MikroTik Router:</p>
              <ol className="list-decimal list-inside space-y-1 mt-1 text-slate-300">
                <li>Open <strong>WinBox</strong> and connect to your MikroTik router.</li>
                <li>Click <strong>New Terminal</strong> from the left menu.</li>
                <li>Paste the script below into the terminal and press <strong>Enter</strong>.</li>
                <li>Your router will instantly sync packages, active sessions, and allow M-Pesa payments through the walled garden!</li>
              </ol>
            </div>
          </div>

          {/* Terminal Script Window */}
          <div className="bg-[#090d15] border border-[#1b253b] rounded-xl overflow-hidden shadow-2xl">
            <div className="px-4 py-2.5 bg-[#0f1523] border-b border-[#1b253b] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> MikroTik Terminal Script (.rsc)
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="text-xs text-indigo-400 hover:text-white flex items-center gap-1 font-mono"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <pre className="p-5 text-xs font-mono text-emerald-400/90 leading-relaxed overflow-x-auto whitespace-pre selection:bg-indigo-500 selection:text-white">
              {sampleScript}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
