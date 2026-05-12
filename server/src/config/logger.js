import pino from 'pino';
import { env } from './env.js';

export const logger = pino({
  level: env.nodeEnv === 'production' ? 'info' : 'debug',
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      '*.password',
      '*.passwordHash',
      '*.refreshToken',
      '*.accessToken',
      '*.idToken',
    ],
    remove: true,
  },
});

