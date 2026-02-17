"use server";

import { prisma } from "@ums/lib";
import { getStudentSession } from "./student-auth";
import { revalidatePath } from "next/cache";

/**
 * Get public student profile by student ID
 * This is accessible to everyone (if profile is public)
 */
export async function getPublicStudentProfile(studentId: string) {
    const student = await prisma.student.findUnique({
        where: { studentId },
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
        },
    });

    if (!student) {
        return null;
    }

    // Check if profile is public
    if (!student.isProfilePublic) {
        return null;
    }

    // Return profile with privacy settings applied
    return {
        ...student,
        gpax: student.showGPA ? student.gpax : null,
        birthDate: null, // Never show full birthdate publicly
        user: {
            email: student.user.email, // Show email for contact
        },
    };
}

/**
 * Get student's own profile (for editing)
 * Requires authentication
 */
export async function getMyStudentProfile() {
    const session = await getStudentSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const student = await prisma.student.findUnique({
        where: { id: session.studentId },
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
        },
    });

    return student;
}

/**
 * Update student profile
 */
export async function updateStudentProfile(data: {
    bio?: string;
    interests?: string;
    skills?: string;
    socialLinks?: string;
}) {
    const session = await getStudentSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    await prisma.student.update({
        where: { id: session.studentId },
        data: {
            bio: data.bio || null,
            interests: data.interests || null,
            skills: data.skills || null,
            socialLinks: data.socialLinks || null,
        },
    });

    revalidatePath("/student/profile-settings");
    revalidatePath(`/profile/student/${session.studentCode}`);
}

/**
 * Update privacy settings
 */
export async function updatePrivacySettings(data: {
    isProfilePublic: boolean;
    showGPA: boolean;
}) {
    const session = await getStudentSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    await prisma.student.update({
        where: { id: session.studentId },
        data: {
            isProfilePublic: data.isProfilePublic,
            showGPA: data.showGPA,
        },
    });

    revalidatePath("/student/profile-settings");
    revalidatePath(`/profile/student/${session.studentCode}`);
}
