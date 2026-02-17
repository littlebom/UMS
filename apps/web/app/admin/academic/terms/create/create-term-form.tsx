"use client";

import { createAcademicTerm } from "@/actions/academic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Select, SelectOption } from "@/components/ui/select";

export function CreateTermForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedSemester, setSelectedSemester] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        try {
            await createAcademicTerm(formData);
            router.push("/admin/academic/terms");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create term");
            setIsSubmitting(false);
        }
    }

    // Get current year for default
    const currentYear = new Date().getFullYear();

    const semesterOptions: SelectOption[] = [
        { value: "1", label: "Semester 1", status: "info" },
        { value: "2", label: "Semester 2", status: "info" },
        { value: "3", label: "Summer", status: "warning" },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/academic/terms"
                    className="rounded-full p-2 hover:bg-gray-100"
                >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Create Academic Term</h1>
                    <p className="text-sm text-gray-500">
                        Add a new academic term/semester
                    </p>
                </div>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
                {error && (
                    <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">
                        {error}
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Academic Year */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Academic Year
                        </label>
                        <input
                            type="number"
                            name="year"
                            required
                            min="2000"
                            max="2100"
                            defaultValue={currentYear}
                            placeholder="e.g., 2024"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Semester */}
                    <div>
                        <Select
                            label="Semester"
                            value={selectedSemester}
                            onChange={(val) => setSelectedSemester(val)}
                            options={semesterOptions}
                            required
                        />
                        <input type="hidden" name="semester" value={selectedSemester} />
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Start Date
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            End Date
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Is Current */}
                    <div className="md:col-span-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isCurrent"
                                value="true"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                Set as current term
                            </span>
                        </label>
                        <p className="ml-6 mt-1 text-xs text-gray-500">
                            Only one term can be marked as current at a time
                        </p>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {isSubmitting ? "Creating..." : "Create Term"}
                    </button>
                    <Link
                        href="/admin/academic/terms"
                        className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
