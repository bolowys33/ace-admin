import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import { Admin } from "@/lib/models/model";

const secret = process.env.JWT_SECRET;

export async function POST(request: Request): Promise<Response> {
    try {
        await connectDB();

        const formData = await request.formData();
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        if (!username || !password) {
            return NextResponse.json(
                { success: false, message: "Please provide required fields" },
                { status: 400 }
            );
        }

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 400 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 400 }
            );
        }

        const payload = {
            id: admin._id,
            username: admin.username,
            email: admin.email,
            firstname: admin.firstname,
            lastname: admin.lastname,
        };
        const token = jwt.sign(payload, secret as string, { expiresIn: "2h" });

        return NextResponse.json(
            { success: true, message: "Admin logged in successfully", token },
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
