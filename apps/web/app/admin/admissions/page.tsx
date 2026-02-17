import Link from "next/link";
import { getAdmissionsStats } from "@/actions/admission";
import { FileText, Calendar, Clock, CheckCircle, GraduationCap } from "lucide-react";

export default async function AdmissionsDashboard() {
    const stats = await getAdmissionsStats();

    const statCards = [
        {
            title: "Applications",
            count: stats.totalApplications,
            href: "/admin/admissions/applications",
            color: "text-blue-600",
            icon: FileText,
            description: "Total applications received",
        },
        {
            title: "Interviews",
            count: stats.interviewSlots,
            href: "/admin/admissions/interviews",
            color: "text-purple-600",
            icon: Calendar,
            description: "Scheduled interview slots",
        },
        {
            title: "Pending Review",
            count: stats.pendingApplications,
            href: "/admin/admissions/applications?status=SUBMITTED",
            color: "text-orange-600",
            icon: Clock,
            description: "Applications awaiting review",
        },
        {
            title: "Accepted",
            count: stats.acceptedApplications,
            href: "/admin/admissions/applications?status=ACCEPTED",
            color: "text-green-600",
            icon: CheckCircle,
            description: "Accepted students",
        },
    ];

    return (
        <div className="container mx-auto py-10">
            <h1 className="mb-8 text-3xl font-bold">Admissions Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <Link
                        key={stat.title}
                        href={stat.href}
                        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.count}</p>
                            </div>
                            <div className={`p-3 ${stat.color} bg-opacity-10 rounded-full`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-gray-500">{stat.description}</p>
                    </Link>
                ))}
            </div>

            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    <Link
                        href="/admin/admissions/applications"
                        className="flex items-center gap-3 rounded border border-gray-300 p-4 hover:bg-gray-50"
                    >
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                            <h3 className="font-medium">Manage Applications</h3>
                            <p className="text-sm text-gray-600">Review and process applications</p>
                        </div>
                    </Link>
                    <Link
                        href="/admin/admissions/interviews"
                        className="flex items-center gap-3 rounded border border-gray-300 p-4 hover:bg-gray-50"
                    >
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <div>
                            <h3 className="font-medium">Interview Schedule</h3>
                            <p className="text-sm text-gray-600">Manage interview slots and assignments</p>
                        </div>
                    </Link>
                    <Link
                        href="/admin/students"
                        className="flex items-center gap-3 rounded border border-gray-300 p-4 hover:bg-gray-50"
                    >
                        <GraduationCap className="h-5 w-5 text-green-600" />
                        <div>
                            <h3 className="font-medium">Student Management</h3>
                            <p className="text-sm text-gray-600">View enrolled students</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Seed Data Section (Temporary) */}
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">Development Tools</h2>
                <form
                    action={async () => {
                        "use server";
                        const { seedAdmissionsData } = await import("@/actions/seed-admissions");
                        await seedAdmissionsData();
                    }}
                >
                    <button
                        type="submit"
                        className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                        🌱 Seed Mock Admissions Data
                    </button>
                </form>
            </div>
        </div>
    );
}
