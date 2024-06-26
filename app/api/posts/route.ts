import connectDB from "@/lib/db";
import { Post } from "@/lib/models/model";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<Response> {
    try {
        await connectDB();

        // Get the page, limit, and skip query parameters from the request URL
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const limit = parseInt(url.searchParams.get("limit") || "10", 10);
        const skip = parseInt(url.searchParams.get("skip") || "0", 10);

        const totalCount = await Post.countDocuments();

        const posts = await Post.find({})
            .select("-__v")
            .skip(skip)
            .sort({ date_created: -1 })
            .limit(limit + 1); // Get one more post than the limit to check if there are more posts

        const hasMore = posts.length > limit; // Check if there are more posts

        // Remove the extra post from the array if it exists
        if (hasMore) {
            posts.pop();
        }

        if (posts.length === 0) {
            return NextResponse.json(
                { success: false, message: "No post found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: posts,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalCount / limit),
                    totalCount,
                    hasMore,
                },
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

export async function POST(req: Request): Promise<Response> {
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
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;

        if (!title || !content) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please provide all required fields",
                },
                { status: 400 }
            );
        }

        const postUrl = title
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        const post = new Post({
            title,
            content,
            post_url: postUrl,
            author: adminId,
        });
        await post.save();

        return NextResponse.json(
            {
                success: true,
                message: "Post added successfully",
                data: post,
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
