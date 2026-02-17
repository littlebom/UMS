"use client";

import { updateApplicationStatus, convertApplicantToStudent } from "@/actions/admission";
import { ApplicationStatus } from "@ums/lib";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectOption } from "@/components/ui/select";

export default function ApplicationStatusActions({
    id,
    currentStatus,
}: {
    id: string;
    currentStatus: ApplicationStatus;
}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleStatusChange = async (status: ApplicationStatus) => {
        if (!confirm(`Are you sure you want to change status to ${status}?`)) return;

        setIsLoading(true);
        try {
            await updateApplicationStatus(id, status);
        } catch (error) {
            console.error(error);
            alert("Failed to update status");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConvertToStudent = async () => {
        if (!confirm("Convert this applicant to a student? This action cannot be undone.")) return;

        setIsLoading(true);
        try {
            const studentId = await convertApplicantToStudent(id);
            alert(`Successfully converted to student! Student ID: ${studentId}`);
            router.refresh();
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Failed to convert to student");
        } finally {
            setIsLoading(false);
        }
    };

    const statusOptions: SelectOption[] = [
        { value: "DRAFT", label: "DRAFT", status: "neutral" },
        { value: "SUBMITTED", label: "SUBMITTED", status: "info" },
        { value: "DOCUMENT_VERIFIED", label: "DOCUMENT_VERIFIED", status: "info" },
        { value: "INTERVIEW_READY", label: "INTERVIEW_READY", status: "warning" },
        { value: "INTERVIEW_COMPLETED", label: "INTERVIEW_COMPLETED", status: "success" },
        { value: "ACCEPTED", label: "ACCEPTED", status: "success" },
        { value: "REJECTED", label: "REJECTED", status: "error" },
        { value: "ENROLLED", label: "ENROLLED", status: "success" },
    ];

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-1 gap-2">
                {currentStatus === "SUBMITTED" && (
                    <button
                        onClick={() => handleStatusChange("DOCUMENT_VERIFIED")}
                        disabled={isLoading}
                        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        Verify Documents
                    </button>
                )}

                {currentStatus === "DOCUMENT_VERIFIED" && (
                    <button
                        onClick={() => handleStatusChange("INTERVIEW_READY")}
                        disabled={isLoading}
                        className="w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
                    >
                        Mark Ready for Interview
                    </button>
                )}

                {currentStatus === "INTERVIEW_COMPLETED" && (
                    <>
                        <button
                            onClick={() => handleStatusChange("ACCEPTED")}
                            disabled={isLoading}
                            className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                        >
                            Accept Application
                        </button>
                        <button
                            onClick={() => handleStatusChange("REJECTED")}
                            disabled={isLoading}
                            className="w-full rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                            Reject Application
                        </button>
                    </>
                )}

                {currentStatus === "ACCEPTED" && (
                    <button
                        onClick={handleConvertToStudent}
                        disabled={isLoading}
                        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                        Convert to Student
                    </button>
                )}

                {/* Manual Override for Demo */}
                <div className="mt-4 border-t pt-4">
                    <p className="mb-2 text-xs font-medium text-gray-500">Manual Override (Dev)</p>
                    <Select
                        value={currentStatus}
                        onChange={(val) => handleStatusChange(val as ApplicationStatus)}
                        options={statusOptions}
                        disabled={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}
