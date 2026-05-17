import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes.js';
import { adminAuthRoutes } from '../modules/adminAuth/adminAuth.routes.js';
import documentsRoutes from '../modules/documents/documents.routes.js';
import paymentsRoutes from '../modules/payments/payments.routes.js';

export function v1Routes() {
  const r = Router();
  r.use(authRoutes());
  r.use(adminAuthRoutes());
  r.use('/documents', documentsRoutes);
  r.use('/payments', paymentsRoutes);
  return r;
}

