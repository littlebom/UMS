"use server";

import { prisma } from "@ums/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function universalLogin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // 1. Find user with all profiles
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            personnelProfile: true,
            studentProfile: true,
            applicantProfile: true,
        },
    });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // 2. Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        throw new Error("Invalid email or password");
    }

    // 3. Create session based on role
    let sessionData: any = {
        userId: user.id,
        role: user.role,
    };

    let redirectPath = "/";

    switch (user.role) {
        case "ADMIN":
        case "STAFF":
            if (user.personnelProfile) {
                sessionData.personnelId = user.personnelProfile.id;
                sessionData.name = `${user.personnelProfile.firstName} ${user.personnelProfile.lastName}`;
            }
            (await cookies()).set("admin_session", JSON.stringify(sessionData), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/",
            });
            redirectPath = "/admin";
            break;

        case "INSTRUCTOR":
            if (user.personnelProfile) {
                sessionData.personnelId = user.personnelProfile.id;
                sessionData.name = `${user.personnelProfile.firstName} ${user.personnelProfile.lastName}`;
            }
            (await cookies()).set("instructor_session", JSON.stringify(sessionData), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            });
            redirectPath = "/instructor/dashboard";
            break;

        case "STUDENT":
            if (user.studentProfile) {
                sessionData.studentId = user.studentProfile.id;
                sessionData.studentCode = user.studentProfile.studentId;
                sessionData.name = `${user.studentProfile.firstName} ${user.studentProfile.lastName}`;
            }
            (await cookies()).set("student_session", JSON.stringify(sessionData), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            });
            redirectPath = "/student/dashboard";
            break;

        case "APPLICANT":
            if (user.applicantProfile) {
                sessionData.applicantId = user.applicantProfile.id;
                sessionData.name = `${user.applicantProfile.firstName} ${user.applicantProfile.lastName}`;
            }
            (await cookies()).set("applicant_session", JSON.stringify(sessionData), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            });
            redirectPath = "/admissions/dashboard";
            break;

        default:
            throw new Error("Invalid user role");
    }

    redirect(redirectPath);
}
