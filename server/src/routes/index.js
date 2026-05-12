import { Router } from 'express';
import { v1Routes } from './v1.js';

export function routes() {
  const r = Router();
  r.get('/health', (req, res) => res.status(200).json({ ok: true, data: { status: 'ok' } }));
  r.use('/v1', v1Routes());
  return r;
}

