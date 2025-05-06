import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = [
  '/products/new',
  '/products',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is a protected route or contains '/edit'
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  ) || pathname.includes('/edit');
  
  // Check for authentication cookie
  const authCookie = request.cookies.get('auth_token');
  
  // If it's a protected route and no auth cookie exists, redirect to login
  if (isProtectedRoute && !authCookie) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/products/:path*',
  ],
};
