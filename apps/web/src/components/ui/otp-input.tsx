'use client';

import clsx from 'clsx';
import { useEffect, useId, useMemo, useRef } from 'react';

export type OtpInputProps = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string | null;
  label?: string;
  hint?: string;
  autoFocus?: boolean;
  name?: string;
};

export default function OtpInput({
  length = 6,
  value,
  onChange,
  disabled,
  error,
  label = 'OTP',
  hint = 'Enter the 6-digit code',
  autoFocus,
  name,
}: OtpInputProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const digits = useMemo(() => {
    const v = value.replace(/[^\d]/g, '').slice(0, length);
    const arr = Array.from({ length }, (_, i) => v[i] ?? '');
    return arr;
  }, [value, length]);

  useEffect(() => {
    if (!autoFocus) return;
    const firstEmpty = digits.findIndex((d) => !d);
    const idx = firstEmpty === -1 ? length - 1 : firstEmpty;
    refs.current[idx]?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setAt(index: number, digit: string) {
    const cleaned = digit.replace(/[^\d]/g, '');
    const next = [...digits];
    next[index] = cleaned.slice(-1);
    onChange(next.join(''));
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900 dark:text-white">{label}</div>
        <div id={hintId} className="text-xs text-slate-500 dark:text-slate-400">
          {hint}
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2 sm:gap-3">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            name={name ? `${name}-${i}` : undefined}
            disabled={disabled}
            value={d}
            inputMode="numeric"
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            aria-label={`OTP digit ${i + 1}`}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            onChange={(e) => {
              const v = e.target.value;
              if (v.length > 1) {
                const pasted = v.replace(/[^\d]/g, '').slice(0, length);
                onChange(pasted);
                const nextIndex = Math.min(pasted.length, length - 1);
                refs.current[nextIndex]?.focus();
                return;
              }
              setAt(i, v);
              if (v && i < length - 1) refs.current[i + 1]?.focus();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace') {
                if (digits[i]) {
                  setAt(i, '');
                  return;
                }
                if (i > 0) refs.current[i - 1]?.focus();
              }
              if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus();
              if (e.key === 'ArrowRight' && i < length - 1) refs.current[i + 1]?.focus();
            }}
            onPaste={(e) => {
              e.preventDefault();
              const pasted = e.clipboardData.getData('text').replace(/[^\d]/g, '').slice(0, length);
              onChange(pasted);
              const nextIndex = Math.min(pasted.length, length - 1);
              refs.current[nextIndex]?.focus();
            }}
            className={clsx(
              'h-12 rounded-2xl border bg-white text-center text-lg font-semibold tracking-widest text-slate-900 shadow-sm outline-none transition focus:ring-4 dark:bg-[#0B1020] dark:text-white',
              error
                ? 'border-rose-300 focus:ring-rose-100 dark:border-rose-500/40 dark:focus:ring-rose-500/10'
                : 'border-slate-200 focus:ring-slate-100 dark:border-white/10 dark:focus:ring-white/5',
              disabled ? 'opacity-60' : 'opacity-100',
            )}
          />
        ))}
      </div>

      {error ? (
        <div id={errorId} role="alert" className="text-xs text-rose-700 dark:text-rose-200">
          {error}
        </div>
      ) : null}
    </div>
  );
}
