import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user has valid auth cookie
  const authCookie = request.cookies.get('staging-auth');
  const isAuthenticated = authCookie?.value === 'authenticated';

  // If accessing the auth page, allow it
  if (request.nextUrl.pathname === '/auth') {
    return NextResponse.next();
  }

  // If not authenticated, redirect to auth page
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (icons, images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icons|sync-logo.svg).*)',
  ],
};
