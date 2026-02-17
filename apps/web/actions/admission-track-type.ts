"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Get all track types
export async function getTrackTypes(includeInactive = false) {
    try {
        return await prisma.admissionTrackType.findMany({
            where: includeInactive ? {} : { isActive: true },
            orderBy: { displayOrder: "asc" },
            include: {
                _count: {
                    select: { tracks: true }
                }
            }
        });
    } catch (error) {
        console.error("Error fetching track types:", error);
        throw new Error("Failed to fetch track types");
    }
}

// Get single track type
export async function getTrackTypeById(id: string) {
    try {
        return await prisma.admissionTrackType.findUnique({
            where: { id },
            include: {
                tracks: {
                    select: { id: true, nameTh: true, nameEn: true }
                }
            }
        });
    } catch (error) {
        console.error("Error fetching track type:", error);
        throw new Error("Failed to fetch track type");
    }
}

// Create track type
export async function createTrackType(formData: FormData) {
    const code = (formData.get("code") as string).toUpperCase();
    const nameTh = formData.get("nameTh") as string;
    const nameEn = formData.get("nameEn") as string;
    const description = formData.get("description") as string;
    const color = formData.get("color") as string;
    const icon = formData.get("icon") as string;
    const displayOrder = parseInt(formData.get("displayOrder") as string) || 0;
    const isActive = formData.get("isActive") === "true";
    const isSystem = formData.get("isSystem") === "true";

    if (!code || !nameTh || !nameEn) {
        throw new Error("Missing required fields");
    }

    // Check if code already exists
    const existing = await prisma.admissionTrackType.findUnique({
        where: { code }
    });

    if (existing) {
        throw new Error("Track type code already exists");
    }

    try {
        await prisma.admissionTrackType.create({
            data: {
                code,
                nameTh,
                nameEn,
                description: description || null,
                color: color || "#3B82F6",
                icon: icon || "Target",
                displayOrder,
                isActive,
                isSystem
            }
        });
    } catch (error) {
        console.error("Error creating track type:", error);
        throw new Error("Failed to create track type");
    }

    revalidatePath("/admin/admissions/track-types");
    redirect("/admin/admissions/track-types");
}

// Update track type
export async function updateTrackType(id: string, formData: FormData) {
    const nameTh = formData.get("nameTh") as string;
    const nameEn = formData.get("nameEn") as string;
    const description = formData.get("description") as string;
    const color = formData.get("color") as string;
    const icon = formData.get("icon") as string;
    const displayOrder = parseInt(formData.get("displayOrder") as string) || 0;
    const isActive = formData.get("isActive") === "true";

    if (!nameTh || !nameEn) {
        throw new Error("Missing required fields");
    }

    try {
        await prisma.admissionTrackType.update({
            where: { id },
            data: {
                nameTh,
                nameEn,
                description: description || null,
                color,
                icon,
                displayOrder,
                isActive
            }
        });
    } catch (error) {
        console.error("Error updating track type:", error);
        throw new Error("Failed to update track type");
    }

    revalidatePath("/admin/admissions/track-types");
    redirect("/admin/admissions/track-types");
}

// Delete track type
export async function deleteTrackType(id: string) {
    try {
        const trackType = await prisma.admissionTrackType.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { tracks: true }
                }
            }
        });

        if (!trackType) {
            throw new Error("Track type not found");
        }

        if (trackType.isSystem) {
            throw new Error("Cannot delete system track type");
        }

        if (trackType._count.tracks > 0) {
            throw new Error(
                `Cannot delete track type. ${trackType._count.tracks} admission track(s) are using this type.`
            );
        }

        await prisma.admissionTrackType.delete({
            where: { id }
        });

        revalidatePath("/admin/admissions/track-types");
    } catch (error) {
        console.error("Error deleting track type:", error);
        throw error; // Re-throw to be handled by UI
    }
}

// Reorder track types
export async function reorderTrackTypes(orderedIds: string[]) {
    try {
        const updates = orderedIds.map((id, index) =>
            prisma.admissionTrackType.update({
                where: { id },
                data: { displayOrder: index + 1 }
            })
        );

        await prisma.$transaction(updates);
        revalidatePath("/admin/admissions/track-types");
    } catch (error) {
        console.error("Error reordering track types:", error);
        throw new Error("Failed to reorder track types");
    }
}
