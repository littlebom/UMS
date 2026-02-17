import { getStudents, getStudentStats } from "@/actions/user-students";
import { GraduationCap, Award, TrendingUp, Search, Users } from "lucide-react";
import Link from "next/link";

export default async function AlumniPage() {
    const [alumniResult, statsResult] = await Promise.all([
        getStudents({ status: "GRADUATED" }),
        getStudentStats(),
    ]);

    const alumni = alumniResult.success ? alumniResult.students : [];
    const stats = statsResult.success ? statsResult.stats : {
        total: 0,
        studying: 0,
        graduated: 0,
        onLeave: 0,
    };

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Alumni</h1>
                        <p className="text-muted-foreground">
                            Manage alumni records and maintain connections with graduates
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Alumni</p>
                                <p className="text-2xl font-bold">{stats.graduated}</p>
                            </div>
                            <Award className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">This Year</p>
                                <p className="text-2xl font-bold">
                                    {alumni?.filter((a: any) => {
                                        const gradYear = new Date(a.updatedAt).getFullYear();
                                        return gradYear === new Date().getFullYear();
                                    }).length || 0}
                                </p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">All Students</p>
                                <p className="text-2xl font-bold">{stats.total}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name, student ID, or graduation year..."
                            className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm"
                        />
                    </div>
                </div>

                {/* Alumni Table */}
                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Alumni Directory ({alumni?.length || 0})</h2>

                        {alumni && alumni.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr className="text-left text-sm text-muted-foreground">
                                            <th className="pb-3 font-medium">Student ID</th>
                                            <th className="pb-3 font-medium">Name</th>
                                            <th className="pb-3 font-medium">Program</th>
                                            <th className="pb-3 font-medium">Graduation Year</th>
                                            <th className="pb-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {alumni.map((alum: any) => (
                                            <tr key={alum.id} className="text-sm">
                                                <td className="py-3 font-medium">{alum.studentId}</td>
                                                <td className="py-3">
                                                    <div>
                                                        <p className="font-medium">{alum.firstName} {alum.lastName}</p>
                                                        <p className="text-xs text-muted-foreground">{alum.user?.email}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3">
                                                    <div>
                                                        <p>{alum.program?.nameEn}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {alum.program?.faculty?.nameEn}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="py-3">{alum.admissionYear || "-"}</td>
                                                <td className="py-3">
                                                    <Link
                                                        href={`/admin/users/alumni/${alum.id}`}
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
                                <GraduationCap className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p>No alumni found</p>
                                <p className="text-sm">Alumni records will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
