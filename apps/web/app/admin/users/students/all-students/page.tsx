import { SubNavigation } from "@/components/sub-navigation";
import { SearchBar } from "@/components/students/search-bar";
import { FilterDropdowns } from "@/components/students/filter-dropdowns";
import { ActiveFilters } from "@/components/students/active-filters";
import {
    getFaculties,
    getDepartments,
    getPrograms,
    getFilteredStudents,
    getAdmissionYears,
} from "@/actions/user-students-filters";
import { Users, ExternalLink } from "lucide-react";
import Link from "next/link";

const subNavItems = [
    { label: "Overview", href: "/admin/users/students" },
    { label: "All Students", href: "/admin/users/students/all-students" },
    { label: "Leave Management", href: "/admin/users/students/leave-management" },
];

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ActiveStudentsPage({ searchParams }: PageProps) {
    const params = await searchParams;

    // Extract filters from URL
    const filters = {
        search: typeof params.search === "string" ? params.search : undefined,
        facultyId: typeof params.facultyId === "string" ? params.facultyId : undefined,
        departmentId: typeof params.departmentId === "string" ? params.departmentId : undefined,
        programId: typeof params.programId === "string" ? params.programId : undefined,
        status: (typeof params.status === "string" && (params.status === "STUDYING" || params.status === "ON_LEAVE"))
            ? params.status
            : undefined,
        admissionYear: typeof params.year === "string" ? parseInt(params.year) : undefined,
    };

    // Fetch all data in parallel
    const [
        facultiesResult,
        departmentsResult,
        programsResult,
        yearsResult,
        studentsResult,
    ] = await Promise.all([
        getFaculties(),
        getDepartments(),
        getPrograms(),
        getAdmissionYears(),
        getFilteredStudents(filters),
    ]);

    const faculties = facultiesResult.success ? facultiesResult.faculties : [];
    const departments = departmentsResult.success ? departmentsResult.departments : [];
    const programs = programsResult.success ? programsResult.programs : [];
    const years = yearsResult.success ? yearsResult.years : [];
    const students = studentsResult.success ? studentsResult.students : [];
    const totalCount = studentsResult.count || 0;

    return (
        <div className="flex h-full flex-col">
            <SubNavigation items={subNavItems} />

            <div className="flex-1 space-y-6 p-8 overflow-auto">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">All Students</h1>
                        <p className="text-muted-foreground">
                            {totalCount} students currently enrolled
                        </p>
                    </div>
                    <Link
                        href="/admin/users/students/create"
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 whitespace-nowrap"
                    >
                        Add Student
                    </Link>
                </div>

                {/* Search & Filters */}
                <div className="space-y-4">
                    {/* Search Bar */}
                    <SearchBar />

                    {/* Filter Dropdowns */}
                    <FilterDropdowns
                        faculties={faculties}
                        departments={departments}
                        programs={programs}
                        years={years}
                    />

                    {/* Active Filters */}
                    <ActiveFilters
                        faculties={faculties}
                        departments={departments}
                        programs={programs}
                    />
                </div>

                {/* Students Table */}
                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        {students.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr className="text-left text-sm text-muted-foreground">
                                            <th className="pb-3 font-medium w-[120px]">Student ID</th>
                                            <th className="pb-3 font-medium">Name</th>
                                            <th className="pb-3 font-medium">Program</th>
                                            <th className="pb-3 font-medium">Faculty</th>
                                            <th className="pb-3 font-medium w-[80px]">GPA</th>
                                            <th className="pb-3 font-medium w-[100px]">Status</th>
                                            <th className="pb-3 font-medium w-[100px]">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {students.map((student: any) => (
                                            <tr key={student.id} className="text-sm hover:bg-gray-50">
                                                <td className="py-3">
                                                    <span className="font-mono text-blue-600">
                                                        {student.studentId}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <div>
                                                        <p className="font-medium">
                                                            {student.title} {student.firstName} {student.lastName}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {student.user?.email}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="py-3">
                                                    <p className="text-sm">{student.program?.nameEn || "-"}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {student.program?.department?.nameEn || "-"}
                                                    </p>
                                                </td>
                                                <td className="py-3">
                                                    <span className="text-sm">
                                                        {student.program?.faculty?.nameEn || "-"}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <span
                                                        className={`font-semibold ${student.gpax >= 3.5
                                                            ? "text-green-600"
                                                            : student.gpax < 2.0
                                                                ? "text-red-600"
                                                                : "text-gray-900"
                                                            }`}
                                                    >
                                                        {student.gpax.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${student.status === "STUDYING"
                                                            ? "bg-green-50 text-green-700"
                                                            : "bg-orange-50 text-orange-700"
                                                            }`}
                                                    >
                                                        {student.status === "STUDYING" ? "Studying" : "On Leave"}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={`/admin/users/students/${student.id}`}
                                                            className="text-blue-600 hover:text-blue-800 text-sm hover:underline flex items-center gap-1"
                                                        >
                                                            Edit
                                                            <ExternalLink className="h-3 w-3" />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <Users className="mx-auto h-12 w-12 mb-4 opacity-30" />
                                <p className="text-lg font-medium">No students found</p>
                                <p className="text-sm mt-2">
                                    {filters.search || filters.facultyId || filters.programId
                                        ? "Try adjusting your search or filters"
                                        : "Add students to get started"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary */}
                {students.length > 0 && (
                    <div className="text-sm text-muted-foreground text-center">
                        Showing {students.length} student{students.length !== 1 ? "s" : ""}
                    </div>
                )}
            </div>
        </div>
    );
}
