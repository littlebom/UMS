import Link from "next/link";
import { getPersonnel } from "@/actions/personnel";
import { Users, UserCheck, GraduationCap, Shield } from "lucide-react";

export default async function PersonnelDashboard() {
    const personnel = await getPersonnel();

    const staff = personnel.filter((p) => p.user.role === "STAFF");
    const instructors = personnel.filter((p) => p.user.role === "INSTRUCTOR");
    const admins = personnel.filter((p) => p.user.role === "ADMIN");

    const stats = [
        {
            title: "Total Personnel",
            count: personnel.length,
            color: "text-blue-600",
            icon: Users,
        },
        {
            title: "Staff",
            count: staff.length,
            href: "/admin/personnel/staff",
            color: "text-green-600",
            icon: UserCheck,
        },
        {
            title: "Instructors",
            count: instructors.length,
            href: "/admin/personnel/instructors",
            color: "text-purple-600",
            icon: GraduationCap,
        },
        {
            title: "Administrators",
            count: admins.length,
            color: "text-orange-600",
            icon: Shield,
        },
    ];

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Personnel Overview</h1>
                <Link
                    href="/admin/personnel/create"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Add Personnel
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                        {stat.href && (
                            <Link href={stat.href} className="absolute inset-0 z-10">
                                <span className="sr-only">View {stat.title}</span>
                            </Link>
                        )}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    {stat.title}
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {stat.count}
                                </p>
                            </div>
                            <div className={`p-3 ${stat.color}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">Recent Personnel</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b text-left text-sm text-gray-600">
                                <th className="pb-3">Name</th>
                                <th className="pb-3">Position</th>
                                <th className="pb-3">Role</th>
                                <th className="pb-3">Faculty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personnel.slice(0, 10).map((person) => (
                                <tr key={person.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3">
                                        <div>
                                            <p className="font-medium">
                                                {person.title} {person.firstName} {person.lastName}
                                            </p>
                                            <p className="text-sm text-gray-500">{person.user.email}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 text-sm">{person.position || "-"}</td>
                                    <td className="py-3">
                                        <span
                                            className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${person.user.role === "ADMIN"
                                                ? "bg-orange-100 text-orange-800"
                                                : person.user.role === "INSTRUCTOR"
                                                    ? "bg-purple-100 text-purple-800"
                                                    : "bg-green-100 text-green-800"
                                                }`}
                                        >
                                            {person.user.role}
                                        </span>
                                    </td>
                                    <td className="py-3 text-sm">
                                        {person.faculty?.nameEn || "-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {personnel.length === 0 && (
                        <div className="py-8 text-center text-gray-500">
                            No personnel found. Add your first personnel member to get started.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
