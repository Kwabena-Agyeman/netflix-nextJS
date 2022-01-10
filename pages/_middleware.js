/** @format */

import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "../lib/utils";

export async function middleware(req) {
  console.log("MIDDLEWARE RUN");
  const token = req ? req.cookies?.token : null;
  const userId = await verifyToken(token);

  const { pathname } = req.nextUrl;

  if (
    pathname.includes("/api/login") ||
    userId ||
    pathname.includes("/static")
  ) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    console.log("RE-DIRECTING TO LOGIN");
    return NextResponse.redirect("/login");
  }
}
