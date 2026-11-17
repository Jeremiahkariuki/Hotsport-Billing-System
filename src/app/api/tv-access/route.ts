import { NextResponse } from 'next/server';
import { MikroTikService } from '@/lib/mikrotik';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { macAddress, label = 'Smart TV / Streaming Box' } = body;

    if (!macAddress) {
      return NextResponse.json({ success: false, error: 'MAC address is required' }, { status: 400 });
    }

    // Format MAC to standard AA:BB:CC:DD:EE:FF
    const cleanMac = macAddress.trim().toUpperCase().replace(/[^A-F0-9]/g, '');
    if (cleanMac.length !== 12) {
      return NextResponse.json({ success: false, error: 'Invalid MAC address format. Example: AA:BB:CC:DD:EE:FF' }, { status: 400 });
    }

    const formattedMac = cleanMac.match(/.{1,2}/g)?.join(':') || macAddress;

    await MikroTikService.addIpBinding(formattedMac, label);

    return NextResponse.json({
      success: true,
      message: `Direct access enabled for MAC ${formattedMac}. The TV will connect without sign-in page!`,
      macAddress: formattedMac,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
