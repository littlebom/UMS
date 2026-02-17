import { SubNavigation } from "@/components/sub-navigation";
import { getInstructors, getInstructorStats } from "@/actions/user-instructors";
import { BookOpen, Users, Calendar, BarChart3, Search } from "lucide-react";
import Link from "next/link";

const subNavItems = [
    { label: "All Instructors", href: "/admin/users/instructors" },
    { label: "Full-time Faculty", href: "/admin/users/instructors/fulltime" },
    { label: "Part-time Faculty", href: "/admin/users/instructors/parttime" },
    { label: "Teaching Assignments", href: "/admin/users/instructors/assignments" },
    { label: "Reports", href: "/admin/users/instructors/reports" },
];

export default async function InstructorsPage() {
    const [instructorsResult, statsResult] = await Promise.all([
        getInstructors(),
        getInstructorStats(),
    ]);

    const instructors = instructorsResult.success ? instructorsResult.instructors : [];
    const stats = statsResult.success ? statsResult.stats : {
        total: 0,
        fullTime: 0,
        partTime: 0,
        avgTeachingHours: 0,
    };

    return (
        <div className="flex h-full flex-col">
            <SubNavigation items={subNavItems} />

            <div className="flex-1 space-y-6 p-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Instructors</h1>
                    <p className="text-muted-foreground">
                        Manage faculty members, teaching assignments, and workload
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Instructors</p>
                                <p className="text-2xl font-bold">{stats.total}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Full-time</p>
                                <p className="text-2xl font-bold">{stats.fullTime}</p>
                            </div>
                            <BookOpen className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Part-time</p>
                                <p className="text-2xl font-bold">{stats.partTime}</p>
                            </div>
                            <Calendar className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Avg. Teaching Hours</p>
                                <p className="text-2xl font-bold">{stats.avgTeachingHours}</p>
                            </div>
                            <BarChart3 className="h-8 w-8 text-orange-600" />
                        </div>
                    </div>
                </div>

                {/* Search and Actions */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm"
                        />
                    </div>
                    <Link href="/admin/users/instructors/create">
                        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                            Add Instructor
                        </button>
                    </Link>
                </div>

                {/* Instructors Table */}
                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Faculty Directory ({instructors?.length || 0})</h2>

                        {instructors && instructors.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr className="text-left text-sm text-muted-foreground">
                                            <th className="pb-3 font-medium">Name</th>
                                            <th className="pb-3 font-medium">Position</th>
                                            <th className="pb-3 font-medium">Faculty</th>
                                            <th className="pb-3 font-medium">Department</th>
                                            <th className="pb-3 font-medium">Sections</th>
                                            <th className="pb-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {instructors.map((instructor: any) => (
                                            <tr key={instructor.id} className="text-sm">
                                                <td className="py-3">
                                                    <div>
                                                        <p className="font-medium">
                                                            {instructor.title} {instructor.firstName} {instructor.lastName}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">{instructor.user?.email}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3">{instructor.position || "Instructor"}</td>
                                                <td className="py-3">{instructor.faculty?.nameEn || "-"}</td>
                                                <td className="py-3">{instructor.department?.nameEn || "-"}</td>
                                                <td className="py-3">{instructor.instructedSections?.length || 0} sections</td>
                                                <td className="py-3">
                                                    <Link
                                                        href={`/admin/users/instructors/${instructor.id}`}
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <BookOpen className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p>No instructors found</p>
                                <p className="text-sm">Add faculty members to get started</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
