"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";

// Get all staff members
export async function getStaff(filters?: {
    search?: string;
    facultyId?: string;
    departmentId?: string;
}) {
    try {
        const where: any = {
            user: {
                role: "STAFF",
            },
        };

        if (filters?.search) {
            where.OR = [
                { firstName: { contains: filters.search } },
                { lastName: { contains: filters.search } },
            ];
        }

        if (filters?.facultyId) {
            where.facultyId = filters.facultyId;
        }

        if (filters?.departmentId) {
            where.departmentId = filters.departmentId;
        }

        const staff = await prisma.personnel.findMany({
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
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return { success: true, staff };
    } catch (error) {
        console.error("Error fetching staff:", error);
        return { success: false, error: "Failed to fetch staff" };
    }
}

// Get all administrators
export async function getAdministrators(filters?: {
    search?: string;
}) {
    try {
        const where: any = {
            user: {
                role: "ADMIN",
            },
        };

        if (filters?.search) {
            where.OR = [
                { firstName: { contains: filters.search } },
                { lastName: { contains: filters.search } },
            ];
        }

        const administrators = await prisma.personnel.findMany({
            where,
            include: {
                user: {
                    select: {
                        email: true,
                        role: true,
                        createdAt: true,
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
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return { success: true, administrators };
    } catch (error) {
        console.error("Error fetching administrators:", error);
        return { success: false, error: "Failed to fetch administrators" };
    }
}

// Get staff statistics
export async function getStaffStats() {
    try {
        const [total, administrative, support] = await Promise.all([
            prisma.personnel.count({
                where: {
                    user: {
                        role: "STAFF",
                    },
                },
            }),
            // TODO: Add staff type field to differentiate
            prisma.personnel.count({
                where: {
                    user: {
                        role: "STAFF",
                    },
                },
            }),
            0,
        ]);

        return {
            success: true,
            stats: {
                total,
                administrative: Math.floor(total * 0.6), // Temporary
                support: Math.floor(total * 0.4), // Temporary
            },
        };
    } catch (error) {
        console.error("Error fetching staff stats:", error);
        return { success: false, error: "Failed to fetch statistics" };
    }
}

// Get administrator statistics
export async function getAdministratorStats() {
    try {
        const [total, systemAdmins, activeSessions] = await Promise.all([
            prisma.personnel.count({
                where: {
                    user: {
                        role: "ADMIN",
                    },
                },
            }),
            prisma.personnel.count({
                where: {
                    user: {
                        role: "ADMIN",
                    },
                },
            }),
            0, // TODO: Implement session tracking
        ]);

        return {
            success: true,
            stats: {
                total,
                systemAdmins,
                activeSessions,
            },
        };
    } catch (error) {
        console.error("Error fetching administrator stats:", error);
        return { success: false, error: "Failed to fetch statistics" };
    }
}
