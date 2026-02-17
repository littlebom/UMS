"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateStudent } from "@/actions/student";

interface EditStudentFormProps {
    student: any;
    programs: any[];
}

export default function EditStudentForm({ student, programs }: EditStudentFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            firstNameTh: formData.get("firstNameTh") as string || undefined,
            lastNameTh: formData.get("lastNameTh") as string || undefined,
            programId: formData.get("programId") as string,
            studentType: formData.get("studentType") as any,
            status: formData.get("status") as any,
            phone: formData.get("phone") as string || undefined,
            gpax: parseFloat(formData.get("gpax") as string) || 0,
        };

        try {
            await updateStudent(student.studentId, data);
            router.push("/admin/students");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to update student");
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
            {error && (
                <div className="rounded-lg bg-red-50 p-4 text-red-800">
                    {error}
                </div>
            )}

            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">Personal Information</h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            First Name (EN) *
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            defaultValue={student.firstName}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Last Name (EN) *
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            defaultValue={student.lastName}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            First Name (TH)
                        </label>
                        <input
                            type="text"
                            name="firstNameTh"
                            defaultValue={student.firstNameTh || ""}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Last Name (TH)
                        </label>
                        <input
                            type="text"
                            name="lastNameTh"
                            defaultValue={student.lastNameTh || ""}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            defaultValue={student.phone || ""}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">Academic Information</h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Program *
                        </label>
                        <select
                            name="programId"
                            defaultValue={student.programId}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            {programs.map((program) => (
                                <option key={program.id} value={program.id}>
                                    {program.nameEn}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Student Type *
                        </label>
                        <select
                            name="studentType"
                            defaultValue={student.studentType}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="REGULAR">Regular (นักศึกษาปกติ)</option>
                            <option value="EXCHANGE">Exchange (นักศึกษาแลกเปลี่ยน)</option>
                            <option value="SCHOLARSHIP">Scholarship (นักศึกษาทุน)</option>
                            <option value="SPECIAL">Special (นักศึกษาพิเศษ)</option>
                            <option value="TRANSFER">Transfer (นักศึกษาโอนย้าย)</option>
                            <option value="INTERNATIONAL">International (นักศึกษานานาชาติ)</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Status *
                        </label>
                        <select
                            name="status"
                            defaultValue={student.status}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="STUDYING">Studying</option>
                            <option value="ON_LEAVE">On Leave</option>
                            <option value="GRADUATED">Graduated</option>
                            <option value="WITHDRAWN">Withdrawn</option>
                            <option value="DISMISSED">Dismissed</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            GPAX
                        </label>
                        <input
                            type="number"
                            name="gpax"
                            step="0.01"
                            min="0"
                            max="4"
                            defaultValue={student.gpax}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
