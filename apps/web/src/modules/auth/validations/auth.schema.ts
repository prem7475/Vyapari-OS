import { z } from 'zod';

import type { BusinessCategory, BusinessRole, ContactTopic, DemoCompanySize, PreferredCallTime } from '../types/auth.types';

export const businessCategories = [
  'Restaurant',
  'Retail Shop',
  'Manufacturer',
  'Agency',
  'Freelancer',
  'Ecommerce Seller',
  'Distributor',
] as const satisfies readonly BusinessCategory[];

export const businessRoles = ['Owner', 'Operator', 'Accountant'] as const satisfies readonly BusinessRole[];

export const demoCompanySizes = ['1-5', '6-20', '21-50', '51-200', '200+'] as const satisfies readonly DemoCompanySize[];
export const preferredCallTimes = ['Morning', 'Afternoon', 'Evening'] as const satisfies readonly PreferredCallTime[];
export const contactTopics = ['Sales', 'Support', 'Partnerships', 'Media'] as const satisfies readonly ContactTopic[];

const phoneRegex = /^(\+91)?[6-9]\d{9}$/;

export function normalizeIndiaPhoneToE164(phone: string): string {
  const digits = phone.replace(/[^\d]/g, '');
  const last10 = digits.length >= 10 ? digits.slice(-10) : digits;
  return `+91${last10}`;
}

export function isValidIndiaPhone(phone: string): boolean {
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export const loginSchema = z.object({
  phone: z
    .string()
    .min(10, 'Enter a valid mobile number')
    .max(20)
    .refine((v) => isValidIndiaPhone(v), 'Enter a valid Indian mobile number'),
  rememberMe: z.boolean().default(true),
});

export const signupSchema = z.object({
  fullName: z.string().min(2, 'Enter full name').max(80),
  phone: z
    .string()
    .min(10, 'Enter a valid mobile number')
    .max(20)
    .refine((v) => isValidIndiaPhone(v), 'Enter a valid Indian mobile number'),
  businessRole: z.enum(businessRoles),
  businessName: z.string().min(2, 'Enter business name').max(80),
  businessCategory: z.enum(businessCategories),
  city: z.string().min(2, 'Enter city').max(60),
  state: z.string().min(2, 'Enter state').max(60),
  gstNumber: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^[0-9A-Z]{15}$/.test(v.toUpperCase()), 'GST number must be 15 characters')
    .transform((v) => (v ? v.toUpperCase() : undefined)),
});

export const otpSchema = z.object({
  challengeId: z.string().min(10),
  otp: z.string().regex(/^\d{6}$/, 'Enter 6-digit OTP'),
  mode: z.enum(['login', 'signup']),
});

export const demoBookingSchema = z.object({
  name: z.string().min(2, 'Enter name').max(80),
  phone: z
    .string()
    .min(10, 'Enter a valid mobile number')
    .max(20)
    .refine((v) => isValidIndiaPhone(v), 'Enter a valid Indian mobile number'),
  businessType: z.enum(businessCategories),
  companySize: z.enum(demoCompanySizes),
  preferredCallTime: z.enum(preferredCallTimes),
  notes: z.string().max(500).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Enter name').max(80),
  email: z.string().email('Enter a valid email'),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || isValidIndiaPhone(v), 'Enter a valid Indian mobile number'),
  topic: z.enum(contactTopics),
  message: z.string().min(10, 'Enter message').max(1200),
});
