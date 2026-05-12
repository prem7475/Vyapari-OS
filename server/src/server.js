import 'dotenv/config';
import http from 'http';

import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { prisma } from './prisma/client.js';
import { createApp } from './app.js';

async function start() {
  const app = createApp();
  const server = http.createServer(app);

  server.listen(env.port, () => {
    logger.info({ port: env.port }, 'server_listening');
  });

  const shutdown = async (signal) => {
    logger.info({ signal }, 'shutdown_start');
    server.close(() => logger.info('http_server_closed'));
    try {
      await prisma.$disconnect();
    } catch (e) {
      logger.warn({ err: e }, 'prisma_disconnect_failed');
    }
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

start().catch((err) => {
  logger.error({ err }, 'server_start_failed');
  process.exit(1);
});

