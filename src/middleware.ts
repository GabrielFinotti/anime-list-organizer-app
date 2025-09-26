import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const loggedIn = req.cookies.get("loggedIn")?.value === "true";

  if (!loggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname === "/anime") {
    return NextResponse.redirect(new URL("/anime/list", req.url));
  }

  if (req.nextUrl.pathname === "/anime/data") {
    return NextResponse.redirect(new URL("/anime/list", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/anime/:path*"],
};
