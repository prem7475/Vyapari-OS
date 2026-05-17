import { logger } from '../config/logger.ts';

export function trackError(error, req) {
  const payload = {
    message: error.message,
    stack: error.stack,
    path: req.originalUrl,
    method: req.method,
    requestId: req.id,
    userAgent: req.headers['user-agent'],
    ip: req.ip,
    body: req.body,
    query: req.query,
    params: req.params,
  };

  logger.error(payload, 'application_error');
}
