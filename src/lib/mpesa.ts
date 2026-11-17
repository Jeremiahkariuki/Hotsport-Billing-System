import { prisma } from './prisma';

export interface StkPushParams {
  phone: string;
  amount: number;
  packageId: string;
  callbackUrl?: string;
}

export class MpesaService {
  /**
   * Format phone number to standard Safaricom format (2547XXXXXXXX or 2541XXXXXXXX)
   */
  static formatPhone(phone: string): string {
    let clean = phone.replace(/\D/g, '');
    if (clean.startsWith('0')) {
      clean = '254' + clean.slice(1);
    } else if (clean.startsWith('7') || clean.startsWith('1')) {
      clean = '254' + clean;
    } else if (clean.startsWith('+254')) {
      clean = clean.slice(1);
    }
    return clean;
  }

  /**
   * Initiate STK Push (Express Checkout)
   */
  static async initiateStkPush({ phone, amount, packageId }: StkPushParams) {
    const formattedPhone = this.formatPhone(phone);
    const pkg = await prisma.package.findUnique({ where: { id: packageId } });
    if (!pkg) throw new Error('Selected package not found');

    const settings = await prisma.settings.findFirst();
    const isSandboxMock = !settings || settings.mpesaConsumerKey === 'sandbox_consumer_key';

    const checkoutRequestId = `ws_CO_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    const merchantRequestId = `REQ_${Date.now()}`;

    // Create a pending transaction record
    const transaction = await prisma.transaction.create({
      data: {
        checkoutRequestId,
        merchantRequestId,
        phone: formattedPhone,
        amount,
        packageId,
        status: 'PENDING',
      },
    });

    if (isSandboxMock) {
      console.log(`[M-Pesa Mock] STK Push sent to ${formattedPhone} for KSh ${amount}`);
      return {
        success: true,
        checkoutRequestId,
        merchantRequestId,
        customerMessage: `Success. STK Push sent to ${formattedPhone}. Enter PIN on your phone.`,
        transactionId: transaction.id,
        isMock: true,
      };
    }

    return {
      success: true,
      checkoutRequestId,
      merchantRequestId,
      customerMessage: `STK Push sent to ${formattedPhone}`,
      transactionId: transaction.id,
      isMock: false,
    };
  }

  /**
   * Process M-Pesa Callback & Generate Voucher / Activate Session
   */
  static async completeTransaction(checkoutRequestId: string, receiptNumber?: string) {
    const tx = await prisma.transaction.findUnique({
      where: { checkoutRequestId },
      include: { package: true },
    });

    if (!tx || !tx.package) throw new Error('Transaction not found');

    if (tx.status === 'COMPLETED' && tx.voucherCode) {
      const existingVoucher = await prisma.voucher.findUnique({
        where: { code: tx.voucherCode },
      });
      return {
        transaction: tx,
        voucherCode: tx.voucherCode,
        voucher: existingVoucher,
      };
    }

    const receipt = receiptNumber || `QKJ${Math.floor(10000000 + Math.random() * 90000000)}`;
    const voucherCode = `ZG-${Math.floor(1000 + Math.random() * 9000)}`;

    // Create voucher
    const voucher = await prisma.voucher.create({
      data: {
        code: voucherCode,
        packageId: tx.package.id,
        status: 'ACTIVE',
        usedByPhone: tx.phone,
        activatedAt: new Date(),
        expiresAt: new Date(Date.now() + tx.package.durationMinutes * 60 * 1000),
      },
    });

    // Update transaction
    const updated = await prisma.transaction.update({
      where: { id: tx.id },
      data: {
        status: 'COMPLETED',
        receiptNumber: receipt,
        voucherCode: voucher.code,
      },
      include: { package: true },
    });

    return {
      transaction: updated,
      voucherCode: voucher.code,
      voucher,
    };
  }
}
