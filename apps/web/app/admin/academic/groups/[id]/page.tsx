import { getStudentGroupById, getGroupTimetable } from "@/actions/student-group";
import Link from "next/link";
import { ArrowLeft, Users, Calendar, GraduationCap, Pencil, BookOpen, Clock, MapPin, Plus, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";

// Helper function to calculate year level
function calculateYearLevel(admissionYear: number): number {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const academicYear = currentMonth >= 7 ? currentYear : currentYear - 1;
    return academicYear - admissionYear + 1;
}

const dayNames: { [key: string]: string } = {
    MON: "Monday",
    TUE: "Tuesday",
    WED: "Wednesday",
    THU: "Thursday",
    FRI: "Friday",
    SAT: "Saturday",
    SUN: "Sunday",
};

const dayOrder = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface GroupDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function GroupDetailPage({ params }: GroupDetailPageProps) {
    const { id } = await params;
    const [result, timetableResult] = await Promise.all([
        getStudentGroupById(id),
        getGroupTimetable(id),
    ]);

    if (!result.success || !result.group) {
        notFound();
    }

    const group = result.group;
    const yearLevel = calculateYearLevel(group.admissionYear);
    const timetable: any[] = timetableResult.success ? (timetableResult.schedules || []) : [];

    // Sort timetable by day and time
    const sortedTimetable = [...timetable].sort((a: any, b: any) => {
        const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
        if (dayDiff !== 0) return dayDiff;
        return a.startTime.localeCompare(b.startTime);
    });

    // Group by day for display
    const timetableByDay = sortedTimetable.reduce((acc: any, schedule: any) => {
        if (!acc[schedule.day]) {
            acc[schedule.day] = [];
        }
        acc[schedule.day].push(schedule);
        return acc;
    }, {});

    return (
        <div className="container mx-auto py-10">
            {/* Header */}
            <div className="mb-6">
                <Link
                    href="/admin/academic/groups"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Groups
                </Link>
            </div>

            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{group.name}</h1>
                    <p className="text-gray-500">
                        {group.program.nameEn} - Year {yearLevel} ({group.admissionYear})
                    </p>
                </div>
                <Link
                    href={`/admin/academic/groups/${id}/edit`}
                    className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    <Pencil className="h-4 w-4" />
                    Edit Group
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="mb-8 grid gap-4 md:grid-cols-4">
                <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-blue-100 p-2">
                            <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{group.students.length}</p>
                            <p className="text-sm text-gray-500">Students</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-green-100 p-2">
                            <Calendar className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">Year {yearLevel}</p>
                            <p className="text-sm text-gray-500">Current Level</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-purple-100 p-2">
                            <BookOpen className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{group.sections.length}</p>
                            <p className="text-sm text-gray-500">Courses</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-orange-100 p-2">
                            <CalendarDays className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{timetable.length}</p>
                            <p className="text-sm text-gray-500">Class Sessions</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Group Timetable - Full Width */}
            <div className="mb-6 rounded-lg border bg-white shadow-sm">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <CalendarDays className="h-5 w-5 text-blue-600" />
                            Class Timetable
                        </h2>
                        <p className="text-sm text-gray-500">Weekly schedule for this student group</p>
                    </div>
                    <Link
                        href={`/admin/academic/groups/${id}/schedule`}
                        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <Plus className="h-4 w-4" />
                        Manage Courses
                    </Link>
                </div>

                {sortedTimetable.length > 0 ? (
                    <div className="p-6">
                        {/* Timetable by Day */}
                        <div className="space-y-4">
                            {dayOrder.map((day) => {
                                const daySchedules = timetableByDay[day];
                                if (!daySchedules || daySchedules.length === 0) return null;

                                return (
                                    <div key={day} className="rounded-lg border">
                                        <div className="bg-gray-50 px-4 py-2 font-medium text-gray-700 border-b">
                                            {dayNames[day]}
                                        </div>
                                        <div className="divide-y">
                                            {daySchedules.map((schedule: any) => (
                                                <div
                                                    key={schedule.id}
                                                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-1 text-sm font-mono text-gray-600 w-32">
                                                            <Clock className="h-4 w-4 text-gray-400" />
                                                            {schedule.startTime} - {schedule.endTime}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">
                                                                {schedule.course?.code || schedule.section?.course?.code} -{" "}
                                                                {schedule.course?.nameEn || schedule.section?.course?.nameEn}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                Section {schedule.section?.sectionNumber}
                                                                {schedule.instructor && (
                                                                    <span className="ml-2">
                                                                        • {schedule.instructor.firstName} {schedule.instructor.lastName}
                                                                    </span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {schedule.room && (
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                                                                <MapPin className="h-3 w-3" />
                                                                {schedule.room.code}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="px-6 py-12 text-center text-gray-500">
                        <CalendarDays className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                        <p className="text-lg font-medium">No class schedule yet</p>
                        <p className="mt-1 text-sm">
                            Add courses to this group to populate the timetable.
                        </p>
                        <Link
                            href={`/admin/academic/groups/${id}/schedule`}
                            className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            <Plus className="h-4 w-4" />
                            Add Courses
                        </Link>
                    </div>
                )}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Group Info */}
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">Group Information</h2>
                    <dl className="space-y-3">
                        <div className="flex justify-between">
                            <dt className="text-gray-500">Program</dt>
                            <dd className="font-medium">{group.program.nameEn}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500">Faculty</dt>
                            <dd className="font-medium">
                                {group.program.faculty?.nameEn || "-"}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500">Degree Level</dt>
                            <dd className="font-medium">{group.program.degreeLevel}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-500">Advisor</dt>
                            <dd className="font-medium">
                                {group.advisor
                                    ? `${group.advisor.title || ""} ${group.advisor.firstName} ${group.advisor.lastName}`
                                    : "Not assigned"}
                            </dd>
                        </div>
                    </dl>
                </div>

                {/* Courses/Sections Summary */}
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Assigned Courses</h2>
                        <Link
                            href={`/admin/academic/groups/${id}/schedule`}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Manage →
                        </Link>
                    </div>
                    {group.sections.length > 0 ? (
                        <ul className="space-y-2">
                            {group.sections.map((section: any) => (
                                <li
                                    key={section.id}
                                    className="flex items-center justify-between rounded-md bg-gray-50 p-3"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {section.course.code} - {section.course.nameEn}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Section {section.sectionNumber} • {section.term.semester}/{section.term.year}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No courses assigned yet.</p>
                    )}
                </div>
            </div>

            {/* Students Table */}
            <div className="mt-6 rounded-lg border bg-white shadow-sm">
                <div className="border-b px-6 py-4">
                    <h2 className="text-lg font-semibold">Students in this Group</h2>
                </div>
                {group.students.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Student ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {group.students.map((student: any) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-sm">
                                        {student.studentId}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <Link
                                            href={`/admin/students/${student.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            {student.firstName} {student.lastName}
                                        </Link>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${student.status === "STUDYING"
                                                ? "bg-green-100 text-green-800"
                                                : student.status === "GRADUATED"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {student.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="px-6 py-12 text-center text-gray-500">
                        <Users className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                        <p className="text-lg font-medium">No students in this group</p>
                        <p className="mt-1 text-sm">
                            Students can be assigned to this group when creating or editing their profiles.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
