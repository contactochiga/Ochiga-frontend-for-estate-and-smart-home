// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET || "supersecret"
);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (pathname.startsWith("/login") || pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // Redirect if no token
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET);

    // Role-based routing
    if (pathname.startsWith("/manager-dashboard")) {
      if (payload.role !== "manager") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } else if (pathname.startsWith("/dashboard")) {
      if (payload.role !== "resident") {
        return NextResponse.redirect(new URL("/manager-dashboard", req.url));
      }
    }
  } catch (err) {
    console.error("Invalid or expired token", err);
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("token"); // clear bad cookie
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/manager-dashboard/:path*", "/auth/:path*"],
};
