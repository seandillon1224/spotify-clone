import { NextRequest, NextResponse } from "next/server";

const signedinPages = ["/", "/playlist", "/library"];

export default function middleware(req: NextRequest) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies[process.env.COOKIE_NAME];
    if (!token) {
      return NextResponse.redirect("/signin");
    }
  }
}
