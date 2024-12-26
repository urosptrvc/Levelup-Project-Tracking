// /middleware.ts
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
    const protectedRoutes = ["/shipments", "/shipments/upload"]

    if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        const session = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET
        })
        if (!session) {
            return NextResponse.redirect(new URL("/auth/login", req.url))
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/shipments/:path*"]
}
