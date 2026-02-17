"use server";

import { prisma } from "@ums/lib";

export async function getStudentCardData(studentId: string) {
    const student = await prisma.student.findUnique({
        where: { studentId },
        include: {
            user: true,
            program: {
                include: {
                    faculty: true,
                    department: true,
                },
            },
        },
    });

    if (!student) {
        throw new Error("Student not found");
    }

    return student;
}
