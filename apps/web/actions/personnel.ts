"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";

export async function getPersonnel() {
    return await prisma.personnel.findMany({
        include: {
            user: {
                select: {
                    email: true,
                    role: true,
                },
            },
            faculty: {
                select: {
                    id: true,
                    nameTh: true,
                    nameEn: true,
                },
            },
            department: {
                select: {
                    id: true,
                    nameTh: true,
                    nameEn: true,
                },
            },
        },
        orderBy: {
            lastName: "asc",
        },
    });
}

export async function getPersonnelById(id: string) {
    return await prisma.personnel.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    email: true,
                    role: true,
                },
            },
            faculty: true,
            department: true,
        },
    });
}

export async function createPersonnel(data: {
    email: string;
    password: string;
    role: "STAFF" | "INSTRUCTOR" | "ADMIN";
    firstName: string;
    lastName: string;
    title?: string;
    position?: string;
    phone?: string;
    facultyId?: string;
    departmentId?: string;
}) {
    const bcrypt = require("bcryptjs");
    const passwordHash = await bcrypt.hash(data.password, 10);

    const result = await prisma.user.create({
        data: {
            email: data.email,
            passwordHash,
            role: data.role,
            personnelProfile: {
                create: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    title: data.title,
                    position: data.position,
                    phone: data.phone,
                    facultyId: data.facultyId,
                    departmentId: data.departmentId,
                },
            },
        },
    });

    revalidatePath("/admin/personnel");
    return result;
}

export async function updatePersonnel(
    id: string,
    data: {
        firstName: string;
        lastName: string;
        title?: string;
        position?: string;
        phone?: string;
        facultyId?: string;
        departmentId?: string;
    }
) {
    const result = await prisma.personnel.update({
        where: { id },
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            title: data.title,
            position: data.position,
            phone: data.phone,
            facultyId: data.facultyId,
            departmentId: data.departmentId,
        },
    });

    revalidatePath("/admin/personnel");
    return result;
}

export async function deletePersonnel(id: string) {
    // This will cascade delete the user as well
    const personnel = await prisma.personnel.findUnique({
        where: { id },
        select: { userId: true },
    });

    if (!personnel) {
        throw new Error("Personnel not found");
    }

    await prisma.user.delete({
        where: { id: personnel.userId },
    });

    revalidatePath("/admin/personnel");
}
