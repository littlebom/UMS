"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";

export async function getStudents() {
    return await prisma.student.findMany({
        include: {
            user: {
                select: {
                    email: true,
                    role: true,
                },
            },
            program: {
                include: {
                    faculty: true,
                    department: true,
                },
            },
        },
        orderBy: {
            studentId: "asc",
        },
    });
}

export async function getStudentById(id: string) {
    return await prisma.student.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    email: true,
                    role: true,
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
                            term: true,
                        },
                    },
                },
            },
        },
    });
}

export async function getStudentByStudentId(studentId: string) {
    return await prisma.student.findUnique({
        where: { studentId },
        include: {
            user: {
                select: {
                    email: true,
                    role: true,
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
                            term: true,
                        },
                    },
                },
            },
        },
    });
}

export async function createStudent(data: {
    email: string;
    password: string;
    studentId: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    programId: string;
    studentType?: "REGULAR" | "EXCHANGE" | "SCHOLARSHIP" | "SPECIAL" | "TRANSFER" | "INTERNATIONAL";
    // Additional personal fields
    title?: string;
    firstNameTh?: string;
    lastNameTh?: string;
    nationality?: string;
    citizenId?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    phone?: string;
    // Address fields
    address?: string;
    subDistrict?: string;
    district?: string;
    province?: string;
    zipCode?: string;
}) {
    const bcrypt = require("bcryptjs");
    const passwordHash = await bcrypt.hash(data.password, 10);

    const result = await prisma.user.create({
        data: {
            email: data.email,
            passwordHash,
            role: "STUDENT",
            studentProfile: {
                create: {
                    studentId: data.studentId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    firstNameTh: data.firstNameTh,
                    lastNameTh: data.lastNameTh,
                    birthDate: data.birthDate,
                    programId: data.programId,
                    studentType: data.studentType || "REGULAR",
                    status: "STUDYING",
                    gpax: 0.00,
                    // Additional fields
                    title: data.title,
                    nationality: data.nationality,
                    citizenId: data.citizenId,
                    gender: data.gender,
                    phone: data.phone,
                    // Address
                    address: data.address,
                    subDistrict: data.subDistrict,
                    district: data.district,
                    province: data.province,
                    zipCode: data.zipCode,
                },
            },
        },
    });

    revalidatePath("/admin/students");
    return result;
}

export async function updateStudent(
    studentId: string,
    data: {
        firstName?: string;
        lastName?: string;
        firstNameTh?: string;
        lastNameTh?: string;
        birthDate?: Date;
        programId?: string;
        studentType?: "REGULAR" | "EXCHANGE" | "SCHOLARSHIP" | "SPECIAL" | "TRANSFER" | "INTERNATIONAL";
        status?: "STUDYING" | "ON_LEAVE" | "GRADUATED" | "WITHDRAWN" | "DISMISSED";
        phone?: string;
        gpax?: number;
    }
) {
    const result = await prisma.student.update({
        where: { studentId },
        data: data as any,
    });

    revalidatePath("/admin/students");
    revalidatePath(`/admin/students/${studentId}`);
    return result;
}

export async function deleteStudent(studentId: string) {
    // Find the student first to get the userId and id
    const student = await prisma.student.findUnique({
        where: { studentId },
        select: {
            id: true,
            userId: true
        },
    });

    if (!student) {
        throw new Error("Student not found");
    }

    try {
        // Delete in transaction to ensure data consistency
        await prisma.$transaction(async (tx) => {
            // 1. Delete all enrollments
            await tx.enrollment.deleteMany({
                where: { studentId: student.id },
            });

            // 2. Delete all invoices
            await tx.invoice.deleteMany({
                where: { studentId: student.id },
            });

            // 3. Delete student record
            await tx.student.delete({
                where: { id: student.id },
            });

            // 4. Delete the associated user account
            await tx.user.delete({
                where: { id: student.userId },
            });
        });

        revalidatePath("/admin/students");
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting student:", error);
        throw new Error(`Failed to delete student: ${error.message}`);
    }
}

export async function updateStudentProfileImage(
    studentId: string,
    profileImageUrl: string
) {
    const result = await prisma.student.update({
        where: { studentId },
        data: {
            profileImageUrl,
        },
    });

    revalidatePath(`/admin/students/${studentId}/card`);
    revalidatePath("/admin/students");
    return result;
}
