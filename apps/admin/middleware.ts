import { NextRequest, NextResponse } from 'next/server';

import { adminAccessCookie, adminRefreshCookie } from './src/lib/authCookies';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = pathname.startsWith('/dashboard');
  if (!isProtected) return NextResponse.next();

  const hasAccess = Boolean(req.cookies.get(adminAccessCookie)?.value);
  const hasRefresh = Boolean(req.cookies.get(adminRefreshCookie)?.value);

  if (!hasAccess && !hasRefresh) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};

