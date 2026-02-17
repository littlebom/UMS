"use client";

import { useState } from "react";
import { CheckCircle, Clock, X } from "lucide-react";
import { confirmInterviewAttendance, requestInterviewReschedule } from "@/actions/applicant-interview";
import { useRouter } from "next/navigation";

interface InterviewActionButtonsProps {
    applicationId: string;
    isConfirmed: boolean;
    isRescheduleRequested: boolean;
}

export default function InterviewActionButtons({
    applicationId,
    isConfirmed,
    isRescheduleRequested,
}: InterviewActionButtonsProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showRescheduleForm, setShowRescheduleForm] = useState(false);
    const [rescheduleReason, setRescheduleReason] = useState("");

    const handleConfirm = async () => {
        if (!confirm("Are you sure you want to confirm your attendance?")) return;

        setIsLoading(true);
        try {
            await confirmInterviewAttendance(applicationId);
            router.refresh();
        } catch (error) {
            alert("Failed to confirm attendance. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRescheduleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rescheduleReason.trim()) return;

        setIsLoading(true);
        try {
            await requestInterviewReschedule(applicationId, rescheduleReason);
            setShowRescheduleForm(false);
            router.refresh();
        } catch (error) {
            alert("Failed to submit reschedule request. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isConfirmed) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
                <p className="text-sm text-gray-500">
                    You have confirmed your attendance. See you at the interview!
                </p>
                <button
                    disabled
                    className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed"
                >
                    <CheckCircle className="h-4 w-4" />
                    Attendance Confirmed
                </button>
            </div>
        );
    }

    if (isRescheduleRequested) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
                <p className="text-sm text-gray-500">
                    Your reschedule request has been submitted. We will contact you shortly.
                </p>
                <button
                    disabled
                    className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed"
                >
                    <Clock className="h-4 w-4" />
                    Reschedule Requested
                </button>
            </div>
        );
    }

    if (showRescheduleForm) {
        return (
            <div className="rounded-md bg-gray-50 p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Request Reschedule</h3>
                    <button
                        onClick={() => setShowRescheduleForm(false)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <form onSubmit={handleRescheduleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="reason" className="mb-1 block text-sm font-medium text-gray-700">
                            Reason for rescheduling
                        </label>
                        <textarea
                            id="reason"
                            rows={3}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            placeholder="Please explain why you cannot attend the scheduled time..."
                            value={rescheduleReason}
                            onChange={(e) => setRescheduleReason(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setShowRescheduleForm(false)}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? "Submitting..." : "Submit Request"}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            >
                <CheckCircle className="mr-2 h-5 w-5" />
                Confirm Attendance
            </button>
            <button
                onClick={() => setShowRescheduleForm(true)}
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
                <Clock className="mr-2 h-5 w-5" />
                Request Reschedule
            </button>
        </div>
    );
}
