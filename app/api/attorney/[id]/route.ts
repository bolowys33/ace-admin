import connectDB from "@/lib/db";
import uploadImage, { deleteImage } from "@/lib/image-upload";
import { Attorney } from "@/lib/models/model";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
): Promise<Response> {
    try {
        await connectDB();

        const { id } = params;
        if (!id)
            return NextResponse.json(
                { success: false, message: "Please provide attorney id" },
                { status: 400 }
            );

        const adminId = req.headers.get("X-Admin-ID")
        if (!adminId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized. Please log in attorney",
                },
                { status: 401 }
            );
        }

        const formData = await req.formData();
        const name = formData.get("name")?.toString();
        const position = formData.get("position")?.toString();
        const image = formData.get("image") as File;

        if (!name && !position && !image) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please provide all required fields",
                },
                { status: 400 }
            );
        }

        const attorney = await Attorney.findById(id);

        if (!attorney) {
            return NextResponse.json(
                { success: false, message: "Attorney not found" },
                { status: 404 }
            );
        }

        attorney.name = name || attorney.name;
        attorney.position = position || attorney.position;

        if (image) {
            const maxFileSizeInBytes = 1 * 1024 * 1024; // 1MB
            if (image.size > maxFileSizeInBytes) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Image file size should not exceed 1MB",
                    },
                    { status: 400 }
                );
            }

            const allowedFormats = ["image/jpeg", "image/png"];
            if (!allowedFormats.includes(image.type)) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Only JPG and PNG file formats are allowed",
                    },
                    { status: 400 }
                );
            }

            const mimeType = image.type;
            const imageBuffer = await image.arrayBuffer();
            const encoding = "base64";
            const base64Data = Buffer.from(imageBuffer).toString("base64");

            const fileUri =
                "data:" + mimeType + ";" + encoding + "," + base64Data;

            const imageId = attorney.image_id;
            await deleteImage(imageId, "updating");

            const { imageUrl, publicId } = await uploadImage(fileUri);
            attorney.image_url = imageUrl;
            attorney.image_id = publicId;
        }

        const updatedAttorney = await attorney.save();

        return NextResponse.json(
            {
                success: true,
                message: "Attorney updated successfully",
                data: updatedAttorney,
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
    { params }: { params: { id: string } }
): Promise<Response> {
    try {
        await connectDB();
        
        const { id } = params;
        if (!id)
            return NextResponse.json(
                { success: false, message: "Please provide attorney id" },
                { status: 400 }
            );

        const adminId = req.headers.get("X-Admin-ID")
        if (!adminId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized. Please log in",
                },
                { status: 401 }
            );
        }

        const attorney = await Attorney.findByIdAndDelete(id);
        if (!attorney) {
            return NextResponse.json(
                { success: false, message: "Attorney not found" },
                { status: 404 }
            );
        }

        const publicId = attorney.image_id;
        await deleteImage(publicId, "deleting");

        return NextResponse.json(
            { success: true, message: "Attorney deleted successfully" },
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
