"use client";

import { useState } from "react";
import ScoreModal from "./score-modal";
import { Calendar, MapPin, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function InterviewList({ interviews, interviewerId }: { interviews: any[]; interviewerId: string }) {
    const [selectedInterview, setSelectedInterview] = useState<any>(null);
    const [filter, setFilter] = useState<"all" | "pending" | "scored">("all");

    const filteredInterviews = interviews.filter((interview) => {
        if (filter === "pending") return interview.score === null;
        if (filter === "scored") return interview.score !== null;
        return true;
    });

    const formatDateTime = (date: Date) => {
        return new Date(date).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <>
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                {/* Filter Tabs */}
                <div className="border-b border-gray-200 px-6 py-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter("all")}
                            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${filter === "all"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            All ({interviews.length})
                        </button>
                        <button
                            onClick={() => setFilter("pending")}
                            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${filter === "pending"
                                    ? "bg-yellow-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Pending ({interviews.filter((i) => i.score === null).length})
                        </button>
                        <button
                            onClick={() => setFilter("scored")}
                            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${filter === "scored"
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Scored ({interviews.filter((i) => i.score !== null).length})
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Interview Date & Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Applicant
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Program
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Score
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {filteredInterviews.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <Clock className="mx-auto h-12 w-12 text-gray-400" />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                                            No interviews found
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {filter === "pending"
                                                ? "All interviews have been scored."
                                                : filter === "scored"
                                                    ? "No scored interviews yet."
                                                    : "You don't have any assigned interviews."}
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                filteredInterviews.map((interview) => (
                                    <tr key={interview.id} className="hover:bg-gray-50">
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-900">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                {formatDateTime(interview.slot.startTime)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {interview.application.applicant.firstName}{" "}
                                                {interview.application.applicant.lastName}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {interview.application.applicant.user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {interview.application.program.nameEn}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {interview.application.program.faculty.nameEn}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                                {interview.slot.location || "TBD"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {interview.score !== null ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-semibold text-green-600">
                                                        {interview.score}
                                                    </span>
                                                    <span className="text-sm text-gray-500">/ 100</span>
                                                    {interview.isPassed ? (
                                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                    ) : (
                                                        <XCircle className="h-4 w-4 text-red-600" />
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                                    <Clock className="h-3 w-3" />
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setSelectedInterview(interview)}
                                                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${interview.score === null
                                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {interview.score === null ? "Score Interview" : "View/Edit Score"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Score Modal */}
            {selectedInterview && (
                <ScoreModal interview={selectedInterview} onClose={() => setSelectedInterview(null)} />
            )}
        </>
    );
}
