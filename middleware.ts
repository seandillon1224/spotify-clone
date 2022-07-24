import { NextRequest, NextResponse } from "next/server";

const signedinPages = ["/", "/playlist", "/library"];

export default function middleware(req: NextRequest) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.get(process.env.COOKIE_NAME);
    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  }
}
