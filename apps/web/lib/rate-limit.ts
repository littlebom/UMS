"use server";

import { cookies } from "next/headers";
import { loginAttemptsStore, RATE_LIMIT_CONFIG } from "./rate-limit-cleanup";

// Re-export for backward compatibility
const loginAttempts = loginAttemptsStore;

/**
 * Get client identifier (IP address or session ID)
 */
async function getClientId(): Promise<string> {
    // Try to get from cookies first (for consistent tracking)
    const clientCookie = (await cookies()).get("client_id");

    if (clientCookie) {
        return clientCookie.value;
    }

    // Generate new client ID
    const newClientId = crypto.randomUUID();
    (await cookies()).set({
        name: "client_id",
        value: newClientId,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: "/",
    });

    return newClientId;
}

/**
 * Check if client is rate limited
 * Returns error message if blocked, null if allowed
 */
export async function checkRateLimit(identifier?: string): Promise<string | null> {
    const clientId = identifier || await getClientId();
    const now = Date.now();
    const attempt = loginAttempts.get(clientId);

    if (!attempt) {
        return null; // No previous attempts
    }

    // Check if currently blocked
    if (attempt.blockedUntil && now < attempt.blockedUntil) {
        const remainingMinutes = Math.ceil((attempt.blockedUntil - now) / 60000);
        return `Too many login attempts. Please try again in ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}.`;
    }

    // Check if window has expired
    if (now - attempt.firstAttempt > RATE_LIMIT_CONFIG.windowMs) {
        // Reset the attempt counter
        loginAttempts.delete(clientId);
        return null;
    }

    // Check if max attempts reached
    if (attempt.count >= RATE_LIMIT_CONFIG.maxAttempts) {
        // Block the client
        attempt.blockedUntil = now + RATE_LIMIT_CONFIG.blockDurationMs;
        loginAttempts.set(clientId, attempt);

        const blockMinutes = Math.ceil(RATE_LIMIT_CONFIG.blockDurationMs / 60000);
        return `Too many login attempts. Your account has been temporarily blocked for ${blockMinutes} minutes.`;
    }

    return null; // Allowed
}

/**
 * Record a failed login attempt
 */
export async function recordFailedAttempt(identifier?: string): Promise<void> {
    const clientId = identifier || await getClientId();
    const now = Date.now();
    const attempt = loginAttempts.get(clientId);

    if (!attempt) {
        // First attempt
        loginAttempts.set(clientId, {
            count: 1,
            firstAttempt: now,
        });
    } else if (now - attempt.firstAttempt > RATE_LIMIT_CONFIG.windowMs) {
        // Window expired, reset
        loginAttempts.set(clientId, {
            count: 1,
            firstAttempt: now,
        });
    } else {
        // Increment counter
        attempt.count++;
        loginAttempts.set(clientId, attempt);
    }
}

/**
 * Reset rate limit for a client (on successful login)
 */
export async function resetRateLimit(identifier?: string): Promise<void> {
    const clientId = identifier || await getClientId();
    loginAttempts.delete(clientId);
}

/**
 * Get remaining attempts for a client
 */
export async function getRemainingAttempts(identifier?: string): Promise<number> {
    const clientId = identifier || await getClientId();
    const attempt = loginAttempts.get(clientId);

    if (!attempt) {
        return RATE_LIMIT_CONFIG.maxAttempts;
    }

    const now = Date.now();

    // Check if window expired
    if (now - attempt.firstAttempt > RATE_LIMIT_CONFIG.windowMs) {
        return RATE_LIMIT_CONFIG.maxAttempts;
    }

    return Math.max(0, RATE_LIMIT_CONFIG.maxAttempts - attempt.count);
}

/**
 * Clean up old entries (should be called periodically)
 */
export async function cleanupRateLimitStore(): Promise<void> {
    const now = Date.now();
    const expiredTime = now - RATE_LIMIT_CONFIG.windowMs - RATE_LIMIT_CONFIG.blockDurationMs;

    const entries = Array.from(loginAttempts.entries());
    for (const [clientId, attempt] of entries) {
        if (attempt.firstAttempt < expiredTime) {
            loginAttempts.delete(clientId);
        }
    }
}

