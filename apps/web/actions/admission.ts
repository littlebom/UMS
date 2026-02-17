"use server";

import { prisma, ApplicationStatus } from "@ums/lib";
import { revalidatePath } from "next/cache";

export async function getApplications() {
    return await prisma.application.findMany({
        include: {
            applicant: true,
            program: {
                include: {
                    faculty: true,
                },
            },
        },
        orderBy: {
            submittedAt: "desc",
        },
    });
}

export async function getApplicationById(id: string) {
    return await prisma.application.findUnique({
        where: { id },
        include: {
            applicant: {
                include: {
                    user: true,
                },
            },
            program: {
                include: {
                    faculty: true,
                    department: true,
                },
            },
            documents: true,
            interview: {
                include: {
                    slot: {
                        include: {
                            interviewers: {
                                include: {
                                    interviewer: true,
                                },
                            },
                            program: true,
                        },
                    },
                },
            },
        },
    });
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
    await prisma.application.update({
        where: { id },
        data: { status },
    });

    revalidatePath("/admin/admissions");
    revalidatePath(`/admin/admissions/${id}`);
}

// For Development/Testing purposes
export async function createMockApplication(data: {
    firstName: string;
    lastName: string;
    email: string;
    programId: string;
}) {
    const bcrypt = require("bcryptjs");
    const passwordHash = await bcrypt.hash("password123", 10);

    // 1. Create User
    const user = await prisma.user.create({
        data: {
            email: data.email,
            passwordHash,
            role: "APPLICANT",
        },
    });

    // 2. Create Applicant Profile
    const applicant = await prisma.applicant.create({
        data: {
            userId: user.id,
            firstName: data.firstName,
            lastName: data.lastName,
            citizenId: Math.floor(Math.random() * 10000000000000).toString().padStart(13, "0"), // Mock Citizen ID (13 digits)
            phone: "0812345678",
            birthDate: new Date("2005-01-01"),
            address: "123 Mock Street, Bangkok, Thailand 10100",
        },
    });

    // 3. Create Application
    await prisma.application.create({
        data: {
            applicantId: applicant.id,
            programId: data.programId,
            status: "SUBMITTED",
            submittedAt: new Date(),
        },
    });

    revalidatePath("/admin/admissions");
}

export async function submitApplication(data: {
    applicantId: string;
    programId: string;
}) {
    // Create application (no need to update applicant data as it already exists from registration)
    const application = await prisma.application.create({
        data: {
            applicantId: data.applicantId,
            programId: data.programId,
            status: "SUBMITTED",
            submittedAt: new Date(),
        },
    });

    revalidatePath("/admissions/dashboard");
    return application.id;
}

export async function convertApplicantToStudent(applicationId: string) {
    // 1. Get application with applicant info
    const application = await prisma.application.findUnique({
        where: { id: applicationId },
        include: {
            applicant: {
                include: {
                    user: true,
                },
            },
            program: true,
        },
    });

    if (!application) {
        throw new Error("Application not found");
    }

    if (application.status !== "ACCEPTED") {
        throw new Error("Only accepted applications can be converted to students");
    }

    // 2. Check if already converted
    const existingStudent = await prisma.student.findUnique({
        where: { userId: application.applicant.userId },
    });

    if (existingStudent) {
        throw new Error("This applicant has already been converted to a student");
    }

    // 3. Generate Student ID (Format: YYXXXXXX where YY = year, XXXXXX = sequential)
    const currentYear = new Date().getFullYear();
    const yearPrefix = currentYear.toString().slice(-2); // Last 2 digits of year

    // Find the latest student ID for this year
    const latestStudent = await prisma.student.findFirst({
        where: {
            studentId: {
                startsWith: yearPrefix,
            },
        },
        orderBy: {
            studentId: "desc",
        },
    });

    let newStudentId: string;
    if (latestStudent) {
        // Increment the last student ID
        const lastNumber = parseInt(latestStudent.studentId.slice(2));
        const nextNumber = lastNumber + 1;
        newStudentId = `${yearPrefix}${nextNumber.toString().padStart(6, "0")}`;
    } else {
        // First student of the year
        newStudentId = `${yearPrefix}010001`;
    }

    // 4. Create Student record with all applicant data
    await prisma.student.create({
        data: {
            studentId: newStudentId,
            userId: application.applicant.userId,
            // Personal Information
            title: application.applicant.title,
            firstName: application.applicant.firstName,
            lastName: application.applicant.lastName,
            firstNameTh: application.applicant.firstNameTh,
            lastNameTh: application.applicant.lastNameTh,
            nationality: application.applicant.nationality,
            citizenId: application.applicant.citizenId,
            birthDate: application.applicant.birthDate || new Date(),
            gender: application.applicant.gender,
            phone: application.applicant.phone,
            profileImageUrl: application.applicant.profileImageUrl,
            // Address Information
            address: application.applicant.address,
            subDistrict: application.applicant.subDistrict,
            district: application.applicant.district,
            province: application.applicant.province,
            zipCode: application.applicant.zipCode,
            // Academic Information
            programId: application.programId,
            status: "STUDYING",
            gpax: 0.0,
        },
    });

    // 5. Update User role to STUDENT
    await prisma.user.update({
        where: { id: application.applicant.userId },
        data: { role: "STUDENT" },
    });

    // 6. Update Application status to ENROLLED
    await prisma.application.update({
        where: { id: applicationId },
        data: { status: "ENROLLED" },
    });

    revalidatePath(`/admin/admissions/${applicationId}`);
    revalidatePath("/admin/admissions");
    revalidatePath("/admin/students");

    return newStudentId;
}

export async function deleteApplication(id: string) {
    await prisma.application.delete({
        where: { id },
    });

    revalidatePath("/admin/admissions");
}

export async function getAdmissionsStats() {
    const [
        totalApplications,
        interviewSlots,
        pendingApplications,
        acceptedApplications
    ] = await Promise.all([
        prisma.application.count(),
        prisma.interviewSlot.count(),
        prisma.application.count({ where: { status: "SUBMITTED" } }),
        prisma.application.count({ where: { status: "ACCEPTED" } }),
    ]);

    return {
        totalApplications,
        interviewSlots,
        pendingApplications,
        acceptedApplications
    };
}

