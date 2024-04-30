import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

interface UploadDetails {
    imageUrl: string;
    publicId: string;
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function uploadImage(
    file: string
): Promise<UploadDetails> {
    if (!file) {
        throw new Error("No image provided");
    }

    try {
        const uploadedResponse: UploadApiResponse =
            await cloudinary.uploader.upload(file, {
                folder: "acegrit",
                allowed_formats: ["jpg", "png"],
                transformation: [{ width: 500, height: 500, crop: "limit" }],
            });
        return {
            imageUrl: uploadedResponse.secure_url,
            publicId: uploadedResponse.public_id,
        };
    } catch (error: any) {
        throw new Error(`Error uploading image: ${error.message}`);
    }
}

export async function deleteImage(publicId: string, action: string) {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error: any) {
        throw new Error(`Error ${action} image: ${error.message}`);
    }
}
