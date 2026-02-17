"use server";

import { prisma, StudentStatus, UserRole, ApplicationStatus } from "@ums/lib";
import { getAdminSession } from "./auth";

export async function getDashboardStats() {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const [
        totalStudents,
        totalInstructors,
        totalPrograms,
        totalCourses,
        pendingApplications,
    ] = await Promise.all([
        prisma.student.count({ where: { status: StudentStatus.ACTIVE } }),
        prisma.personnel.count({
            where: { user: { role: UserRole.INSTRUCTOR } },
        }),
        prisma.program.count(),
        prisma.course.count(),
        prisma.application.count({ where: { status: ApplicationStatus.SUBMITTED } }),
    ]);

    return {
        totalStudents,
        totalInstructors,
        totalPrograms,
        totalCourses,
        pendingApplications,
    };
}

export async function getAdmissionsData() {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    // Group applications by status
    const applicationsByStatus = await prisma.application.groupBy({
        by: ["status"],
        _count: {
            _all: true,
        },
    });

    return applicationsByStatus.map((item) => ({
        name: item.status,
        value: item._count._all,
    }));
}

export async function getFinancialData() {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    // Total Revenue (Sum of verified payments)
    const totalRevenue = await prisma.payment.aggregate({
        where: {
            verifiedAt: { not: null },
        },
        _sum: {
            amount: true,
        },
    });

    // Pending Payments (Sum of unverified payments)
    const pendingRevenue = await prisma.payment.aggregate({
        where: {
            verifiedAt: null,
        },
        _sum: {
            amount: true,
        },
    });

    return {
        totalRevenue: totalRevenue._sum.amount?.toNumber() || 0,
        pendingRevenue: pendingRevenue._sum.amount?.toNumber() || 0,
    };
}

export async function getStudentDistributionByFaculty() {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const students = await prisma.student.findMany({
        where: { status: StudentStatus.ACTIVE }, // Prisma should infer this correctly if types are generated
        include: {
            program: {
                include: {
                    faculty: true
                }
            }
        }
    });

    // Aggregate manually
    const distribution: Record<string, number> = {};

    students.forEach((student: any) => {
        if (student.program?.faculty?.nameEn) {
            const facultyName = student.program.faculty.nameEn;
            distribution[facultyName] = (distribution[facultyName] || 0) + 1;
        }
    });

    return Object.entries(distribution).map(([name, value]) => ({
        name,
        value
    }));
}
