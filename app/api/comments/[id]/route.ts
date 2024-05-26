import connectDB from "@/lib/db";
import { Comment, Post } from "@/lib/models/model";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
): Promise<Response> {
    try {
        await connectDB();

        const { id } = params;
        if (!id)
            return NextResponse.json(
                { success: false, message: "Please provide comment ID" },
                { status: 400 }
            );

        const comment = await Comment.findById(id).select("-__v");
        if (!comment) {
            return NextResponse.json(
                { success: false, message: "Comment not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: comment },
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

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
): Promise<Response> {
    try {
        await connectDB();

        const { id } = params;
        if (!id)
            return NextResponse.json(
                { success: false, message: "Please provide comment ID" },
                { status: 400 }
            );

        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return NextResponse.json(
                { success: false, message: "Comment not found" },
                { status: 404 }
            );
        }

        // Update the associated Post document to remove the deleted comment reference
        const post = await Post.findOneAndUpdate(
            { comments: id },
            { $pull: { comments: id } },
            { new: true }
        );

        return NextResponse.json(
            { success: true, message: "Comment deleted" },
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

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = params;
        if (!id)
            return NextResponse.json(
                { success: false, message: "Please provide comment ID" },
                { status: 400 }
            );

        const comment = await Comment.findById(id).select("-__v");
        if (!comment) {
            return NextResponse.json(
                { success: false, message: "Comment not found" },
                { status: 404 }
            );
        }

        comment.moderated = true;
        await comment.save();

        return NextResponse.json(
            {
                success: true,
                message: "Comment moderation successful",
                data: comment,
            },
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
