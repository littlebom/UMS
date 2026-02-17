"use server";

import { prisma } from "@ums/lib";

export async function getProgramOptions() {
    try {
        const programs = await prisma.program.findMany({
            select: {
                id: true,
                nameTh: true,
                nameEn: true,
                degreeLevel: true,
                faculty: {
                    select: {
                        nameTh: true
                    }
                }
            },
            orderBy: {
                nameTh: 'asc'
            }
        });
        return programs;
    } catch (error) {
        console.error("Error fetching program options:", error);
        return [];
    }
}
