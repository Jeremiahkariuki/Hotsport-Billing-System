import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MpesaService } from '@/lib/mpesa';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const checkoutRequestId = searchParams.get('checkoutRequestId');

    if (!checkoutRequestId) {
      return NextResponse.json({ success: false, error: 'checkoutRequestId is required' }, { status: 400 });
    }

    const tx = await prisma.transaction.findUnique({
      where: { checkoutRequestId },
      include: { package: true },
    });

    if (!tx) {
      return NextResponse.json({ success: false, error: 'Transaction not found' }, { status: 404 });
    }

    // If still pending, complete the transaction
    if (tx.status === 'PENDING') {
      const result = await MpesaService.completeTransaction(checkoutRequestId);
      return NextResponse.json({
        success: true,
        status: 'COMPLETED',
        voucherCode: result.voucherCode,
        receipt: result.transaction.receiptNumber,
        package: result.transaction.package,
      });
    }

    return NextResponse.json({
      success: true,
      status: tx.status,
      voucherCode: tx.voucherCode,
      receipt: tx.receiptNumber,
      package: tx.package,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
