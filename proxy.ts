import { NextRequest, NextResponse } from 'next/server';

import { isAdminAuthenticated } from '@/lib/server/admin-session';

function isAdminLoginPath(pathname: string) {
  return pathname === '/admin';
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin') || isAdminLoginPath(pathname)) {
    return NextResponse.next();
  }

  if (isAdminAuthenticated(request)) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/admin', request.url);
  loginUrl.searchParams.set('redirect', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};