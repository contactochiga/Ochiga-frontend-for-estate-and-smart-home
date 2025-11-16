// src/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes
  if (
    pathname === "/" ||
    pathname === "/auth" ||
    pathname.startsWith("/auth/")
  ) {
    return NextResponse.next();
  }

  // Temporary dev shortcuts
  if (pathname === "/manager") {
    return NextResponse.redirect(new URL("/manager-dashboard", req.url));
  }

  if (pathname === "/resident") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Allow dashboards for now (until real auth is added)
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/estate-dashboard") ||
    pathname.startsWith("/ai-dashboard") ||
    pathname.startsWith("/manager-dashboard")
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
