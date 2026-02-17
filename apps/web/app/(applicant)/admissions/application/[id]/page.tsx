import { getApplicantApplicationDetail } from "@/actions/applicant-interview";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    Calendar,
    Clock,
    MapPin,
    User,
    FileText,
    ChevronLeft,
    CheckCircle,
    AlertCircle,
    Download,
    HelpCircle
} from "lucide-react";
import InterviewActionButtons from "./interview-action-buttons";
import InterviewBooking from "./interview-booking";
import FeedbackForm from "./feedback-form";
import CheckInButton from "./check-in-button";

export default async function ApplicationDetailPage({
    params,
}: {
    params: { id: string };
}) {
    try {
        const application = await getApplicantApplicationDetail(params.id);
        const interview = application.interview;
        const slot = interview?.slot;

        const getStatusColor = (status: string) => {
            switch (status) {
                case "ACCEPTED":
                case "PASSED":
                    return "bg-green-100 text-green-800";
                case "REJECTED":
                case "FAILED":
                    return "bg-red-100 text-red-800";
                case "INTERVIEW_READY":
                case "INTERVIEW_COMPLETED":
                    return "bg-blue-100 text-blue-800";
                default:
                    return "bg-yellow-100 text-yellow-800";
            }
        };

        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Back Button */}
                    <Link
                        href="/admissions/dashboard"
                        className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
                    >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Dashboard
                    </Link>

                    {/* Header Section */}
                    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                            <div>
                                <div className="mb-2 flex items-center gap-3">
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        {application.program.nameEn}
                                    </h1>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                                            application.status
                                        )}`}
                                    >
                                        {application.status.replace("_", " ")}
                                    </span>
                                </div>
                                <p className="text-gray-600">
                                    {application.program.faculty.nameEn} • {application.program.degreeLevel}
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    Application ID: <span className="font-mono">{application.id}</span>
                                </p>
                            </div>
                            <div className="text-right text-sm text-gray-500">
                                <p>Submitted on</p>
                                <p className="font-medium text-gray-900">
                                    {application.submittedAt
                                        ? new Date(application.submittedAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })
                                        : "Not submitted"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Interview Details Section */}
                    {interview && slot ? (
                        <div className="mb-6 overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
                            <div className="border-b border-blue-100 bg-blue-50 px-6 py-4">
                                <h2 className="flex items-center text-lg font-semibold text-blue-900">
                                    <Calendar className="mr-2 h-5 w-5" />
                                    Interview Scheduled
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>

                                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Date & Time
                                            </label>
                                            <div className="mt-1 flex items-start gap-3">
                                                <Clock className="mt-0.5 h-5 w-5 text-blue-600" />
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {new Date(slot.startTime).toLocaleDateString("en-US", {
                                                            weekday: "long",
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        })}
                                                    </p>
                                                    <p className="text-gray-600">
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
                                                    <a
                                                        href={`/api/calendar/interview/${application.id}`}
                                                        className="mt-2 inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800"
                                                    >
                                                        <Calendar className="mr-1 h-3 w-3" />
                                                        Add to Calendar
                                                    </a>
                                                </div>
                                            </div>
                                        </div>


                                        <div>
                                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Location
                                            </label>
                                            <div className="mt-1 flex items-start gap-3">
                                                <MapPin className="mt-0.5 h-5 w-5 text-blue-600" />
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {slot.location || "Online / To be announced"}
                                                    </p>
                                                    {slot.location?.includes("http") && (
                                                        <a
                                                            href={slot.location}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-blue-600 hover:underline"
                                                        >
                                                            Join Meeting
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            <CheckInButton
                                                applicationId={application.id}
                                                startTime={slot.startTime}
                                                endTime={slot.endTime}
                                                checkedInAt={interview.checkedInAt}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Interviewer
                                            </label>
                                            <div className="mt-1 flex items-start gap-3">
                                                <User className="mt-0.5 h-5 w-5 text-blue-600" />
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {slot.interviewer.title} {slot.interviewer.firstName} {slot.interviewer.lastName}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {slot.interviewer.position}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Status
                                            </label>
                                            <div className="mt-1">
                                                {interview.confirmedAt ? (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                                        <CheckCircle className="h-4 w-4" />
                                                        Confirmed
                                                    </span>
                                                ) : interview.rescheduleRequested ? (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                                                        <AlertCircle className="h-4 w-4" />
                                                        Reschedule Requested
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                                        <AlertCircle className="h-4 w-4" />
                                                        Action Required
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons Component */}
                                <div className="mt-8 border-t border-gray-100 pt-6">
                                    <InterviewActionButtons
                                        applicationId={application.id}
                                        isConfirmed={!!interview.confirmedAt}
                                        isRescheduleRequested={interview.rescheduleRequested}
                                    />
                                </div>

                                {/* Evaluation Result Section */}
                                {(interview.isPassed !== null || interview.score !== null) && (
                                    <div className="mt-8 border-t border-gray-100 pt-6">
                                        <h3 className="mb-4 text-lg font-medium text-gray-900">Interview Result</h3>
                                        <div className="rounded-md bg-gray-50 p-4">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                {interview.isPassed !== null && (
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-500">Result</p>
                                                        <p className={`mt-1 text-lg font-semibold ${interview.isPassed ? "text-green-600" : "text-red-600"}`}>
                                                            {interview.isPassed ? "Passed" : "Not Passed"}
                                                        </p>
                                                    </div>
                                                )}
                                                {interview.score !== null && (
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-500">Total Score</p>
                                                        <p className="mt-1 text-lg font-semibold text-gray-900">
                                                            {interview.score} points
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            {interview.comments && (
                                                <div className="mt-4 border-t border-gray-200 pt-4">
                                                    <p className="text-sm font-medium text-gray-500">Interviewer Comments</p>
                                                    <p className="mt-1 text-gray-700">{interview.comments}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="mb-6 overflow-hidden rounded-lg bg-white shadow">
                            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Interview Information
                                </h3>
                            </div>
                            <div className="px-4 py-5 sm:p-6">
                                {["DOCUMENT_VERIFIED", "INTERVIEW_READY"].includes(application.status) ? (
                                    <div className="text-center py-8">
                                        <h4 className="text-lg font-medium text-gray-900 mb-2">Ready to Schedule</h4>
                                        <p className="text-gray-500 mb-6">
                                            Your application documents have been verified. You can now schedule your interview.
                                        </p>
                                        <InterviewBooking
                                            applicationId={application.id}
                                            programId={application.programId}
                                            programName={application.program.nameEn}
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                            <Calendar className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900">No Interview Scheduled Yet</h3>
                                        <p className="mt-2 text-gray-500">
                                            Your application is currently under review. We will notify you once an interview slot is assigned.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Documents Section */}
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">Uploaded Documents</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {application.documents.length > 0 ? (
                                application.documents.map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-500">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{doc.type}</p>
                                                <p className="text-xs text-gray-500">
                                                    Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-md border border-gray-300 p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                            title="Download"
                                        >
                                            <Download className="h-4 w-4" />
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-8 text-center text-gray-500">
                                    No documents uploaded
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Help Section */}
                    <div className="mt-8 flex items-start gap-3 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
                        <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                        <div>
                            <p className="font-semibold">Need help?</p>
                            <p className="mt-1">
                                If you have any questions about your application or interview, please contact the admissions office or use the AI Chatbot for immediate assistance.
                            </p>
                        </div>
                    </div>
                    {/* Feedback Section */}
                    {interview && ["INTERVIEW_COMPLETED", "ACCEPTED", "REJECTED", "PASSED", "FAILED"].includes(application.status) && !interview.feedback && (
                        <FeedbackForm applicationId={application.id} />
                    )}
                </div>
            </div>
        );
    } catch (error) {
        redirect("/admissions/dashboard");
    }
}

