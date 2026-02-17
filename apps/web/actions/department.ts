"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getDepartments() {
    return await prisma.department.findMany({
        include: { faculty: true },
        orderBy: { faculty: { code: "asc" } },
    });
}

export async function getDepartmentById(id: string) {
    return await prisma.department.findUnique({
        where: { id },
        include: { faculty: true },
    });
}

export async function createDepartment(formData: FormData) {
    const nameTh = formData.get("nameTh") as string;
    const nameEn = formData.get("nameEn") as string;
    const facultyId = formData.get("facultyId") as string;
    const description = formData.get("description") as string;

    await prisma.department.create({
        data: {
            nameTh,
            nameEn,
            facultyId,
            description,
        },
    });

    revalidatePath("/admin/academic/program/departments");
    redirect("/admin/academic/program/departments");
}

export async function updateDepartment(id: string, formData: FormData) {
    const nameTh = formData.get("nameTh") as string;
    const nameEn = formData.get("nameEn") as string;
    const facultyId = formData.get("facultyId") as string;
    const description = formData.get("description") as string;

    await prisma.department.update({
        where: { id },
        data: {
            nameTh,
            nameEn,
            facultyId,
            description,
        },
    });

    revalidatePath("/admin/academic/program/departments");
    redirect("/admin/academic/program/departments");
}

export async function deleteDepartment(id: string) {
    // Check for related data
    const department = await prisma.department.findUnique({
        where: { id },
        include: {
            programs: true,
            personnel: true,
        },
    });

    if (!department) {
        throw new Error("Department not found");
    }

    // Check if department has related data
    const relatedData = [];
    if (department.programs.length > 0) {
        relatedData.push(`${department.programs.length} program(s)`);
    }
    if (department.personnel.length > 0) {
        relatedData.push(`${department.personnel.length} personnel`);
    }

    if (relatedData.length > 0) {
        throw new Error(
            `Cannot delete this department. It has ${relatedData.join(", ")}. Please remove or reassign them first.`
        );
    }

    // If no related data, proceed with deletion
    await prisma.department.delete({
        where: { id },
    });

    revalidatePath("/admin/academic/program/departments");
}
