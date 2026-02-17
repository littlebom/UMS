import Link from "next/link";
import { getAcademicTerms, getClassSections } from "@/actions/academic";
import { Calendar, Clock, MapPin, Users, Plus } from "lucide-react";

export default async function ClassSectionsPage() {
    const terms = await getAcademicTerms();
    const currentTerm = terms.find((t) => t.isCurrent);
    const sections = currentTerm ? await getClassSections(currentTerm.id) : [];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Class Sections</h1>
                    <p className="text-sm text-gray-500">
                        Manage class sections for {currentTerm?.name || "current term"}
                    </p>
                </div>
                <Link
                    href="/admin/academic/sections/create"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Create Section
                </Link>
            </div>

            {/* Current Term Info */}
            {currentTerm && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-center gap-2 text-blue-900">
                        <Calendar className="h-5 w-5" />
                        <span className="font-semibold">{currentTerm.name}</span>
                        <span className="ml-2 rounded-full bg-blue-200 px-2 py-0.5 text-xs font-medium">
                            Current
                        </span>
                    </div>
                    <p className="mt-1 text-sm text-blue-800">
                        {new Date(currentTerm.startDate).toLocaleDateString()} -{" "}
                        {new Date(currentTerm.endDate).toLocaleDateString()}
                    </p>
                </div>
            )}

            {/* Sections List */}
            {sections.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                        >
                            {/* Course Info */}
                            <div className="mb-4">
                                <h3 className="font-semibold text-gray-900">
                                    {section.course.code}
                                </h3>
                                <p className="text-sm text-gray-600">{section.course.nameEn}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                                        Section {section.sectionNumber}
                                    </span>
                                    <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                                        {section.course.credits} Credits
                                    </span>
                                </div>
                            </div>

                            {/* Schedule Info */}
                            <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>{section.day}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                        {section.startTime} - {section.endTime}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin className="h-4 w-4" />
                                    <span>{section.room}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Users className="h-4 w-4" />
                                    <span>
                                        {section._count?.enrollments || 0} / {section.capacity}{" "}
                                        students
                                    </span>
                                </div>
                            </div>

                            {/* Instructor */}
                            {section.instructor && (
                                <div className="mt-4 border-t border-gray-100 pt-4">
                                    <p className="text-xs font-medium text-gray-500">Instructor</p>
                                    <p className="text-sm text-gray-900">
                                        {section.instructor.firstName} {section.instructor.lastName}
                                    </p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="mt-4 flex gap-2">
                                <Link
                                    href={`/admin/academic/sections/${section.id}`}
                                    className="flex-1 rounded bg-gray-100 px-3 py-1.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-200"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                        No class sections yet
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Get started by creating your first class section for this term.
                    </p>
                    <Link
                        href="/admin/academic/sections/create"
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <Plus className="h-4 w-4" />
                        Create Section
                    </Link>
                </div>
            )}
        </div>
    );
}
