"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";

// Get all class schedules with filters
export async function getClassSchedules(filters?: {
    search?: string;
    termId?: string;
    day?: string;
    instructorId?: string;
}) {
    try {
        const where: any = {};

        if (filters?.termId) {
            where.termId = filters.termId;
        }

        if (filters?.day && filters.day !== "ALL") {
            where.day = filters.day;
        }

        if (filters?.instructorId) {
            where.instructorId = filters.instructorId;
        }

        if (filters?.search) {
            where.OR = [
                {
                    course: {
                        OR: [
                            { code: { contains: filters.search } },
                            { nameEn: { contains: filters.search } },
                        ],
                    },
                },
                {
                    instructor: {
                        OR: [
                            { firstName: { contains: filters.search } },
                            { lastName: { contains: filters.search } },
                        ],
                    },
                },
            ];
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
                                nameTh: true,
                            },
                        },
                        instructor: {
                            select: {
                                firstName: true,
                                lastName: true,
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
                instructor: {
                    select: {
                        firstName: true,
                        lastName: true,
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
        console.error("Error fetching schedules:", error);
        return { success: false, error: "Failed to fetch schedules" };
    }
}

// Get schedule statistics
export async function getScheduleStats(termId?: string) {
    try {
        const where = termId ? { termId } : {};

        const [totalSchedules, activeCourses, roomsUsed] = await Promise.all([
            prisma.classSchedule.count({ where }),
            prisma.classSchedule.findMany({
                where,
                distinct: ["courseId"],
                select: { courseId: true },
            }),
            prisma.classSchedule.findMany({
                where,
                distinct: ["roomId"],
                select: { roomId: true },
            }),
        ]);

        // Get current week's schedules
        const thisWeek = await prisma.classSchedule.count({
            where: {
                ...where,
                // Add date range filter if needed
            },
        });

        return {
            success: true,
            stats: {
                totalSchedules,
                activeCourses: activeCourses.length,
                roomsUsed: roomsUsed.filter((r) => r.roomId).length,
                thisWeek,
            },
        };
    } catch (error) {
        console.error("Error fetching schedule stats:", error);
        return { success: false, error: "Failed to fetch statistics" };
    }
}

// Get schedule by ID
export async function getScheduleById(id: string) {
    try {
        const schedule = await prisma.classSchedule.findUnique({
            where: { id },
            include: {
                section: {
                    include: {
                        course: true,
                        instructor: true,
                        enrollments: {
                            include: {
                                student: {
                                    select: {
                                        studentId: true,
                                        firstName: true,
                                        lastName: true,
                                    },
                                },
                            },
                        },
                    },
                },
                room: true,
                course: true,
                instructor: true,
                term: true,
            },
        });

        if (!schedule) {
            return { success: false, error: "Schedule not found" };
        }

        return { success: true, schedule };
    } catch (error) {
        console.error("Error fetching schedule:", error);
        return { success: false, error: "Failed to fetch schedule" };
    }
}

// Create class schedule
export async function createClassSchedule(data: {
    sectionId: string;
    day: string;
    startTime: string;
    endTime: string;
    roomId?: string;
    courseId?: string;
    instructorId?: string;
    termId?: string;
    studentGroupIds?: string[];
}) {
    try {
        // Check for conflicts
        if (data.roomId) {
            const roomConflicts = await prisma.classSchedule.findMany({
                where: {
                    roomId: data.roomId,
                    day: data.day as any,
                    OR: [
                        {
                            AND: [
                                { startTime: { lte: data.startTime } },
                                { endTime: { gt: data.startTime } },
                            ],
                        },
                        {
                            AND: [
                                { startTime: { lt: data.endTime } },
                                { endTime: { gte: data.endTime } },
                            ],
                        },
                    ],
                },
            });

            if (roomConflicts.length > 0) {
                return {
                    success: false,
                    error: "Room is already booked for this time slot",
                };
            }
        }

        // Check for student group schedule conflicts (if groups are specified)
        if (data.studentGroupIds && data.studentGroupIds.length > 0) {
            // Find existing schedules for the same groups at the same time
            const groupConflicts = await (prisma.classSchedule.findMany as any)({
                where: {
                    day: data.day as any,
                    section: {
                        studentGroups: {
                            some: {
                                id: { in: data.studentGroupIds }
                            }
                        }
                    },
                    OR: [
                        {
                            AND: [
                                { startTime: { lte: data.startTime } },
                                { endTime: { gt: data.startTime } },
                            ],
                        },
                        {
                            AND: [
                                { startTime: { lt: data.endTime } },
                                { endTime: { gte: data.endTime } },
                            ],
                        },
                    ],
                },
                include: {
                    course: { select: { code: true, nameEn: true } },
                    section: {
                        include: {
                            studentGroups: { select: { name: true } }
                        }
                    }
                }
            });

            if (groupConflicts.length > 0) {
                const conflictInfo = groupConflicts[0] as any;
                return {
                    success: false,
                    error: `Schedule conflict! The selected student group(s) already have "${conflictInfo?.course?.code || 'another class'}" at this time.`,
                };
            }
        }

        // Create the schedule
        const schedule = await prisma.classSchedule.create({
            data: {
                sectionId: data.sectionId,
                day: data.day as any,
                startTime: data.startTime,
                endTime: data.endTime,
                ...(data.roomId && { roomId: data.roomId }),
                ...(data.courseId && { courseId: data.courseId }),
                ...(data.instructorId && { instructorId: data.instructorId }),
                ...(data.termId && { termId: data.termId }),
            },
        });

        // If student groups are specified, connect them to the section
        if (data.studentGroupIds && data.studentGroupIds.length > 0) {
            await (prisma.classSection.update as any)({
                where: { id: data.sectionId },
                data: {
                    studentGroups: {
                        connect: data.studentGroupIds.map(id => ({ id }))
                    }
                }
            });
        }

        revalidatePath("/admin/schedule/timetable");
        return { success: true, schedule };
    } catch (error) {
        console.error("Error creating schedule:", error);
        return { success: false, error: "Failed to create schedule" };
    }
}

// Update class schedule
export async function updateClassSchedule(
    id: string,
    data: {
        day?: string;
        startTime?: string;
        endTime?: string;
        roomId?: string;
    }
) {
    try {
        const schedule = await prisma.classSchedule.update({
            where: { id },
            data: {
                ...(data.day && { day: data.day as any }),
                ...(data.startTime && { startTime: data.startTime }),
                ...(data.endTime && { endTime: data.endTime }),
                ...(data.roomId !== undefined && { roomId: data.roomId }),
            },
        });

        revalidatePath("/admin/schedule/timetable");
        return { success: true, schedule };
    } catch (error) {
        console.error("Error updating schedule:", error);
        return { success: false, error: "Failed to update schedule" };
    }
}

// Delete class schedule
export async function deleteClassSchedule(id: string) {
    try {
        await prisma.classSchedule.delete({
            where: { id },
        });

        revalidatePath("/admin/schedule/timetable");
        return { success: true };
    } catch (error) {
        console.error("Error deleting schedule:", error);
        return { success: false, error: "Failed to delete schedule" };
    }
}

// Get weekly timetable
export async function getWeeklyTimetable(termId?: string) {
    try {
        const where = termId ? { termId } : {};

        const schedules = await prisma.classSchedule.findMany({
            where,
            include: {
                section: {
                    include: {
                        course: {
                            select: {
                                code: true,
                                nameEn: true,
                            },
                        },
                    },
                },
                room: {
                    select: {
                        code: true,
                    },
                },
                course: {
                    select: {
                        code: true,
                        nameEn: true,
                    },
                },
            },
            orderBy: [
                { day: "asc" },
                { startTime: "asc" },
            ],
        });

        // Group by day and time
        const timetable: Record<string, any[]> = {
            MONDAY: [],
            TUESDAY: [],
            WEDNESDAY: [],
            THURSDAY: [],
            FRIDAY: [],
            SATURDAY: [],
            SUNDAY: [],
        };

        schedules.forEach((schedule) => {
            if (timetable[schedule.day]) {
                timetable[schedule.day].push(schedule);
            }
        });

        return { success: true, timetable };
    } catch (error) {
        console.error("Error fetching weekly timetable:", error);
        return { success: false, error: "Failed to fetch timetable" };
    }
}
