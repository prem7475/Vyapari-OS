import { z } from 'zod';

export const firebaseLoginBody = z.object({
  idToken: z.string().min(20),
});

export const refreshBody = z.object({
  refreshToken: z.string().min(20),
});

export const logoutBody = z.object({
  refreshToken: z.string().min(20),
});

