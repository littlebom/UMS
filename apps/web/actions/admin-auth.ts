"use server";

import { prisma } from "@ums/lib";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { requireCsrfToken } from "@/lib/csrf";
import { checkRateLimit, recordFailedAttempt, resetRateLimit } from "@/lib/rate-limit";

/**
 * Login Admin – ตรวจสอบ email/password แล้วตั้ง cookie admin_session
 */
export async function loginAdmin(formData: FormData) {
    // CSRF Protection
    await requireCsrfToken(formData);

    // Rate Limiting Check
    const rateLimitError = await checkRateLimit();
    if (rateLimitError) {
        throw new Error(rateLimitError);
    }

    const email = (formData.get("email") as string)?.trim();
    const password = (formData.get("password") as string);

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            passwordHash: true,
            role: true,
            twoFactorEnabled: true,
            twoFactorSecret: true,
            personnelProfile: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });

    if (!user || user.role !== "ADMIN" || !user.personnelProfile) {
        await recordFailedAttempt(); // Record failed attempt
        throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
        await recordFailedAttempt(); // Record failed attempt
        throw new Error("Invalid credentials");
    }

    // Check if user has 2FA enabled
    if (user.twoFactorEnabled && user.twoFactorSecret) {
        // Store temporary session for 2FA verification
        (await cookies()).set({
            name: "admin_2fa_pending",
            value: JSON.stringify({
                userId: user.id,
                role: user.role,
                personnelId: user.personnelProfile.id,
            }),
            httpOnly: true,
            path: "/",
            maxAge: 5 * 60, // 5 minutes
        });

        // Redirect to 2FA verification page
        redirect("/admin/login/verify");
    }

    // No 2FA - proceed with normal login
    const session = {
        userId: user.id,
        role: user.role,
        personnelId: user.personnelProfile.id,
    };

    // Reset rate limit on successful login
    await resetRateLimit();

    (await cookies()).set({
        name: "admin_session",
        value: JSON.stringify(session),
        httpOnly: true,
        path: "/",
        // secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
    });

    redirect("/admin");
}

/** Logout Admin */
export async function logoutAdmin() {
    (await cookies()).delete("admin_session");
    redirect("/admin/login");
}

/**
 * Verify 2FA code and complete login
 */
export async function verify2FALogin(code: string) {
    // Get pending session
    const pendingCookie = (await cookies()).get("admin_2fa_pending");

    if (!pendingCookie) {
        throw new Error("No pending 2FA verification. Please login again.");
    }

    let pendingSession;
    try {
        pendingSession = JSON.parse(pendingCookie.value);
    } catch (e) {
        throw new Error("Invalid session data");
    }

    // Import verify function
    const { verify2FACode } = await import("@/lib/two-factor");

    // Verify the 2FA code
    const isValid = await verify2FACode(pendingSession.userId, code);

    if (!isValid) {
        await recordFailedAttempt();
        throw new Error("Invalid verification code");
    }

    // Delete pending session
    (await cookies()).delete("admin_2fa_pending");

    // Reset rate limit
    await resetRateLimit();

    // Create actual session
    (await cookies()).set({
        name: "admin_session",
        value: JSON.stringify(pendingSession),
        httpOnly: true,
        path: "/",
        // secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
    });

    redirect("/admin");
}
