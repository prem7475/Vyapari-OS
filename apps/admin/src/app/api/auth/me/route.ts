import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { adminApi } from '@/lib/adminApi';
import { adminAccessCookie } from '@/lib/authCookies';

export async function GET() {
  const cookieStore = await cookies();
  const access = cookieStore.get(adminAccessCookie)?.value;
  if (!access) {
    return NextResponse.json({ ok: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 });
  }

  try {
    const me = await adminApi.me(access);
    return NextResponse.json({ ok: true, data: me });
  } catch (_) {
    return NextResponse.json({ ok: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 });
  }
}

