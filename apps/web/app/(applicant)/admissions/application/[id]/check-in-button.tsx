"use client";

import { useState } from "react";
import { checkInInterview } from "@/actions/applicant-interview";
import { MapPin, Loader2, CheckCircle } from "lucide-react";

interface CheckInButtonProps {
    applicationId: string;
    startTime: Date;
    endTime: Date;
    checkedInAt: Date | null;
}

export default function CheckInButton({ applicationId, startTime, endTime, checkedInAt }: CheckInButtonProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();
    const oneHourBefore = new Date(start.getTime() - 60 * 60 * 1000);

    // If already checked in
    if (checkedInAt) {
        return (
            <div className="mt-4 flex items-center gap-2 rounded-md bg-green-50 px-4 py-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Checked In at {new Date(checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        );
    }

    // If too early
    if (now < oneHourBefore) {
        return (
            <div className="mt-4 text-sm text-gray-500">
                Check-in will be available at {oneHourBefore.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        );
    }

    // If too late
    if (now > end) {
        return null; // Don't show anything if interview passed
    }

    async function handleCheckIn() {
        if (!confirm("Confirm check-in? Please make sure you are at the location or in the meeting room.")) return;

        setLoading(true);
        setError(null);
        try {
            await checkInInterview(applicationId);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-4">
            {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
            <button
                onClick={handleCheckIn}
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400"
            >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                I'm here (Check In)
            </button>
        </div>
    );
}
