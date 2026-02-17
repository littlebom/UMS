"use server";

import { prisma } from "@ums/lib";

/**
 * Get public staff profile by personnel ID
 */
export async function getPublicStaffProfile(personnelId: string) {
    const staff = await prisma.personnel.findUnique({
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
        },
    });

    if (!staff) {
        return null;
    }

    // Check if profile is public
    if (!staff.isProfilePublic) {
        return null;
    }

    // Only show staff (not instructors)
    if (staff.user.role !== "STAFF") {
        return null;
    }

    return staff;
}

/**
 * Get all staff for directory
 */
export async function getAllStaff() {
    const staff = await prisma.personnel.findMany({
        where: {
            user: {
                role: "STAFF",
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

    return staff;
}

/**
 * Get staff by department
 */
export async function getStaffByDepartment(departmentId: string) {
    const staff = await prisma.personnel.findMany({
        where: {
            departmentId,
            user: {
                role: "STAFF",
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

    return staff;
}
