import { NextResponse, type NextRequest } from "next/server";

const ALLOWED_EXACT = new Set([
  "localhost",
  "127.0.0.1",
  "abacussnap.com",
  "www.abacussnap.com",
]);

const ALLOWED_SUFFIXES = [".abacussnap.com"];
const OFFICIAL = "https://www.abacussnap.com";

function authorized(hostname: string): boolean {
  const h = hostname.trim().toLowerCase().split(":")[0];
  if (ALLOWED_EXACT.has(h)) return true;
  return ALLOWED_SUFFIXES.some((s) => h.endsWith(s));
}

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") return NextResponse.next();
  const host = request.headers.get("host") ?? "";
  if (!host || authorized(host)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.host = "www.abacussnap.com";
  url.searchParams.set("utm_source", "mirror_defense");
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|apple-icon.png|opengraph-image).*)"],
};
