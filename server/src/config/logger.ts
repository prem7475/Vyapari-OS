import { createLogger, format, transports } from 'winston';
import { env } from './env.js';

const jsonFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  format.errors({ stack: true }),
  format.splat(),
  format.json(),
);

const consoleFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ level, message, timestamp, stack, ...meta }) => {
    return `${timestamp} ${level}: ${stack || message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
  }),
);

export const logger = createLogger({
  level: env.nodeEnv === 'production' ? 'info' : 'debug',
  format: env.nodeEnv === 'production' ? jsonFormat : consoleFormat,
  transports: [new transports.Console()],
  exitOnError: false,
});
