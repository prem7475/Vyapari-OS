import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { createPaymentOrderController, verifyPaymentController, listPaymentsController, webhookController } from './payments.controller.js';

const router = Router();

router.post('/webhook', webhookController);
router.use(authMiddleware);
router.get('/', listPaymentsController);
router.post('/order', createPaymentOrderController);
router.post('/verify', verifyPaymentController);

export default router;
