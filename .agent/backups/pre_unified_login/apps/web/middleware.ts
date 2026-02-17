import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ========================================
    // 1. Admin Routes Protection
    // ========================================
    // ========================================
    // 1. Admin Routes Protection
    // ========================================
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        const adminSession = request.cookies.get('admin_session');

        if (!adminSession) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Validate session data
        try {
            const session = JSON.parse(adminSession.value);
            if (!session.userId || session.role !== 'ADMIN') {
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // ========================================
    // 2. Student Routes Protection
    // ========================================
    if (pathname.startsWith('/student') && !pathname.startsWith('/student/login')) {
        const studentSession = request.cookies.get('student_session');

        if (!studentSession) {
            return NextResponse.redirect(new URL('/student/login', request.url));
        }

        // Validate session data
        try {
            const session = JSON.parse(studentSession.value);
            if (!session.userId || session.role !== 'STUDENT') {
                return NextResponse.redirect(new URL('/student/login', request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/student/login', request.url));
        }
    }

    // ========================================
    // 3. Instructor Routes Protection
    // ========================================
    if (pathname.startsWith('/instructor') && !pathname.startsWith('/instructor/login')) {
        const instructorSession = request.cookies.get('instructor_session');

        if (!instructorSession) {
            return NextResponse.redirect(new URL('/instructor/login', request.url));
        }

        // Validate session data
        try {
            const session = JSON.parse(instructorSession.value);
            if (!session.userId || session.role !== 'INSTRUCTOR') {
                return NextResponse.redirect(new URL('/instructor/login', request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/instructor/login', request.url));
        }
    }

    // ========================================
    // 4. Applicant Routes Protection
    // ========================================
    // ========================================
    // 4. Applicant Routes Protection
    // ========================================
    // Allow access to landing page (/admissions), login redirect, and register
    if (pathname.startsWith('/admissions') &&
        pathname !== '/admissions' &&
        !pathname.startsWith('/admissions/login') &&
        !pathname.startsWith('/admissions/register')) {

        const applicantSession = request.cookies.get('applicant_session');

        if (!applicantSession) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Validate session data
        try {
            const session = JSON.parse(applicantSession.value);
            if (!session.userId || session.role !== 'APPLICANT') {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // ========================================
    // 5. Redirect logged-in users away from login pages
    // ========================================
    if (pathname === '/admin/login') {
        const adminSession = request.cookies.get('admin_session');
        if (adminSession) {
            try {
                const session = JSON.parse(adminSession.value);
                if (session.userId && session.role === 'ADMIN') {
                    return NextResponse.redirect(new URL('/admin', request.url));
                }
            } catch (error) {
                // Invalid session, allow access to login page
            }
        }
    }

    if (pathname === '/student/login') {
        const studentSession = request.cookies.get('student_session');
        if (studentSession) {
            try {
                const session = JSON.parse(studentSession.value);
                if (session.userId && session.role === 'STUDENT') {
                    return NextResponse.redirect(new URL('/student/dashboard', request.url));
                }
            } catch (error) {
                // Invalid session, allow access to login page
            }
        }
    }

    if (pathname === '/instructor/login') {
        const instructorSession = request.cookies.get('instructor_session');
        if (instructorSession) {
            try {
                const session = JSON.parse(instructorSession.value);
                if (session.userId && session.role === 'INSTRUCTOR') {
                    return NextResponse.redirect(new URL('/instructor/dashboard', request.url));
                }
            } catch (error) {
                // Invalid session, allow access to login page
            }
        }
    }

    if (pathname === '/admissions/login') {
        const applicantSession = request.cookies.get('applicant_session');
        if (applicantSession) {
            try {
                const session = JSON.parse(applicantSession.value);
                if (session.userId && session.role === 'APPLICANT') {
                    return NextResponse.redirect(new URL('/admissions/dashboard', request.url));
                }
            } catch (error) {
                // Invalid session, allow access to login page
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
