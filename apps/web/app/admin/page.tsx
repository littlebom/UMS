import Link from "next/link";
import { BookOpen, Users, GraduationCap, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
    const modules = [
        {
            title: "Program Management",
            description: "Manage faculties, departments, programs, and courses.",
            href: "/admin/academic/program",
            icon: BookOpen,
            color: "text-blue-600",
        },
        {
            title: "Personnel Management",
            description: "Manage staff, instructors, and administrators.",
            href: "/admin/personnel",
            icon: Users,
            color: "text-green-600",
        },
        {
            title: "Student Management",
            description: "Manage student roster and profiles.",
            href: "/admin/students",
            icon: GraduationCap,
            color: "text-purple-600",
        },
        // Future modules can be added here
    ];

    return (
        <div className="container mx-auto py-10">
            <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {modules.map((module) => (
                    <Link
                        key={module.title}
                        href={module.href}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                    >
                        <div className="flex items-start justify-between">
                            <div className={`p-3 ${module.color}`}>
                                <module.icon className="h-8 w-8" />
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                                    {module.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    {module.description}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                            Access Module <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
