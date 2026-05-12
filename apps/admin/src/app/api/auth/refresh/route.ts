import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { adminApi } from '@/lib/adminApi';
import { adminAccessCookie, adminRefreshCookie } from '@/lib/authCookies';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(adminRefreshCookie)?.value;
  if (!refreshToken) {
    return NextResponse.json({ ok: false, error: { code: 'UNAUTHORIZED', message: 'Missing refresh token' } }, { status: 401 });
  }

  const data = await adminApi.refresh({ refreshToken });
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

  return NextResponse.json({ ok: true });
}

