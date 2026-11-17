import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MikroTikService } from '@/lib/mikrotik';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, macAddress = '00:00:00:00:00:00', ipAddress = '192.168.88.100' } = body;

    if (!code) {
      return NextResponse.json({ success: false, error: 'Voucher code is required' }, { status: 400 });
    }

    const voucher = await prisma.voucher.findUnique({
      where: { code: code.trim().toUpperCase() },
      include: { package: true },
    });

    if (!voucher) {
      return NextResponse.json({ success: false, error: 'Invalid voucher code. Please check and try again.' }, { status: 404 });
    }

    if (voucher.status === 'EXPIRED') {
      return NextResponse.json({ success: false, error: 'This voucher has already expired.' }, { status: 400 });
    }

    if (voucher.status === 'REVOKED') {
      return NextResponse.json({ success: false, error: 'This voucher has been revoked.' }, { status: 400 });
    }

    // Check strict device locking
    if (voucher.package.deviceLockMode === 'STRICT' && voucher.usedByMac && voucher.usedByMac !== macAddress) {
      return NextResponse.json({
        success: false,
        error: 'This voucher is locked to another device.',
      }, { status: 403 });
    }

    // Activate voucher if unused
    const now = new Date();
    const expiresAt = new Date(now.getTime() + voucher.package.durationMinutes * 60 * 1000);

    const updated = await prisma.voucher.update({
      where: { id: voucher.id },
      data: {
        status: 'ACTIVE',
        usedByMac: macAddress,
        activatedAt: voucher.activatedAt || now,
        expiresAt: voucher.expiresAt || expiresAt,
      },
    });

    // Create / Update active session
    await prisma.activeSession.create({
      data: {
        username: voucher.code,
        ipAddress,
        macAddress,
        uptimeSeconds: 0,
        packageName: voucher.package.name,
        expiresAt: updated.expiresAt,
        signal: '-60 dBm',
        deviceType: 'Phone',
      },
    });

    // Sync with router
    await MikroTikService.addHotspotUser({
      username: voucher.code,
      rateLimit: `${voucher.package.uploadSpeedMbps}M/${voucher.package.downloadSpeedMbps}M`,
      limitUptime: `${voucher.package.durationMinutes}m`,
      macAddress,
    });

    return NextResponse.json({
      success: true,
      message: 'Login successful! You are now connected to the internet.',
      voucher: updated,
      package: voucher.package,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
