import { getInterviewSlotDetails } from "@/actions/interview";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import InterviewScoreForm from "./interview-score-form";

export default async function InterviewSlotDetailPage({ params }: { params: { slotId: string } }) {
    const slot = await getInterviewSlotDetails(params.slotId);

    if (!slot) {
        notFound();
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/admissions/interviews">
                    <button className="rounded-md border border-gray-300 p-2 hover:bg-gray-50">
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Interview Session</h1>
                    <p className="text-sm text-gray-500">
                        {slot.program?.nameEn || "Interview Slot"}
                    </p>
                </div>
            </div>

            {/* Slot Information */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Session Details</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                            <p className="text-sm font-medium text-gray-500">Date</p>
                            <p className="text-sm text-gray-900">
                                {format(new Date(slot.startTime), "EEEE, MMMM d, yyyy")}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <div>
                            <p className="text-sm font-medium text-gray-500">Time</p>
                            <p className="text-sm text-gray-900">
                                {format(new Date(slot.startTime), "h:mm a")} - {format(new Date(slot.endTime), "h:mm a")}
                            </p>
                        </div>
                    </div>
                    {slot.location && (
                        <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Location</p>
                                <p className="text-sm text-gray-900">{slot.location}</p>
                            </div>
                        </div>
                    )}
                    {slot.interviewers && slot.interviewers.length > 0 && (
                        <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Interviewers</p>
                                <p className="text-sm text-gray-900">
                                    {slot.interviewers.map((i: any) =>
                                        `${i.interviewer.title || ''} ${i.interviewer.firstName} ${i.interviewer.lastName}`
                                    ).join(", ")}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Interviewees List */}
            <div className="rounded-lg border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Interviewees ({slot.interviewResults?.length || 0})
                    </h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {slot.interviewResults && slot.interviewResults.length > 0 ? (
                        slot.interviewResults.map((result: any) => (
                            <div key={result.id} className="p-6">
                                <div className="mb-4 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            {result.application.applicant.firstName} {result.application.applicant.lastName}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {result.application.program.nameEn}
                                        </p>
                                        {result.application.applicant.citizenId && (
                                            <p className="text-xs text-gray-400">
                                                ID: {result.application.applicant.citizenId}
                                            </p>
                                        )}
                                    </div>
                                    {result.score !== null && (
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-gray-900">
                                                {result.score}/100
                                            </p>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${result.isPassed
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                }`}>
                                                {result.isPassed ? "Passed" : "Failed"}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Score Form */}
                                <InterviewScoreForm
                                    interviewResultId={result.id}
                                    currentScore={result.score}
                                    currentComments={result.comments}
                                    currentIsPassed={result.isPassed}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-gray-500">
                            No interviewees scheduled for this slot yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
