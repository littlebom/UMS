"use client";

import { bookInterviewSlot, getAvailableSlots } from "@/actions/interview";
import { useState, useEffect } from "react";
import { Calendar, Clock, User } from "lucide-react";

export default function AssignInterview({ applicationId }: { applicationId: string }) {
    const [slots, setSlots] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSlotId, setSelectedSlotId] = useState("");

    useEffect(() => {
        const fetchSlots = async () => {
            const availableSlots = await getAvailableSlots();
            setSlots(availableSlots);
        };
        fetchSlots();
    }, []);

    const handleAssign = async () => {
        if (!selectedSlotId) return;
        if (!confirm("Confirm interview assignment?")) return;

        setIsLoading(true);
        try {
            await bookInterviewSlot(applicationId, selectedSlotId);
        } catch (error) {
            console.error(error);
            alert("Failed to assign slot");
        } finally {
            setIsLoading(false);
        }
    };

    if (slots.length === 0) {
        return (
            <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-700">
                No available interview slots found. Please create slots in the schedule first.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Select Interview Slot</h3>
            <div className="max-h-60 overflow-y-auto space-y-2 rounded-md border border-gray-200 p-2">
                {slots.map((slot) => (
                    <label
                        key={slot.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-md p-3 transition-colors ${selectedSlotId === slot.id
                                ? "bg-blue-50 border-blue-200 ring-1 ring-blue-500"
                                : "hover:bg-gray-50 border border-transparent"
                            }`}
                    >
                        <input
                            type="radio"
                            name="slot"
                            value={slot.id}
                            checked={selectedSlotId === slot.id}
                            onChange={(e) => setSelectedSlotId(e.target.value)}
                            className="mt-1"
                        />
                        <div className="flex-1 text-sm">
                            <div className="flex items-center gap-2 font-medium text-gray-900">
                                <Calendar className="h-3 w-3 text-gray-500" />
                                {new Date(slot.startTime).toLocaleDateString()}
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-gray-500">
                                <Clock className="h-3 w-3" />
                                {new Date(slot.startTime).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}{" "}
                                -{" "}
                                {new Date(slot.endTime).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-gray-500">
                                <User className="h-3 w-3" />
                                {slot.interviewer.firstName} {slot.interviewer.lastName}
                            </div>
                        </div>
                    </label>
                ))}
            </div>
            <button
                onClick={handleAssign}
                disabled={!selectedSlotId || isLoading}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {isLoading ? "Assigning..." : "Confirm Assignment"}
            </button>
        </div>
    );
}
