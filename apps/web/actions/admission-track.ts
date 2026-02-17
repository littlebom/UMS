"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AdmissionTrack } from "@prisma/client";

// Get all admission tracks with filters
export async function getAdmissionTracks(filters?: {
    programId?: string;
    typeId?: string;
    academicYear?: string;
    isActive?: boolean;
}) {
    try {
        const where: any = {};
        if (filters?.programId) where.programId = filters.programId;
        if (filters?.typeId) where.typeId = filters.typeId;
        if (filters?.academicYear) where.academicYear = filters.academicYear;
        if (filters?.isActive !== undefined) where.isActive = filters.isActive;

        return await prisma.admissionTrack.findMany({
            where,
            include: {
                program: {
                    select: { nameTh: true, nameEn: true, degreeLevel: true }
                },
                type: {
                    select: { nameTh: true, nameEn: true, color: true, icon: true }
                },
                _count: {
                    select: { applications: true }
                }
            },
            orderBy: [
                { academicYear: 'desc' },
                { openDate: 'asc' }
            ]
        });
    } catch (error) {
        console.error("Error fetching admission tracks:", error);
        throw new Error("Failed to fetch admission tracks");
    }
}

// Get single admission track
export async function getAdmissionTrackById(id: string) {
    try {
        return await prisma.admissionTrack.findUnique({
            where: { id },
            include: {
                program: true,
                type: true,
                _count: {
                    select: { applications: true }
                }
            }
        });
    } catch (error) {
        console.error("Error fetching admission track:", error);
        throw new Error("Failed to fetch admission track");
    }
}

// Create admission track
export async function createAdmissionTrack(formData: FormData) {
    const code = formData.get("code") as string;
    const nameTh = formData.get("nameTh") as string;
    const nameEn = formData.get("nameEn") as string;
    const typeId = formData.get("typeId") as string;
    const programId = formData.get("programId") as string;
    const academicYear = formData.get("academicYear") as string;
    const openDate = new Date(formData.get("openDate") as string);
    const closeDate = new Date(formData.get("closeDate") as string);
    const announceDateStr = formData.get("announceDate") as string;
    const announceDate = announceDateStr ? new Date(announceDateStr) : null;
    const totalSeats = parseInt(formData.get("totalSeats") as string);
    const reservedSeats = formData.get("reservedSeats") ? parseInt(formData.get("reservedSeats") as string) : null;
    const enableWaitlist = formData.get("enableWaitlist") === "true";
    const applicationFee = formData.get("applicationFee") ? parseFloat(formData.get("applicationFee") as string) : null;
    const requirements = formData.get("requirements") as string; // JSON string
    const isActive = formData.get("isActive") === "true";
    const isPublished = formData.get("isPublished") === "true";

    if (!code || !nameTh || !nameEn || !typeId || !programId || !academicYear || !openDate || !closeDate || !totalSeats) {
        throw new Error("Missing required fields");
    }

    // Check if code already exists
    const existing = await prisma.admissionTrack.findUnique({
        where: { code }
    });

    if (existing) {
        throw new Error("Admission track code already exists");
    }

    try {
        await prisma.admissionTrack.create({
            data: {
                code,
                nameTh,
                nameEn,
                typeId,
                programId,
                academicYear,
                openDate,
                closeDate,
                announceDate,
                totalSeats,
                reservedSeats,
                enableWaitlist,
                applicationFee,
                requirements: requirements || null,
                isActive,
                isPublished
            }
        });
    } catch (error) {
        console.error("Error creating admission track:", error);
        throw new Error("Failed to create admission track");
    }

    revalidatePath("/admin/admissions/tracks");
    redirect("/admin/admissions/tracks");
}

// Update admission track
export async function updateAdmissionTrack(id: string, formData: FormData) {
    const nameTh = formData.get("nameTh") as string;
    const nameEn = formData.get("nameEn") as string;
    const typeId = formData.get("typeId") as string;
    const academicYear = formData.get("academicYear") as string;
    const openDate = new Date(formData.get("openDate") as string);
    const closeDate = new Date(formData.get("closeDate") as string);
    const announceDateStr = formData.get("announceDate") as string;
    const announceDate = announceDateStr ? new Date(announceDateStr) : null;
    const totalSeats = parseInt(formData.get("totalSeats") as string);
    const reservedSeats = formData.get("reservedSeats") ? parseInt(formData.get("reservedSeats") as string) : null;
    const enableWaitlist = formData.get("enableWaitlist") === "true";
    const applicationFee = formData.get("applicationFee") ? parseFloat(formData.get("applicationFee") as string) : null;
    const requirements = formData.get("requirements") as string; // JSON string
    const isActive = formData.get("isActive") === "true";
    const isPublished = formData.get("isPublished") === "true";

    try {
        await prisma.admissionTrack.update({
            where: { id },
            data: {
                nameTh,
                nameEn,
                typeId,
                academicYear,
                openDate,
                closeDate,
                announceDate,
                totalSeats,
                reservedSeats,
                enableWaitlist,
                applicationFee,
                requirements: requirements || null,
                isActive,
                isPublished
            }
        });
    } catch (error) {
        console.error("Error updating admission track:", error);
        throw new Error("Failed to update admission track");
    }

    revalidatePath("/admin/admissions/tracks");
    revalidatePath(`/admin/admissions/tracks/${id}`);
    redirect("/admin/admissions/tracks");
}

// Delete admission track
export async function deleteAdmissionTrack(id: string) {
    try {
        const track = await prisma.admissionTrack.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { applications: true }
                }
            }
        });

        if (!track) {
            throw new Error("Admission track not found");
        }

        if (track._count.applications > 0) {
            throw new Error(
                `Cannot delete admission track. ${track._count.applications} application(s) are linked to this track.`
            );
        }

        await prisma.admissionTrack.delete({
            where: { id }
        });

        revalidatePath("/admin/admissions/tracks");
    } catch (error) {
        console.error("Error deleting admission track:", error);
        throw error;
    }
}

// Check track availability
export async function checkTrackAvailability(trackId: string): Promise<{
    isOpen: boolean;
    hasSeats: boolean;
    message: string;
}> {
    const track = await prisma.admissionTrack.findUnique({
        where: { id: trackId }
    });

    if (!track) {
        return { isOpen: false, hasSeats: false, message: "Track not found" };
    }

    const now = new Date();
    const isOpen = track.isActive && track.isPublished && now >= track.openDate && now <= track.closeDate;
    const hasSeats = track.filledSeats < track.totalSeats;

    let message = "Available";
    if (!track.isActive || !track.isPublished) message = "Track is not active";
    else if (now < track.openDate) message = "Applications not yet open";
    else if (now > track.closeDate) message = "Applications closed";
    else if (!hasSeats) message = "Seats full";

    return { isOpen, hasSeats, message };
}

// Get public admission tracks (Active & Published & Within Date Range)
export async function getPublicAdmissionTracks() {
    try {
        const now = new Date();
        return await prisma.admissionTrack.findMany({
            where: {
                isActive: true,
                isPublished: true,
                closeDate: {
                    gte: now // Not yet closed
                }
            },
            include: {
                program: {
                    select: {
                        id: true,
                        nameTh: true,
                        nameEn: true,
                        degreeLevel: true,
                        faculty: {
                            select: { nameTh: true, nameEn: true }
                        }
                    }
                },
                type: {
                    select: { nameTh: true, nameEn: true, color: true, icon: true }
                },
                _count: {
                    select: { applications: true }
                }
            },
            orderBy: [
                { openDate: 'asc' },
                { program: { nameTh: 'asc' } }
            ]
        });
    } catch (error) {
        console.error("Error fetching public admission tracks:", error);
        return [];
    }
}
