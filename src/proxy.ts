import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Password-gates everything under /admin with a single shared username and
 * password (HTTP Basic Auth), set via ADMIN_USERNAME / ADMIN_PASSWORD. This
 * is intentionally simple — one shared login, not per-person accounts — as
 * a stopgap until real role-based logins exist.
 */
export function proxy(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return new NextResponse(
      "Admin area is not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD.",
      { status: 500 },
    );
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const decoded = atob(authHeader.slice(6));
    const separatorIndex = decoded.indexOf(":");
    const user = decoded.slice(0, separatorIndex);
    const pass = decoded.slice(separatorIndex + 1);
    if (user === expectedUser && pass === expectedPass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="AVENUE JAM Admin"' },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
