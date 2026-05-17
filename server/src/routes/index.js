import { Router } from 'express';
import { v1Routes } from './v1.js';
import { healthRoutes } from './health.routes.ts';

export function routes() {
  const r = Router();
  r.use('/health', healthRoutes());
  r.use('/v1', v1Routes());
  return r;
}

