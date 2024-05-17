import connectDB from "@/lib/db";
import { Comment, Post } from "@/lib/models/model";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { commentId: string } }
): Promise<Response> {
    try {
        await connectDB();

        const { commentId } = params;
        const comment = await Comment.findById(commentId).select("-__v");
        if (!comment) {
            return NextResponse.json(
                { success: false, message: "Comment not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: comment });
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

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
): Promise<Response> {
    try {
        await connectDB();

        const { id } = params;
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return NextResponse.json(
                { success: false, message: "Comment not found" },
                { status: 404 }
            );
        }

        await Post.updateMany({ comments: id }, { $pull: { comments: id } });

        return NextResponse.json(
            { success: true, message: "Comment deleted" },
            { status: 404 }
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
