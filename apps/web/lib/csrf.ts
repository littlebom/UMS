"use server";

import { cookies } from "next/headers";
import crypto from "crypto";

/**
 * Generate a CSRF token and store it in cookies
 */
export async function generateCsrfToken(): Promise<string> {
    const token = crypto.randomBytes(32).toString("hex");

    (await cookies()).set({
        name: "csrf_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
    });

    return token;
}

/**
 * Verify CSRF token from form data against cookie
 */
export async function verifyCsrfToken(formToken: string): Promise<boolean> {
    const cookieToken = (await cookies()).get("csrf_token");

    if (!cookieToken || !formToken) {
        return false;
    }

    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
        Buffer.from(cookieToken.value),
        Buffer.from(formToken)
    );
}

/**
 * Get current CSRF token from cookies
 */
export async function getCsrfToken(): Promise<string | null> {
    const token = (await cookies()).get("csrf_token");
    return token?.value || null;
}

/**
 * Middleware helper to validate CSRF token
 * Throws error if token is invalid
 */
export async function requireCsrfToken(formData: FormData): Promise<void> {
    const formToken = formData.get("csrf_token") as string;

    if (!formToken) {
        throw new Error("CSRF token is missing");
    }

    const isValid = await verifyCsrfToken(formToken);

    if (!isValid) {
        throw new Error("Invalid CSRF token. Please refresh the page and try again.");
    }
}
