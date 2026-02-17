"use server";

import { prisma } from "@ums/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function loginInstructor(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            personnelProfile: true,
        },
    });

    if (!user || user.role !== "INSTRUCTOR" || !user.personnelProfile) {
        throw new Error("Invalid credentials or not an instructor account");
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
        throw new Error("Invalid credentials");
    }

    // Set Session Cookie
    const sessionData = JSON.stringify({
        userId: user.id,
        role: user.role,
        instructorId: user.personnelProfile.id,
        firstName: user.personnelProfile.firstName,
        lastName: user.personnelProfile.lastName,
    });

    (await cookies()).set("instructor_session", sessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
    });

    redirect("/instructor/dashboard");
}

export async function logoutInstructor() {
    (await cookies()).delete("instructor_session");
    redirect("/instructor/login");
}

export async function getInstructorSession() {
    const sessionCookie = (await cookies()).get("instructor_session");
    if (!sessionCookie) return null;
    try {
        return JSON.parse(sessionCookie.value);
    } catch (e) {
        return null;
    }
}
