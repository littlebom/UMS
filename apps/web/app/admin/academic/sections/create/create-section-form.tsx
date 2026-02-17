"use client";

import { createClassSection } from "@/actions/academic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Select, SelectOption } from "@/components/ui/select";

interface Course {
    id: string;
    code: string;
    nameEn: string;
    credits: number;
}

interface Instructor {
    id: string;
    firstName: string;
    lastName: string;
}

interface Term {
    id: string;
    year: number;
    semester: number;
}

const DAYS_OF_WEEK = [
    { value: "MON", label: "Monday", status: "neutral" },
    { value: "TUE", label: "Tuesday", status: "neutral" },
    { value: "WED", label: "Wednesday", status: "neutral" },
    { value: "THU", label: "Thursday", status: "neutral" },
    { value: "FRI", label: "Friday", status: "neutral" },
    { value: "SAT", label: "Saturday", status: "neutral" },
    { value: "SUN", label: "Sunday", status: "neutral" },
];

export function CreateSectionForm({
    courses,
    instructors,
    terms,
}: {
    courses: Course[];
    instructors: Instructor[];
    terms: Term[];
}) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const currentTerm = terms.find((t) => t);
    const [selectedTerm, setSelectedTerm] = useState(currentTerm?.id || "");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedInstructor, setSelectedInstructor] = useState("");
    const [selectedDay, setSelectedDay] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        try {
            await createClassSection(formData);
            router.push("/admin/academic/sections");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create section");
            setIsSubmitting(false);
        }
    }

    const termOptions: SelectOption[] = terms.map((term) => ({
        value: term.id,
        label: `Academic Year ${term.year} / Semester ${term.semester}`,
        status: "info",
    }));

    const courseOptions: SelectOption[] = courses.map((course) => ({
        value: course.id,
        label: `${course.code} - ${course.nameEn}`,
        description: `${course.credits} credits`,
        status: "neutral",
    }));

    const instructorOptions: SelectOption[] = instructors.map((instructor) => ({
        value: instructor.id,
        label: `${instructor.firstName} ${instructor.lastName}`,
        status: "success",
    }));

    const dayOptions: SelectOption[] = DAYS_OF_WEEK.map(day => ({
        value: day.value,
        label: day.label,
        status: "neutral"
    }));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/academic/sections"
                    className="rounded-full p-2 hover:bg-gray-100"
                >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Create Class Section</h1>
                    <p className="text-sm text-gray-500">
                        Add a new class section for the current term
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
                    {/* Academic Term */}
                    <div className="md:col-span-2">
                        <Select
                            label="Academic Term"
                            value={selectedTerm}
                            onChange={(val) => setSelectedTerm(val)}
                            options={termOptions}
                            required
                        />
                        <input type="hidden" name="termId" value={selectedTerm} />
                    </div>

                    {/* Course */}
                    <div className="md:col-span-2">
                        <Select
                            label="Course"
                            value={selectedCourse}
                            onChange={(val) => setSelectedCourse(val)}
                            options={courseOptions}
                            required
                        />
                        <input type="hidden" name="courseId" value={selectedCourse} />
                    </div>

                    {/* Section Number */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Section Number
                        </label>
                        <input
                            type="number"
                            name="sectionNumber"
                            required
                            min="1"
                            placeholder="e.g., 1"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Capacity */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Capacity
                        </label>
                        <input
                            type="number"
                            name="capacity"
                            required
                            min="1"
                            placeholder="e.g., 40"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Instructor */}
                    <div className="md:col-span-2">
                        <Select
                            label="Instructor"
                            value={selectedInstructor}
                            onChange={(val) => setSelectedInstructor(val)}
                            options={instructorOptions}
                            required
                        />
                        <input type="hidden" name="instructorId" value={selectedInstructor} />
                    </div>

                    {/* Day of Week */}
                    <div>
                        <Select
                            label="Day of Week"
                            value={selectedDay}
                            onChange={(val) => setSelectedDay(val)}
                            options={dayOptions}
                            required
                        />
                        <input type="hidden" name="day" value={selectedDay} />
                    </div>

                    {/* Room */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Room
                        </label>
                        <input
                            type="text"
                            name="room"
                            required
                            placeholder="e.g., EN101"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Start Time */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Start Time
                        </label>
                        <input
                            type="time"
                            name="startTime"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* End Time */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            End Time
                        </label>
                        <input
                            type="time"
                            name="endTime"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {isSubmitting ? "Creating..." : "Create Section"}
                    </button>
                    <Link
                        href="/admin/academic/sections"
                        className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
