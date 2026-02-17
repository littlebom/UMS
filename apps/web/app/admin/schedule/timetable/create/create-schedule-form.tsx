"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClassSchedule } from "@/actions/schedule-timetable";
import { Loader2, Save, X, Users, AlertTriangle } from "lucide-react";

interface StudentGroup {
    id: string;
    name: string;
    admissionYear: number;
    program: {
        id: string;
        nameEn: string;
        nameTh?: string;
    };
}

interface CreateScheduleFormProps {
    sections: any[];
    rooms: any[];
    instructors: any[];
    terms: any[];
    studentGroups: StudentGroup[];
}

// Helper function to calculate year level
function calculateYearLevel(admissionYear: number): number {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const academicYear = currentMonth >= 7 ? currentYear : currentYear - 1;
    return academicYear - admissionYear + 1;
}

export default function CreateScheduleForm({
    sections,
    rooms,
    instructors,
    terms,
    studentGroups = [],
}: CreateScheduleFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        sectionId: "",
        day: "MON",
        startTime: "",
        endTime: "",
        roomId: "",
        instructorId: "",
        termId: "",
    });

    // Get selected section info
    const selectedSection = useMemo(() => {
        return sections.find((s) => s.id === formData.sectionId);
    }, [sections, formData.sectionId]);

    // Filter student groups by selected section's course program (if applicable)
    const filteredStudentGroups = useMemo(() => {
        // Show all groups but group them by program
        const groupsByProgram = studentGroups.reduce((acc, group) => {
            const programKey = group.program.id;
            if (!acc[programKey]) {
                acc[programKey] = {
                    programName: group.program.nameEn,
                    groups: [],
                };
            }
            acc[programKey].groups.push(group);
            return acc;
        }, {} as Record<string, { programName: string; groups: StudentGroup[] }>);

        return Object.values(groupsByProgram);
    }, [studentGroups]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGroupToggle = (groupId: string) => {
        setSelectedGroups((prev) =>
            prev.includes(groupId)
                ? prev.filter((id) => id !== groupId)
                : [...prev, groupId]
        );
    };

    const handleSelectAllGroups = (programGroups: StudentGroup[]) => {
        const groupIds = programGroups.map((g) => g.id);
        const allSelected = groupIds.every((id) => selectedGroups.includes(id));

        if (allSelected) {
            setSelectedGroups((prev) => prev.filter((id) => !groupIds.includes(id)));
        } else {
            setSelectedGroups((prev) => Array.from(new Set([...prev, ...groupIds])));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.sectionId || !formData.day || !formData.startTime || !formData.endTime) {
            setError("Please fill in all required fields");
            return;
        }

        // Find selected section to get courseId
        const courseId = selectedSection?.courseId;

        // If termId is not selected, use the section's termId
        const termId = formData.termId || selectedSection?.termId;

        startTransition(async () => {
            const result = await createClassSchedule({
                sectionId: formData.sectionId,
                day: formData.day,
                startTime: formData.startTime,
                endTime: formData.endTime,
                roomId: formData.roomId || undefined,
                instructorId: formData.instructorId || undefined,
                courseId: courseId,
                termId: termId,
                studentGroupIds: selectedGroups.length > 0 ? selectedGroups : undefined,
            });

            if (result.success) {
                router.push("/admin/schedule/timetable");
                router.refresh();
            } else {
                setError(result.error || "Failed to create schedule");
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
                        Class Section <span className="text-red-500">*</span>
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

                {/* Day Selection */}
                <div className="space-y-2">
                    <label htmlFor="day" className="text-sm font-medium">
                        Day of Week <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="day"
                        name="day"
                        value={formData.day}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        required
                    >
                        <option value="MON">Monday</option>
                        <option value="TUE">Tuesday</option>
                        <option value="WED">Wednesday</option>
                        <option value="THU">Thursday</option>
                        <option value="FRI">Friday</option>
                        <option value="SAT">Saturday</option>
                        <option value="SUN">Sunday</option>
                    </select>
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-2 gap-4">
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
                </div>

                {/* Room Selection */}
                <div className="space-y-2">
                    <label htmlFor="roomId" className="text-sm font-medium">
                        Room
                    </label>
                    <select
                        id="roomId"
                        name="roomId"
                        value={formData.roomId}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <option value="">Select a room</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.code} - {room.name} ({room.building})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Instructor Selection */}
                <div className="space-y-2">
                    <label htmlFor="instructorId" className="text-sm font-medium">
                        Instructor
                    </label>
                    <select
                        id="instructorId"
                        name="instructorId"
                        value={formData.instructorId}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <option value="">Select an instructor</option>
                        {instructors.map((instructor) => (
                            <option key={instructor.id} value={instructor.id}>
                                {instructor.firstName} {instructor.lastName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Student Groups Selection */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <label className="text-sm font-medium">
                        Target Student Groups
                    </label>
                    <span className="text-xs text-gray-500">
                        (Select which student groups will attend this class)
                    </span>
                </div>

                {studentGroups.length === 0 ? (
                    <div className="rounded-md border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500">
                        <AlertTriangle className="mx-auto mb-2 h-5 w-5 text-yellow-500" />
                        No student groups available.
                        <a href="/admin/academic/groups/create" className="ml-1 text-blue-600 hover:underline">
                            Create one first
                        </a>
                    </div>
                ) : (
                    <div className="max-h-64 overflow-y-auto rounded-md border bg-gray-50 p-4">
                        {filteredStudentGroups.map((programGroup) => (
                            <div key={programGroup.programName} className="mb-4 last:mb-0">
                                <div className="mb-2 flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-gray-700">
                                        {programGroup.programName}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => handleSelectAllGroups(programGroup.groups)}
                                        className="text-xs text-blue-600 hover:underline"
                                    >
                                        {programGroup.groups.every((g) => selectedGroups.includes(g.id))
                                            ? "Deselect All"
                                            : "Select All"}
                                    </button>
                                </div>
                                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                    {programGroup.groups.map((group) => {
                                        const yearLevel = calculateYearLevel(group.admissionYear);
                                        const isSelected = selectedGroups.includes(group.id);
                                        return (
                                            <label
                                                key={group.id}
                                                className={`flex cursor-pointer items-center gap-2 rounded-md border p-2 text-sm transition-colors ${isSelected
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200 bg-white hover:border-gray-300"
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleGroupToggle(group.id)}
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <div>
                                                    <span className="font-medium">{group.name}</span>
                                                    <span className="ml-1 text-xs text-gray-500">
                                                        (Year {yearLevel})
                                                    </span>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedGroups.length > 0 && (
                    <p className="text-sm text-green-600">
                        ✓ {selectedGroups.length} group(s) selected
                    </p>
                )}
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
                    Create Schedule
                </button>
            </div>
        </form>
    );
}
