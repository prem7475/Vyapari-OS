import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes.js';
import { adminAuthRoutes } from '../modules/adminAuth/adminAuth.routes.js';

export function v1Routes() {
  const r = Router();
  r.use(authRoutes());
  r.use(adminAuthRoutes());
  return r;
}

