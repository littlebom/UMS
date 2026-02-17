"use client";

import { useState, useEffect } from "react";
import { getAvailableSlots, bookSelfServiceSlot } from "@/actions/applicant-interview";
import { Calendar, Clock, MapPin, User } from "lucide-react";

interface InterviewBookingProps {
    applicationId: string;
    programId: string;
    programName: string;
}

interface InterviewSlot {
    id: string;
    startTime: Date;
    endTime: Date;
    location: string | null;
    interviewers: {
        interviewer: {
            firstName: string;
            lastName: string;
        };
    }[];
    coordinatorName?: string | null;
    coordinatorPhone?: string | null;
    description?: string | null;
}

export default function InterviewBooking({ applicationId, programId, programName }: InterviewBookingProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [slots, setSlots] = useState<InterviewSlot[]>([]);
    const [loading, setLoading] = useState(false);
    const [bookingId, setBookingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            loadSlots();
        }
    }, [isOpen]);

    async function loadSlots() {
        setLoading(true);
        try {
            const availableSlots = await getAvailableSlots(programId);
            setSlots(availableSlots as any);
        } catch (err) {
            console.error(err);
            setError("Failed to load available slots.");
        } finally {
            setLoading(false);
        }
    }

    async function handleBook(slotId: string) {
        if (!confirm("Are you sure you want to book this time slot?")) return;

        setBookingId(slotId);
        setError(null);

        try {
            await bookSelfServiceSlot(applicationId, slotId);
            setIsOpen(false);
            // Ideally show success message or toast
            alert("Interview scheduled successfully!");
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to book slot.");
        } finally {
            setBookingId(null);
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Interview
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl max-h-[90vh] flex flex-col">
                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">
                        Select Interview Slot
                    </h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <p className="mb-4 text-sm text-gray-500">
                        Please select a time slot for your interview for <strong>{programName}</strong>.
                    </p>

                    {error && (
                        <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                        </div>
                    ) : slots.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No available slots found. Please contact the admissions office.
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {slots.map((slot) => (
                                <div
                                    key={slot.id}
                                    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-blue-500 hover:ring-1 hover:ring-blue-500 transition-all"
                                >
                                    <div className="flex items-start justify-between space-x-3">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <p className="text-sm font-medium text-gray-900">
                                                    {new Date(slot.startTime).toLocaleDateString("en-US", {
                                                        weekday: "short",
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-center space-x-2">
                                                <Clock className="h-4 w-4 text-gray-400" />
                                                <p className="text-sm text-gray-500">
                                                    {new Date(slot.startTime).toLocaleTimeString("en-US", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                    {" - "}
                                                    {new Date(slot.endTime).toLocaleTimeString("en-US", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-center space-x-2">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                                <p className="text-sm text-gray-500">
                                                    {slot.location || "Online"}
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-start space-x-2">
                                                <User className="h-4 w-4 text-gray-400 mt-0.5" />
                                                <div className="text-sm text-gray-500">
                                                    {slot.interviewers.map((i, idx) => (
                                                        <span key={idx}>
                                                            {i.interviewer.firstName} {i.interviewer.lastName}
                                                            {idx < slot.interviewers.length - 1 && ", "}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            {slot.description && (
                                                <div className="mt-2 text-xs text-gray-500 italic">
                                                    Note: {slot.description}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            onClick={() => handleBook(slot.id)}
                                            disabled={bookingId !== null}
                                            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
                                        >
                                            {bookingId === slot.id ? "Booking..." : "Select This Slot"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
