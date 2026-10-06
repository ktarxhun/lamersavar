import { NextResponse } from "next/server";
import type { NextRequest } from "next/request";

/**
 * Next.js Middleware snippet:
 * Intercept common scanner / bot paths and silently rewrite them to the decoy trap.
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase();

  const trapRoutes = [
    "/admin",
    "/admin/login",
    "/administrator",
    "/wp-admin",
    "/wp-login.php",
    "/phpmyadmin",
    "/cpanel",
    "/management/login",
  ];

  if (trapRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    // Silently rewrite URL to /trap so the scanner still sees the requested URL in address bar
    return NextResponse.rewrite(new URL("/trap", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/administrator/:path*",
    "/wp-admin/:path*",
    "/wp-login.php",
    "/phpmyadmin/:path*",
    "/cpanel/:path*",
  ],
};
