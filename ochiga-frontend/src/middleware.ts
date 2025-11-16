import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const estateAuth = req.cookies.get("ochiga_estate_auth")?.value;
  const residentAuth = req.cookies.get("ochiga_resident_auth")?.value;

  // Resident login page free
  if (pathname.startsWith("/auth/resident")) return NextResponse.next();
  
  // Estate signup page free
  if (pathname.startsWith("/auth/estate")) return NextResponse.next();

  // Protect Resident Dashboard
  if (pathname.startsWith("/ai-dashboard") && !residentAuth)
    return NextResponse.redirect(new URL("/auth/resident", req.url));

  // Protect Estate Dashboard
  if (pathname.startsWith("/estate-dashboard") && !estateAuth)
    return NextResponse.redirect(new URL("/auth/estate", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
