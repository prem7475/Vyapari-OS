import { randomUUID } from 'crypto';

export function requestId(req, res, next) {
  req.id = req.headers['x-request-id']?.toString() || randomUUID();
  res.setHeader('x-request-id', req.id);
  next();
}

