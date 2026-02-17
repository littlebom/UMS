"use client";

import { createInterviewSlot } from "@/actions/interview";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Select, SelectOption } from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function CreateSlotForm({
    interviewers,
    programs,
    faculties,
    isPage = false
}: {
    interviewers: any[],
    programs: any[],
    faculties: any[],
    isPage?: boolean
}) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedInterviewers, setSelectedInterviewers] = useState<string[]>([]);
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [selectedProgram, setSelectedProgram] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentInterviewer, setCurrentInterviewer] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const date = formData.get("date") as string;
        const startTimeStr = formData.get("startTime") as string;
        const endTimeStr = formData.get("endTime") as string;
        const location = formData.get("location") as string;
        const programId = formData.get("programId") as string;
        const coordinatorName = formData.get("coordinatorName") as string;
        const coordinatorPhone = formData.get("coordinatorPhone") as string;
        const description = formData.get("description") as string;
        const notifyEligibleApplicants = formData.get("notifyEligibleApplicants") === "on";

        const startDateTime = new Date(`${date}T${startTimeStr}`);
        const endDateTime = new Date(`${date}T${endTimeStr}`);

        if (selectedInterviewers.length === 0) {
            alert("Please select at least one interviewer");
            setIsLoading(false);
            return;
        }

        try {
            await createInterviewSlot({
                startTime: startDateTime,
                endTime: endDateTime,
                location,
                interviewerIds: selectedInterviewers,
                coordinatorName: coordinatorName || undefined,
                coordinatorPhone: coordinatorPhone || undefined,
                description: description || undefined,
                programId: programId || undefined,
                notifyEligibleApplicants,
                autoAssignApplicants: formData.get("autoAssignApplicants") === "on",
            } as any);

            if (isPage) {
                router.push("/admin/admissions/interviews");
            } else {
                setIsOpen(false);
            }
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Failed to create slot");
        } finally {
            setIsLoading(false);
        }
    };

    // Faculty options
    const facultyOptions: SelectOption[] = [
        { value: "", label: "All Faculties", status: "neutral" },
        ...faculties.map((f) => ({
            value: f.id,
            label: f.nameEn,
            description: f.nameTh,
            status: "info" as const,
        })),
    ];

    // Filter programs by selected faculty
    const filteredPrograms = selectedFaculty
        ? programs.filter(p => p.facultyId === selectedFaculty)
        : programs;

    const programOptions: SelectOption[] = [
        { value: "", label: "All Programs (Generic Slot)", status: "neutral" },
        ...filteredPrograms.map((p) => ({
            value: p.id,
            label: p.nameEn,
            description: p.code,
            status: "info" as const,
        })),
    ];

    // Filter interviewers based on search query
    const filteredInterviewers = interviewers.filter(interviewer => {
        const fullName = `${interviewer.firstName} ${interviewer.lastName}`.toLowerCase();
        const position = interviewer.position?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();
        return fullName.includes(query) || position.includes(query);
    });

    const availableInterviewers = filteredInterviewers.filter(
        i => !selectedInterviewers.includes(i.id)
    );

    const addInterviewer = () => {
        if (currentInterviewer && !selectedInterviewers.includes(currentInterviewer)) {
            setSelectedInterviewers([...selectedInterviewers, currentInterviewer]);
            setCurrentInterviewer("");
            setSearchQuery("");
        }
    };

    const removeInterviewer = (id: string) => {
        setSelectedInterviewers(selectedInterviewers.filter(i => i !== id));
    };

    const getInterviewerById = (id: string) => {
        return interviewers.find(i => i.id === id);
    };

    // Page mode - render form directly
    if (isPage) {
        return (
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="date"
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Start Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                name="startTime"
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-500"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                End Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                name="endTime"
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Location / Link <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="location"
                        placeholder="e.g. Room 101 or Zoom Link"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Interviewers <span className="text-red-500">*</span>
                    </label>

                    {/* Search and Add Section */}
                    <div className="mb-3 flex gap-2">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search interviewer by name or position..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {searchQuery && availableInterviewers.length > 0 && (
                                <div className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
                                    {availableInterviewers.map((interviewer) => (
                                        <button
                                            key={interviewer.id}
                                            type="button"
                                            onClick={() => {
                                                setSelectedInterviewers([...selectedInterviewers, interviewer.id]);
                                                setSearchQuery("");
                                            }}
                                            className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 flex flex-col"
                                        >
                                            <span className="font-medium">
                                                {interviewer.firstName} {interviewer.lastName}
                                            </span>
                                            {interviewer.position && (
                                                <span className="text-xs text-gray-500">{interviewer.position}</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Selected Interviewers */}
                    {selectedInterviewers.length > 0 && (
                        <div className="space-y-2 rounded-md border border-gray-200 p-3 bg-gray-50">
                            <p className="text-xs font-medium text-gray-700">
                                Selected ({selectedInterviewers.length})
                            </p>
                            <div className="space-y-1">
                                {selectedInterviewers.map((id) => {
                                    const interviewer = getInterviewerById(id);
                                    if (!interviewer) return null;
                                    return (
                                        <div
                                            key={id}
                                            className="flex items-center justify-between bg-white rounded px-3 py-2 text-sm"
                                        >
                                            <span>
                                                {interviewer.firstName} {interviewer.lastName}
                                                {interviewer.position && (
                                                    <span className="text-gray-500 ml-1">({interviewer.position})</span>
                                                )}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removeInterviewer(id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Program Assignment (Optional)</h3>

                    <div className="space-y-4">
                        <div>
                            <Select
                                label="Faculty"
                                value={selectedFaculty}
                                onChange={(val) => {
                                    setSelectedFaculty(val);
                                    setSelectedProgram(""); // Reset program when faculty changes
                                }}
                                options={facultyOptions}
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Select a faculty to filter programs, or leave empty for all faculties.
                            </p>
                        </div>

                        <div>
                            <Select
                                label="Program"
                                value={selectedProgram}
                                onChange={(val) => setSelectedProgram(val)}
                                options={programOptions}
                            />
                            <input type="hidden" name="programId" value={selectedProgram} />
                            <p className="mt-1 text-xs text-gray-500">
                                Leave empty for a generic slot available to all programs.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Coordinator Contact (Optional)</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Coordinator Name
                                </label>
                                <input
                                    type="text"
                                    name="coordinatorName"
                                    placeholder="e.g. John Doe"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Contact Phone
                                </label>
                                <input
                                    type="tel"
                                    name="coordinatorPhone"
                                    placeholder="e.g. 081-234-5678"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Additional Information / Instructions
                            </label>
                            <textarea
                                name="description"
                                rows={4}
                                placeholder="e.g. Please bring your portfolio, Dress code: Business casual, etc."
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Provide any additional details or instructions for interviewees (e.g., what to bring, dress code, preparation tips).
                            </p>
                        </div>
                    </div>
                </div>

                {selectedProgram && (
                    <div className="space-y-3">
                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="autoAssignApplicants"
                                name="autoAssignApplicants"
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <div>
                                <label htmlFor="autoAssignApplicants" className="text-sm font-medium text-gray-700">
                                    Auto-assign eligible applicants
                                </label>
                                <p className="text-xs text-gray-500">
                                    Automatically book this slot for all applicants in this program who are "Interview Ready" and haven't been scheduled yet.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="notifyEligibleApplicants"
                                name="notifyEligibleApplicants"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="notifyEligibleApplicants" className="text-sm text-gray-700">
                                Notify eligible applicants via email (if not auto-assigned)
                            </label>
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? "Creating..." : "Create Slot"}
                    </button>
                </div>
            </form >
        );
    }

    // Popup mode - original behavior
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
                <Plus className="h-4 w-4" />
                Create Slot
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">
                                New Interview Slot
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Start Time
                                    </label>
                                    <input
                                        type="time"
                                        name="startTime"
                                        required
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        End Time
                                    </label>
                                    <input
                                        type="time"
                                        name="endTime"
                                        required
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Location / Link
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="e.g. Room 101 or Zoom Link"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>


                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Coordinator Name
                                    </label>
                                    <input
                                        type="text"
                                        name="coordinatorName"
                                        placeholder="Optional"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Contact Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="coordinatorPhone"
                                        placeholder="Optional"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                <Select
                                    label="Program (Optional)"
                                    value={selectedProgram}
                                    onChange={(val) => setSelectedProgram(val)}
                                    options={programOptions}
                                />
                                <input type="hidden" name="programId" value={selectedProgram} />
                                <p className="mt-1 text-xs text-gray-500">
                                    Leave empty for a generic slot available to all programs.
                                </p>
                            </div>

                            {selectedProgram && (
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <input
                                            type="checkbox"
                                            id="autoAssignApplicants-popup"
                                            name="autoAssignApplicants"
                                            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <div>
                                            <label htmlFor="autoAssignApplicants-popup" className="text-sm font-medium text-gray-700">
                                                Auto-assign eligible applicants
                                            </label>
                                            <p className="text-xs text-gray-500">
                                                Automatically book this slot for all applicants in this program who are "Interview Ready" and haven't been scheduled yet.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="notifyEligibleApplicants-popup"
                                            name="notifyEligibleApplicants"
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="notifyEligibleApplicants-popup" className="text-sm text-gray-700">
                                            Notify eligible applicants via email (if not auto-assigned)
                                        </label>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {isLoading ? "Creating..." : "Create Slot"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
