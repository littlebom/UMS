"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getCourses() {
    return await prisma.course.findMany({
        orderBy: { code: "asc" },
    });
}

export async function getCourseById(id: string) {
    return await prisma.course.findUnique({
        where: { id },
    });
}

export async function createCourse(formData: FormData) {
    const code = formData.get("code") as string;
    const nameTh = formData.get("nameTh") as string;
    const nameEn = formData.get("nameEn") as string;
    const credits = parseInt(formData.get("credits") as string);
    const description = formData.get("description") as string;
    const learningOutcomes = formData.get("learningOutcomes") as string;
    const syllabusUrl = formData.get("syllabusUrl") as string;

    // Enrollment Requirements
    const minYearLevel = formData.get("minYearLevel") as string;
    const allowedStudentTypes = formData.get("allowedStudentTypes") as string;
    const allowedPrograms = formData.get("allowedPrograms") as string;
    const minGpax = formData.get("minGpax") as string;
    const prerequisiteCourses = formData.get("prerequisiteCourses") as string;
    const maxEnrollment = formData.get("maxEnrollment") as string;
    const requiresApproval = formData.get("requiresApproval") === "true";

    await prisma.course.create({
        data: {
            code,
            nameTh,
            nameEn,
            credits,
            description: description || null,
            learningOutcomes: learningOutcomes || null,
            syllabusUrl: syllabusUrl || null,
            // Enrollment Requirements
            minYearLevel: minYearLevel ? parseInt(minYearLevel) : null,
            allowedStudentTypes: allowedStudentTypes || null,
            allowedPrograms: allowedPrograms || null,
            minGpax: minGpax ? parseFloat(minGpax) : null,
            prerequisiteCourses: prerequisiteCourses || null,
            maxEnrollment: maxEnrollment ? parseInt(maxEnrollment) : null,
            requiresApproval,
        },
    });

    revalidatePath("/admin/academic/program/courses");
    redirect("/admin/academic/program/courses");
}

export async function updateCourse(id: string, formData: FormData) {
    const code = formData.get("code") as string;
    const nameTh = formData.get("nameTh") as string;
    const nameEn = formData.get("nameEn") as string;
    const credits = parseInt(formData.get("credits") as string);
    const description = formData.get("description") as string;
    const learningOutcomes = formData.get("learningOutcomes") as string;
    const syllabusUrl = formData.get("syllabusUrl") as string;

    // Enrollment Requirements
    const minYearLevel = formData.get("minYearLevel") as string;
    const allowedStudentTypes = formData.get("allowedStudentTypes") as string;
    const allowedPrograms = formData.get("allowedPrograms") as string;
    const minGpax = formData.get("minGpax") as string;
    const prerequisiteCourses = formData.get("prerequisiteCourses") as string;
    const maxEnrollment = formData.get("maxEnrollment") as string;
    const requiresApproval = formData.get("requiresApproval") === "true";

    await prisma.course.update({
        where: { id },
        data: {
            code,
            nameTh,
            nameEn,
            credits,
            description: description || null,
            learningOutcomes: learningOutcomes || null,
            syllabusUrl: syllabusUrl || null,
            // Enrollment Requirements
            minYearLevel: minYearLevel ? parseInt(minYearLevel) : null,
            allowedStudentTypes: allowedStudentTypes || null,
            allowedPrograms: allowedPrograms || null,
            minGpax: minGpax ? parseFloat(minGpax) : null,
            prerequisiteCourses: prerequisiteCourses || null,
            maxEnrollment: maxEnrollment ? parseInt(maxEnrollment) : null,
            requiresApproval,
        },
    });

    revalidatePath("/admin/academic/program/courses");
    redirect("/admin/academic/program/courses");
}

export async function deleteCourse(id: string) {
    // Check for related data
    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            sections: true,
        },
    });

    if (!course) {
        throw new Error("Course not found");
    }

    // Check if course has related data
    if (course.sections.length > 0) {
        throw new Error(
            `Cannot delete this course. It has ${course.sections.length} section(s). Please remove them first.`
        );
    }

    // If no related data, proceed with deletion
    await prisma.course.delete({
        where: { id },
    });

    revalidatePath("/admin/academic/program/courses");
}
