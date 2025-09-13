// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret"; // same as backend

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Public routes
  if (pathname.startsWith("/login") || pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded: any = jwt.verify(token, SECRET);

    // Role-based routes
    if (pathname.startsWith("/manager-dashboard") && decoded.role !== "manager") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (pathname.startsWith("/dashboard") && decoded.role !== "resident") {
      return NextResponse.redirect(new URL("/manager-dashboard", req.url));
    }
  } catch (err) {
    console.error("Invalid token", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/manager-dashboard/:path*", "/login", "/auth/:path*"],
};
