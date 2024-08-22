import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./app/lib";

const protectedRoutes = ["/dashboard"];

export default async function middleware(req: NextRequest) {
  const getAuth = await getSession();
  if (!getAuth && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/auth", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (getAuth && req.nextUrl.pathname == "/auth") {
    const absoluteURL = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
