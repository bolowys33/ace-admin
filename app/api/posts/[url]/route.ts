import connectDB from "@/lib/db";
import { Post } from "@/lib/models/model";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { url: string } }
): Promise<Response> {
    try {
        await connectDB();

        const { url } = params;
        if (!url)
            return NextResponse.json(
                { success: false, message: "Please provide post URL" },
                { status: 400 }
            );

        const post = await Post.findOne({ post_url: url })
            .select("-__v")
            .populate({ path: "author", select: "firstname lastname" })
            .populate({
                path: "comments",
                select: "author body date_created _id",
                match: { moderated: true },
            });
        if (!post) {
            return NextResponse.json(
                { success: false, message: "Post not found" },
                { status: 404 }
            );
        }

        const previousPost = await Post.findOne({
            _id: { $lt: post._id },
        })
            .sort({ _id: -1 })
            .select("title post_url");

        const nextPost = await Post.findOne({ _id: { $gt: post._id } })
            .sort({ _id: 1 })
            .select("title post_url");

        const data = {
            ...post._doc,
            previousPost: previousPost ? previousPost : null,
            nextPost: nextPost ? nextPost : null,
        };
        return NextResponse.json({ success: true, data });
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

export async function PUT(
    req: Request,
    { params }: { params: { url: string } }
): Promise<Response> {
    try {
        await connectDB();

        const { url } = params;
        if (!url)
            return NextResponse.json(
                { success: false, message: "Please provide post URL" },
                { status: 400 }
            );

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
        const postUrl = title
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        const post = await Post.findOne({ post_url: url });
        if (!post) {
            return NextResponse.json(
                { success: false, message: "Post not found" },
                { status: 404 }
            );
        }

        if (post._id === adminId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "You are not the author of this post",
                },
                { status: 401 }
            );
        }

        post.title = title || post.title;
        post.content = content || post.content;
        post.post_url = postUrl || post.post_url;

        const updatedPost = await post.save();

        return NextResponse.json(
            {
                success: true,
                message: "Post updated successfully",
                data: updatedPost,
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "Error: Unexpected end of form")
                return NextResponse.json(
                    {
                        success: false,
                        message: "Provide at least one field for update",
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

export async function DELETE(
    req: Request,
    { params }: { params: { url: string } }
): Promise<Response> {
    try {
        await connectDB();

        const { url } = params;
        if (!url)
            return NextResponse.json(
                { success: false, message: "Please provide post URL" },
                { status: 400 }
            );

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

        const post = await Post.findOne({ post_url: url });
        if (!post) {
            return NextResponse.json(
                { success: false, message: "Post not found" },
                { status: 404 }
            );
        }

        if (post._id === adminId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "You are not the author of this post",
                },
                { status: 401 }
            );
        }

        await Post.deleteOne({ post_url: url });
        return NextResponse.json(
            { success: true, message: "Post deleted successfully" },
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
