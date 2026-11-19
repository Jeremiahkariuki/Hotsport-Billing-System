import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CaptivePortalPreview } from "@/components/captive-portal-preview";
import { Radio, AlertCircle, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

interface TenantPortalPageProps {
  params: {
    slug: string;
  };
}

export default async function TenantPortalPage({ params }: TenantPortalPageProps) {
  const { slug } = params;

  // Find tenant by slug
  const tenant = await prisma.tenant.findUnique({
    where: { slug: slug.toLowerCase() },
    include: {
      packages: {
        where: { isActive: true },
        orderBy: { price: "asc" },
      },
    },
  });

  if (!tenant) {
    return (
      <div className="min-h-screen bg-[#070b14] flex flex-col justify-center items-center p-4 text-slate-200">
        <div className="w-full max-w-md bg-[#101625] border border-[#1d273a] rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Hotspot Not Found</h2>
          <p className="text-xs text-slate-400">
            No active hotspot found for portal address: <span className="font-mono text-indigo-400 font-bold">/p/{slug}</span>.
          </p>
          <div className="pt-2 space-y-2">
            <Link
              href="/"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold block"
            >
              Go to RadaLink Home
            </Link>
            <Link
              href="/register"
              className="w-full py-2.5 bg-[#172236] hover:bg-[#202e48] text-slate-300 rounded-xl text-xs font-semibold block"
            >
              Claim &quot;{slug}&quot; for Your Hotspot
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format packages
  const packages = tenant.packages.length > 0 ? tenant.packages : [
    {
      id: "fallback-1",
      name: "1 HOUR PASS",
      durationMinutes: 60,
      price: 10.0,
      downloadSpeedMbps: 2.0,
      uploadSpeedMbps: 2.0,
      simultaneousDevices: 1,
      tag: "Standard",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070a12] flex items-center justify-center sm:py-8 sm:px-4">
      <div className="w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <CaptivePortalPreview
          template={tenant.activeTemplate || "midnight"}
          companyName={tenant.name}
          tagline={tenant.tagline}
          packages={packages}
          currency={tenant.currency || "KSh"}
          isInteractive={true}
        />
      </div>
    </div>
  );
}
