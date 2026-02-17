"use server";

import { prisma } from "@ums/lib";

export async function getPrograms() {
    try {
        const programs = await prisma.program.findMany({
            include: {
                faculty: true,
                department: true,
            },
            orderBy: {
                nameEn: "asc",
            },
        });
        return programs;
    } catch (error) {
        console.error("Error fetching programs:", error);
        return [];
    }
}

export async function getFaculties() {
    try {
        const faculties = await prisma.faculty.findMany({
            orderBy: {
                nameEn: "asc",
            },
        });
        return faculties;
    } catch (error) {
        console.error("Error fetching faculties:", error);
        return [];
    }
}

export async function getProgramById(id: string) {
    try {
        const program = await prisma.program.findUnique({
            where: { id },
            include: {
                faculty: true,
                department: true,
            },
        });
        return program;
    } catch (error) {
        console.error("Error fetching program:", error);
        return null;
    }
}
