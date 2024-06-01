import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { JWSInvalid, JWTClaimValidationFailed, JWTExpired } from "jose/errors";

// CORS headers
const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Update with your allowed origins or use '*' to allow all
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
};

export async function middleware(request: NextRequest) {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
        const res = NextResponse.next();
        Object.entries(corsHeaders).forEach(([key, value]) => {
            res.headers.append(key, value);
        });
        return res;
    }

    // Add CORS headers to all responses
    const res = NextResponse.next();
    Object.entries(corsHeaders).forEach(([key, value]) => {
        res.headers.append(key, value);
    });

    // Skip authentication for specific routes and methods
    const { pathname } = request.nextUrl;
    if (
        (pathname === "/api/attorneys" && request.method === "GET") ||
        (pathname === "/api/posts" && request.method === "GET") ||
        (pathname.startsWith("/api/posts/") && request.method === "GET") ||
        (pathname === "/api/admin" && request.method === "POST") ||
        (pathname.startsWith("/api/attorneys/") && request.method === "GET") ||
        (pathname === "/api/comments" && request.method === "POST")
    ) {
        return res;
    }

    // JWT authentication
    try {
        const token = request.headers.get("authorization");
        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized. Please provide authorization token",
                },
                { status: 401 }
            );
        }

        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET as string)
        );
        res.headers.set("X-Admin-ID", payload.id as string);
        return res;
    } catch (error) {
        if (error instanceof JWTExpired) {
            return NextResponse.json(
                { success: false, message: "JWT expired" },
                { status: 401 }
            );
        } else if (
            error instanceof JWSInvalid ||
            error instanceof JWTClaimValidationFailed
        ) {
            return NextResponse.json(
                { success: false, message: "Invalid token" },
                { status: 401 }
            );
        } else {
            console.error(error);
            return NextResponse.json(
                { success: false, message: "An unknown error occurred" },
                { status: 500 }
            );
        }
    }
}

export const config = {
    matcher: [
        "/api/attorneys",
        "/api/attorneys/:path*",
        "/api/admin",
        "/api/posts",
        "/api/posts/:path*",
        "api/comments",
    ],
};
