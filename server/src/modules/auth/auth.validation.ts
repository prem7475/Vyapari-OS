import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email().optional(),
    phone: z.string().min(8).optional(),
    password: z.string().min(8),
    businessName: z.string().min(2),
    gstNumber: z.string().min(15).optional(),
    panNumber: z.string().min(10).optional(),
    address: z.string().min(10).optional(),
    website: z.string().url().optional(),
  })
  .refine((data) => Boolean(data.email || data.phone), {
    message: 'Email or phone is required',
    path: ['email', 'phone'],
  });

export const loginSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(8),
});
