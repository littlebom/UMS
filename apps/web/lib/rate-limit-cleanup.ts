/**
 * Rate Limit Cleanup Scheduler
 * 
 * This file runs cleanup tasks periodically in the background.
 * It's separated from rate-limit.ts to avoid Server Actions restrictions.
 */

interface RateLimitAttempt {
    count: number;
    firstAttempt: number;
    blockedUntil?: number;
}

// Shared in-memory store (same reference as rate-limit.ts)
// This will be imported by rate-limit.ts
export const loginAttemptsStore = new Map<string, RateLimitAttempt>();

// Rate limit configuration
export const RATE_LIMIT_CONFIG = {
    maxAttempts: 5,           // Maximum login attempts
    windowMs: 15 * 60 * 1000, // 15 minutes window
    blockDurationMs: 30 * 60 * 1000, // Block for 30 minutes after max attempts
};

/**
 * Clean up old entries
 */
function cleanupExpiredEntries(): void {
    const now = Date.now();
    const expiredTime = now - RATE_LIMIT_CONFIG.windowMs - RATE_LIMIT_CONFIG.blockDurationMs;

    const entries = Array.from(loginAttemptsStore.entries());
    let cleanedCount = 0;

    for (const [clientId, attempt] of entries) {
        if (attempt.firstAttempt < expiredTime) {
            loginAttemptsStore.delete(clientId);
            cleanedCount++;
        }
    }

    if (cleanedCount > 0) {
        console.log(`[Rate Limit Cleanup] Removed ${cleanedCount} expired entries`);
    }
}

/**
 * Start cleanup scheduler
 * Runs every hour
 */
function startCleanupScheduler(): void {
    // Run cleanup every hour
    const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour

    setInterval(() => {
        cleanupExpiredEntries();
    }, CLEANUP_INTERVAL);

    // Run initial cleanup
    cleanupExpiredEntries();

    console.log('[Rate Limit Cleanup] Scheduler started (runs every 1 hour)');
}

// Auto-start scheduler when this module is imported
// Only run in Node.js environment (not in browser)
if (typeof window === 'undefined' && typeof setInterval !== 'undefined') {
    startCleanupScheduler();
}

export { cleanupExpiredEntries };
