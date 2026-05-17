'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Controller, type UseFormRegisterReturn, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Loader2, MapPin, Sparkles, User2 } from 'lucide-react';

import PhoneInput from '../ui/phone-input';
import { businessCategories, businessRoles, signupSchema } from '../../modules/auth/validations/auth.schema';
import type { BusinessCategory, BusinessRole, SignupInput } from '../../modules/auth/types/auth.types';
import { mockAuth } from '../../modules/auth/data/mock-auth';

const PENDING_SIGNUP = 'vy_web_pending_signup_v1';

export default function SignupForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = useMemo(() => params.get('next') ?? '/services', [params]);

  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<SignupInput>({
    defaultValues: {
      fullName: '',
      phone: '',
      businessRole: 'Owner',
      businessName: '',
      businessCategory: 'Retail Shop',
      city: '',
      state: '',
      gstNumber: '',
    },
    mode: 'onSubmit',
  });

  const submit = form.handleSubmit(async (values) => {
    setServerError(null);

    const parsed = signupSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const set = <K extends keyof SignupInput>(k: K) => {
        const msg = flat[k as string]?.[0];
        if (msg) form.setError(k, { type: 'validate', message: msg });
      };
      set('fullName');
      set('phone');
      set('businessRole');
      set('businessName');
      set('businessCategory');
      set('city');
      set('state');
      set('gstNumber');
      return;
    }

    setLoading(true);
    try {
      if (typeof window !== 'undefined') window.sessionStorage.setItem(PENDING_SIGNUP, JSON.stringify(parsed.data));
      const challenge = await mockAuth.requestOtp({ phone: parsed.data.phone, mode: 'signup' });
      router.push(
        `/auth/verify-otp?mode=signup&challengeId=${encodeURIComponent(challenge.challengeId)}&phone=${encodeURIComponent(
          challenge.phoneE164,
        )}&remember=1&next=${encodeURIComponent(next)}`,
      );
    } catch {
      setServerError('Unable to send OTP right now. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <motion.form
      key="signup-form"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onSubmit={submit}
      className="space-y-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Full name"
          icon={<User2 className="h-4 w-4" />}
          placeholder="Your name"
          registration={form.register('fullName')}
          error={form.formState.errors.fullName?.message}
          disabled={loading}
        />

        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <PhoneInput
              label="Phone number"
              value={field.value}
              onChange={field.onChange}
              onBlur={() => {
                field.onBlur();
                void form.trigger('phone');
              }}
              error={fieldState.error?.message ?? null}
              hint="India only"
              disabled={loading}
              name={field.name}
            />
          )}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField<BusinessRole>
          label="Business role"
          icon={<Sparkles className="h-4 w-4" />}
          options={businessRoles.map((v) => ({ value: v, label: v }))}
          registration={form.register('businessRole')}
          error={form.formState.errors.businessRole?.message}
          disabled={loading}
        />

        <SelectField<BusinessCategory>
          label="Business category"
          icon={<Building2 className="h-4 w-4" />}
          options={businessCategories.map((v) => ({ value: v, label: v }))}
          registration={form.register('businessCategory')}
          error={form.formState.errors.businessCategory?.message}
          disabled={loading}
        />
      </div>

      <TextField
        label="Business name"
        icon={<Building2 className="h-4 w-4" />}
        placeholder="e.g. DineCraft Foods"
        registration={form.register('businessName')}
        error={form.formState.errors.businessName?.message}
        disabled={loading}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="City"
          icon={<MapPin className="h-4 w-4" />}
          placeholder="e.g. Pune"
          registration={form.register('city')}
          error={form.formState.errors.city?.message}
          disabled={loading}
        />
        <TextField
          label="State"
          icon={<MapPin className="h-4 w-4" />}
          placeholder="e.g. Maharashtra"
          registration={form.register('state')}
          error={form.formState.errors.state?.message}
          disabled={loading}
        />
      </div>

      <TextField
        label="GST number (optional)"
        icon={<Sparkles className="h-4 w-4" />}
        placeholder="15-character GSTIN"
        registration={form.register('gstNumber', { setValueAs: (v) => (typeof v === 'string' ? v.toUpperCase() : v) })}
        error={form.formState.errors.gstNumber?.message}
        disabled={loading}
      />

      {serverError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/25 dark:bg-rose-500/10 dark:text-rose-200">
          {serverError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        Continue with OTP
      </button>

      <div className="text-sm text-slate-600 dark:text-slate-300">
        Already have an account?{' '}
        <Link className="font-medium text-slate-900 hover:underline dark:text-white" href="/auth/login">
          Sign in
        </Link>
      </div>
    </motion.form>
  );
}

function TextField({
  label,
  placeholder,
  icon,
  error,
  disabled,
  registration,
}: {
  label: string;
  placeholder?: string;
  icon: React.ReactNode;
  error?: string;
  disabled?: boolean;
  registration: UseFormRegisterReturn;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-900 dark:text-white">{label}</label>
      <div
        className={[
          'relative rounded-2xl border bg-white shadow-sm transition focus-within:ring-4 dark:bg-[#0B1020]',
          error
            ? 'border-rose-300 focus-within:ring-rose-100 dark:border-rose-500/40 dark:focus-within:ring-rose-500/10'
            : 'border-slate-200 focus-within:ring-slate-100 dark:border-white/10 dark:focus-within:ring-white/5',
        ].join(' ')}
      >
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
          {icon}
        </div>
        <input
          disabled={disabled}
          placeholder={placeholder}
          className="h-12 w-full rounded-2xl bg-transparent pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-60 dark:text-white"
          {...registration}
        />
      </div>
      {error ? <div className="text-xs text-rose-700 dark:text-rose-200">{error}</div> : null}
    </div>
  );
}

function SelectField<T extends string>({
  label,
  icon,
  options,
  error,
  disabled,
  registration,
}: {
  label: string;
  icon: React.ReactNode;
  options: Array<{ value: T; label: string }>;
  error?: string;
  disabled?: boolean;
  registration: UseFormRegisterReturn;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-900 dark:text-white">{label}</label>
      <div
        className={[
          'relative rounded-2xl border bg-white shadow-sm transition focus-within:ring-4 dark:bg-[#0B1020]',
          error
            ? 'border-rose-300 focus-within:ring-rose-100 dark:border-rose-500/40 dark:focus-within:ring-rose-500/10'
            : 'border-slate-200 focus-within:ring-slate-100 dark:border-white/10 dark:focus-within:ring-white/5',
        ].join(' ')}
      >
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
          {icon}
        </div>
        <select
          disabled={disabled}
          className="h-12 w-full appearance-none rounded-2xl bg-transparent pl-10 pr-10 text-sm text-slate-900 outline-none disabled:opacity-60 dark:text-white"
          {...registration}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
          ▾
        </div>
      </div>
      {error ? <div className="text-xs text-rose-700 dark:text-rose-200">{error}</div> : null}
    </div>
  );
}

