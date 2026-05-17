import { asyncHandler } from '../../utils/asyncHandler.js';
import { createPaymentOrder, verifyPayment, listPayments, handleWebhook } from './payments.service.js';

export const createPaymentOrderController = asyncHandler(async (req, res) => {
  const userId = req.auth?.userId;
  const { serviceRequestId, amount } = req.body;
  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ message: 'Valid amount is required' });
  }

  const result = await createPaymentOrder(userId, serviceRequestId, Number(amount));
  res.status(201).json({ data: result });
});

export const verifyPaymentController = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const payment = await verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature });
  res.status(200).json({ data: payment });
});

export const listPaymentsController = asyncHandler(async (req, res) => {
  const userId = req.auth?.userId;
  const payments = await listPayments(userId);
  res.status(200).json({ data: payments });
});

export const webhookController = asyncHandler(async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  if (!signature) {
    return res.status(400).json({ message: 'Missing webhook signature' });
  }

  const result = await handleWebhook(req.body, signature);
  res.status(200).json({ success: true, data: result });
});
