"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Radio,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
  Globe
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [emailOrSlug, setEmailOrSlug] = useState("admin@radalink.co.ke");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrSlug,
          password,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setErrorMsg(data.error || "Login failed");
        setLoading(false);
      } else {
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
      <div className="w-full max-w-md bg-[#101625] border border-[#1d273a] rounded-3xl p-8 shadow-2xl shadow-indigo-950/20 backdrop-blur-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 mx-auto flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 mb-4 hover:scale-105 transition-transform">
              <Radio className="w-7 h-7 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">RadaLink Operator Login</h1>
          <p className="text-xs text-slate-400 mt-1">Sign in to your isolated ISP billing &amp; hotspot dashboard</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Email or Portal Slug ID
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={emailOrSlug}
                onChange={(e) => setEmailOrSlug(e.target.value)}
                placeholder="e.g. admin@radalink.co.ke or radalink"
                className="w-full bg-[#162032] border border-[#232f48] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              You can log in with your email or your unique portal slug (e.g. <span className="font-mono text-slate-400">radalink</span> or <span className="font-mono text-slate-400">safarinet</span>).
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-300">Password</label>
              <a href="#" className="text-[11px] text-indigo-400 hover:text-indigo-300">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#162032] border border-[#232f48] rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-200 absolute right-3 top-3 p-0.5"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-[#2a3854] bg-[#162032] text-indigo-600 focus:ring-0"
              />
              <span>Remember this device</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-5 border-t border-[#1a2337] text-center space-y-3">
          <p className="text-xs text-slate-400">
            Don&apos;t have an operator account?{" "}
            <Link href="/register" className="text-indigo-400 font-semibold hover:underline">
              Create Free Hotspot Account
            </Link>
          </p>

          <p className="text-[11px] text-slate-500">
            Connecting as a Wi-Fi guest?{" "}
            <Link href="/p/radalink" className="text-slate-400 hover:text-white underline">
              Open Captive Portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
