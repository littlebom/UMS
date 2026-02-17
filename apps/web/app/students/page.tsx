import { prisma } from "@ums/lib";
import { Users, GraduationCap, Mail, Phone, Calendar } from "lucide-react";
import Link from "next/link";

export default async function StudentsPage() {
    // Fetch all students with their profiles
    const students = await prisma.user.findMany({
        where: {
            role: "STUDENT",
        },
        include: {
            studentProfile: {
                include: {
                    program: {
                        include: {
                            faculty: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Students Directory</h1>
                                <p className="text-sm text-gray-600">
                                    {students.length} {students.length === 1 ? "student" : "students"} registered
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/login"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {students.length === 0 ? (
                    <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
                        <Users className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">No students found</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            There are no students registered in the system yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {students.map((student) => (
                            <div
                                key={student.id}
                                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 transition-all hover:shadow-xl hover:-translate-y-1"
                            >
                                {/* Gradient accent */}
                                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

                                {/* Avatar */}
                                <div className="mb-4 flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 font-semibold text-lg">
                                        {student.email.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate">
                                            {student.studentProfile?.firstNameEn || "N/A"}{" "}
                                            {student.studentProfile?.lastNameEn || ""}
                                        </h3>
                                        <p className="text-xs text-gray-500 truncate">
                                            {student.studentProfile?.studentId || "No Student ID"}
                                        </p>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2 text-sm">
                                        <Mail className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-600 truncate">{student.email}</span>
                                    </div>

                                    {student.phoneNumber && (
                                        <div className="flex items-start gap-2 text-sm">
                                            <Phone className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-600">{student.phoneNumber}</span>
                                        </div>
                                    )}

                                    {student.studentProfile?.program && (
                                        <div className="mt-4 rounded-lg bg-blue-50 px-3 py-2">
                                            <p className="text-xs font-medium text-blue-900 truncate">
                                                {student.studentProfile.program.nameEn}
                                            </p>
                                            <p className="text-xs text-blue-700 truncate">
                                                {student.studentProfile.program.faculty?.nameEn}
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                                        <Calendar className="h-3 w-3" />
                                        <span>
                                            Joined {new Date(student.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-500">
                    © 2024 University Management System. All rights reserved.
                </p>
            </div>
        </div>
    );
}
