import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { JWSInvalid, JWTClaimValidationFailed, JWTExpired } from "jose/errors";

// CORS headers
const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Update with your allowed origins or use '*' to allow all
    "Access-Control-Allow-Methods": "GET, POST",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function middleware(request: NextRequest) {
    // Set CORS headers
    const response = new NextResponse(null, {
        headers: corsHeaders,
    });

    // Ensure CORS preflight requests are handled
    if (request.method === "OPTIONS") {
        return response;
    }

    if (
        (request.nextUrl.pathname === "/api/attorneys" &&
            request.method === "GET") ||
        (request.nextUrl.pathname === "/api/posts" &&
            request.method === "GET") ||
        (request.nextUrl.pathname.startsWith("/api/posts/") &&
            request.method === "GET") ||
        (request.nextUrl.pathname === "/api/admin" &&
            request.method === "POST") ||
        (request.nextUrl.pathname.startsWith("/api/attorneys/") &&
            request.method === "GET")
    ) {
        return NextResponse.next();
    }

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

        const decoded = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET as string)
        );
        const responseWithHeaders = NextResponse.next();
        responseWithHeaders.headers.set(
            "X-Admin-ID",
            decoded.payload.id as string
        );
        return responseWithHeaders;
    } catch (error) {
        if (error instanceof JWTExpired) {
            return NextResponse.json(
                { success: false, message: "jwt expired" },
                { status: 401 }
            );
        } else if (error instanceof JWSInvalid) {
            return NextResponse.json(
                { success: false, message: "Invalid token" },
                { status: 401 }
            );
        } else if (error instanceof JWTClaimValidationFailed) {
            return NextResponse.json(
                { success: false, message: "Invalid token" },
                { status: 401 }
            );
        } else {
            console.log(error);
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
    ],
};
