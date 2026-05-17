import Redis from 'ioredis';
import { env } from './env.ts';

export const redis = new Redis(env.redisUrl, {
  maxRetriesPerRequest: 5,
  enableOfflineQueue: false,
  lazyConnect: true,
});

export async function connectCache() {
  if (!redis.status || redis.status !== 'ready') {
    await redis.connect();
  }
}

export async function getCache(key: string) {
  const value = await redis.get(key);
  return value ? JSON.parse(value) : null;
}

export async function setCache(key: string, value: unknown, ttlSeconds = 900) {
  await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
}

export async function deleteCache(key: string) {
  await redis.del(key);
}

export async function flushCache() {
  await redis.flushdb();
}
