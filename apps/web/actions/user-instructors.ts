"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";

// Get all instructors with filters
export async function getInstructors(filters?: {
    employmentType?: "FULL_TIME" | "PART_TIME";
    search?: string;
    facultyId?: string;
    departmentId?: string;
}) {
    try {
        const where: any = {};

        // Search by name
        if (filters?.search) {
            where.OR = [
                { firstName: { contains: filters.search } },
                { lastName: { contains: filters.search } },
            ];
        }

        // Filter by faculty
        if (filters?.facultyId) {
            where.facultyId = filters.facultyId;
        }

        // Filter by department
        if (filters?.departmentId) {
            where.departmentId = filters.departmentId;
        }

        const instructors = await prisma.personnel.findMany({
            where,
            include: {
                user: {
                    select: {
                        email: true,
                        role: true,
                    },
                },
                faculty: {
                    select: {
                        nameTh: true,
                        nameEn: true,
                    },
                },
                department: {
                    select: {
                        nameTh: true,
                        nameEn: true,
                    },
                },
                instructedSections: {
                    select: {
                        id: true,
                    },
                },
            },
            orderBy: {
                user: {
                    createdAt: "desc",
                },
            },
        });

        // Filter by role (only instructors)
        const filteredInstructors = instructors.filter(
            (p) => p.user.role === "INSTRUCTOR" || p.user.role === "ADMIN"
        );

        return { success: true, instructors: filteredInstructors };
    } catch (error) {
        console.error("Error fetching instructors:", error);
        return { success: false, error: "Failed to fetch instructors" };
    }
}

// Get instructor by ID
export async function getInstructorById(id: string) {
    try {
        const instructor = await prisma.personnel.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        email: true,
                        role: true,
                    },
                },
                faculty: true,
                department: true,
                instructedSections: {
                    include: {
                        course: true,
                        term: true,
                    },
                },
            },
        });

        if (!instructor) {
            return { success: false, error: "Instructor not found" };
        }

        return { success: true, instructor };
    } catch (error) {
        console.error("Error fetching instructor:", error);
        return { success: false, error: "Failed to fetch instructor" };
    }
}

// Get instructor statistics
export async function getInstructorStats() {
    try {
        const allPersonnel = await prisma.personnel.findMany({
            include: {
                user: {
                    select: {
                        role: true,
                    },
                },
                instructedSections: true,
            },
        });

        const instructors = allPersonnel.filter(
            (p) => p.user.role === "INSTRUCTOR" || p.user.role === "ADMIN"
        );

        const total = instructors.length;

        // Calculate average teaching hours (assuming each section = 3 hours/week)
        const totalSections = instructors.reduce(
            (sum, i) => sum + i.instructedSections.length,
            0
        );
        const avgTeachingHours = total > 0 ? Math.round((totalSections * 3) / total) : 0;

        return {
            success: true,
            stats: {
                total,
                fullTime: 0, // TODO: Add employment type to Personnel model
                partTime: 0,
                avgTeachingHours,
            },
        };
    } catch (error) {
        console.error("Error fetching instructor stats:", error);
        return { success: false, error: "Failed to fetch statistics" };
    }
}

// Delete instructor
export async function deleteInstructor(id: string) {
    try {
        // Check if instructor has sections
        const sectionCount = await prisma.classSection.count({
            where: { instructorId: id },
        });

        if (sectionCount > 0) {
            return {
                success: false,
                error: "Cannot delete instructor with assigned sections",
            };
        }

        await prisma.personnel.delete({
            where: { id },
        });

        revalidatePath("/admin/users/instructors");
        return { success: true };
    } catch (error) {
        console.error("Error deleting instructor:", error);
        return { success: false, error: "Failed to delete instructor" };
    }
}
