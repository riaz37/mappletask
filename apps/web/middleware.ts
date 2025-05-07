import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected routes that require authentication
const protectedRoutes = ["/products/new", "/products/edit"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is a protected route
  const isProtectedRoute =
    protectedRoutes.some((route) => pathname.startsWith(route)) ||
    pathname.includes("/edit");

  // Check for authentication cookie
  const authCookie = request.cookies.get("auth_token");

  // If it's a protected route and no auth cookie exists, redirect to login
  if (isProtectedRoute && !authCookie) {
    // Create a response that redirects to the login page
    const response = NextResponse.redirect(new URL("/login", request.url));

    // Set a cookie with the intended destination

    response.cookies.set("redirectTo", pathname, {
      path: "/",
      maxAge: 60 * 5, // 5 minutes
      httpOnly: false,
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*"],
};
