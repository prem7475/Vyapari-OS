'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

import PhoneInput from '../ui/phone-input';
import { loginSchema } from '../../modules/auth/validations/auth.schema';
import type { LoginInput } from '../../modules/auth/types/auth.types';
import { mockAuth } from '../../modules/auth/data/mock-auth';

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = useMemo(() => params.get('next') ?? '/services', [params]);

  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginInput>({
    defaultValues: { phone: '', rememberMe: true },
    mode: 'onSubmit',
  });

  const submit = form.handleSubmit(async (values) => {
    setServerError(null);

    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      if (flat.phone?.[0]) form.setError('phone', { type: 'validate', message: flat.phone[0] });
      return;
    }

    setLoading(true);
    try {
      const challenge = await mockAuth.requestOtp({ phone: parsed.data.phone, mode: 'login' });
      router.push(
        `/auth/verify-otp?mode=login&challengeId=${encodeURIComponent(challenge.challengeId)}&phone=${encodeURIComponent(
          challenge.phoneE164,
        )}&remember=${parsed.data.rememberMe ? '1' : '0'}&next=${encodeURIComponent(next)}`,
      );
    } catch {
      setServerError('Unable to send OTP right now. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <motion.form
      key="login-form"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onSubmit={submit}
      className="space-y-5"
    >
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
            autoFocus
            name={field.name}
          />
        )}
      />

      <div className="flex items-center justify-between gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-200 dark:border-white/20 dark:bg-white/10 dark:focus:ring-white/10"
            {...form.register('rememberMe')}
            disabled={loading}
          />
          Remember me on this device
        </label>
        <Link href="/contact" className="text-sm text-slate-600 hover:underline dark:text-slate-300">
          Need help?
        </Link>
      </div>

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

      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600 dark:border-white/10 dark:bg-black/20 dark:text-slate-300">
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-500" />
          <div>We will send a one-time password to verify your number. No spam - just secure access.</div>
        </div>
      </div>

      <div className="text-sm text-slate-600 dark:text-slate-300">
        New to Vyapari OS?{' '}
        <Link className="font-medium text-slate-900 hover:underline dark:text-white" href="/auth/signup">
          Create an account
        </Link>
      </div>
    </motion.form>
  );
}

