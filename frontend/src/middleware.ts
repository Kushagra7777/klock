import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple middleware - no authentication required
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};