import crypto from 'crypto';
import { prisma } from '../prisma/client.js';
import { env } from '../config/env.ts';
import { logger } from '../config/logger.ts';

function verifySignature(payloadBody: string, signature: string) {
  const expected = crypto.createHmac('sha256', env.razorpayKeySecret).update(payloadBody).digest('hex');
  return expected === signature;
}

export async function paymentWebhookHandler(payload: Buffer, signature: string) {
  const body = payload.toString('utf-8');
  if (!verifySignature(body, signature)) {
    logger.warn({ signature }, 'razorpay_webhook_invalid_signature');
    throw new Error('Invalid webhook signature');
  }

  const event = JSON.parse(body);
  const eventType = event.event;

  if (eventType === 'payment.captured' || eventType === 'payment.authorized') {
    const paymentEntity = event.payload.payment.entity;
    return prisma.payment.updateMany({
      where: { razorpayPaymentId: paymentEntity.id },
      data: { status: 'PAID', escrowStatus: 'RELEASED' },
    });
  }

  if (eventType === 'payment.failed') {
    const paymentEntity = event.payload.payment.entity;
    return prisma.payment.updateMany({
      where: { razorpayPaymentId: paymentEntity.id },
      data: { status: 'FAILED' },
    });
  }

  if (eventType === 'refund.processed' || eventType === 'refund.created') {
    const refund = event.payload.refund.entity;
    logger.info({ refundId: refund.id, paymentId: refund.payment_id }, 'razorpay_refund_event');
    return prisma.payment.updateMany({
      where: { razorpayPaymentId: refund.payment_id },
      data: { status: 'FAILED', escrowStatus: 'HELD' },
    });
  }

  logger.info({ eventType }, 'razorpay_webhook_ignored');
  return null;
}

export const paymentWebhookController = async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  if (typeof signature !== 'string') {
    return res.status(400).json({ ok: false, error: { code: 'MISSING_SIGNATURE', message: 'Missing Razorpay signature header' } });
  }

  const result = await paymentWebhookHandler(req.body, signature);
  return res.status(200).json({ ok: true, data: result });
};
