// /middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const protectedRoutes = [
        "/shipments",
        "/shipments/upload",
        "/api/shipments",
        "/api/shipments/upload"
    ];

    if (
        protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) ||
        req.nextUrl.pathname.match(/^\/shipments\/\w+/) || // Dinamičke rute shipments/[id]
        req.nextUrl.pathname.match(/^\/api\/shipments\/\w+/) // Dinamičke API rute api/shipments/[id]
    ) {
        const session = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET
        });
        if (!session) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/shipments/:path*",
        "/api/shipments/:path*"
    ]
};
