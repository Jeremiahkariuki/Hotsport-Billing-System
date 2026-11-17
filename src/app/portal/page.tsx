import { prisma } from "@/lib/prisma";
import { CaptivePortalPreview } from "@/components/captive-portal-preview";

export const dynamic = "force-dynamic";

export default async function PublicPortalPage() {
  const [settings, packages] = await Promise.all([
    prisma.settings.findFirst(),
    prisma.package.findMany({
      where: { isActive: true },
      orderBy: { price: "asc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-[#070a12] flex items-center justify-center sm:py-8 sm:px-4">
      <div className="w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <CaptivePortalPreview
          template={settings?.activeTemplate || "midnight"}
          companyName={settings?.companyName || "ZEUGEN TECH SOLUTION LTD"}
          tagline={settings?.tagline || "Fast, reliable internet access wherever you are"}
          packages={packages}
          currency={settings?.currency || "KSh"}
          isInteractive={true}
        />
      </div>
    </div>
  );
}
