import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";
import { Admin } from "@/lib/models/model";

export async function POST(request: Request): Promise<Response> {
    try {
        await connectDB();

        const formData = await request.formData();
        const username = formData.get("username") as string;
        const password = formData.get("password");
        const email = formData.get("email") as string;
        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");

        if (!username || !password || !email || !firstname || !lastname) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please provide all required fields",
                },
                { status: 400 }
            );
        }

        const existingAdmin = await Admin.findOne({
            $or: [{ email }, { username }],
        });
        if (existingAdmin) {
            if (existingAdmin.email === email) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Admin with email address already exists",
                    },
                    { status: 400 }
                );
            } else {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Admin with username already exists",
                    },
                    { status: 400 }
                );
            }
        }

        const admin = new Admin({
            username,
            password,
            email,
            firstname,
            lastname,
        });
        await admin.save();

        return NextResponse.json(
            {
                success: true,
                message: "Admin registered successfully",
                data: admin,
            },
            { status: 201 }
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

        const adminId = req.headers.get("X-Admin-ID");
        if (!adminId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized. Please log in.",
                },
                { status: 401 }
            );
        }

        const admin = await Admin.findById(adminId).select("-__v -password");
        if (!admin) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Admin not found.",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: admin,
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
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

export async function PUT(req: Request): Promise<Response> {
    try {
        await connectDB();

        const adminId = req.headers.get("X-Admin-ID");
        if (!adminId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized. Please log in.",
                },
                { status: 401 }
            );
        }

        const formData = await req.formData();
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const firstname = formData.get("firstname") as string;
        const lastname = formData.get("lastname") as string;

        const existingAdmin = await Admin.findOne({
            $or: [{ email }, { username }],
        });
        if (existingAdmin) {
            if (existingAdmin.email === email) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Admin with email address already exists",
                    },
                    { status: 400 }
                );
            } else {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Admin with username already exists",
                    },
                    { status: 400 }
                );
            }
        }

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Admin not found.",
                },
                { status: 404 }
            );
        }

        admin.email = email || admin.email;
        admin.username = username || admin.username;
        admin.firstname = firstname || admin.firstname;
        admin.lastname = lastname || admin.lastname;

        await admin.save();
        return NextResponse.json(
            {
                success: true,
                message: "Admin updated successfully",
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

export async function PATCH(req: Request): Promise<Response> {
    try {
        await connectDB();

        const adminId = req.headers.get("X-Admin-ID");
        if (!adminId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized. Please log in.",
                },
                { status: 401 }
            );
        }

        const formData = await req.formData();
        const currentPassword = formData.get("currentPassword") as string;
        const newPassword = formData.get("newPassword") as string;

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Admin not found.",
                },
                { status: 404 }
            );
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            admin.password
        );
        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid current password.",
                },
                { status: 400 }
            );
        }

        // Update password
        admin.password = newPassword;
        await admin.save();

        return NextResponse.json(
            {
                success: true,
                message: "Password updated successfully.",
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

export async function DELETE(req: Request): Promise<Response> {
    try {
        await connectDB();

        const adminId = req.headers.get("X-Admin-ID");
        if (!adminId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized. Please log in.",
                },
                { status: 401 }
            );
        }

        const admin = await Admin.findByIdAndDelete(adminId);
        if (!admin) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Admin not found.",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Admin deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
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
