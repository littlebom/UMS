"use server";

import { prisma } from "@ums/lib";
import { getInstructorSession } from "./instructor-auth";
import { revalidatePath } from "next/cache";

export async function getInstructorSections() {
    const session = await getInstructorSession();
    if (!session || !session.instructorId) {
        return [];
    }

    return await prisma.classSection.findMany({
        where: { instructorId: session.instructorId },
        include: {
            course: true,
            term: true,
            schedules: true,
            _count: {
                select: { enrollments: true },
            },
        },
        orderBy: {
            term: { year: "desc" }, // Sort by year desc, then semester desc (needs composite sort or just year for now)
        },
    });
}

export async function getSectionStudents(sectionId: string) {
    const session = await getInstructorSession();
    if (!session || !session.instructorId) {
        throw new Error("Unauthorized");
    }

    // Verify instructor owns this section
    const section = await prisma.classSection.findUnique({
        where: { id: sectionId },
    });

    if (!section || section.instructorId !== session.instructorId) {
        throw new Error("Unauthorized access to this section");
    }

    return await prisma.enrollment.findMany({
        where: { sectionId },
        include: {
            student: {
                include: {
                    user: {
                        select: { email: true },
                    },
                },
            },
        },
        orderBy: {
            student: { studentId: "asc" },
        },
    });
}

export async function submitGrades(sectionId: string, grades: { studentId: string; grade: string }[]) {
    const session = await getInstructorSession();
    if (!session || !session.instructorId) {
        throw new Error("Unauthorized");
    }

    // Verify instructor owns this section
    const section = await prisma.classSection.findUnique({
        where: { id: sectionId },
    });

    if (!section || section.instructorId !== session.instructorId) {
        throw new Error("Unauthorized access to this section");
    }

    // Update grades in transaction
    await prisma.$transaction(
        grades.map(({ studentId, grade }) =>
            prisma.enrollment.update({
                where: {
                    studentId_sectionId: {
                        studentId,
                        sectionId,
                    },
                },
                data: { grade },
            })
        )
    );

    revalidatePath(`/instructor/grading/${sectionId}`);
}
