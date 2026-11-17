import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
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
      isActive,
      tag,
    } = body;

    const updated = await prisma.package.update({
      where: { id: params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(durationMinutes !== undefined && { durationMinutes: Number(durationMinutes) }),
        ...(price !== undefined && { price: Number(price) }),
        ...(downloadSpeedMbps !== undefined && { downloadSpeedMbps: Number(downloadSpeedMbps) }),
        ...(uploadSpeedMbps !== undefined && { uploadSpeedMbps: Number(uploadSpeedMbps) }),
        ...(simultaneousDevices !== undefined && { simultaneousDevices: Number(simultaneousDevices) }),
        ...(deviceLockMode !== undefined && { deviceLockMode }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
        ...(tag !== undefined && { tag }),
      },
    });

    return NextResponse.json({ success: true, package: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.package.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: 'Package deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
