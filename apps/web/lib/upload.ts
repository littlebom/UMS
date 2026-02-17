import { writeFile } from "fs/promises";
import { join } from "path";
import { randomBytes } from "crypto";

export interface UploadResult {
    success: boolean;
    url?: string;
    error?: string;
}

/**
 * Upload a file to the local file system
 * @param file - The file to upload
 * @param folder - The folder to upload to (e.g., 'faculties', 'students')
 * @returns The URL of the uploaded file or an error
 */
export async function uploadFile(
    file: File,
    folder: string = "general"
): Promise<UploadResult> {
    try {
        // Validate file type (only images)
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            return {
                success: false,
                error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.",
            };
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return {
                success: false,
                error: "File size exceeds 5MB limit.",
            };
        }

        // Generate unique filename
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileExtension = file.name.split(".").pop();
        const randomName = randomBytes(16).toString("hex");
        const fileName = `${randomName}.${fileExtension}`;

        // Define upload path
        const uploadDir = join(process.cwd(), "public", "uploads", folder);
        const filePath = join(uploadDir, fileName);

        // Write file to disk
        await writeFile(filePath, buffer);

        // Return public URL
        const publicUrl = `/uploads/${folder}/${fileName}`;
        return {
            success: true,
            url: publicUrl,
        };
    } catch (error) {
        console.error("Upload error:", error);
        return {
            success: false,
            error: "Failed to upload file. Please try again.",
        };
    }
}

/**
 * Validate if a string is a valid image URL or path
 */
export function isValidImageUrl(url: string): boolean {
    if (!url) return false;
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
}
