import crypto from 'crypto';
import Razorpay from 'razorpay';
import prisma from '../../config/db.js';
import { env } from '../../config/env.js';

const razorpay = new Razorpay({
  key_id: env.razorpayKeyId,
  key_secret: env.razorpayKeySecret,
});

function buildInvoiceNumber() {
  const now = new Date();
  return `INV-${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${Math.floor(Math.random() * 900) + 100}`;
}

function verifyRazorpaySignature(orderId, paymentId, signature) {
  const expectedSignature = crypto.createHmac('sha256', env.razorpayKeySecret).update(`${orderId}|${paymentId}`).digest('hex');
  return expectedSignature === signature;
}

export async function createPaymentOrder(userId, serviceRequestId, amount) {
  const amountInPaise = Math.round(amount * 100);
  const invoiceNumber = buildInvoiceNumber();

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: 'INR',
    receipt: invoiceNumber,
    payment_capture: 1,
    notes: {
      userId,
      serviceRequestId: serviceRequestId ?? '',
    },
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
      description: `Payment order ${invoiceNumber}`,
    },
  });

  return { order, payment };
}

export async function verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
  const isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
  if (!isValid) {
    throw new Error('Invalid payment signature');
  }

  const payment = await prisma.payment.findUnique({ where: { razorpayOrderId: razorpay_order_id } });
  if (!payment) {
    throw new Error('Payment not found');
  }

  return prisma.payment.update({
    where: { id: payment.id },
    data: {
      status: 'PAID',
      escrowStatus: 'RELEASED',
      razorpayPaymentId: razorpay_payment_id,
    },
  });
}

export async function listPayments(userId) {
  return prisma.payment.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function handleWebhook(body, signature) {
  const expected = crypto.createHmac('sha256', env.razorpayKeySecret).update(body.toString('utf-8')).digest('hex');
  if (expected !== signature) {
    throw new Error('Invalid webhook signature');
  }

  const event = JSON.parse(body.toString('utf-8'));
  if (event.event === 'payment.captured') {
    const paymentEntity = event.payload.payment.entity;
    const payment = await prisma.payment.findUnique({ where: { razorpayPaymentId: paymentEntity.id } });
    if (payment) {
      return prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'PAID', escrowStatus: 'RELEASED' },
      });
    }
  }

  return null;
}
