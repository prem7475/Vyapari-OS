import crypto from 'crypto';
import Razorpay from 'razorpay';
import { env } from '../../config/env.js';
import prisma from '../../config/db.js';

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

function buildInvoiceNumber() {
  const now = new Date();
  return `INV-${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${Math.floor(Math.random() * 900) + 100}`;
}

function signatureMatches(payload: string, signature: string) {
  const expected = crypto.createHmac('sha256', env.RAZORPAY_KEY_SECRET).update(payload).digest('hex');
  return expected === signature;
}

export async function createPaymentOrder(userId: string, serviceRequestId: string | undefined, amount: number) {
  const amountInPaise = Math.round(amount * 100);
  const invoiceNumber = buildInvoiceNumber();

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: 'INR',
    receipt: invoiceNumber,
    payment_capture: 1,
    notes: { userId, serviceRequestId: serviceRequestId ?? '' },
  });

  const payment = await prisma.payment.create({
    data: {
      invoiceNumber,
      amount: amount.toFixed(2),
      currency: 'INR',
      method: 'razorpay',
      status: 'PENDING',
      escrowStatus: 'PENDING',
      razorpayOrderId: order.id,
      userId,
      serviceRequestId,
      description: `Order for ${invoiceNumber}`,
    },
  });

  return { order, payment };
}

export async function verifyPayment(payload: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
  const raw = `${payload.razorpay_order_id}|${payload.razorpay_payment_id}`;
  if (!signatureMatches(raw, payload.razorpay_signature)) {
    throw new Error('Invalid payment signature');
  }

  const payment = await prisma.payment.findUnique({ where: { razorpayOrderId: payload.razorpay_order_id } });
  if (!payment) {
    throw new Error('Payment record not found');
  }

  const updated = await prisma.payment.update({
    where: { id: payment.id },
    data: {
      status: 'PAID',
      escrowStatus: 'RELEASED',
      razorpayPaymentId: payload.razorpay_payment_id,
    },
  });

  return updated;
}

export async function listPayments(userId: string) {
  return prisma.payment.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function handleWebhook(body: Buffer, signature: string) {
  if (!signatureMatches(body.toString('utf-8'), signature)) {
    throw new Error('Invalid webhook signature');
  }

  const event = JSON.parse(body.toString('utf-8'));
  if (event.event === 'payment.captured') {
    const payload = event.payload.payment.entity;
    const payment = await prisma.payment.findUnique({ where: { razorpayPaymentId: payload.id } });
    if (payment) {
      return prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'PAID', escrowStatus: 'RELEASED' },
      });
    }
  }

  return null;
}
