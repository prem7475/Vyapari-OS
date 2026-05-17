import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './env.ts';

const defaultCors = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (env.corsOrigins.length === 0 || env.corsOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS policy violation'), false);
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Request-Id'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  maxAge: 86400,
};

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: env.nodeEnv === 'production' ? 300 : 600,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => res.status(429).json({ ok: false, error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests' } }),
});

function sanitizeValue(value) {
  if (typeof value === 'string') {
    return value.replace(/[<>"'`;(){}]/g, '');
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).reduce((acc, [key, next]) => {
      acc[key] = sanitizeValue(next);
      return acc;
    }, {});
  }
  return value;
}

export function applySecurityMiddleware(app) {
  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
    frameguard: { action: 'deny' },
  }));
  app.use(cors(defaultCors));
  app.use(limiter);
  app.use((req, res, next) => {
    req.body = sanitizeValue(req.body);
    req.query = sanitizeValue(req.query);
    req.params = sanitizeValue(req.params);
    next();
  });
}

export const cookieOptions = {
  httpOnly: true,
  secure: env.cookies.secure,
  sameSite: 'lax',
  domain: env.cookies.domain || undefined,
};
