import connectDB from "@/lib/db";
import { Comment, Post } from "@/lib/models/model";
import { NextResponse } from "next/server";

export async function GET(): Promise<Response> {
    try {
        await connectDB();

        const comments = await Comment.find()
            .select("-__v")
            .populate({ path: "post_id", select: "title" });

        if (comments.length === 0) {
            return NextResponse.json(
                { success: false, message: "No comment found" },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { success: true, data: comments },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
            },
            { status: 500 }
        );
    }
}

export async function POST(req: Request): Promise<Response> {
    try {
        await connectDB();

        const formData = await req.formData();
        const author = formData.get("author") as string;
        const body = formData.get("body") as string;
        const post = formData.get("postId") as string;

        if (!author || !body || !post) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Author, body, and postId are required",
                },
                { status: 400 }
            );
        }

        const newComment = new Comment({ author, body, post });
        const savedComment = await newComment.save();

        await Post.findByIdAndUpdate(post, {
            $push: { comments: savedComment._id },
        });

        return NextResponse.json(
            { success: true, data: savedComment },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
            },
            { status: 500 }
        );
    }
}
