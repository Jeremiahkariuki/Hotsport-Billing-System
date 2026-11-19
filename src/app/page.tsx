import Link from "next/link";
import {
  Radio,
  Wifi,
  ShieldCheck,
  CreditCard,
  Zap,
  Layers,
  ArrowRight,
  Tv,
  CheckCircle2,
  Terminal,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Users,
  Sparkles,
  BarChart3,
  Server
} from "lucide-react";

export default function SaaSMarketingLandingPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top SaaS Navigation */}
      <nav className="border-b border-[#182337] bg-[#0c1220]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-white">RadaLink</span>
              <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                SaaS Cloud
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#demo-portals" className="hover:text-white transition-colors">Demo Portals</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Operator Sign In
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 transition-all active:scale-95"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden px-6">
        {/* Glow background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-transparent blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold backdrop-blur-sm animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Multi-Tenant ISP Hotspot & PPPoE Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Turn Any MikroTik Router Into an{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Automated M-Pesa
            </span>{" "}
            Wi-Fi Business.
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Create your account in seconds, connect your router, and immediately get your own branded captive portal. Instant Safaricom Daraja STK push payments, bandwidth queues, voucher generation, and PPPoE subscribers management.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <Link
              href="/register"
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:opacity-95 text-white font-bold rounded-xl text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Create Your Hotspot (Free)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/p/radalink"
              target="_blank"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#141b2c] hover:bg-[#1a2339] border border-[#232f48] text-slate-200 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Preview Demo Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-[#182337]/70 text-left">
            <div>
              <p className="text-2xl font-black text-white">0%</p>
              <p className="text-xs text-slate-400">Manual Voucher Typing</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-400">3.5s</p>
              <p className="text-xs text-slate-400">M-Pesa STK Authorization</p>
            </div>
            <div>
              <p className="text-2xl font-black text-cyan-400">8</p>
              <p className="text-xs text-slate-400">Captive Portal Templates</p>
            </div>
            <div>
              <p className="text-2xl font-black text-indigo-400">100%</p>
              <p className="text-xs text-slate-400">Cloud MikroTik Sync</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Tenant Portals Showcase */}
      <section id="demo-portals" className="py-16 bg-[#090e1a] border-y border-[#162033] px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Every Client Gets Their Own Branded Landing Page
            </h2>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              When an operator signs up, RadaLink automatically provisions a unique captive portal slug with their business name, custom pricing, and chosen theme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tenant 1 Card */}
            <div className="p-6 rounded-2xl bg-[#111727] border border-[#212d44] hover:border-indigo-500/50 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                    RL
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">RADALINK NETWORKS LTD</h3>
                    <p className="text-[11px] text-slate-400">Owner: Jeremy Kariuki • Theme: Midnight Premium</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  /p/radalink
                </span>
              </div>

              <p className="text-xs text-slate-300">
                Features 9 flexible passes from KSh 3.00 to KSh 120.00 with device strict-locking and live M-Pesa STK push.
              </p>

              <div className="pt-2">
                <Link
                  href="/p/radalink"
                  target="_blank"
                  className="w-full py-2.5 bg-[#172238] hover:bg-[#202e48] border border-[#253654] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open RadaLink Guest Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                </Link>
              </div>
            </div>

            {/* Tenant 2 Card */}
            <div className="p-6 rounded-2xl bg-[#0c1a14] border border-emerald-900/50 hover:border-emerald-500/50 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
                    SN
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">SafariNet High-Speed WiFi</h3>
                    <p className="text-[11px] text-slate-400">Owner: Brian Omondi • Theme: Forest Natural</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  /p/safarinet
                </span>
              </div>

              <p className="text-xs text-slate-300">
                Custom passes (1 Hour @ KSh 10, Day Pass @ KSh 50, Weekly @ KSh 250) designed for park, resort, and cafe guests.
              </p>

              <div className="pt-2">
                <Link
                  href="/p/safarinet"
                  target="_blank"
                  className="w-full py-2.5 bg-[#13281e] hover:bg-[#1a382a] border border-emerald-800/60 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open SafariNet Guest Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core SaaS Features Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Everything You Need to Run an ISP Hotspot
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Built from the ground up for African ISP entrepreneurs, commercial properties, and student neighborhood Wi-Fi providers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-[#0f1524] border border-[#1b253b] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Safaricom Daraja STK Push</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Customers simply enter their phone number on the login page. An instant PIN prompt appears on their phone, and Wi-Fi access unlocks automatically upon payment.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-[#0f1524] border border-[#1b253b] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">8 Captive Portal Themes</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose between Midnight, Classic, Modern, Forest, Corporate, Sales, Voucher, and Loyalty templates with real-time mobile preview and custom branding.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-[#0f1524] border border-[#1b253b] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">
              <Tv className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Smart TV & Console Access</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Devices without browsers (Smart TVs, PlayStation, Xbox, decoders) can bypass captive login by registering their MAC address directly on the portal.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl bg-[#0f1524] border border-[#1b253b] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Bandwidth & Duration Caps</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Set precise upload and download limits (e.g. 1M/1M, 5M/5M, uncapped) synced directly to MikroTik queues. Choose between strict and flexible MAC locking.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 rounded-2xl bg-[#0f1524] border border-[#1b253b] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">1-Click MikroTik Setup</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No complicated RADIUS configuration. Copy our pre-configured RouterOS terminal script into WinBox. API users and M-Pesa walled garden configure in seconds.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-6 rounded-2xl bg-[#0f1524] border border-[#1b253b] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">PPPoE Client Management</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Manage your residential and business fiber/wireless clients, static IPs, speed tiers, upcoming renewal notifications, and installation leads pipeline.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#0a0f1c] border-y border-[#182337] px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">How It Works in 3 Steps</h2>
            <p className="text-xs text-slate-400">Get your Wi-Fi billing operational in under 5 minutes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="p-6 rounded-2xl bg-[#111828] border border-[#1f2b40] space-y-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                1
              </div>
              <h4 className="font-bold text-white text-sm">Create Your Account</h4>
              <p className="text-xs text-slate-400">
                Sign up and claim your unique portal link (e.g. <span className="font-mono text-indigo-400">radalink.co.ke/p/mywifi</span>). Set your brand name and prices.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111828] border border-[#1f2b40] space-y-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                2
              </div>
              <h4 className="font-bold text-white text-sm">Run 1-Click Router Script</h4>
              <p className="text-xs text-slate-400">
                Paste the generated terminal commands into your MikroTik WinBox. Walled garden for M-Pesa and external captive portal redirects configure automatically.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111828] border border-[#1f2b40] space-y-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                3
              </div>
              <h4 className="font-bold text-white text-sm">Collect M-Pesa Hands-Free</h4>
              <p className="text-xs text-slate-400">
                Customers connect to your Wi-Fi, pick a package, enter PIN, and start browsing. Track live revenue and active sessions directly from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Simple, Transparent Pricing</h2>
          <p className="text-xs text-slate-400">Pick the plan that fits your network size. Upgrade anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter Plan */}
          <div className="p-6 rounded-3xl bg-[#0f1524] border border-[#1c273e] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Starter</span>
              <div>
                <span className="text-3xl font-black text-white">KSh 999</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
              <p className="text-xs text-slate-400">Perfect for single cafes, small hotels, and residential estates.</p>

              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-[#1b253b]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>1 MikroTik Hotspot Router</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Custom Branded Portal (/p/slug)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Automated M-Pesa STK Push</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Up to 150 Daily Vouchers</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register"
              className="w-full py-2.5 bg-[#172236] hover:bg-[#202e48] text-white rounded-xl text-xs font-bold text-center block transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="p-6 rounded-3xl bg-[#12192c] border-2 border-indigo-500 shadow-xl shadow-indigo-600/20 flex flex-col justify-between space-y-6 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider">
              Most Popular
            </span>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Professional</span>
              <div>
                <span className="text-3xl font-black text-white">KSh 2,499</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
              <p className="text-xs text-slate-400">For commercial ISPs, university hostels, and multi-branch networks.</p>

              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-[#1b253b]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Up to 5 MikroTik Routers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Full PPPoE Subscriber Management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>All 8 Portal Design Templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Smart TV & Console Direct MAC Bypass</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Unlimited Vouchers & Sessions</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold text-center block shadow-lg shadow-indigo-600/30 transition-all"
            >
              Start Free 14-Day Trial
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="p-6 rounded-3xl bg-[#0f1524] border border-[#1c273e] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Enterprise</span>
              <div>
                <span className="text-3xl font-black text-white">KSh 4,999</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
              <p className="text-xs text-slate-400">For large regional WISPs and city-wide public networks.</p>

              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-[#1b253b]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Unlimited MikroTik Routers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Custom Domain Support (e.g. login.yourwisp.com)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Dedicated M-Pesa Paybill / Till Integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>24/7 Priority WhatsApp & Phone Support</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register"
              className="w-full py-2.5 bg-[#172236] hover:bg-[#202e48] text-white rounded-xl text-xs font-bold text-center block transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#162033] py-12 px-6 bg-[#060910] text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Radio className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-sm">RadaLink SaaS</span>
            <span className="text-slate-600">•</span>
            <span>MikroTik Hotspot & PPPoE Billing</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <Link href="/login" className="hover:text-white">Operator Sign In</Link>
            <Link href="/register" className="hover:text-white">Create Account</Link>
            <Link href="/p/radalink" className="hover:text-white">Demo Portal</Link>
          </div>

          <div>
            &copy; {new Date().getFullYear()} RadaLink Technologies. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
