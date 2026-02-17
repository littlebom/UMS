"use client";

import { submitGrades } from "@/actions/grading";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Enrollment {
    studentId: string;
    grade: string | null;
    student: {
        studentId: string;
        firstName: string;
        lastName: string;
    };
}

const GRADES = ["A", "B+", "B", "C+", "C", "D+", "D", "F", "W", "I"];

export function GradingForm({
    sectionId,
    enrollments
}: {
    sectionId: string;
    enrollments: any[] // Using any for simplicity with Prisma include types, but should be typed properly
}) {
    const router = useRouter();
    const [grades, setGrades] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize grades from existing data
    useState(() => {
        const initialGrades: Record<string, string> = {};
        enrollments.forEach((e) => {
            if (e.grade) {
                initialGrades[e.studentId] = e.grade;
            }
        });
        setGrades(initialGrades);
    });

    const handleGradeChange = (studentId: string, grade: string) => {
        setGrades((prev) => ({
            ...prev,
            [studentId]: grade,
        }));
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        const gradesToSubmit = Object.entries(grades).map(([studentId, grade]) => ({
            studentId,
            grade,
        }));

        try {
            await submitGrades(sectionId, gradesToSubmit);
            alert("Grades saved successfully!");
            router.refresh();
        } catch (error) {
            alert("Failed to save grades: " + (error as Error).message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Student ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Grade</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {enrollments.map((enrollment) => (
                            <tr key={enrollment.studentId}>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                    {enrollment.student.studentId}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {enrollment.student.firstName} {enrollment.student.lastName}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    <select
                                        value={grades[enrollment.studentId] || ""}
                                        onChange={(e) => handleGradeChange(enrollment.studentId, e.target.value)}
                                        className="rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="">Select Grade</option>
                                        {GRADES.map((g) => (
                                            <option key={g} value={g}>{g}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {isSubmitting ? "Saving..." : "Save Grades"}
                </button>
            </div>
        </form>
    );
}
