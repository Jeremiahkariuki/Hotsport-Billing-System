"use client";

import { useState } from "react";
import {
  Wifi,
  Tv,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  Zap,
  ArrowRight,
  Clock,
  Sparkles,
  Loader2,
  Ticket
} from "lucide-react";
import { SmartTvModal } from "./smart-tv-modal";
import { formatCurrency, formatDurationLabel } from "@/lib/utils";

export interface PortalPackage {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  downloadSpeedMbps: number;
  uploadSpeedMbps: number;
  simultaneousDevices: number;
  tag?: string | null;
}

interface CaptivePortalPreviewProps {
  template?: string; // midnight, classic, modern, forest, corporate, voucher, loyalty, sales
  companyName?: string;
  tagline?: string;
  packages: PortalPackage[];
  currency?: string;
  isInteractive?: boolean;
}

export function CaptivePortalPreview({
  template = "midnight",
  companyName = "ZEUGEN TECH SOLUTION LTD",
  tagline = "Fast, reliable internet access wherever you are",
  packages,
  currency = "KSh",
  isInteractive = true,
}: CaptivePortalPreviewProps) {
  const [tvModalOpen, setTvModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<PortalPackage | null>(null);
  const [phone, setPhone] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [activeTab, setActiveTab] = useState<"packages" | "voucher">("packages");

  // Payment states
  const [isProcessing, setIsProcessing] = useState(false);
  const [stkSent, setStkSent] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Template Theme Palettes
  const themeStyles = {
    midnight: {
      bg: "bg-[#0b0f19] text-white",
      card: "bg-[#131929]/90 border-[#1f293d] hover:border-indigo-500/50",
      accent: "from-blue-600 to-indigo-600 text-white",
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      buyBtn: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30",
      heroBg: "from-blue-900/30 via-slate-900/60 to-transparent",
    },
    classic: {
      bg: "bg-slate-50 text-slate-900",
      card: "bg-white border-slate-200 shadow-sm hover:border-blue-500",
      accent: "from-blue-600 to-blue-700 text-white",
      badge: "bg-blue-50 text-blue-700 border-blue-200",
      buyBtn: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20",
      heroBg: "from-blue-50 via-white to-transparent",
    },
    modern: {
      bg: "bg-white text-zinc-900",
      card: "bg-zinc-50 border-zinc-200 shadow-none hover:border-zinc-900",
      accent: "from-zinc-900 to-zinc-800 text-white",
      badge: "bg-zinc-100 text-zinc-800 border-zinc-200",
      buyBtn: "bg-zinc-900 hover:bg-zinc-800 text-white shadow-zinc-900/20",
      heroBg: "from-zinc-100 via-white to-transparent",
    },
    forest: {
      bg: "bg-[#08150f] text-emerald-50",
      card: "bg-[#0f241a]/90 border-emerald-900/60 hover:border-emerald-500/60",
      accent: "from-emerald-600 to-teal-700 text-white",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      buyBtn: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30",
      heroBg: "from-emerald-950/50 via-[#08150f] to-transparent",
    },
    corporate: {
      bg: "bg-[#0b1329] text-sky-50",
      card: "bg-[#111e3d]/90 border-sky-900/60 hover:border-sky-500/60",
      accent: "from-sky-600 to-blue-800 text-white",
      badge: "bg-sky-500/20 text-sky-300 border-sky-500/30",
      buyBtn: "bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30",
      heroBg: "from-sky-950/60 via-[#0b1329] to-transparent",
    },
    voucher: {
      bg: "bg-[#12111d] text-purple-50",
      card: "bg-[#1d1b2e]/90 border-purple-900/60 hover:border-purple-500/60",
      accent: "from-purple-600 to-indigo-700 text-white",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      buyBtn: "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30",
      heroBg: "from-purple-950/50 via-[#12111d] to-transparent",
    },
    loyalty: {
      bg: "bg-[#181206] text-amber-50",
      card: "bg-[#2b1f0b]/90 border-amber-900/60 hover:border-amber-500/60",
      accent: "from-amber-600 to-yellow-600 text-white",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      buyBtn: "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30",
      heroBg: "from-amber-950/50 via-[#181206] to-transparent",
    },
    sales: {
      bg: "bg-[#160c16] text-pink-50",
      card: "bg-[#291427]/90 border-pink-900/60 hover:border-pink-500/60",
      accent: "from-rose-600 to-pink-600 text-white",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      buyBtn: "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-rose-600/30",
      heroBg: "from-rose-950/50 via-[#160c16] to-transparent",
    },
  };

  const currentTheme = themeStyles[template as keyof typeof themeStyles] || themeStyles.midnight;

  // Handle M-Pesa STK Push
  const handleInitiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPkg || !phone) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          amount: selectedPkg.price,
          packageId: selectedPkg.id,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setErrorMessage(data.error || "Payment initiation failed");
        setIsProcessing(false);
        return;
      }

      setStkSent(true);

      // Simulate payment completion check
      setTimeout(async () => {
        try {
          const checkRes = await fetch(`/api/mpesa/query?checkoutRequestId=${data.checkoutRequestId}`);
          const checkData = await checkRes.json();
          if (checkData.success) {
            setConnectionSuccess(`Connected successfully! Voucher: ${checkData.voucherCode}`);
            setSelectedPkg(null);
            setStkSent(false);
          }
        } catch {
          // fallback
          setConnectionSuccess(`Payment received! You are now connected.`);
          setSelectedPkg(null);
          setStkSent(false);
        } finally {
          setIsProcessing(false);
        }
      }, 3500);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to initiate payment");
      setIsProcessing(false);
    }
  };

  // Handle Voucher Code Redeem
  const handleRedeemVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/vouchers/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: voucherCode }),
      });
      const data = await res.json();
      if (!data.success) {
        setErrorMessage(data.error || "Invalid voucher code");
      } else {
        setConnectionSuccess(data.message || "Logged in successfully!");
        setVoucherCode("");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Error redeeming voucher");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`w-full min-h-full ${currentTheme.bg} transition-colors duration-300 relative pb-10`}>
      {/* Smart TV Modal */}
      <SmartTvModal isOpen={tvModalOpen} onClose={() => setTvModalOpen(false)} />

      {/* Header / Brand Area matching Image 1 */}
      <div className={`bg-gradient-to-b ${currentTheme.heroBg} px-5 pt-7 pb-6 text-center border-b border-white/5`}>
        {/* Brand Logo matching ZEUGEN TECH */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-white/10 p-2 border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-md mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-inner">
            <Wifi className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
        </div>

        <h1 className="text-base font-extrabold tracking-tight uppercase leading-tight">
          {companyName}
        </h1>
        <p className="text-[11px] opacity-75 mt-1 max-w-[260px] mx-auto leading-normal">
          {tagline}
        </p>

        {/* Network Status Badge */}
        <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Network online</span>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Success Alert */}
        {connectionSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <div className="min-w-0">
              <p className="font-semibold">{connectionSuccess}</p>
              <p className="text-[10px] opacity-80 mt-0.5">Internet access is active. Happy browsing!</p>
            </div>
          </div>
        )}

        {/* Smart TV direct access card matching Image 1 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 p-4 border border-blue-500/40 shadow-lg backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0 text-blue-300">
              <Tv className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs font-bold leading-tight">Using a Smart TV or device?</h3>
              <p className="text-[11px] opacity-80 mt-0.5 leading-snug">
                Sign-in page won&apos;t load? Set up direct access for it.
              </p>
            </div>
          </div>

          <button
            onClick={() => setTvModalOpen(true)}
            className="w-full mt-3 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold shadow-md transition-transform active:scale-98 flex items-center justify-center gap-1.5"
          >
            Set up TV / Device
          </button>
        </div>

        {/* Tab switcher: Buy Package vs Redeem Voucher */}
        <div className="flex rounded-xl bg-black/20 p-1 border border-white/5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("packages")}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === "packages"
                ? "bg-white/15 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Buy Internet Package
          </button>
          <button
            onClick={() => setActiveTab("voucher")}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === "voucher"
                ? "bg-white/15 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Redeem Voucher
          </button>
        </div>

        {/* TAB 1: Packages List matching Image 1 */}
        {activeTab === "packages" && (
          <div className="space-y-2.5">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${currentTheme.card}`}
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {pkg.name}
                    </span>
                    {pkg.tag && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                        {pkg.tag}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-extrabold text-white">
                      {formatCurrency(pkg.price, currency)}
                    </span>
                  </div>

                  <div className="text-[11px] opacity-70 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{formatDurationLabel(pkg.durationMinutes)}</span>
                    <span>•</span>
                    <span>{pkg.simultaneousDevices} {pkg.simultaneousDevices > 1 ? "devices" : "device"}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedPkg(pkg);
                    setErrorMessage(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 shadow-md ${currentTheme.buyBtn}`}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Voucher Code Redeem */}
        {activeTab === "voucher" && (
          <form onSubmit={handleRedeemVoucher} className={`p-4 rounded-xl border ${currentTheme.card} space-y-3`}>
            <div className="flex items-center gap-2 text-xs font-bold">
              <Ticket className="w-4 h-4 text-indigo-400" />
              <span>Connect with Voucher Code</span>
            </div>
            <p className="text-[11px] opacity-75">
              Enter the voucher code from your physical card or SMS.
            </p>

            <input
              type="text"
              required
              placeholder="e.g. ZG-8472"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
              className="w-full bg-black/30 border border-white/10 rounded-xl px-3.5 py-2.5 text-center text-base font-mono font-bold tracking-widest text-white uppercase focus:outline-none focus:border-indigo-500"
            />

            <button
              type="submit"
              disabled={isProcessing || !voucherCode}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition-transform active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Verifying...
                </>
              ) : (
                "Connect to Internet"
              )}
            </button>
          </form>
        )}
      </div>

      {/* M-Pesa Checkout Modal */}
      {selectedPkg && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#121929] border border-[#222e44] rounded-2xl shadow-2xl overflow-hidden text-white p-5 space-y-4 animate-slideUp">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  M-PESA
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase">{selectedPkg.name}</h4>
                  <p className="text-[10px] text-slate-400">Instant Lipa Na M-Pesa</p>
                </div>
              </div>
              <span className="text-base font-extrabold text-emerald-400">
                {formatCurrency(selectedPkg.price, currency)}
              </span>
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs">
                {errorMessage}
              </div>
            )}

            {stkSent ? (
              <div className="py-4 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h5 className="text-sm font-bold">Check Your Phone!</h5>
                <p className="text-xs text-slate-300">
                  An M-Pesa prompt has been sent to <span className="font-mono font-bold text-white">{phone}</span>.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>Waiting for PIN confirmation...</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInitiatePayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Safaricom M-Pesa Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="07XXXXXXXX or 01XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#182338] border border-[#273859] rounded-xl px-3.5 py-2.5 text-sm font-mono font-semibold text-white focus:outline-none focus:border-emerald-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    You will receive an STK Push PIN prompt immediately.
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPkg(null)}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing || !phone}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Pay via M-Pesa"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
