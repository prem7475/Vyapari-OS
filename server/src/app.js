import express from 'express';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';

import { env } from './config/env.js';
import { logger } from './config/logger.ts';
import { requestId } from './middleware/requestId.js';
import { routes } from './routes/index.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/request-logger.ts';
import { compressionMiddleware, cachingHeaders } from './middleware/compression.ts';
import { applySecurityMiddleware } from './config/security.ts';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  app.use(requestId);
  app.use(pinoHttp({ logger }));
  app.use(requestLogger);
  applySecurityMiddleware(app);
  app.use(cachingHeaders);
  app.use(compressionMiddleware());
  app.use(cookieParser());
  app.use(express.json({ limit: '2mb' }));

  app.use(routes());
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

