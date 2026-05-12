import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { adminApi } from '@/lib/adminApi';
import { adminAccessCookie, adminRefreshCookie } from '@/lib/authCookies';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(adminRefreshCookie)?.value;
  if (refreshToken) {
    try {
      await adminApi.logout({ refreshToken });
    } catch (_) {}
  }

  cookieStore.delete(adminAccessCookie);
  cookieStore.delete(adminRefreshCookie);

  return NextResponse.json({ ok: true });
}

