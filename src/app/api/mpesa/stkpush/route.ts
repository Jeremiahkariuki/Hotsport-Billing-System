import { NextResponse } from 'next/server';
import { MpesaService } from '@/lib/mpesa';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, amount, packageId } = body;

    if (!phone || !amount || !packageId) {
      return NextResponse.json({
        success: false,
        error: 'Phone, amount, and packageId are required',
      }, { status: 400 });
    }

    const result = await MpesaService.initiateStkPush({
      phone,
      amount: Number(amount),
      packageId,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
