import { z } from 'zod';

export const adminLoginBody = z.object({
  email: z.string().email().transform((v) => v.toLowerCase().trim()),
  password: z.string().min(8).max(128),
});

export const adminRefreshBody = z.object({
  refreshToken: z.string().min(20),
});

export const adminLogoutBody = z.object({
  refreshToken: z.string().min(20),
});

