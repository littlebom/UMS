import { getAcademicTerms } from "@/actions/academic";
import { Calendar, Plus, Check } from "lucide-react";
import Link from "next/link";

export default async function AcademicTermsPage() {
    const terms = await getAcademicTerms();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Academic Terms</h1>
                    <p className="text-sm text-gray-500">
                        Manage academic years and semesters
                    </p>
                </div>
                <Link
                    href="/admin/academic/terms/create"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Create Term
                </Link>
            </div>

            {/* Terms List */}
            {terms.length > 0 ? (
                <div className="space-y-4">
                    {terms.map((term) => (
                        <div
                            key={term.id}
                            className={`rounded-lg border p-6 shadow-sm ${term.isCurrent
                                    ? "border-blue-300 bg-blue-50"
                                    : "border-gray-200 bg-white"
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${term.isCurrent
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        <Calendar className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-900">
                                                {term.name}
                                            </h3>
                                            {term.isCurrent && (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
                                                    <Check className="h-3 w-3" />
                                                    Current
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Academic Year {term.year} / Semester {term.semester}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {new Date(term.startDate).toLocaleDateString()} -{" "}
                                            {new Date(term.endDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                        No academic terms yet
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Get started by creating your first academic term.
                    </p>
                    <Link
                        href="/admin/academic/terms/create"
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <Plus className="h-4 w-4" />
                        Create Term
                    </Link>
                </div>
            )}
        </div>
    );
}
