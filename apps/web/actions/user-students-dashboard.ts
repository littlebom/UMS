"use server";

import { prisma } from "@ums/lib";

// Get recent students (last N days)
export async function getRecentStudents(days: number = 7) {
    try {
        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - days);

        const students = await prisma.student.findMany({
            where: {
                createdAt: {
                    gte: daysAgo,
                },
            },
            include: {
                program: {
                    select: {
                        nameEn: true,
                        nameTh: true,
                    },
                },
                user: {
                    select: {
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
        });

        return {
            success: true,
            students,
            count: students.length,
        };
    } catch (error) {
        console.error("Error fetching recent students:", error);
        return {
            success: false,
            error: "Failed to fetch recent students",
            students: [],
            count: 0,
        };
    }
}

// Get academic performance summary
export async function getAcademicPerformance() {
    try {
        const currentStudents = await prisma.student.findMany({
            where: {
                status: {
                    in: ["STUDYING", "ON_LEAVE"],
                },
            },
            select: {
                gpax: true,
                status: true,
            },
        });

        const graduatedCount = await prisma.student.count({
            where: {
                status: "GRADUATED",
            },
        });

        // Calculate statistics
        const totalCurrent = currentStudents.length;
        const totalGPA = currentStudents.reduce((sum, s) => sum + (s.gpax || 0), 0);
        const averageGPA = totalCurrent > 0 ? totalGPA / totalCurrent : 0;

        const atRiskCount = currentStudents.filter((s) => s.gpax < 2.0).length;
        const honorCount = currentStudents.filter((s) => s.gpax >= 3.5).length;

        // Expected graduates (students with high year level - we'll use a simple heuristic)
        // For now, we'll estimate based on graduated students in the system
        const expectedGraduates = Math.round(graduatedCount * 0.15); // Est. 15% of previous grads

        return {
            success: true,
            data: {
                averageGPA: parseFloat(averageGPA.toFixed(2)),
                totalStudents: totalCurrent,
                atRiskCount,
                honorCount,
                expectedGraduates,
            },
        };
    } catch (error) {
        console.error("Error fetching academic performance:", error);
        return {
            success: false,
            error: "Failed to fetch academic performance",
            data: {
                averageGPA: 0,
                totalStudents: 0,
                atRiskCount: 0,
                honorCount: 0,
                expectedGraduates: 0,
            },
        };
    }
}

// Get students needing attention
export async function getStudentsNeedingAttention() {
    try {
        // Students at risk (low GPA)
        const atRisk = await prisma.student.count({
            where: {
                status: {
                    in: ["STUDYING", "ON_LEAVE"],
                },
                gpax: {
                    lt: 2.0,
                },
            },
        });

        // Students on leave (may need follow-up)
        const onLeave = await prisma.student.count({
            where: {
                status: "ON_LEAVE",
            },
        });

        // New students (last 7 days - may need orientation)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const newStudents = await prisma.student.count({
            where: {
                createdAt: {
                    gte: sevenDaysAgo,
                },
            },
        });

        return {
            success: true,
            data: {
                atRisk,
                onLeave,
                newStudents,
                total: atRisk + onLeave,
            },
        };
    } catch (error) {
        console.error("Error fetching students needing attention:", error);
        return {
            success: false,
            error: "Failed to fetch attention data",
            data: {
                atRisk: 0,
                onLeave: 0,
                newStudents: 0,
                total: 0,
            },
        };
    }
}
