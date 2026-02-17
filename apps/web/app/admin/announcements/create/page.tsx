"use client";

import { createAnnouncement } from "@/actions/announcement";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectOption } from "@/components/ui/select";

export default function CreateAnnouncementPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedTarget, setSelectedTarget] = useState("ALL");
    const [selectedStatus, setSelectedStatus] = useState("true");

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        setError(null);
        try {
            await createAnnouncement(formData);
            router.push("/admin/announcements");
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to create announcement");
            setIsSubmitting(false);
        }
    }

    const targetOptions: SelectOption[] = [
        { value: "ALL", label: "All Users", status: "info" },
        { value: "STUDENTS", label: "Students Only", status: "neutral" },
        { value: "INSTRUCTORS", label: "Instructors Only", status: "neutral" },
        { value: "STAFF", label: "Staff Only", status: "neutral" },
    ];

    const statusOptions: SelectOption[] = [
        { value: "true", label: "Published", status: "success" },
        { value: "false", label: "Draft", status: "warning" },
    ];

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Announcement</h1>

            <div className="bg-white shadow rounded-lg p-6">
                {error && (
                    <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form action={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            placeholder="e.g., Semester 1/2025 Registration"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            name="content"
                            required
                            rows={6}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            placeholder="Enter the announcement details..."
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <Select
                                label="Target Audience"
                                value={selectedTarget}
                                onChange={(val) => setSelectedTarget(val)}
                                options={targetOptions}
                            />
                            <input type="hidden" name="target" value={selectedTarget} />
                        </div>

                        <div>
                            <Select
                                label="Status"
                                value={selectedStatus}
                                onChange={(val) => setSelectedStatus(val)}
                                options={statusOptions}
                            />
                            <input type="hidden" name="isPublished" value={selectedStatus} />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
                        >
                            {isSubmitting ? "Creating..." : "Create Announcement"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
