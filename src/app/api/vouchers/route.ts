import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const packageId = searchParams.get('packageId');
    const status = searchParams.get('status');

    const vouchers = await prisma.voucher.findMany({
      where: {
        ...(packageId ? { packageId } : {}),
        ...(status ? { status } : {}),
      },
      include: {
        package: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });

    return NextResponse.json({ success: true, vouchers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Bulk generate vouchers
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { packageId, count = 10, prefix = 'ZG' } = body;

    const pkg = await prisma.package.findUnique({ where: { id: packageId } });
    if (!pkg) return NextResponse.json({ success: false, error: 'Package not found' }, { status: 404 });

    const batchId = `BATCH-${Date.now().toString().slice(-6)}`;
    const vouchersData = [];

    for (let i = 0; i < Number(count); i++) {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const code = `${prefix}-${randomCode}`;
      vouchersData.push({
        code,
        packageId,
        batchId,
        status: 'UNUSED',
      });
    }

    // create vouchers
    const created = await prisma.voucher.createMany({
      data: vouchersData,
    });

    return NextResponse.json({
      success: true,
      count: created.count,
      batchId,
      message: `Generated ${created.count} vouchers successfully`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
