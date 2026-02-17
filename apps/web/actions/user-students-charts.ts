"use server";

import { prisma } from "@ums/lib";

// Get enrollment trend data (last 6 months)
export async function getEnrollmentTrend() {
    try {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        // Get students grouped by month
        const students = await prisma.student.findMany({
            where: {
                createdAt: {
                    gte: sixMonthsAgo,
                },
            },
            select: {
                createdAt: true,
            },
        });

        // Group by month
        const monthlyData: { [key: string]: number } = {};
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        students.forEach((student) => {
            const month = student.createdAt.getMonth();
            const year = student.createdAt.getFullYear();
            const key = `${monthNames[month]} ${year}`;
            monthlyData[key] = (monthlyData[key] || 0) + 1;
        });

        // Convert to array format for charts
        const data = Object.keys(monthlyData)
            .sort((a, b) => {
                const [aMonth, aYear] = a.split(" ");
                const [bMonth, bYear] = b.split(" ");
                const aDate = new Date(`${aMonth} 1, ${aYear}`);
                const bDate = new Date(`${bMonth} 1, ${bYear}`);
                return aDate.getTime() - bDate.getTime();
            })
            .map((key) => ({
                month: key,
                students: monthlyData[key],
            }));

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error("Error fetching enrollment trend:", error);
        return {
            success: false,
            error: "Failed to fetch enrollment trend",
            data: [],
        };
    }
}

// Get program distribution data
export async function getProgramDistribution() {
    try {
        const students = await prisma.student.findMany({
            where: {
                status: {
                    in: ["STUDYING", "ON_LEAVE"],
                },
            },
            include: {
                program: {
                    select: {
                        nameEn: true,
                        nameTh: true,
                    },
                },
            },
        });

        // Group by program
        const programData: { [key: string]: number } = {};
        students.forEach((student) => {
            const programName = student.program?.nameEn || "Unknown";
            programData[programName] = (programData[programName] || 0) + 1;
        });

        // Convert to array and limit to top 8
        const data = Object.keys(programData)
            .map((name) => ({
                name: name.length > 20 ? name.substring(0, 20) + "..." : name,
                value: programData[name],
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 8); // Top 8 programs

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error("Error fetching program distribution:", error);
        return {
            success: false,
            error: "Failed to fetch program distribution",
            data: [],
        };
    }
}
