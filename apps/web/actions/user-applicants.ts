"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";

// Get all applicants with filters
export async function getApplicants(filters?: {
    status?: string;
    search?: string;
    trackId?: string;
}) {
    try {
        const where: any = {};

        // Search by name or email
        if (filters?.search) {
            where.OR = [
                { firstName: { contains: filters.search } },
                { lastName: { contains: filters.search } },
                { user: { email: { contains: filters.search } } },
            ];
        }

        const applicants = await prisma.applicant.findMany({
            where,
            include: {
                user: {
                    select: {
                        email: true,
                    },
                },
                applications: {
                    include: {
                        program: {
                            select: {
                                nameTh: true,
                                nameEn: true,
                                faculty: {
                                    select: {
                                        nameTh: true,
                                        nameEn: true,
                                    },
                                },
                            },
                        },
                        track: {
                            select: {
                                nameTh: true,
                                nameEn: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
            orderBy: {
                user: {
                    createdAt: "desc",
                },
            },
        });

        return { success: true, applicants };
    } catch (error) {
        console.error("Error fetching applicants:", error);
        return { success: false, error: "Failed to fetch applicants" };
    }
}

// Get applicant statistics
export async function getApplicantStats() {
    try {
        const [total, withApplications, pending, accepted, rejected] = await Promise.all([
            prisma.applicant.count(),
            prisma.applicant.count({
                where: {
                    applications: {
                        some: {},
                    },
                },
            }),
            prisma.application.count({ where: { status: "SUBMITTED" } }),
            prisma.application.count({ where: { status: "ACCEPTED" } }),
            prisma.application.count({ where: { status: "REJECTED" } }),
        ]);

        return {
            success: true,
            stats: {
                total,
                withApplications,
                pending,
                accepted,
                rejected,
            },
        };
    } catch (error) {
        console.error("Error fetching applicant stats:", error);
        return { success: false, error: "Failed to fetch statistics" };
    }
}

// Get applicant by ID
export async function getApplicantById(id: string) {
    try {
        const applicant = await prisma.applicant.findUnique({
            where: { id },
            include: {
                user: true,
                applications: {
                    include: {
                        program: {
                            include: {
                                faculty: true,
                            },
                        },
                        track: {
                            include: {
                                type: true,
                            },
                        },
                    },
                },
                educationHistory: true,
            },
        });

        if (!applicant) {
            return { success: false, error: "Applicant not found" };
        }

        return { success: true, applicant };
    } catch (error) {
        console.error("Error fetching applicant:", error);
        return { success: false, error: "Failed to fetch applicant" };
    }
}
