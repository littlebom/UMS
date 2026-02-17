"use server";

import { prisma, DegreeLevel } from "@ums/lib";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPrograms() {
    return await prisma.program.findMany({
        include: {
            faculty: true,
            department: true,
        },
        orderBy: { nameEn: "asc" },
    });
}

export async function getProgramById(id: string) {
    return await prisma.program.findUnique({
        where: { id },
        include: {
            faculty: true,
            department: true,
            courses: {
                include: {
                    course: true,
                },
                orderBy: {
                    semester: 'asc',
                },
            },
        },
    });
}

export async function getCourses() {
    return await prisma.course.findMany({
        orderBy: { code: "asc" },
    });
}


export async function createProgram(formData: FormData) {
    const nameTh = formData.get("nameTh") as string;
    const nameEn = formData.get("nameEn") as string;
    const degreeLevel = formData.get("degreeLevel") as DegreeLevel;
    const departmentId = formData.get("departmentId") as string;
    const description = formData.get("description") as string;
    const credits = formData.get("credits") ? parseInt(formData.get("credits") as string) : null;
    const duration = formData.get("duration") as string || null;
    const objectives = formData.get("objectives") as string || null;
    const structure = formData.get("structure") as string || null;
    const admissionRequirements = formData.get("admissionRequirements") as string || null;
    const careerOpportunities = formData.get("careerOpportunities") as string || null;

    // Find faculty from department
    const department = await prisma.department.findUnique({
        where: { id: departmentId },
    });

    if (!department) throw new Error("Department not found");

    await prisma.program.create({
        data: {
            nameTh,
            nameEn,
            degreeLevel,
            departmentId,
            facultyId: department.facultyId,
            description,
            credits,
            duration,
            objectives,
            structure,
            admissionRequirements,
            careerOpportunities,
        },
    });

    revalidatePath("/admin/academic/program/programs");
    redirect("/admin/academic/program/programs");
}

export async function updateProgram(id: string, formData: FormData) {
    const nameTh = formData.get("nameTh") as string;
    const nameEn = formData.get("nameEn") as string;
    const degreeLevel = formData.get("degreeLevel") as DegreeLevel;
    const departmentId = formData.get("departmentId") as string;
    const description = formData.get("description") as string || null;
    const credits = formData.get("credits") ? parseInt(formData.get("credits") as string) : null;
    const duration = formData.get("duration") as string || null;
    const objectives = formData.get("objectives") as string || null;
    const structure = formData.get("structure") as string || null;
    const admissionRequirements = formData.get("admissionRequirements") as string || null;
    const careerOpportunities = formData.get("careerOpportunities") as string || null;
    const isAcceptingApplications = formData.get("isAcceptingApplications") === "true";

    // Find faculty from department
    const department = await prisma.department.findUnique({
        where: { id: departmentId },
    });

    if (!department) throw new Error("Department not found");

    await prisma.program.update({
        where: { id },
        data: {
            nameTh,
            nameEn,
            degreeLevel,
            departmentId,
            facultyId: department.facultyId,
            description,
            credits,
            duration,
            objectives,
            structure,
            admissionRequirements,
            careerOpportunities,
            isAcceptingApplications,
        },
    });

    revalidatePath("/admin/academic/program/programs");
    redirect("/admin/academic/program/programs");
}

export async function deleteProgram(id: string) {
    // Check for related data
    const program = await prisma.program.findUnique({
        where: { id },
        include: {
            students: true,
        },
    });

    if (!program) {
        throw new Error("Program not found");
    }

    // Check if program has related data
    if (program.students.length > 0) {
        throw new Error(
            `Cannot delete this program. It has ${program.students.length} student(s). Please remove or reassign them first.`
        );
    }

    // If no related data, proceed with deletion
    await prisma.program.delete({
        where: { id },
    });

    revalidatePath("/admin/program/programs");
}
