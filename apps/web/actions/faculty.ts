"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";

export async function getFaculties() {
    return await prisma.faculty.findMany({
        orderBy: { code: "asc" },
    });
}

export async function getFacultyById(id: string) {
    return await prisma.faculty.findUnique({
        where: { id },
    });
}

export async function createFaculty(formData: FormData) {
    const code = formData.get("code") as string;
    const nameTh = formData.get("nameTh") as string;
    const nameEn = formData.get("nameEn") as string;
    const description = formData.get("description") as string;
    const logoUrl = formData.get("logoUrl") as string;

    await prisma.faculty.create({
        data: {
            code,
            nameTh,
            nameEn,
            description,
            logoUrl: logoUrl || null,
        },
    });

    revalidatePath("/admin/academic/program/faculties");
    redirect("/admin/academic/program/faculties");
}

export async function updateFaculty(id: string, formData: FormData) {
    const code = formData.get("code") as string;
    const nameTh = formData.get("nameTh") as string;
    const nameEn = formData.get("nameEn") as string;
    const description = formData.get("description") as string;
    const logoUrl = formData.get("logoUrl") as string;

    await prisma.faculty.update({
        where: { id },
        data: {
            code,
            nameTh,
            nameEn,
            description,
            logoUrl: logoUrl || null,
        },
    });

    revalidatePath("/admin/academic/program/faculties");
    redirect("/admin/academic/program/faculties");
}

export async function deleteFaculty(id: string) {
    // Check for related data
    const faculty = await prisma.faculty.findUnique({
        where: { id },
        include: {
            departments: true,
            programs: true,
            personnel: true,
        },
    });

    if (!faculty) {
        throw new Error("Faculty not found");
    }

    // Check if faculty has related data
    const relatedData = [];
    if (faculty.departments.length > 0) {
        relatedData.push(`${faculty.departments.length} department(s)`);
    }
    if (faculty.programs.length > 0) {
        relatedData.push(`${faculty.programs.length} program(s)`);
    }
    if (faculty.personnel.length > 0) {
        relatedData.push(`${faculty.personnel.length} personnel`);
    }

    if (relatedData.length > 0) {
        throw new Error(
            `Cannot delete this faculty. It has ${relatedData.join(", ")}. Please remove or reassign them first.`
        );
    }

    // If no related data, proceed with deletion
    await prisma.faculty.delete({
        where: { id },
    });

    revalidatePath("/admin/program/faculties");
}
