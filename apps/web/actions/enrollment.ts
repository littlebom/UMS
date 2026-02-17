"use server";

import { prisma } from "@ums/lib";
import { getStudentSession } from "./student-auth";
import { revalidatePath } from "next/cache";

export async function getAvailableSections(termId?: string) {
    // If no termId provided, try to find current term
    if (!termId) {
        const currentTerm = await prisma.academicTerm.findFirst({
            where: { isCurrent: true },
        });
        termId = currentTerm?.id;
    }

    if (!termId) return [];

    return await prisma.classSection.findMany({
        where: { termId },
        include: {
            course: true,
            instructor: true,
            schedules: true,
            _count: {
                select: { enrollments: true },
            },
        },
        orderBy: {
            course: { code: "asc" },
        },
    });
}

export async function enrollStudent(sectionId: string) {
    const session = await getStudentSession();
    if (!session || !session.studentId) {
        throw new Error("Unauthorized");
    }

    const section = await prisma.classSection.findUnique({
        where: { id: sectionId },
        include: {
            _count: {
                select: { enrollments: true },
            },
            schedules: true,
        },
    });

    if (!section) {
        throw new Error("Section not found");
    }

    // Check Capacity
    if (section._count.enrollments >= section.capacity) {
        throw new Error("Section is full");
    }

    // Check Existing Enrollment in this section
    const existingEnrollment = await prisma.enrollment.findUnique({
        where: {
            studentId_sectionId: {
                studentId: session.studentId,
                sectionId: sectionId,
            },
        },
    });

    if (existingEnrollment) {
        throw new Error("Already enrolled in this section");
    }

    // Check Time Conflict (Advanced - Skip for now or implement simple check)
    // For now, let's just allow enrollment

    await prisma.enrollment.create({
        data: {
            studentId: session.studentId,
            sectionId: sectionId,
        },
    });

    revalidatePath("/student/registration");
    revalidatePath("/student/dashboard");
}

export async function getStudentEnrollments() {
    const session = await getStudentSession();
    if (!session || !session.studentId) {
        return [];
    }

    return await prisma.enrollment.findMany({
        where: { studentId: session.studentId },
        include: {
            section: {
                include: {
                    course: true,
                    term: true,
                    schedules: true,
                    instructor: true,
                },
            },
        },
        orderBy: {
            enrolledAt: "desc",
        },
    });
}
