import { z } from 'zod';

const schema = z.object({
  BACKEND_BASE_URL: z.string().url().default('http://localhost:8080')
});

export const env = schema.parse({
  BACKEND_BASE_URL: process.env.BACKEND_BASE_URL
});

