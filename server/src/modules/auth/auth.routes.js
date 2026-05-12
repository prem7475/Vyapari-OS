import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { validateBody } from '../../validations/zod.js';
import { authController } from './auth.controller.js';
import { firebaseLoginBody, logoutBody, refreshBody } from './auth.validation.js';
import { requireUserAuth } from '../../middleware/auth.js';

export function authRoutes() {
  const r = Router();

  r.post('/auth/firebase', validateBody(firebaseLoginBody), asyncHandler(authController.firebaseLogin));
  r.post('/auth/refresh', validateBody(refreshBody), asyncHandler(authController.refresh));
  r.post('/auth/logout', validateBody(logoutBody), asyncHandler(authController.logout));
  r.get('/auth/me', requireUserAuth, asyncHandler(authController.me));

  return r;
}

