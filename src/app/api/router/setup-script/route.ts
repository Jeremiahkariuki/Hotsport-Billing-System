import { NextResponse } from 'next/server';
import { MikroTikService } from '@/lib/mikrotik';

export async function GET(req: Request) {
  try {
    const host = req.headers.get('host') || 'localhost:3000';
    const script = MikroTikService.generateSetupScript(host);
    return new NextResponse(script, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': 'attachment; filename="mikrotik-hotspot-setup.rsc"',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
