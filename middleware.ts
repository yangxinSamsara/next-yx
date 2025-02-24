// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// 中间件处理逻辑
export default function middleware(req: NextRequest) {
  const allCookie = req.cookies.getAll();

  const response = NextResponse.next();

  response.cookies.set({
    name: "test",
    value: "test",
    path: "/",
  });
  return response;
}

// 中间件匹配原则，不在这个范围内则不会执行 middleware 逻辑
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
