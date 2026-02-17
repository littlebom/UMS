"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";

// Get teaching loads with filters
export async function getTeachingLoads(filters?: {
    termId?: string;
    instructorId?: string;
}) {
    try {
        const where: any = {};

        if (filters?.termId) {
            where.termId = filters.termId;
        }

        if (filters?.instructorId) {
            where.instructorId = filters.instructorId;
        }

        const loads = await prisma.teachingLoad.findMany({
            where,
            include: {
                instructor: {
                    select: {
                        firstName: true,
                        lastName: true,
                        position: true,
                    },
                },
                term: {
                    select: {
                        year: true,
                        semester: true,
                    },
                },
            },
            orderBy: {
                totalHours: "desc",
            },
        });

        return { success: true, loads };
    } catch (error) {
        console.error("Error fetching teaching loads:", error);
        return { success: false, error: "Failed to fetch teaching loads" };
    }
}

// Get teaching load statistics
export async function getTeachingStats(termId?: string) {
    try {
        const where = termId ? { termId } : {};

        const [activeInstructors, totalLoads] = await Promise.all([
            prisma.teachingLoad.findMany({
                where,
                distinct: ["instructorId"],
                select: { instructorId: true },
            }),
            prisma.teachingLoad.findMany({
                where,
                select: {
                    totalHours: true,
                    courseCount: true,
                },
            }),
        ]);

        const avgHours =
            totalLoads.length > 0
                ? totalLoads.reduce((sum, load) => sum + Number(load.totalHours), 0) /
                totalLoads.length
                : 0;

        const totalCourses = totalLoads.reduce(
            (sum, load) => sum + load.courseCount,
            0
        );

        // Count overloaded instructors (>18 hours)
        const overloaded = totalLoads.filter(
            (load) => Number(load.totalHours) > 18
        ).length;

        return {
            success: true,
            stats: {
                activeInstructors: activeInstructors.length,
                coursesAssigned: totalCourses,
                avgTeachingHours: Math.round(avgHours * 10) / 10,
                overloaded,
            },
        };
    } catch (error) {
        console.error("Error fetching teaching stats:", error);
        return { success: false, error: "Failed to fetch statistics" };
    }
}

// Calculate teaching load for an instructor
export async function calculateTeachingLoad(
    instructorId: string,
    termId: string
) {
    try {
        // Get all schedules for this instructor in this term
        const schedules = await prisma.classSchedule.findMany({
            where: {
                instructorId,
                termId,
            },
            include: {
                course: {
                    select: {
                        code: true,
                        credits: true,
                    },
                },
            },
        });

        let lectureHours = 0;
        let labHours = 0;
        const courseIds = new Set<string>();

        schedules.forEach((schedule) => {
            if (schedule.courseId) {
                courseIds.add(schedule.courseId);
            }

            // Calculate hours based on time difference
            const start = schedule.startTime.split(":");
            const end = schedule.endTime.split(":");
            const hours =
                parseInt(end[0]) * 60 +
                parseInt(end[1]) -
                (parseInt(start[0]) * 60 + parseInt(start[1]));
            const hoursDecimal = hours / 60;

            // Assume lab if course code contains "LAB" or room type is LAB
            const isLab = schedule.course?.code?.includes("LAB") || false;

            if (isLab) {
                labHours += hoursDecimal;
            } else {
                lectureHours += hoursDecimal;
            }
        });

        // Lab hours count as 0.5x
        const totalHours = lectureHours + labHours * 0.5;

        // Update or create teaching load record
        const existingLoad = await prisma.teachingLoad.findUnique({
            where: {
                instructorId_termId: {
                    instructorId,
                    termId,
                },
            },
        });

        let teachingLoad;
        if (existingLoad) {
            teachingLoad = await prisma.teachingLoad.update({
                where: { id: existingLoad.id },
                data: {
                    lectureHours,
                    labHours,
                    totalHours,
                    courseCount: courseIds.size,
                },
            });
        } else {
            teachingLoad = await prisma.teachingLoad.create({
                data: {
                    instructorId,
                    termId,
                    lectureHours,
                    labHours,
                    totalHours,
                    courseCount: courseIds.size,
                },
            });
        }

        revalidatePath("/admin/schedule/teaching");
        return { success: true, teachingLoad };
    } catch (error) {
        console.error("Error calculating teaching load:", error);
        return { success: false, error: "Failed to calculate teaching load" };
    }
}

// Approve teaching load
export async function approveTeachingLoad(
    id: string,
    approvedBy: string
) {
    try {
        const teachingLoad = await prisma.teachingLoad.update({
            where: { id },
            data: {
                isApproved: true,
                approvedBy,
                approvedAt: new Date(),
            },
        });

        revalidatePath("/admin/schedule/teaching");
        return { success: true, teachingLoad };
    } catch (error) {
        console.error("Error approving teaching load:", error);
        return { success: false, error: "Failed to approve teaching load" };
    }
}

// Get instructor teaching schedule
export async function getInstructorSchedule(
    instructorId: string,
    termId?: string
) {
    try {
        const where: any = { instructorId };
        if (termId) {
            where.termId = termId;
        }

        const schedules = await prisma.classSchedule.findMany({
            where,
            include: {
                section: {
                    include: {
                        course: {
                            select: {
                                code: true,
                                nameEn: true,
                                credits: true,
                            },
                        },
                    },
                },
                room: {
                    select: {
                        code: true,
                        name: true,
                        building: true,
                    },
                },
                course: {
                    select: {
                        code: true,
                        nameEn: true,
                    },
                },
                term: {
                    select: {
                        year: true,
                        semester: true,
                    },
                },
            },
            orderBy: [
                { day: "asc" },
                { startTime: "asc" },
            ],
        });

        return { success: true, schedules };
    } catch (error) {
        console.error("Error fetching instructor schedule:", error);
        return { success: false, error: "Failed to fetch schedule" };
    }
}

// Recalculate all teaching loads for a term
export async function recalculateAllTeachingLoads(termId: string) {
    try {
        // Get all instructors teaching in this term
        const schedules = await prisma.classSchedule.findMany({
            where: { termId },
            distinct: ["instructorId"],
            select: { instructorId: true },
        });

        const instructorIds = schedules
            .map((s) => s.instructorId)
            .filter((id): id is string => id !== null);

        // Calculate for each instructor
        const results = await Promise.all(
            instructorIds.map((instructorId) =>
                calculateTeachingLoad(instructorId, termId)
            )
        );

        const successful = results.filter((r) => r.success).length;

        return {
            success: true,
            message: `Recalculated ${successful} teaching loads`,
        };
    } catch (error) {
        console.error("Error recalculating teaching loads:", error);
        return { success: false, error: "Failed to recalculate teaching loads" };
    }
}
