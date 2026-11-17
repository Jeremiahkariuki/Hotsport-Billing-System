import { NextResponse } from 'next/server';
import { MikroTikService } from '@/lib/mikrotik';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const result = await MikroTikService.kickActiveUser(params.id);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
