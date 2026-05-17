'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';

import OtpInput from '../ui/otp-input';
import { otpSchema } from '../../modules/auth/validations/auth.schema';
import type { AuthFlowMode, SignupInput, VerifyOtpInput } from '../../modules/auth/types/auth.types';
import { mockAuth } from '../../modules/auth/data/mock-auth';

const PENDING_SIGNUP = 'vy_web_pending_signup_v1';

export default function OtpVerificationForm() {
  const router = useRouter();
  const params = useSearchParams();

  const mode = (params.get('mode') as AuthFlowMode | null) ?? 'login';
  const challengeId = params.get('challengeId') ?? '';
  const phoneE164 = params.get('phone') ?? '';
  const remember = params.get('remember') === '0' ? false : true;
  const next = params.get('next') ?? '/services';

  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cooldownMs, setCooldownMs] = useState(0);
  const [expiresMs, setExpiresMs] = useState(0);

  const form = useForm<VerifyOtpInput>({
    defaultValues: { otp: '', challengeId, mode },
    mode: 'onSubmit',
  });

  const displayPhone = useMemo(() => {
    if (!phoneE164) return 'your number';
    return phoneE164.replace(/(\+91)(\d{2})(\d{4})(\d{4})/, '$1 $2 $3 $4');
  }, [phoneE164]);

  useEffect(() => {
    const tick = () => {
      const ch = mockAuth.getChallenge();
      if (ch && ch.challengeId === challengeId) {
        setCooldownMs(Math.max(0, ch.cooldownEndsAt - Date.now()));
        setExpiresMs(Math.max(0, ch.expiresAt - Date.now()));
      } else {
        setCooldownMs((v) => Math.max(0, v - 1000));
        setExpiresMs((v) => Math.max(0, v - 1000));
      }
    };
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, [challengeId]);

  async function resend() {
    setServerError(null);
    setLoading(true);
    try {
      const ch = await mockAuth.requestOtp({ phone: phoneE164, mode });
      router.replace(
        `/auth/verify-otp?mode=${encodeURIComponent(mode)}&challengeId=${encodeURIComponent(ch.challengeId)}&phone=${encodeURIComponent(
          ch.phoneE164,
        )}&remember=${remember ? '1' : '0'}&next=${encodeURIComponent(next)}`,
      );
      form.reset({ otp: '', challengeId: ch.challengeId, mode });
    } catch {
      setServerError('Unable to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const submit = form.handleSubmit(async (values) => {
    setServerError(null);
    const parsed = otpSchema.safeParse({ ...values, challengeId, mode });
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      if (flat.otp?.[0]) form.setError('otp', { type: 'validate', message: flat.otp[0] });
      return;
    }

    setLoading(true);
    try {
      const result = await mockAuth.verifyOtp({ challengeId, otp: parsed.data.otp, mode });
      if (!result.ok) {
        setServerError(result.message);
        return;
      }

      if (mode === 'signup') {
        const raw = typeof window !== 'undefined' ? window.sessionStorage.getItem(PENDING_SIGNUP) : null;
        if (!raw) {
          setServerError('Signup details missing. Please start again.');
          return;
        }
        const payload = JSON.parse(raw) as SignupInput;
        const user = await mockAuth.createUserForSignup(payload);
        await mockAuth.createSessionForUser(user, true);
        window.sessionStorage.removeItem(PENDING_SIGNUP);
      } else {
        const user = await mockAuth.ensureUserForLogin(phoneE164);
        await mockAuth.createSessionForUser(user, remember);
      }

      setSuccess(true);
      window.setTimeout(() => {
        router.replace(next);
        router.refresh();
      }, 650);
    } catch {
      setServerError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  const minutesLeft = Math.max(1, Math.ceil(expiresMs / 60000));

  return (
    <motion.form
      key="otp-form"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onSubmit={submit}
      className="space-y-5"
    >
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-black/20 dark:text-slate-200">
        We sent an OTP to <span className="font-semibold">{displayPhone}</span>.
        <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">Valid for {minutesLeft} min</span>
      </div>

      <Controller
        name="otp"
        control={form.control}
        render={({ field, fieldState }) => (
          <OtpInput
            value={field.value}
            onChange={(v) => field.onChange(v)}
            error={fieldState.error?.message ?? null}
            disabled={loading || success}
            autoFocus
            name={field.name}
          />
        )}
      />

      {serverError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/25 dark:bg-rose-500/10 dark:text-rose-200">
          {serverError}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200">
          <div className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Verified. Redirecting...
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={resend}
          disabled={loading || success || cooldownMs > 0}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          <RefreshCw className="h-4 w-4" />
          Resend OTP {cooldownMs > 0 ? `(${Math.ceil(cooldownMs / 1000)}s)` : ''}
        </button>

        <button
          type="submit"
          disabled={loading || success}
          className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
          Verify OTP
        </button>
      </div>

      <div className="text-sm text-slate-600 dark:text-slate-300">
        Wrong number?{' '}
        <Link className="font-medium text-slate-900 hover:underline dark:text-white" href={mode === 'signup' ? '/auth/signup' : '/auth/login'}>
          Go back
        </Link>
      </div>
    </motion.form>
  );
}

