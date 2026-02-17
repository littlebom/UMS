import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get NextAuth token
    // Note: secret must match NEXTAUTH_SECRET in .env
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    const isAuthenticated = !!token;
    const userRole = token?.role as string | undefined;

    // ========================================
    // 1. Admin Routes Protection
    // ========================================
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/api/auth/signin', request.url));
        }
        if (userRole !== 'ADMIN' && userRole !== 'STAFF') {
            // Redirect to appropriate dashboard based on role, or show error
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // ========================================
    // 2. Student Routes Protection
    // ========================================
    if (pathname.startsWith('/student') && !pathname.startsWith('/student/login')) {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/api/auth/signin', request.url));
        }
        if (userRole !== 'STUDENT') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // ========================================
    // 3. Instructor Routes Protection
    // ========================================
    if (pathname.startsWith('/instructor') && !pathname.startsWith('/instructor/login')) {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/api/auth/signin', request.url));
        }
        if (userRole !== 'INSTRUCTOR') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // ========================================
    // 4. Applicant Routes Protection
    // ========================================
    if (pathname.startsWith('/admissions') &&
        pathname !== '/admissions' &&
        !pathname.startsWith('/admissions/login') &&
        !pathname.startsWith('/admissions/register')) {

        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/api/auth/signin', request.url));
        }
        if (userRole !== 'APPLICANT') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // ========================================
    // 5. Redirect logged-in users away from login pages
    // ========================================
    if (isAuthenticated) {
        if (pathname === '/admin/login' ||
            pathname === '/student/login' ||
            pathname === '/instructor/login' ||
            pathname === '/admissions/login' ||
            pathname === '/login') {

            // Redirect to dashboard based on role
            switch (userRole) {
                case 'ADMIN':
                case 'STAFF':
                    return NextResponse.redirect(new URL('/admin', request.url));
                case 'STUDENT':
                    return NextResponse.redirect(new URL('/student/dashboard', request.url));
                case 'INSTRUCTOR':
                    return NextResponse.redirect(new URL('/instructor/dashboard', request.url));
                case 'APPLICANT':
                    return NextResponse.redirect(new URL('/admissions/dashboard', request.url));
                default:
                    return NextResponse.redirect(new URL('/', request.url));
            }
        }
    }

    return NextResponse.next();
}

// Configure which routes should be protected
export const config = {
    matcher: [
        '/admin/:path*',
        '/student/:path*',
        '/instructor/:path*',
        '/admissions/:path*',
    ],
};
