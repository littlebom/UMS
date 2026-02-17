"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from "lucide-react";
import * as Icons from "lucide-react";
import Link from "next/link";
import InterviewBookingModal from "./interview-booking-modal";

interface ApplicationCardProps {
    app: any;
}

export default function ApplicationCard({ app }: ApplicationCardProps) {
    const [showBookingModal, setShowBookingModal] = useState(false);

    const IconComponent = app.track?.type?.icon ? (Icons as any)[app.track.type.icon] : Icons.Target;

    // Status Badge Logic
    let statusColor = "bg-gray-100 text-gray-800";
    let statusIcon = Clock;

    switch (app.status) {
        case "SUBMITTED":
            statusColor = "bg-blue-100 text-blue-800";
            break;
        case "UNDER_REVIEW":
            statusColor = "bg-yellow-100 text-yellow-800";
            break;
        case "INTERVIEW_READY":
            statusColor = "bg-purple-100 text-purple-800";
            statusIcon = Calendar;
            break;
        case "ACCEPTED":
            statusColor = "bg-green-100 text-green-800";
            statusIcon = CheckCircle;
            break;
        case "REJECTED":
            statusColor = "bg-red-100 text-red-800";
            statusIcon = XCircle;
            break;
    }

    const StatusIcon = statusIcon;
    const needsInterviewBooking = app.status === "INTERVIEW_READY" && !app.interview;

    return (
        <>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor}`}>
                            <StatusIcon className="h-3 w-3" />
                            {app.status.replace("_", " ")}
                        </span>
                        <span className="text-xs text-gray-500">
                            {format(new Date(app.createdAt), "MMM d, yyyy")}
                        </span>
                    </div>
                </div>
                <div className="p-4">
                    <div className="mb-4">
                        <h3 className="font-semibold text-gray-900 line-clamp-2">{app.program.nameEn}</h3>
                        <p className="text-sm text-gray-500">{app.program.faculty.nameEn}</p>
                    </div>

                    {app.track && (
                        <div className="mb-4 flex items-center gap-2 text-xs text-gray-600">
                            <span
                                className="inline-flex items-center rounded px-2 py-1"
                                style={{ backgroundColor: `${app.track.type.color}20`, color: app.track.type.color }}
                            >
                                <IconComponent className="mr-1 h-3 w-3" />
                                {app.track.type.nameEn}
                            </span>
                            <span className="rounded bg-gray-100 px-2 py-1">
                                Year {app.track.academicYear}
                            </span>
                        </div>
                    )}

                    {/* Interview Info or Booking Prompt */}
                    {needsInterviewBooking ? (
                        <div className="mt-4 rounded-md bg-purple-50 p-3 text-sm">
                            <h4 className="mb-2 font-medium text-purple-900 flex items-center gap-1">
                                <Calendar className="h-4 w-4" /> Action Required
                            </h4>
                            <p className="text-purple-800 text-xs">
                                Please book your interview slot to proceed with your application.
                            </p>
                        </div>
                    ) : app.interview ? (
                        <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm">
                            <h4 className="mb-2 font-medium text-blue-900 flex items-center gap-1">
                                <Calendar className="h-4 w-4" /> Interview Scheduled
                            </h4>
                            <div className="space-y-1 text-blue-800">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3" />
                                    <span>{format(new Date(app.interview.slot.startTime), "PP p")}</span>
                                </div>
                                {app.interview.slot.location && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-3 w-3" />
                                        <span>{app.interview.slot.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 space-y-2">
                    {needsInterviewBooking && (
                        <button
                            onClick={() => setShowBookingModal(true)}
                            className="w-full rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
                        >
                            <Calendar className="inline h-4 w-4 mr-1" />
                            Book Interview Slot
                        </button>
                    )}
                    <Link href={`/applicant/applications/${app.id}`}>
                        <button className="w-full rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>

            {/* Interview Booking Modal */}
            {needsInterviewBooking && (
                <InterviewBookingModal
                    applicationId={app.id}
                    programId={app.programId}
                    isOpen={showBookingModal}
                    onClose={() => setShowBookingModal(false)}
                />
            )}
        </>
    );
}
