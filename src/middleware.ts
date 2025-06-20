import { NextRequest, NextResponse } from "next/server";

// This middleware now allows all requests
export async function middleware(req: NextRequest) {
  return NextResponse.next(); // Allow request to proceed
}

export const config = {
  matcher: "/admin/:path*", // Still applies middleware to admin routes
};
