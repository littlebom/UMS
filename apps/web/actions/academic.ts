"use server";

import { prisma, DayOfWeek } from "@ums/lib";
import { revalidatePath } from "next/cache";

export async function getAcademicTerms() {
    return await prisma.academicTerm.findMany({
        orderBy: [{ year: "desc" }, { semester: "desc" }],
    });
}

export async function createAcademicTerm(formData: FormData) {
    const year = parseInt(formData.get("year") as string);
    const semester = parseInt(formData.get("semester") as string);
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = new Date(formData.get("endDate") as string);
    const isCurrent = formData.get("isCurrent") === "true";

    // If setting as current, unset all others
    if (isCurrent) {
        await prisma.academicTerm.updateMany({
            where: { isCurrent: true },
            data: { isCurrent: false },
        });
    }

    await prisma.academicTerm.create({
        data: {
            year,
            semester,
            startDate,
            endDate,
            isCurrent,
        },
    });

    revalidatePath("/admin/academic");
    revalidatePath("/admin/academic/terms");
}

export async function getClassSections(termId?: string) {
    return await prisma.classSection.findMany({
        where: termId ? { termId } : undefined,
        include: {
            course: true,
            term: true,
            instructor: true,
            schedules: true,
            _count: {
                select: {
                    enrollments: true,
                },
            },
        },
        orderBy: {
            sectionNumber: "asc",
        },
    });
}

export async function createClassSection(formData: FormData) {
    const courseId = formData.get("courseId") as string;
    const termId = formData.get("termId") as string;
    const sectionNumber = formData.get("sectionNumber") as string;
    const capacity = parseInt(formData.get("capacity") as string);
    const instructorId = formData.get("instructorId") as string;

    const day = formData.get("day") as DayOfWeek;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const room = formData.get("room") as string;

    const section = await prisma.classSection.create({
        data: {
            courseId,
            termId,
            sectionNumber,
            capacity,
            instructorId: instructorId || undefined,
            schedules: {
                create: [
                    {
                        day,
                        startTime,
                        endTime,
                        room,
                    },
                ],
            },
        },
    });

    revalidatePath("/admin/academic/sections");
    return section.id;
}

export async function deleteClassSection(id: string) {
    await prisma.classSection.delete({
        where: { id },
    });

    revalidatePath("/admin/academic/sections");
}
