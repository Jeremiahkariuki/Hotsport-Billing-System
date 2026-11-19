import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, ispName, slug, email, phone, password } = body;

    if (!email || !fullName || !ispName) {
      return NextResponse.json({
        success: false,
        error: 'Full name, business name, and email are required',
      }, { status: 400 });
    }

    // Generate or sanitize slug
    const cleanSlug = (slug || ispName)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Check if slug or email exists
    const existing = await prisma.tenant.findFirst({
      where: {
        OR: [{ slug: cleanSlug }, { email: email.trim().toLowerCase() }],
      },
    });

    if (existing) {
      return NextResponse.json({
        success: false,
        error: existing.slug === cleanSlug
          ? `The portal link slug "${cleanSlug}" is already taken. Please choose another one.`
          : 'An account with this email address already exists. Please sign in.',
      }, { status: 400 });
    }

    // Create new Tenant
    const tenant = await prisma.tenant.create({
      data: {
        slug: cleanSlug,
        name: ispName.trim(),
        ownerName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : '+254 700 000 000',
        password: password || 'password123',
        plan: 'STARTER',
        tagline: 'Fast, reliable internet access wherever you are',
        currency: 'KSh',
        activeTemplate: 'midnight',
        showTvAccess: true,
      },
    });

    // Seed default starter packages for this new tenant
    await prisma.package.createMany({
      data: [
        {
          tenantId: tenant.id,
          name: '1 HOUR PASS',
          durationMinutes: 60,
          price: 10.0,
          downloadSpeedMbps: 2.0,
          uploadSpeedMbps: 2.0,
          simultaneousDevices: 1,
          deviceLockMode: 'STRICT',
          tag: 'Popular',
        },
        {
          tenantId: tenant.id,
          name: '3 HOURS PASS',
          durationMinutes: 180,
          price: 20.0,
          downloadSpeedMbps: 3.0,
          uploadSpeedMbps: 3.0,
          simultaneousDevices: 1,
          deviceLockMode: 'STRICT',
        },
        {
          tenantId: tenant.id,
          name: '24 HOURS UNLIMITED',
          durationMinutes: 1440,
          price: 50.0,
          downloadSpeedMbps: 5.0,
          uploadSpeedMbps: 5.0,
          simultaneousDevices: 1,
          deviceLockMode: 'STRICT',
          tag: 'Best Value',
        },
      ],
    });

    // Create starter router entry
    await prisma.routerConfig.create({
      data: {
        tenantId: tenant.id,
        name: `${tenant.name} MikroTik Gateway`,
        ipOrHost: '192.168.88.1',
        apiPort: 8728,
        username: 'admin',
        password: '',
        status: 'CONNECTED',
        model: 'RB750Gr3 (hEX)',
        routerOsVer: 'v7.16',
        cpuLoad: 10,
        freeMemoryMb: 190,
        uptime: '2d 04:15:00',
        activeUsers: 0,
      },
    });

    // Generate starter sample vouchers
    const firstPkg = await prisma.package.findFirst({ where: { tenantId: tenant.id } });
    if (firstPkg) {
      const pfx = cleanSlug.slice(0, 3).toUpperCase();
      await prisma.voucher.createMany({
        data: [
          { code: `${pfx}-101`, packageId: firstPkg.id, tenantId: tenant.id, status: 'UNUSED', batchId: 'BATCH-01' },
          { code: `${pfx}-102`, packageId: firstPkg.id, tenantId: tenant.id, status: 'UNUSED', batchId: 'BATCH-01' },
        ],
      });
    }

    const response = NextResponse.json({
      success: true,
      message: 'Account created successfully!',
      tenant: {
        id: tenant.id,
        slug: tenant.slug,
        name: tenant.name,
        ownerName: tenant.ownerName,
        email: tenant.email,
        portalUrl: `/p/${tenant.slug}`,
      },
    });

    // Set cookie for active tenant session
    response.cookies.set('activeTenantSlug', tenant.slug, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: false,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
