"use client";

import { useState } from "react";
import { updateApplicationStatus } from "@/actions/application";
import { sendApplicationStatusNotification } from "@/actions/notification";
import { CheckCircle, XCircle, Clock, Calendar, AlertCircle, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

interface StatusActionPanelProps {
    applicationId: string;
    currentStatus: string;
}

export default function StatusActionPanel({ applicationId, currentStatus }: StatusActionPanelProps) {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isSendingNotification, setIsSendingNotification] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        if (!confirm(`Are you sure you want to change status to ${newStatus.replace("_", " ")}?`)) {
            return;
        }

        setIsUpdating(true);
        try {
            await updateApplicationStatus(applicationId, newStatus);
            alert("Status updated successfully!");
            router.refresh();
        } catch (error) {
            alert("Failed to update status. Please try again.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSendNotification = async () => {
        if (!confirm("Send status notification email to applicant?")) {
            return;
        }

        setIsSendingNotification(true);
        try {
            await sendApplicationStatusNotification(applicationId);
            alert("Notification sent successfully!");
        } catch (error: any) {
            alert(error.message || "Failed to send notification.");
        } finally {
            setIsSendingNotification(false);
        }
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Actions</h2>
            <div className="space-y-2">
                {currentStatus === "SUBMITTED" && (
                    <>
                        <button
                            onClick={() => handleStatusChange("UNDER_REVIEW")}
                            disabled={isUpdating}
                            className="flex w-full items-center justify-center gap-2 rounded-md bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 disabled:opacity-50"
                        >
                            <Clock className="h-4 w-4" />
                            Mark as Under Review
                        </button>
                        <button
                            onClick={() => handleStatusChange("INTERVIEW_READY")}
                            disabled={isUpdating}
                            className="flex w-full items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
                        >
                            <Calendar className="h-4 w-4" />
                            Approve for Interview
                        </button>
                    </>
                )}

                {currentStatus === "UNDER_REVIEW" && (
                    <button
                        onClick={() => handleStatusChange("INTERVIEW_READY")}
                        disabled={isUpdating}
                        className="flex w-full items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
                    >
                        <Calendar className="h-4 w-4" />
                        Approve for Interview
                    </button>
                )}

                {(currentStatus === "INTERVIEW_READY" || currentStatus === "INTERVIEW_COMPLETED") && (
                    <button
                        onClick={() => handleStatusChange("ACCEPTED")}
                        disabled={isUpdating}
                        className="flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                    >
                        <CheckCircle className="h-4 w-4" />
                        Accept Application
                    </button>
                )}

                {currentStatus !== "REJECTED" && currentStatus !== "ACCEPTED" && (
                    <button
                        onClick={() => handleStatusChange("REJECTED")}
                        disabled={isUpdating}
                        className="flex w-full items-center justify-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                        <XCircle className="h-4 w-4" />
                        Reject Application
                    </button>
                )}

                {/* Send Notification Button */}
                {(currentStatus === "ACCEPTED" || currentStatus === "REJECTED" || currentStatus === "INTERVIEW_READY") && (
                    <button
                        onClick={handleSendNotification}
                        disabled={isSendingNotification}
                        className="flex w-full items-center justify-center gap-2 rounded-md border border-blue-300 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 disabled:opacity-50"
                    >
                        <Mail className="h-4 w-4" />
                        {isSendingNotification ? "Sending..." : "Send Notification Email"}
                    </button>
                )}

                {(currentStatus === "ACCEPTED" || currentStatus === "REJECTED") && (
                    <div className="rounded-md bg-gray-50 p-3 text-center">
                        <AlertCircle className="mx-auto h-5 w-5 text-gray-400" />
                        <p className="mt-2 text-xs text-gray-600">
                            This application has been finalized.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
