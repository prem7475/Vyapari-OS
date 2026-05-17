import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pino from 'pino';
import pinoHttp from 'pino-http';
import authRoutes from './modules/auth/auth.routes.js';
import usersRoutes from './modules/users/users.routes.js';
import requestsRoutes from './modules/requests/requests.routes.js';
import documentsRoutes from './modules/documents/documents.routes.js';
import paymentsRoutes from './modules/payments/payments.routes.js';
import { env } from './config/env.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();
const logger = pino({ level: env.NODE_ENV === 'production' ? 'info' : 'debug' });

app.enable('trust proxy');
app.use(helmet());
app.use(compression());
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(pinoHttp({ logger }));
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  }),
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/payments', paymentsRoutes);

app.use(errorHandler);

export default app;
