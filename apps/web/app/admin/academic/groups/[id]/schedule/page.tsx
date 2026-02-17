import { getStudentGroupById } from "@/actions/student-group";
import { getClassSections } from "@/actions/academic";
import { getAcademicTerms } from "@/actions/academic";
import Link from "next/link";
import { ArrowLeft, Plus, BookOpen, Trash2, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import ManageGroupScheduleForm from "./manage-schedule-form";

// Helper function to calculate year level
function calculateYearLevel(admissionYear: number): number {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const academicYear = currentMonth >= 7 ? currentYear : currentYear - 1;
    return academicYear - admissionYear + 1;
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ManageGroupSchedulePage({ params }: PageProps) {
    const { id } = await params;
    const [result, sectionsData, termsData] = await Promise.all([
        getStudentGroupById(id),
        getClassSections(),
        getAcademicTerms(),
    ]);

    if (!result.success || !result.group) {
        notFound();
    }

    const group = result.group;
    const yearLevel = calculateYearLevel(group.admissionYear);

    // Filter sections that are not already assigned to this group
    const assignedSectionIds = group.sections.map((s: any) => s.id);
    const availableSections = sectionsData.filter(
        (s: any) => !assignedSectionIds.includes(s.id)
    );

    return (
        <div className="container mx-auto py-10">
            {/* Header */}
            <div className="mb-6">
                <Link
                    href={`/admin/academic/groups/${id}`}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to {group.name}
                </Link>
            </div>

            <div className="mb-6">
                <h1 className="text-2xl font-bold">Manage Courses for {group.name}</h1>
                <p className="text-gray-500">
                    {group.program.nameEn} - Year {yearLevel} ({group.admissionYear})
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Current Assigned Courses */}
                <div className="rounded-lg border bg-white shadow-sm">
                    <div className="border-b px-6 py-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                            Current Courses ({group.sections.length})
                        </h2>
                        <p className="text-sm text-gray-500">Courses assigned to this group</p>
                    </div>

                    {group.sections.length > 0 ? (
                        <div className="divide-y">
                            {group.sections.map((section: any) => (
                                <div
                                    key={section.id}
                                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {section.course.code} - {section.course.nameEn}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Section {section.sectionNumber} • {section.term.semester}/{section.term.year}
                                        </p>
                                    </div>
                                    <ManageGroupScheduleForm
                                        groupId={id}
                                        sectionId={section.id}
                                        action="remove"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-6 py-12 text-center text-gray-500">
                            <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                            <p className="text-lg font-medium">No courses assigned</p>
                            <p className="mt-1 text-sm">
                                Add courses from the list on the right.
                            </p>
                        </div>
                    )}
                </div>

                {/* Available Courses to Add */}
                <div className="rounded-lg border bg-white shadow-sm">
                    <div className="border-b px-6 py-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Plus className="h-5 w-5 text-green-600" />
                            Available Courses ({availableSections.length})
                        </h2>
                        <p className="text-sm text-gray-500">Click to add a course to this group</p>
                    </div>

                    {availableSections.length > 0 ? (
                        <div className="divide-y max-h-[600px] overflow-y-auto">
                            {availableSections.map((section: any) => (
                                <div
                                    key={section.id}
                                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {section.course?.code} - {section.course?.nameEn}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Section {section.sectionNumber} • {section.term?.semester}/{section.term?.year}
                                            {section.instructor && (
                                                <span className="ml-2">
                                                    • {section.instructor.firstName} {section.instructor.lastName}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <ManageGroupScheduleForm
                                        groupId={id}
                                        sectionId={section.id}
                                        action="add"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-6 py-12 text-center text-gray-500">
                            <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                            <p className="text-lg font-medium">No more sections available</p>
                            <p className="mt-1 text-sm">
                                All available class sections have been assigned.
                            </p>
                            <Link
                                href="/admin/schedule/timetable/create"
                                className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
                            >
                                <Plus className="h-4 w-4" />
                                Create new class section
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
