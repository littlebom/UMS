import Link from "next/link";
import { getAcademicTerms, getClassSections } from "@/actions/academic";
import { Calendar, BookOpen, Users, Clock } from "lucide-react";

export default async function AcademicPage() {
    const terms = await getAcademicTerms();
    const currentTerm = terms.find((t) => t.isCurrent);
    const sections = currentTerm ? await getClassSections(currentTerm.id) : [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Academic Management
                </h1>
                <p className="text-sm text-gray-500">
                    Manage academic terms, class sections, and schedules.
                </p>
            </div>

            {/* Current Term Info */}
            {currentTerm && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                    <div className="flex items-center gap-2 text-blue-900">
                        <Calendar className="h-5 w-5" />
                        <h2 className="font-semibold">Current Term</h2>
                    </div>
                    <p className="mt-2 text-sm text-blue-800">
                        {currentTerm.year}/{currentTerm.semester} - {new Date(currentTerm.startDate).toLocaleDateString()} to {new Date(currentTerm.endDate).toLocaleDateString()}
                    </p>
                </div>
            )}

            {/* Quick Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Class Sections</p>
                            <p className="text-2xl font-bold text-gray-900">{sections.length}</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-green-100 p-3 text-green-600">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Enrollments</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {sections.reduce((sum, s) => sum + s._count.enrollments, 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="grid gap-4 sm:grid-cols-2">
                <Link
                    href="/admin/academic/sections"
                    className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
                        <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Manage Class Sections</h3>
                        <p className="text-sm text-gray-500">Create and manage class sections</p>
                    </div>
                </Link>
                <Link
                    href="/admin/academic/terms"
                    className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 text-white">
                        <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Academic Terms</h3>
                        <p className="text-sm text-gray-500">Manage academic terms and semesters</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
