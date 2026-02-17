"use client";

import { createStudentGroup } from "@/actions/student-group";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface Program {
    id: string;
    nameTh: string;
    nameEn: string;
    degreeLevel: string;
    faculty?: {
        code: string;
        nameEn: string;
    };
}

interface Instructor {
    id: string;
    firstName: string;
    lastName: string;
    title?: string | null;
}

interface CreateGroupFormProps {
    programs: Program[];
    instructors: Instructor[];
    yearOptions: number[];
}

export function CreateGroupForm({ programs, instructors, yearOptions }: CreateGroupFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        programId: "",
        admissionYear: new Date().getFullYear(),
        advisorId: "",
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!formData.name.trim()) {
            setError("Group name is required");
            return;
        }

        if (!formData.programId) {
            setError("Please select a program");
            return;
        }

        startTransition(async () => {
            const result = await createStudentGroup({
                name: formData.name.trim(),
                programId: formData.programId,
                admissionYear: formData.admissionYear,
                advisorId: formData.advisorId || undefined,
            });

            if (result.success) {
                router.push("/admin/academic/groups");
                router.refresh();
            } else {
                setError(result.error || "Failed to create group");
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Group Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Group Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Group A, Section 1, ห้อง 1"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                />
                <p className="mt-1 text-xs text-gray-500">
                    This name will be combined with the program and year to identify the group
                </p>
            </div>

            {/* Program */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Program <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.programId}
                    onChange={(e) => setFormData({ ...formData, programId: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                >
                    <option value="">Select a program</option>
                    {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program.faculty?.code ? `[${program.faculty.code}] ` : ""}
                            {program.nameEn} ({program.degreeLevel})
                        </option>
                    ))}
                </select>
            </div>

            {/* Admission Year */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Admission Year <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.admissionYear}
                    onChange={(e) =>
                        setFormData({ ...formData, admissionYear: parseInt(e.target.value) })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                >
                    {yearOptions.map((year) => (
                        <option key={year} value={year}>
                            {year} (Year {new Date().getFullYear() - year + 1} students)
                        </option>
                    ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                    The year when students in this group were admitted
                </p>
            </div>

            {/* Advisor */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Advisor (Optional)
                </label>
                <select
                    value={formData.advisorId}
                    onChange={(e) => setFormData({ ...formData, advisorId: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="">No advisor assigned</option>
                    {instructors.map((instructor) => (
                        <option key={instructor.id} value={instructor.id}>
                            {instructor.title || ""} {instructor.firstName} {instructor.lastName}
                        </option>
                    ))}
                </select>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400"
                >
                    {isPending ? "Creating..." : "Create Group"}
                </button>
            </div>
        </form>
    );
}
