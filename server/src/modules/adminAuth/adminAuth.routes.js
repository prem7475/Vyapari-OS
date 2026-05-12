import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { validateBody } from '../../validations/zod.js';
import { requireAdminAuth } from '../../middleware/auth.js';
import { adminAuthController } from './adminAuth.controller.js';
import { adminLoginBody, adminLogoutBody, adminRefreshBody } from './adminAuth.validation.js';

export function adminAuthRoutes() {
  const r = Router();

  r.post('/admin/auth/login', validateBody(adminLoginBody), asyncHandler(adminAuthController.login));
  r.post('/admin/auth/refresh', validateBody(adminRefreshBody), asyncHandler(adminAuthController.refresh));
  r.post('/admin/auth/logout', validateBody(adminLogoutBody), asyncHandler(adminAuthController.logout));
  r.get('/admin/auth/me', requireAdminAuth, asyncHandler(adminAuthController.me));

  return r;
}

