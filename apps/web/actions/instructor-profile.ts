"use server";

import { prisma } from "@ums/lib";
import { getAdminSession } from "./auth";

/**
 * Get public instructor profile by personnel ID
 */
export async function getPublicInstructorProfile(personnelId: string) {
    const instructor = await prisma.personnel.findUnique({
        where: { id: personnelId },
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
                orderBy: {
                    id: "desc",
                },
                take: 10,
            },
        },
    });

    if (!instructor) {
        return null;
    }

    // Check if profile is public
    if (!instructor.isProfilePublic) {
        return null;
    }

    // Only show instructors (not staff)
    if (instructor.user.role !== "INSTRUCTOR") {
        return null;
    }

    return instructor;
}

/**
 * Get all instructors for faculty directory
 */
export async function getAllInstructors() {
    const instructors = await prisma.personnel.findMany({
        where: {
            user: {
                role: "INSTRUCTOR",
            },
            isProfilePublic: true,
        },
        include: {
            user: {
                select: {
                    email: true,
                },
            },
            faculty: true,
            department: true,
        },
        orderBy: {
            lastName: "asc",
        },
    });

    return instructors;
}

/**
 * Get instructors by faculty
 */
export async function getInstructorsByFaculty(facultyId: string) {
    const instructors = await prisma.personnel.findMany({
        where: {
            facultyId,
            user: {
                role: "INSTRUCTOR",
            },
            isProfilePublic: true,
        },
        include: {
            user: {
                select: {
                    email: true,
                },
            },
            faculty: true,
            department: true,
        },
        orderBy: {
            lastName: "asc",
        },
    });

    return instructors;
}

/**
 * Update instructor profile (for admin or the instructor themselves)
 */
export async function updateInstructorProfile(
    personnelId: string,
    data: {
        bio?: string;
        expertise?: string;
        education?: string;
        publications?: string;
        officeHours?: string;
        officeLocation?: string;
    }
) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    await prisma.personnel.update({
        where: { id: personnelId },
        data: {
            bio: data.bio || null,
            expertise: data.expertise || null,
            education: data.education || null,
            publications: data.publications || null,
            officeHours: data.officeHours || null,
            officeLocation: data.officeLocation || null,
        },
    });
}
