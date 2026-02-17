/**
 * Rate Limit Cleanup Initializer
 * 
 * This API route initializes the cleanup scheduler when the app starts.
 * It's called automatically by Next.js when the server starts.
 */

import { NextResponse } from 'next/server';

// Import to trigger the scheduler initialization
import '../../../lib/rate-limit-cleanup';

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        message: 'Rate limit cleanup scheduler is running'
    });
}

export const dynamic = 'force-dynamic';
