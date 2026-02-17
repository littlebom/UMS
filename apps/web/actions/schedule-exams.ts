"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";

// Get all exam schedules with filters
export async function getExamSchedules(filters?: {
    search?: string;
    termId?: string;
    examType?: string;
}) {
    try {
        const where: any = {};

        if (filters?.termId) {
            where.termId = filters.termId;
        }

        if (filters?.examType && filters.examType !== "ALL") {
            where.examType = filters.examType;
        }

        if (filters?.search) {
            where.course = {
                OR: [
                    { code: { contains: filters.search } },
                    { nameEn: { contains: filters.search } },
                ],
            };
        }

        const exams = await prisma.examSchedule.findMany({
            where,
            include: {
                course: {
                    select: {
                        code: true,
                        nameEn: true,
                        nameTh: true,
                    },
                },
                term: {
                    select: {
                        year: true,
                        semester: true,
                    },
                },
                examSlots: {
                    include: {
                        room: {
                            select: {
                                code: true,
                                name: true,
                                building: true,
                                capacity: true,
                            },
                        },
                        proctors: {
                            include: {
                                proctor: {
                                    select: {
                                        firstName: true,
                                        lastName: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                examDate: "asc",
            },
        });

        return { success: true, exams };
    } catch (error) {
        console.error("Error fetching exam schedules:", error);
        return { success: false, error: "Failed to fetch exam schedules" };
    }
}

// Get exam statistics
export async function getExamStats(termId?: string) {
    try {
        const where = termId ? { termId } : {};

        const [total, midterm, final, quiz, makeup] = await Promise.all([
            prisma.examSchedule.count({ where }),
            prisma.examSchedule.count({ where: { ...where, examType: "MIDTERM" } }),
            prisma.examSchedule.count({ where: { ...where, examType: "FINAL" } }),
            prisma.examSchedule.count({ where: { ...where, examType: "QUIZ" } }),
            prisma.examSchedule.count({ where: { ...where, examType: "MAKEUP" } }),
        ]);

        // Check for conflicts (students with overlapping exams)
        const conflicts = 0; // TODO: Implement conflict detection

        return {
            success: true,
            stats: {
                total,
                midterm,
                final,
                quiz,
                makeup,
                conflicts,
            },
        };
    } catch (error) {
        console.error("Error fetching exam stats:", error);
        return { success: false, error: "Failed to fetch statistics" };
    }
}

// Get exam schedule by ID
export async function getExamScheduleById(id: string) {
    try {
        const exam = await prisma.examSchedule.findUnique({
            where: { id },
            include: {
                course: true,
                term: true,
                examSlots: {
                    include: {
                        room: true,
                        proctors: {
                            include: {
                                proctor: {
                                    select: {
                                        firstName: true,
                                        lastName: true,
                                        position: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!exam) {
            return { success: false, error: "Exam schedule not found" };
        }

        return { success: true, exam };
    } catch (error) {
        console.error("Error fetching exam schedule:", error);
        return { success: false, error: "Failed to fetch exam schedule" };
    }
}

// Create exam schedule
export async function createExamSchedule(data: {
    courseId: string;
    section: string;
    termId: string;
    examType: string;
    examDate: Date;
    startTime: string;
    endTime: string;
    duration: number;
    examFormat?: string;
    instructions?: string;
}) {
    try {
        const exam = await prisma.examSchedule.create({
            data: {
                courseId: data.courseId,
                section: data.section,
                termId: data.termId,
                examType: data.examType as any,
                examDate: data.examDate,
                startTime: data.startTime,
                endTime: data.endTime,
                duration: data.duration,
                examFormat: (data.examFormat as any) || "CLOSED_BOOK",
                instructions: data.instructions,
                isPublished: false,
            },
        });

        revalidatePath("/admin/schedule/exams");
        return { success: true, exam };
    } catch (error) {
        console.error("Error creating exam schedule:", error);
        return { success: false, error: "Failed to create exam schedule" };
    }
}

// Add exam slot (room allocation)
export async function addExamSlot(data: {
    examScheduleId: string;
    roomId: string;
    capacity: number;
}) {
    try {
        const slot = await prisma.examSlot.create({
            data: {
                examScheduleId: data.examScheduleId,
                roomId: data.roomId,
                capacity: data.capacity,
                assignedCount: 0,
            },
        });

        revalidatePath("/admin/schedule/exams");
        return { success: true, slot };
    } catch (error) {
        console.error("Error adding exam slot:", error);
        return { success: false, error: "Failed to add exam slot" };
    }
}

// Assign proctor to exam slot
export async function assignProctor(data: {
    examSlotId: string;
    proctorId: string;
    role?: string;
}) {
    try {
        const proctor = await prisma.examProctor.create({
            data: {
                examSlotId: data.examSlotId,
                proctorId: data.proctorId,
                role: (data.role as any) || "ASSISTANT",
                isConfirmed: false,
            },
        });

        revalidatePath("/admin/schedule/exams");
        return { success: true, proctor };
    } catch (error) {
        console.error("Error assigning proctor:", error);
        return { success: false, error: "Failed to assign proctor" };
    }
}

// Publish exam schedule
export async function publishExamSchedule(id: string) {
    try {
        const exam = await prisma.examSchedule.update({
            where: { id },
            data: { isPublished: true },
        });

        revalidatePath("/admin/schedule/exams");
        return { success: true, exam };
    } catch (error) {
        console.error("Error publishing exam schedule:", error);
        return { success: false, error: "Failed to publish exam schedule" };
    }
}

// Delete exam schedule
export async function deleteExamSchedule(id: string) {
    try {
        await prisma.examSchedule.delete({
            where: { id },
        });

        revalidatePath("/admin/schedule/exams");
        return { success: true };
    } catch (error) {
        console.error("Error deleting exam schedule:", error);
        return { success: false, error: "Failed to delete exam schedule" };
    }
}

// Check for student exam conflicts
export async function checkStudentExamConflicts(
    studentId: string,
    examDate: Date,
    startTime: string,
    endTime: string
) {
    try {
        // Get student's enrolled courses
        const enrollments = await prisma.enrollment.findMany({
            where: { studentId },
            select: { sectionId: true },
        });

        const sectionIds = enrollments.map((e) => e.sectionId);

        // Find exams for these sections at the same time
        const conflicts = await prisma.examSchedule.findMany({
            where: {
                examDate,
                OR: [
                    {
                        AND: [
                            { startTime: { lte: startTime } },
                            { endTime: { gt: startTime } },
                        ],
                    },
                    {
                        AND: [
                            { startTime: { lt: endTime } },
                            { endTime: { gte: endTime } },
                        ],
                    },
                ],
            },
            include: {
                course: {
                    select: {
                        code: true,
                        nameEn: true,
                    },
                },
            },
        });

        return {
            success: true,
            hasConflicts: conflicts.length > 0,
            conflicts,
        };
    } catch (error) {
        console.error("Error checking exam conflicts:", error);
        return { success: false, error: "Failed to check conflicts" };
    }
}
