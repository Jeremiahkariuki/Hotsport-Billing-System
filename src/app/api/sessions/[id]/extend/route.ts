import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { additionalMinutes = 60 } = body;

    const session = await prisma.activeSession.findUnique({
      where: { id: params.id },
    });

    if (!session) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 });
    }

    const currentExpiry = session.expiresAt ? new Date(session.expiresAt) : new Date();
    const baseTime = currentExpiry.getTime() > Date.now() ? currentExpiry.getTime() : Date.now();
    const newExpiresAt = new Date(baseTime + Number(additionalMinutes) * 60 * 1000);

    // Update active session
    const updatedSession = await prisma.activeSession.update({
      where: { id: params.id },
      data: {
        expiresAt: newExpiresAt,
      },
    });

    // Also update associated voucher if username matches voucher code
    if (session.username) {
      await prisma.voucher.updateMany({
        where: { code: session.username },
        data: {
          expiresAt: newExpiresAt,
          status: 'ACTIVE',
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Session extended by ${additionalMinutes} minutes`,
      session: {
        ...updatedSession,
        bytesIn: updatedSession.bytesIn.toString(),
        bytesOut: updatedSession.bytesOut.toString(),
      },
      newExpiresAt,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
