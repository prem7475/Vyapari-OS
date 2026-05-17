import express from 'express';
import { requireUserAuth } from '../../middleware/auth.js';
import { createPaymentOrderController, verifyPaymentController, listPaymentsController } from './payments.controller.js';
import { paymentWebhookController } from './payment.webhook.ts';

const router = express.Router();

router.post('/webhook', express.raw({ type: 'application/json' }), paymentWebhookController);
router.use(requireUserAuth);
router.get('/', listPaymentsController);
router.post('/order', createPaymentOrderController);
router.post('/verify', verifyPaymentController);

export default router;
