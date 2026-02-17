import Link from "next/link";
import { getFaculties } from "@/actions/faculty";
import { getDepartments } from "@/actions/department";
import { getPrograms } from "@/actions/program";
import { getCourses } from "@/actions/course";
import { Building2, GraduationCap, BookOpen, Library } from "lucide-react";

export default async function ProgramDashboard() {
    const [faculties, departments, programs, courses] = await Promise.all([
        getFaculties(),
        getDepartments(),
        getPrograms(),
        getCourses(),
    ]);

    const stats = [
        {
            title: "Faculties",
            count: faculties.length,
            href: "/admin/academic/program/faculties",
            color: "text-blue-600",
            icon: Building2,
        },
        {
            title: "Departments",
            count: departments.length,
            href: "/admin/academic/program/departments",
            color: "text-green-600",
            icon: Library,
        },
        {
            title: "Programs",
            count: programs.length,
            href: "/admin/academic/program/programs",
            color: "text-purple-600",
            icon: GraduationCap,
        },
        {
            title: "Courses",
            count: courses.length,
            href: "/admin/academic/program/courses",
            color: "text-orange-600",
            icon: BookOpen,
        },
    ];

    return (
        <div className="container mx-auto py-10">
            <h1 className="mb-8 text-3xl font-bold">Program Management Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
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
                            <div className={`p-3 ${stat.color}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">Quick Links</h2>
                <div className="grid gap-3 md:grid-cols-2">
                    <Link
                        href="/admin/academic/program/faculties"
                        className="rounded border border-gray-300 p-3 hover:bg-gray-50"
                    >
                        <h3 className="font-medium">Manage Faculties</h3>
                        <p className="text-sm text-gray-600">Create and manage faculty information</p>
                    </Link>
                    <Link
                        href="/admin/academic/program/departments"
                        className="rounded border border-gray-300 p-3 hover:bg-gray-50"
                    >
                        <h3 className="font-medium">Manage Departments</h3>
                        <p className="text-sm text-gray-600">Organize departments under faculties</p>
                    </Link>
                    <Link
                        href="/admin/academic/program/programs"
                        className="rounded border border-gray-300 p-3 hover:bg-gray-50"
                    >
                        <h3 className="font-medium">Manage Programs</h3>
                        <p className="text-sm text-gray-600">Create academic programs</p>
                    </Link>
                    <Link
                        href="/admin/academic/program/courses"
                        className="rounded border border-gray-300 p-3 hover:bg-gray-50"
                    >
                        <h3 className="font-medium">Manage Courses</h3>
                        <p className="text-sm text-gray-600">Define course catalog</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
