import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { price: 'asc' },
      include: {
        _count: {
          select: { vouchers: true, transactions: true },
        },
      },
    });
    return NextResponse.json({ success: true, packages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      durationMinutes,
      price,
      downloadSpeedMbps,
      uploadSpeedMbps,
      simultaneousDevices,
      deviceLockMode,
      tag,
    } = body;

    const pkg = await prisma.package.create({
      data: {
        name,
        durationMinutes: Number(durationMinutes),
        price: Number(price),
        downloadSpeedMbps: Number(downloadSpeedMbps || 0),
        uploadSpeedMbps: Number(uploadSpeedMbps || 0),
        simultaneousDevices: Number(simultaneousDevices || 1),
        deviceLockMode: deviceLockMode || 'STRICT',
        tag: tag || null,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, package: pkg });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
