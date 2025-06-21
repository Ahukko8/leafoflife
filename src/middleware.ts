import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get('admin_auth')?.value === 'true';
  const isLoginPage = req.nextUrl.pathname === '/admin/login';

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
