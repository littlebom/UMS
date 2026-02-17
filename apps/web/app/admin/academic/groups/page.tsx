import Link from "next/link";
import { getStudentGroupsWithYearLevel } from "@/actions/student-group";
import { getPrograms } from "@/actions/program";
import { Plus, Users, Calendar, GraduationCap, Pencil } from "lucide-react";
import { DeleteGroupButton } from "./delete-group-button";

interface StudentGroupWithDetails {
    id: string;
    name: string;
    admissionYear: number;
    yearLevel: number;
    program: {
        nameEn: string;
        degreeLevel: string;
        faculty?: {
            code: string;
        };
    };
    advisor?: {
        title?: string | null;
        firstName: string;
        lastName: string;
    } | null;
    _count?: {
        students: number;
        sections: number;
    };
}

export default async function StudentGroupsPage() {
    const [groupsResult, programs] = await Promise.all([
        getStudentGroupsWithYearLevel(),
        getPrograms(),
    ]);

    const groups = (groupsResult.success ? groupsResult.groups : []) as StudentGroupWithDetails[];

    // Get unique admission years for filter
    const admissionYears = Array.from(
        new Set(groups.map((g: StudentGroupWithDetails) => g.admissionYear))
    ).sort((a, b) => b - a);

    return (
        <div className="container mx-auto py-10">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Student Groups</h1>
                    <p className="text-sm text-gray-500">
                        Manage student groups by program, admission year, and section
                    </p>
                </div>
                <Link
                    href="/admin/academic/groups/create"
                    className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Add Group
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="mb-6 grid gap-4 md:grid-cols-4">
                <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-blue-100 p-2">
                            <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{groups?.length || 0}</p>
                            <p className="text-sm text-gray-500">Total Groups</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-green-100 p-2">
                            <GraduationCap className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{programs.length}</p>
                            <p className="text-sm text-gray-500">Programs</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-purple-100 p-2">
                            <Calendar className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{admissionYears.length}</p>
                            <p className="text-sm text-gray-500">Admission Years</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-orange-100 p-2">
                            <Users className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">
                                {groups.reduce((sum: number, g: StudentGroupWithDetails) => sum + (g._count?.students || 0), 0)}
                            </p>
                            <p className="text-sm text-gray-500">Total Students</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Groups Table */}
            <div className="overflow-hidden rounded-lg border bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Group Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Program
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Admission Year
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Year Level
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Students
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Advisor
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {groups && groups.length > 0 ? (
                            groups.map((group) => (
                                <tr key={group.id} className="hover:bg-gray-50">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <Link
                                            href={`/admin/academic/groups/${group.id}`}
                                            className="font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            {group.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm">
                                            <p className="font-medium text-gray-900">
                                                {group.program.nameEn}
                                            </p>
                                            <p className="text-gray-500">
                                                {group.program.faculty?.code} - {group.program.degreeLevel}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {group.admissionYear}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                            Year {group.yearLevel}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {group._count?.students || 0} students
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {group.advisor
                                            ? `${group.advisor.title || ""} ${group.advisor.firstName} ${group.advisor.lastName}`
                                            : "-"}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/academic/groups/${group.id}/edit`}
                                                className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <DeleteGroupButton
                                                groupId={group.id}
                                                groupName={group.name}
                                                studentCount={group._count?.students || 0}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-12 text-center text-gray-500"
                                >
                                    <Users className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                                    <p className="text-lg font-medium">No student groups yet</p>
                                    <p className="mt-1 text-sm">
                                        Create your first student group to organize students by year and
                                        section.
                                    </p>
                                    <Link
                                        href="/admin/academic/groups/create"
                                        className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Group
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
