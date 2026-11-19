"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Radio,
  Lock,
  Mail,
  User,
  Building,
  Phone,
  ArrowRight,
  Globe,
  AlertCircle,
  CheckCircle2,
  Loader2
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [ispName, setIspName] = useState("");
  const [slug, setSlug] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Auto generate slug when typing business name
  const handleIspNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setIspName(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    setSlug(generatedSlug);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          ispName,
          slug,
          email,
          phone,
          password,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setErrorMsg(data.error || "Failed to create account");
        setLoading(false);
      } else {
        // Successfully created tenant! Store active slug and redirect
        localStorage.setItem("activeTenantSlug", data.tenant.slug);
        localStorage.setItem("activeTenantName", data.tenant.name);
        localStorage.setItem("activeTenantOwner", data.tenant.ownerName);
        router.push("/hotspot/overview");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col justify-center items-center p-4 text-slate-200">
      <div className="w-full max-w-lg bg-[#101625] border border-[#1d273a] rounded-3xl p-8 shadow-2xl shadow-indigo-950/20 backdrop-blur-md my-8">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 mx-auto flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 mb-3 hover:scale-105 transition-transform">
              <Radio className="w-6 h-6 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Create RadaLink Account</h1>
          <p className="text-xs text-slate-400 mt-1">
            Sign up to launch your custom branded MikroTik Hotspot & PPPoE billing portal
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1.5">Your Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jeremy Kariuki"
                  className="w-full bg-[#162032] border border-[#232f48] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1.5">ISP / Network Brand Name</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={ispName}
                  onChange={handleIspNameChange}
                  placeholder="e.g. SafariNet WiFi"
                  className="w-full bg-[#162032] border border-[#232f48] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Dedicated Portal URL preview */}
          <div>
            <label className="block font-medium text-slate-300 mb-1.5">
              Your Custom Guest Portal Web Address
            </label>
            <div className="flex items-center rounded-xl bg-[#162032] border border-[#232f48] overflow-hidden focus-within:border-indigo-500">
              <span className="px-3 text-slate-500 font-mono text-[11px] bg-[#0f1724] border-r border-[#232f48] py-2.5 shrink-0 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>radalink.co.ke/p/</span>
              </span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                placeholder="safarinet"
                className="w-full bg-transparent px-3 py-2.5 text-xs font-mono text-cyan-300 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              This is the link your customers will see on their phones when connecting to your Wi-Fi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1.5">Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@safarinet.co.ke"
                  className="w-full bg-[#162032] border border-[#232f48] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1.5">Phone Number (M-Pesa)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0712345678"
                  className="w-full bg-[#162032] border border-[#232f48] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-[#162032] border border-[#232f48] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            By registering, you agree to RadaLink&apos;s Terms of Service and Privacy Policy.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:opacity-95 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Provisioning Your Tenant Hotspot...
              </>
            ) : (
              <>
                <span>Create Operator Account &amp; Claim Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#1a2337] text-center">
          <p className="text-xs text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 font-semibold hover:underline">
              Sign In to Your Dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
