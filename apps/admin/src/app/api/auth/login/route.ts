import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { adminApi } from '@/lib/adminApi';
import { adminAccessCookie, adminRefreshCookie } from '@/lib/authCookies';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid payload' } }, { status: 400 });
  }

  const data = await adminApi.login(parsed.data);
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === 'production';

  cookieStore.set(adminAccessCookie, data.tokens.accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/'
  });

  cookieStore.set(adminRefreshCookie, data.tokens.refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/'
  });

  return NextResponse.json({ ok: true, data: { admin: data.admin } });
}

