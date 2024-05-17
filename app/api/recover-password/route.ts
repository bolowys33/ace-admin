import connectDB from "@/lib/db";
import { Admin, Token } from "@/lib/models/model";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
    try {
        await connectDB();

        const formData = await req.formData();
        const token = formData.get("token");
        const password = formData.get("password");
        if (!token || !password) {
            return NextResponse.json(
                { success: false, message: "Please provide required fields" },
                { status: 400 }
            );
        }

        const validToken = await Token.findOne({ token });
        if (!validToken) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid token, please provide a valid token",
                },
                { status: 404 }
            );
        }

        if (validToken.expires < Date.now()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Token is expired",
                },
                { status: 400 }
            );
        }

        const admin = await Admin.findById(validToken.admin_id);
        if (!admin) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Admin not found",
                },
                { status: 404 }
            );
        }

        admin.password = password;
        await admin.save();

        await Token.findByIdAndDelete(validToken._id);

        return NextResponse.json(
            {
                success: true,
                message: "Password updated successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "Error: Unexpected end of form")
                return NextResponse.json(
                    {
                        success: false,
                        message: "Please provide all required fields",
                    },
                    { status: 400 }
                );

            return NextResponse.json(
                { success: false, message: error.message },
                { status: 400 }
            );
        } else {
            return NextResponse.json(
                { success: false, message: "An unknown error occurred" },
                { status: 500 }
            );
        }
    }
}

export async function GET(req: Request): Promise<Response> {
    try {
        await connectDB();

        const formData = await req.formData();
        const token = formData.get("token");
        if (!token) {
            return NextResponse.json(
                { success: false, message: "Please provide token" },
                { status: 400 }
            );
        }

        const validToken = await Token.findOne({ token });
        if (!validToken) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid token, please provide a valid token",
                },
                { status: 404 }
            );
        }

        if (validToken.expires < Date.now()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Token is expired",
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Token is active",
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "Error: Unexpected end of form")
                return NextResponse.json(
                    {
                        success: false,
                        message: "Please provide all required fields",
                    },
                    { status: 400 }
                );

            return NextResponse.json(
                { success: false, message: error.message },
                { status: 400 }
            );
        } else {
            return NextResponse.json(
                { success: false, message: "An unknown error occurred" },
                { status: 500 }
            );
        }
    }
}
