"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { updateStudentProfileImage } from "@/actions/student";

export async function uploadStudentPhoto(
    studentId: string,
    base64Image: string
) {
    try {
        // Extract base64 data
        const matches = base64Image.match(/^data:image\/([a-zA-Z]*);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            throw new Error("Invalid image data");
        }

        const imageType = matches[1];
        const imageData = matches[2];
        const buffer = Buffer.from(imageData, "base64");

        // Create uploads directory if it doesn't exist
        const uploadsDir = join(process.cwd(), "public", "uploads", "students");
        await mkdir(uploadsDir, { recursive: true });

        // Generate filename
        const filename = `${studentId}-${Date.now()}.${imageType}`;
        const filepath = join(uploadsDir, filename);

        // Write file
        await writeFile(filepath, buffer);

        // Update database with relative URL
        const imageUrl = `/uploads/students/${filename}`;
        await updateStudentProfileImage(studentId, imageUrl);

        return { success: true, imageUrl };
    } catch (error: any) {
        console.error("Upload error:", error);
        return { success: false, error: error.message };
    }
}
