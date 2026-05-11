import process from "node:process";

import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(8080),

  CORS_ORIGINS: z
    .string()
    .default("http://localhost:3000,http://localhost:3001")
    .transform((v) =>
      v
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    ),

  DATABASE_URL: z
    .string()
    .default("postgres://vyapari:vyapari_dev_password@localhost:5432/vyapari"),

  JWT_ACCESS_SECRET: z.string().min(32).default("dev_access_secret_dev_access_secret_32chars"),
  JWT_REFRESH_SECRET: z.string().min(32).default("dev_refresh_secret_dev_refresh_secret_32chars"),
  JWT_ACCESS_TTL_SECONDS: z.coerce.number().int().positive().default(900),
  JWT_REFRESH_TTL_SECONDS: z.coerce.number().int().positive().default(60 * 60 * 24 * 30),

  FIREBASE_PROJECT_ID: z.string().optional(),
  FIREBASE_CLIENT_EMAIL: z.string().optional(),
  FIREBASE_PRIVATE_KEY: z.string().optional(),

  AWS_REGION: z.string().default("ap-south-1"),
  AWS_S3_BUCKET_PRIVATE: z.string().default("vyapari-private-dev"),

  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);

