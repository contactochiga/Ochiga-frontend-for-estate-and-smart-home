// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Public routes (root, login, auth, etc.)
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/auth")
  ) {
    return NextResponse.next();
  }

  // ✅ Temporary dev shortcuts
  if (pathname === "/manager") {
    return NextResponse.redirect(new URL("/manager-dashboard", req.url));
  }

  if (pathname === "/resident") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ Still allow dashboards directly (bypass auth for now)
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/manager-dashboard")) {
    return NextResponse.next();
  }

  // Default fallback → 404
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], // applies middleware to all routes
};
