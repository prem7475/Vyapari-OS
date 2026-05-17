import { Router } from 'express';

export function healthRoutes() {
  const router = Router();

  router.get('/', (_req, res) => {
    res.status(200).json({ ok: true, status: 'healthy', uptime: process.uptime(), timestamp: new Date().toISOString() });
  });

  router.get('/ready', (_req, res) => {
    res.status(200).json({ ok: true, ready: true, timestamp: new Date().toISOString() });
  });

  router.get('/live', (_req, res) => {
    res.status(200).json({ ok: true, live: true, timestamp: new Date().toISOString() });
  });

  return router;
}
