import { z } from 'zod';

const boolFromEnv = (value, defaultValue) => {
  if (value == null) return defaultValue;
  const v = String(value).toLowerCase().trim();
  if (v === 'true' || v === '1' || v === 'yes') return true;
  if (v === 'false' || v === '0' || v === 'no') return false;
  return defaultValue;
};

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(8080),

  APP_NAME: z.string().default('VyapariOS'),
  APP_BASE_URL: z.string().url().default('http://localhost:8080'),

  DATABASE_URL: z.string().min(1),

  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_ACCESS_TTL_SECONDS: z.coerce.number().int().positive().default(900),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().int().positive().default(30),
  REFRESH_TOKEN_PEPPER: z.string().min(16),

  CORS_ORIGINS: z.string().default(''),
  REDIS_URL: z.string().default('redis://localhost:6379'),

  FIREBASE_PROJECT_ID: z.string().optional(),
  FIREBASE_CLIENT_EMAIL: z.string().optional(),
  FIREBASE_PRIVATE_KEY: z.string().optional(),

  ADMIN_COOKIE_NAME: z.string().default('vy_admin'),
  USER_COOKIE_NAME: z.string().default('vy_user'),
  COOKIE_DOMAIN: z.string().optional(),
  COOKIE_SECURE: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  const error = parsed.error.flatten();
  // eslint-disable-next-line no-console
  console.error('Invalid environment variables:', JSON.stringify(error.fieldErrors, null, 2));
  process.exit(1);
}

const raw = parsed.data;

export const env = Object.freeze({
  nodeEnv: raw.NODE_ENV,
  port: raw.PORT,
  appName: raw.APP_NAME,
  appBaseUrl: raw.APP_BASE_URL,
  databaseUrl: raw.DATABASE_URL,

  jwtAccessSecret: raw.JWT_ACCESS_SECRET,
  jwtAccessTtlSeconds: raw.JWT_ACCESS_TTL_SECONDS,
  refreshTokenTtlDays: raw.REFRESH_TOKEN_TTL_DAYS,
  refreshTokenPepper: raw.REFRESH_TOKEN_PEPPER,

  corsOrigins: raw.CORS_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean),
  redisUrl: raw.REDIS_URL,

  firebase: {
    projectId: raw.FIREBASE_PROJECT_ID,
    clientEmail: raw.FIREBASE_CLIENT_EMAIL,
    privateKey: raw.FIREBASE_PRIVATE_KEY ? raw.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
  },

  cookies: {
    adminCookieName: raw.ADMIN_COOKIE_NAME,
    userCookieName: raw.USER_COOKIE_NAME,
    domain: raw.COOKIE_DOMAIN || undefined,
    secure: boolFromEnv(raw.COOKIE_SECURE, raw.NODE_ENV === 'production'),
  },
});

