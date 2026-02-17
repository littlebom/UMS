import { getStudentEnrollments } from "@/actions/enrollment";
import { getStudentSession } from "@/actions/student-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, Settings, ExternalLink } from "lucide-react";

export default async function StudentDashboard() {
    const session = await getStudentSession();
    if (!session) {
        redirect("/student/login");
    }

    const enrollments = await getStudentEnrollments();

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
                <p className="text-gray-500">Student ID: {session.studentCode}</p>
            </header>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2">
                <Link
                    href={`/profile/student/${session.studentCode}`}
                    target="_blank"
                    className="group rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 hover:shadow-lg transition"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-blue-900">
                                <User className="h-5 w-5" />
                                <h3 className="font-semibold">View My e-Profile</h3>
                            </div>
                            <p className="mt-1 text-sm text-blue-700">
                                See how others view your profile
                            </p>
                        </div>
                        <ExternalLink className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition" />
                    </div>
                </Link>

                <Link
                    href="/student/profile-settings"
                    className="group rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-gray-900">
                                <Settings className="h-5 w-5" />
                                <h3 className="font-semibold">Profile Settings</h3>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                                Edit your profile and privacy settings
                            </p>
                        </div>
                        <ExternalLink className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition" />
                    </div>
                </Link>
            </div>

            {/* Enrolled Courses Card */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-6 py-4">
                    <h2 className="text-lg font-medium text-gray-900">Enrolled Courses</h2>
                </div>
                <div className="p-6">
                    {enrollments.length === 0 ? (
                        <div className="text-center text-gray-500">
                            <p>You haven't enrolled in any courses yet.</p>
                            <a href="/student/registration" className="mt-2 inline-block text-blue-600 hover:underline">
                                Go to Registration
                            </a>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Course Code</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Course Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Section</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Credits</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Schedule</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {enrollments.map((enrollment) => (
                                        <tr key={enrollment.id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                {enrollment.section.course.code}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {enrollment.section.course.nameEn}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {enrollment.section.sectionNumber}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {enrollment.section.course.credits}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {enrollment.section.schedules.map((s) => (
                                                    <div key={s.id}>
                                                        {s.day} {s.startTime}-{s.endTime} ({s.room})
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
