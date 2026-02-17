"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";

// Get all students with filters
export async function getStudents(filters?: {
    status?: "STUDYING" | "GRADUATED" | "ON_LEAVE" | "WITHDRAWN" | "DISMISSED";
    search?: string;
    programId?: string;
    yearLevel?: number;
}) {
    try {
        const where: any = {};

        // Filter by status
        if (filters?.status) {
            where.status = filters.status;
        }

        // Search by name or student ID
        if (filters?.search) {
            where.OR = [
                { firstName: { contains: filters.search } },
                { lastName: { contains: filters.search } },
                { studentId: { contains: filters.search } },
            ];
        }

        // Filter by program
        if (filters?.programId) {
            where.programId = filters.programId;
        }

        // Filter by year level
        if (filters?.yearLevel) {
            where.yearLevel = filters.yearLevel;
        }

        const students = await prisma.student.findMany({
            where,
            include: {
                user: {
                    select: {
                        email: true,
                    },
                },
                program: {
                    select: {
                        nameTh: true,
                        nameEn: true,
                        degreeLevel: true,
                        faculty: {
                            select: {
                                nameTh: true,
                                nameEn: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                user: {
                    createdAt: "desc",
                },
            },
        });

        return { success: true, students };
    } catch (error) {
        console.error("Error fetching students:", error);
        return { success: false, error: "Failed to fetch students" };
    }
}

// Get student by ID
export async function getStudentById(id: string) {
    try {
        const student = await prisma.student.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        email: true,
                    },
                },
                program: {
                    include: {
                        faculty: true,
                        department: true,
                    },
                },
                enrollments: {
                    include: {
                        section: {
                            include: {
                                course: true,
                            },
                        },
                    },
                },
                invoices: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 5,
                },
            },
        });

        if (!student) {
            return { success: false, error: "Student not found" };
        }

        return { success: true, student };
    } catch (error) {
        console.error("Error fetching student:", error);
        return { success: false, error: "Failed to fetch student" };
    }
}

// Get student statistics
export async function getStudentStats() {
    try {
        const [total, studying, graduated, onLeave, withdrawn] = await Promise.all([
            prisma.student.count(),
            prisma.student.count({ where: { status: "STUDYING" } }),
            prisma.student.count({ where: { status: "GRADUATED" } }),
            prisma.student.count({ where: { status: "ON_LEAVE" } }),
            prisma.student.count({ where: { status: "WITHDRAWN" } }),
        ]);

        return {
            success: true,
            stats: {
                total,
                studying,
                graduated,
                onLeave,
                withdrawn,
            },
        };
    } catch (error) {
        console.error("Error fetching student stats:", error);
        return { success: false, error: "Failed to fetch statistics" };
    }
}

// Update student status
export async function updateStudentStatus(id: string, status: string) {
    try {
        await prisma.student.update({
            where: { id },
            data: { status: status as any },
        });

        revalidatePath("/admin/users/students");
        return { success: true };
    } catch (error) {
        console.error("Error updating student status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

// Delete student
export async function deleteStudent(id: string) {
    try {
        // Check if student has enrollments
        const enrollmentCount = await prisma.enrollment.count({
            where: { studentId: id },
        });

        if (enrollmentCount > 0) {
            return {
                success: false,
                error: "Cannot delete student with existing enrollments",
            };
        }

        await prisma.student.delete({
            where: { id },
        });

        revalidatePath("/admin/users/students");
        return { success: true };
    } catch (error) {
        console.error("Error deleting student:", error);
        return { success: false, error: "Failed to delete student" };
    }
}
