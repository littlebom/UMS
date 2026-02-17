import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@ums/lib";

export default async function StudentCardDebugPage() {
    const session = await getServerSession(authOptions);

    // Check if user is logged in
    if (!session) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow">
                    <h1 className="mb-4 text-2xl font-bold text-red-600">No Session</h1>
                    <p>You are not logged in. Please <a href="/login" className="text-blue-600 underline">login</a>.</p>
                </div>
            </div>
        );
    }

    // Check role
    if (session.user.role !== "STUDENT") {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow">
                    <h1 className="mb-4 text-2xl font-bold text-orange-600">Wrong Role</h1>
                    <p>Your role is: <strong>{session.user.role}</strong></p>
                    <p>This page is only for STUDENT role.</p>
                </div>
            </div>
        );
    }

    // Get user from database
    let user;
    try {
        user = await prisma.user.findUnique({
            where: { email: session.user.email! },
            include: { studentProfile: true },
        });
    } catch (error: any) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow">
                    <h1 className="mb-4 text-2xl font-bold text-red-600">Database Error</h1>
                    <p>Error: {error.message}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow">
                    <h1 className="mb-4 text-2xl font-bold text-red-600">User Not Found</h1>
                    <p>Email: {session.user.email}</p>
                </div>
            </div>
        );
    }

    if (!user.studentProfile) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow">
                    <h1 className="mb-4 text-2xl font-bold text-red-600">No Student Profile</h1>
                    <p>User ID: {user.id}</p>
                    <p>Email: {user.email}</p>
                </div>
            </div>
        );
    }

    // Success - show debug info
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow">
                <h1 className="mb-4 text-2xl font-bold text-green-600">✓ Debug Info</h1>

                <div className="space-y-4">
                    <div>
                        <h2 className="font-semibold">Session:</h2>
                        <pre className="mt-2 rounded bg-gray-100 p-4 text-sm">
                            {JSON.stringify(session, null, 2)}
                        </pre>
                    </div>

                    <div>
                        <h2 className="font-semibold">User:</h2>
                        <pre className="mt-2 rounded bg-gray-100 p-4 text-sm">
                            {JSON.stringify({
                                id: user.id,
                                email: user.email,
                                role: user.role,
                            }, null, 2)}
                        </pre>
                    </div>

                    <div>
                        <h2 className="font-semibold">Student Profile:</h2>
                        <pre className="mt-2 rounded bg-gray-100 p-4 text-sm">
                            {JSON.stringify(user.studentProfile, null, 2)}
                        </pre>
                    </div>

                    <div className="mt-6">
                        <a
                            href="/student/card"
                            className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Try /student/card again
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
