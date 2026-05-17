import morgan from 'morgan';
import { logger } from '../config/logger.ts';

const stream = {
  write(message) {
    logger.info(message.trim(), { source: 'http_access' });
  },
};

export const requestLogger = morgan(
  ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms',
  { stream },
);
