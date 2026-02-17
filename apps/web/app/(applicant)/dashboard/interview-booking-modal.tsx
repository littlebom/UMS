"use client";

import { useState, useEffect } from "react";
import { getAvailableInterviewSlots, bookInterviewSlot } from "@/actions/interview";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, Users, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface InterviewBookingModalProps {
    applicationId: string;
    programId: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function InterviewBookingModal({
    applicationId,
    programId,
    isOpen,
    onClose
}: InterviewBookingModalProps) {
    const router = useRouter();
    const [slots, setSlots] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadSlots();
        }
    }, [isOpen, programId]);

    const loadSlots = async () => {
        setLoading(true);
        try {
            const availableSlots = await getAvailableInterviewSlots(programId);
            setSlots(availableSlots);
        } catch (error) {
            console.error("Error loading slots:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookSlot = async (slotId: string) => {
        if (!confirm("Are you sure you want to book this interview slot?")) {
            return;
        }

        setBooking(true);
        try {
            await bookInterviewSlot(applicationId, slotId);
            alert("Interview slot booked successfully!");
            router.refresh();
            onClose();
        } catch (error: any) {
            alert(error.message || "Failed to book slot. Please try again.");
        } finally {
            setBooking(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900">Select Interview Slot</h2>
                    <button
                        onClick={onClose}
                        className="rounded-md p-1 hover:bg-gray-100"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="max-h-96 overflow-y-auto p-6">
                    {loading ? (
                        <div className="py-12 text-center text-gray-500">
                            Loading available slots...
                        </div>
                    ) : slots.length === 0 ? (
                        <div className="py-12 text-center">
                            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-semibold text-gray-900">No slots available</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Please check back later for available interview slots.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {slots.map((slot) => (
                                <div
                                    key={slot.id}
                                    className="rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-300 hover:shadow-sm"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                                <Calendar className="h-4 w-4 text-blue-600" />
                                                {format(new Date(slot.startTime), "EEEE, MMMM d, yyyy")}
                                            </div>
                                            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                                <Clock className="h-4 w-4" />
                                                {format(new Date(slot.startTime), "h:mm a")} - {format(new Date(slot.endTime), "h:mm a")}
                                            </div>
                                            {slot.location && (
                                                <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                                                    <MapPin className="h-4 w-4" />
                                                    {slot.location}
                                                </div>
                                            )}
                                            {slot.interviewers && slot.interviewers.length > 0 && (
                                                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                                    <Users className="h-3 w-3" />
                                                    Interviewers: {slot.interviewers.map((i: any) =>
                                                        `${i.interviewer.title || ''} ${i.interviewer.firstName} ${i.interviewer.lastName}`
                                                    ).join(", ")}
                                                </div>
                                            )}
                                            {slot.description && (
                                                <p className="mt-2 text-xs text-gray-500">{slot.description}</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleBookSlot(slot.id)}
                                            disabled={booking}
                                            className="ml-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {booking ? "Booking..." : "Book"}
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
