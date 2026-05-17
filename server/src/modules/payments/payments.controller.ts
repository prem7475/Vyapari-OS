import { Request, Response } from 'express';
import asyncHandler from '../../utils/async-handler.js';
import { createPaymentOrder, verifyPayment, listPayments, handleWebhook } from './payments.service.js';

export const createPaymentOrderController = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { serviceRequestId, amount } = req.body;
  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ message: 'Amount is required and must be greater than 0' });
  }

  const result = await createPaymentOrder(userId, serviceRequestId, Number(amount));
  res.status(201).json({ data: result });
});

export const verifyPaymentController = asyncHandler(async (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const payment = await verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature });
  res.status(200).json({ data: payment });
});

export const listPaymentsController = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const payments = await listPayments(userId);
  res.status(200).json({ data: payments });
});

export const webhookController = asyncHandler(async (req: Request, res: Response) => {
  const signature = req.headers['x-razorpay-signature'] as string;
  if (!signature) {
    return res.status(400).json({ message: 'Missing webhook signature header' });
  }

  const result = await handleWebhook(req.body, signature);
  res.status(200).json({ success: true, data: result });
});
