"use server";

import { prisma } from "@ums/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerApplicant(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error("Email already registered");
    }

    const bcrypt = require("bcryptjs");
    const passwordHash = await bcrypt.hash(password, 10);

    // Create User & Applicant Profile
    const user = await prisma.user.create({
        data: {
            email,
            passwordHash,
            role: "APPLICANT",
            applicantProfile: {
                create: {
                    firstName,
                    lastName,
                },
            },
        },
        include: {
            applicantProfile: true,
        },
    });

    // Set Session Cookie (Simple implementation)
    // In production, use a secure session library or JWT
    const sessionData = JSON.stringify({ userId: user.id, role: user.role, applicantId: user.applicantProfile?.id });
    (await cookies()).set("applicant_session", sessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
    });

    redirect("/admissions/dashboard");
}

export async function loginApplicant(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            applicantProfile: true,
        },
    });

    if (!user || user.role !== "APPLICANT") {
        throw new Error("Invalid credentials");
    }

    const bcrypt = require("bcryptjs");
    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
        throw new Error("Invalid credentials");
    }

    // Set Session Cookie
    const sessionData = JSON.stringify({ userId: user.id, role: user.role, applicantId: user.applicantProfile?.id });
    (await cookies()).set("applicant_session", sessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
    });

    redirect("/admissions/dashboard");
}

export async function logoutApplicant() {
    (await cookies()).delete("applicant_session");
    redirect("/admissions/login");
}

export async function getApplicantSession() {
    const sessionCookie = (await cookies()).get("applicant_session");
    if (!sessionCookie) return null;
    try {
        return JSON.parse(sessionCookie.value);
    } catch (e) {
        return null;
    }
}

export async function getAdminSession() {
    const sessionCookie = (await cookies()).get("admin_session");
    if (!sessionCookie) return null;
    try {
        return JSON.parse(sessionCookie.value);
    } catch (e) {
        return null;
    }
}
