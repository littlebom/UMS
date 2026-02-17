"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createExamSchedule } from "@/actions/schedule-exams";
import { Loader2, Save, X } from "lucide-react";

interface CreateExamFormProps {
    sections: any[];
    terms: any[];
}

export default function CreateExamForm({ sections, terms }: CreateExamFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        sectionId: "",
        termId: "",
        examType: "MIDTERM",
        examDate: "",
        startTime: "",
        endTime: "",
        duration: "",
        examFormat: "CLOSED_BOOK",
        instructions: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.sectionId || !formData.examDate || !formData.startTime || !formData.endTime || !formData.duration) {
            setError("Please fill in all required fields");
            return;
        }

        // Find selected section to get courseId
        const selectedSection = sections.find((s) => s.id === formData.sectionId);
        const courseId = selectedSection?.courseId;
        const sectionNumber = selectedSection?.sectionNumber;

        // If termId is not selected, use the section's termId
        const termId = formData.termId || selectedSection?.termId;

        startTransition(async () => {
            const result = await createExamSchedule({
                courseId: courseId,
                section: sectionNumber,
                termId: termId,
                examType: formData.examType,
                examDate: new Date(formData.examDate),
                startTime: formData.startTime,
                endTime: formData.endTime,
                duration: parseInt(formData.duration),
                examFormat: formData.examFormat,
                instructions: formData.instructions,
            });

            if (result.success) {
                router.push("/admin/schedule/exams");
                router.refresh();
            } else {
                setError(result.error || "Failed to create exam schedule");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                {/* Section Selection */}
                <div className="space-y-2">
                    <label htmlFor="sectionId" className="text-sm font-medium">
                        Course & Section <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="sectionId"
                        name="sectionId"
                        value={formData.sectionId}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        required
                    >
                        <option value="">Select a section</option>
                        {sections.map((section) => (
                            <option key={section.id} value={section.id}>
                                {section.course.code} - {section.course.nameEn} (Sec {section.sectionNumber})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Term Selection */}
                <div className="space-y-2">
                    <label htmlFor="termId" className="text-sm font-medium">
                        Academic Term
                    </label>
                    <select
                        id="termId"
                        name="termId"
                        value={formData.termId}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <option value="">Use Section Term</option>
                        {terms.map((term) => (
                            <option key={term.id} value={term.id}>
                                {term.semester}/{term.year} {term.isCurrent ? "(Current)" : ""}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Exam Type */}
                <div className="space-y-2">
                    <label htmlFor="examType" className="text-sm font-medium">
                        Exam Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="examType"
                        name="examType"
                        value={formData.examType}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        required
                    >
                        <option value="MIDTERM">Midterm</option>
                        <option value="FINAL">Final</option>
                        <option value="QUIZ">Quiz</option>
                        <option value="MAKEUP">Makeup</option>
                    </select>
                </div>

                {/* Exam Date */}
                <div className="space-y-2">
                    <label htmlFor="examDate" className="text-sm font-medium">
                        Exam Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        id="examDate"
                        name="examDate"
                        value={formData.examDate}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        required
                    />
                </div>

                {/* Time & Duration */}
                <div className="grid grid-cols-3 gap-4 col-span-2 md:col-span-2">
                    <div className="space-y-2">
                        <label htmlFor="startTime" className="text-sm font-medium">
                            Start Time <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="endTime" className="text-sm font-medium">
                            End Time <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="duration" className="text-sm font-medium">
                            Duration (Minutes) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            required
                            min="1"
                        />
                    </div>
                </div>

                {/* Exam Format */}
                <div className="space-y-2">
                    <label htmlFor="examFormat" className="text-sm font-medium">
                        Exam Format
                    </label>
                    <select
                        id="examFormat"
                        name="examFormat"
                        value={formData.examFormat}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <option value="CLOSED_BOOK">Closed Book</option>
                        <option value="OPEN_BOOK">Open Book</option>
                        <option value="TAKE_HOME">Take Home</option>
                        <option value="ONLINE">Online</option>
                        <option value="PRACTICAL">Practical</option>
                    </select>
                </div>

                {/* Instructions */}
                <div className="col-span-2 space-y-2">
                    <label htmlFor="instructions" className="text-sm font-medium">
                        Instructions
                    </label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        placeholder="Special instructions for students or proctors..."
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[100px]"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                    disabled={isPending}
                >
                    <X className="h-4 w-4" />
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    disabled={isPending}
                >
                    {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    Schedule Exam
                </button>
            </div>
        </form>
    );
}
