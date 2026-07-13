import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/all-facilities/:path*",
    "/my-bookings",
    "/add-facilities",
    "/manage-facilities",
  ],
};
