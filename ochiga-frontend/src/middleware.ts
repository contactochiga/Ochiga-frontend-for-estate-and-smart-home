// src/middleware.ts
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "supersecret");

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/login") || pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // ✅ jose v6 requires async secret (Uint8Array is fine)
    const { payload } = await jwtVerify(token, SECRET);

    if (pathname.startsWith("/manager-dashboard") && payload.role !== "manager") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (pathname.startsWith("/dashboard") && payload.role !== "resident") {
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
