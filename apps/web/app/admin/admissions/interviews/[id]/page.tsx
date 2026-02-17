import { getInterviewSlotDetails } from "@/actions/interview";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ChevronLeft,
    Calendar,
    Clock,
    MapPin,
    User,
    BookOpen,
    Phone,
    FileText,
    CheckCircle2,
    XCircle,
    Clock3
} from "lucide-react";

export default async function InterviewSlotDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const slot = await getInterviewSlotDetails(params.id);

    if (!slot) {
        notFound();
    }

    // Get all applications that booked this slot
    const bookedApplications = slot.interviewResults || [];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/admissions/interviews"
                    className="rounded-full p-2 hover:bg-gray-100"
                >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Interview Slot Details
                    </h1>
                    <p className="text-sm text-gray-500">
                        View slot information and candidates
                    </p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column - Slot Information */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Basic Info Card */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Slot Information
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">Date</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(slot.startTime).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">Time</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(slot.startTime).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })} - {new Date(slot.endTime).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">Location</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {slot.location || "Online / TBD"}
                                    </p>
                                </div>
                            </div>

                            {slot.program && (
                                <div className="flex items-start gap-3">
                                    <BookOpen className="h-5 w-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Program</p>
                                        <p className="text-sm font-medium text-blue-900">
                                            {slot.program.nameEn}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {slot.program.faculty.nameEn}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Interviewers Card */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Interviewers
                        </h2>

                        <div className="space-y-3">
                            {slot.interviewers.map((si) => (
                                <div key={si.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {si.interviewer.firstName} {si.interviewer.lastName}
                                        </p>
                                        {si.interviewer.position && (
                                            <p className="text-xs text-gray-500">
                                                {si.interviewer.position}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Coordinator Card */}
                    {(slot.coordinatorName || slot.coordinatorPhone || slot.description) && (
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Coordinator Information
                            </h2>

                            <div className="space-y-3">
                                {slot.coordinatorName && (
                                    <div className="flex items-start gap-3">
                                        <User className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500">Name</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {slot.coordinatorName}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {slot.coordinatorPhone && (
                                    <div className="flex items-start gap-3">
                                        <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500">Phone</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {slot.coordinatorPhone}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {slot.description && (
                                    <div className="flex items-start gap-3">
                                        <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Additional Information</p>
                                            <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                                {slot.description}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Candidates List */}
                <div className="lg:col-span-2">
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Candidates ({bookedApplications.length})
                            </h2>
                            <p className="text-sm text-gray-500">
                                {bookedApplications.length === 0
                                    ? "No candidates have booked this slot yet"
                                    : "List of candidates scheduled for this interview"}
                            </p>
                        </div>

                        <div className="divide-y divide-gray-200">
                            {bookedApplications.length === 0 ? (
                                <div className="p-12 text-center">
                                    <Clock3 className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                                        No candidates yet
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        This slot is available for booking.
                                    </p>
                                </div>
                            ) : (
                                bookedApplications.map((result) => (
                                    <div key={result.id} className="p-6 hover:bg-gray-50">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-base font-semibold text-gray-900">
                                                        {result.application.applicant.firstName}{" "}
                                                        {result.application.applicant.lastName}
                                                    </h3>
                                                    {result.isPassed === true && (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                            <CheckCircle2 className="h-3 w-3" />
                                                            Passed
                                                        </span>
                                                    )}
                                                    {result.isPassed === false && (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                                            <XCircle className="h-3 w-3" />
                                                            Failed
                                                        </span>
                                                    )}
                                                    {/* Show Confirmation Status if not yet graded */}
                                                    {result.isPassed === null && (
                                                        result.confirmedAt ? (
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                                <CheckCircle2 className="h-3 w-3" />
                                                                Confirmed
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                                                <Clock3 className="h-3 w-3" />
                                                                Pending Confirmation
                                                            </span>
                                                        )
                                                    )}
                                                </div>

                                                <div className="mt-2 space-y-1">
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-medium">Email:</span>{" "}
                                                        {result.application.applicant.user.email}
                                                    </p>
                                                    {result.application.applicant.phone && (
                                                        <p className="text-sm text-gray-600">
                                                            <span className="font-medium">Phone:</span>{" "}
                                                            {result.application.applicant.phone}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-medium">Program:</span>{" "}
                                                        {result.application.program.nameEn}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-medium">Application Status:</span>{" "}
                                                        <span className="capitalize">{result.application.status.toLowerCase().replace('_', ' ')}</span>
                                                    </p>
                                                </div>

                                                {result.notes && (
                                                    <div className="mt-3 rounded-lg bg-gray-50 p-3">
                                                        <p className="text-xs font-medium text-gray-700 mb-1">
                                                            Interview Notes:
                                                        </p>
                                                        <p className="text-sm text-gray-600 whitespace-pre-wrap">
                                                            {result.notes}
                                                        </p>
                                                    </div>
                                                )}

                                                {result.score !== null && (
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-600">
                                                            <span className="font-medium">Score:</span>{" "}
                                                            <span className="text-lg font-semibold text-blue-600">
                                                                {result.score}
                                                            </span>
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            <Link
                                                href={`/admin/admissions/${result.applicationId}`}
                                                className="ml-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                            >
                                                View Application
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
