import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const sessions = await prisma.activeSession.findMany({
      orderBy: { lastSeen: 'desc' },
    });

    // convert BigInt to string/number for JSON serialization
    const safeSessions = sessions.map((s) => ({
      ...s,
      bytesIn: s.bytesIn.toString(),
      bytesOut: s.bytesOut.toString(),
    }));

    return NextResponse.json({ success: true, sessions: safeSessions });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
