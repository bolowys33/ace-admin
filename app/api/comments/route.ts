import connectDB from "@/lib/db";
import { Comment, Post } from "@/lib/models/model";
import { NextResponse } from "next/server";

export async function GET(): Promise<Response> {
    try {
        await connectDB();

        const comments = await Comment.find()
            .select("-__v")
            .populate({ path: "post_id", select: "title" });

        return NextResponse.json({ success: true, data: comments });
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

        const { author, body, postId } = await req.json();
        if (!author || !body || !postId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Author, body, and postId are required",
                },
                { status: 400 }
            );
        }

        const newComment = new Comment({ author, body });
        const savedComment = await newComment.save();

        await Post.findByIdAndUpdate(postId, {
            $push: { comments: savedComment._id },
        });

        return NextResponse.json({ success: true, data: savedComment });
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
