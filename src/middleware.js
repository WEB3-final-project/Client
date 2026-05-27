import { NextResponse } from "next/server";

export function middleware(request) {

  const path = request.nextUrl.pathname;

  const role =
    request.cookies.get("role")?.value;
  if (
    path.startsWith("/admin") &&
    role !== "admin"
  ) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}