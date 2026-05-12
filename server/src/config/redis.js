import Redis from 'ioredis';
import { env } from './env.js';

let redis;

export function getRedis() {
  if (redis) return redis;
  redis = new Redis(env.redisUrl, {
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
    lazyConnect: true,
  });
  return redis;
}

