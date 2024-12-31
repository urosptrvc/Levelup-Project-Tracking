import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const protectedRoutes = [
        "/shipments",
        "/shipments/upload",
        "/api/shipments",
        "/api/shipments/upload"
    ];

    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });

    const { pathname } = req.nextUrl;

    if (pathname === "/auth/login" && session || pathname === "/auth/register" && session) {
        return NextResponse.redirect(new URL("/shipments", req.url));
    }

    if (
        protectedRoutes.some(route => pathname.startsWith(route)) ||
        pathname.match(/^\/shipments\/\w+/) || pathname.match(/^\/api\/shipments\/\w+/)
    ) {
        if (!session) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/shipments/:path*",
        "/api/shipments/:path*",
        "/auth/login"
    ]
};
