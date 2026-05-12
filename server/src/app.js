import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';

import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { requestId } from './middleware/requestId.js';
import { routes } from './routes/index.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  app.use(requestId);
  app.use(pinoHttp({ logger }));

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  app.use(
    cors({
      origin: (origin, cb) => {
        if (!origin) return cb(null, true);
        if (env.corsOrigins.length === 0) return cb(null, true);
        return cb(null, env.corsOrigins.includes(origin));
      },
      credentials: true,
      allowedHeaders: ['content-type', 'authorization', 'x-request-id'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      maxAge: 86400,
    }),
  );

  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      limit: env.nodeEnv === 'production' ? 300 : 600,
      standardHeaders: true,
      legacyHeaders: false,
      keyGenerator: (req) => req.ip,
    }),
  );

  app.use(compression());
  app.use(cookieParser());
  app.use(express.json({ limit: '1mb' }));

  app.use(routes());
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

