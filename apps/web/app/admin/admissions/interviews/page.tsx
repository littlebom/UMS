import Link from "next/link";
import { getInterviewSlots } from "@/actions/interview";
import { getPersonnel } from "@/actions/personnel"; // Need to fetch interviewers
import { getPrograms } from "@/actions/program";
import { Plus, Calendar, Clock, MapPin, User, BookOpen } from "lucide-react";

export default async function InterviewManagementPage() {
    const slots = await getInterviewSlots();
    const personnel = await getPersonnel(); // We'll use this list to select interviewers
    const programs = await getPrograms();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Interview Schedule
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage interview slots and assignments.
                    </p>
                </div>
                <Link
                    href="/admin/admissions/interviews/new"
                    className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Create Slot
                </Link>
            </div>

            {/* Slots List */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {slots.length === 0 ? (
                    <div className="col-span-full rounded-lg border border-dashed border-gray-300 p-12 text-center">
                        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No interview slots</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by creating a new interview slot.
                        </p>
                    </div>
                ) : (
                    slots.map((slot) => (
                        <Link
                            key={slot.id}
                            href={`/admin/admissions/interviews/${slot.id}`}
                            className={`relative flex flex-col justify-between rounded-lg border p-6 shadow-sm transition-all hover:shadow-md ${slot.interviewResults && slot.interviewResults.length > 0
                                ? "border-blue-200 bg-blue-50"
                                : "border-gray-200 bg-white hover:border-blue-300"
                                }`}
                        >
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2 text-gray-900">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">
                                            {new Date(slot.startTime).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${slot.interviewResults && slot.interviewResults.length > 0
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-green-100 text-green-800"
                                            }`}
                                    >
                                        {slot.interviewResults && slot.interviewResults.length > 0
                                            ? `${slot.interviewResults.length} Candidate${slot.interviewResults.length > 1 ? 's' : ''}`
                                            : "Available"}
                                    </span>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gray-400" />
                                        <span>
                                            {new Date(slot.startTime).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}{" "}
                                            -{" "}
                                            {new Date(slot.endTime).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <span>{slot.location || "Online / TBD"}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <User className="h-4 w-4 text-gray-400 mt-0.5" />
                                        <div className="flex-1">
                                            <span className="text-xs text-gray-500 block">Interviewer(s):</span>
                                            <span className="text-sm">
                                                {slot.interviewers.map((si: any, idx: number) => (
                                                    <span key={si.id}>
                                                        {si.interviewer.firstName} {si.interviewer.lastName}
                                                        {idx < slot.interviewers.length - 1 && ", "}
                                                    </span>
                                                ))}
                                            </span>
                                        </div>
                                    </div>
                                    {slot.coordinatorName && (
                                        <div className="flex items-start gap-2 text-sm">
                                            <span className="text-gray-500">Coordinator:</span>
                                            <span>
                                                {slot.coordinatorName}
                                                {slot.coordinatorPhone && ` (${slot.coordinatorPhone})`}
                                            </span>
                                        </div>
                                    )}
                                    {slot.program && (
                                        <div className="flex items-center gap-2 text-blue-600">
                                            <BookOpen className="h-4 w-4" />
                                            <span className="truncate" title={slot.program.nameEn}>
                                                {slot.program.nameEn}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
