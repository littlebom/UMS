import Link from "next/link";
import { getApplicationById } from "@/actions/admission";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar, MapPin, Phone, Mail, FileText } from "lucide-react";
import ApplicationStatusActions from "./status-actions";
import AssignInterview from "./assign-interview";
import ApplicationEditDeleteActions from "./edit-delete-actions";

export default async function ApplicationDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const application = await getApplicationById(id);

    if (!application) {
        notFound();
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/admissions"
                    className="rounded-full p-2 hover:bg-gray-100"
                >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Application Details
                    </h1>
                    <p className="text-sm text-gray-500">ID: {application.id}</p>
                </div>
                <div className="ml-auto">
                    <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${application.status === "SUBMITTED"
                            ? "bg-yellow-100 text-yellow-800"
                            : application.status === "ACCEPTED"
                                ? "bg-green-100 text-green-800"
                                : application.status === "REJECTED"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                            }`}
                    >
                        {application.status.replace("_", " ")}
                    </span>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column: Applicant Info */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Personal Information */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            Personal Information
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <label className="text-xs font-medium text-gray-500">
                                    Full Name
                                </label>
                                <p className="text-sm font-medium text-gray-900">
                                    {application.applicant.firstName} {application.applicant.lastName}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500">
                                    Citizen ID
                                </label>
                                <p className="text-sm font-medium text-gray-900">
                                    {application.applicant.citizenId || "-"}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500">
                                    Date of Birth
                                </label>
                                <p className="text-sm font-medium text-gray-900">
                                    {application.applicant.birthDate
                                        ? new Date(application.applicant.birthDate).toLocaleDateString()
                                        : "-"}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500">
                                    Phone Number
                                </label>
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                    <Phone className="h-3 w-3 text-gray-400" />
                                    {application.applicant.phone || "-"}
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="text-xs font-medium text-gray-500">
                                    Email Address
                                </label>
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                    <Mail className="h-3 w-3 text-gray-400" />
                                    {application.applicant.user.email}
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="text-xs font-medium text-gray-500">
                                    Address
                                </label>
                                <div className="flex items-start gap-2 text-sm font-medium text-gray-900">
                                    <MapPin className="mt-0.5 h-3 w-3 text-gray-400" />
                                    {application.applicant.address || "-"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            Submitted Documents
                        </h2>
                        {application.documents.length > 0 ? (
                            <ul className="divide-y divide-gray-100">
                                {application.documents.map((doc) => (
                                    <li
                                        key={doc.id}
                                        className="flex items-center justify-between py-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="rounded bg-blue-50 p-2 text-blue-600">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {doc.type}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Uploaded on{" "}
                                                    {new Date(doc.uploadedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-blue-600 hover:underline"
                                        >
                                            View
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">No documents uploaded.</p>
                        )}
                    </div>
                </div>

                {/* Right Column: Program & Actions */}
                <div className="space-y-6">
                    {/* Program Info */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            Program Details
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-gray-500">
                                    Program Name
                                </label>
                                <p className="text-sm font-medium text-gray-900">
                                    {application.program.nameEn}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {application.program.nameTh}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500">
                                    Degree Level
                                </label>
                                <p className="text-sm font-medium text-gray-900">
                                    {application.program.degreeLevel}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500">
                                    Faculty
                                </label>
                                <p className="text-sm font-medium text-gray-900">
                                    {application.program.faculty.nameEn}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500">
                                    Department
                                </label>
                                <p className="text-sm font-medium text-gray-900">
                                    {application.program.department?.nameEn || "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Interview Status */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            Interview Status
                        </h2>
                        {application.status === "INTERVIEW_READY" && !application.interview ? (
                            <AssignInterview applicationId={application.id} />
                        ) : application.interview ? (
                            <div className="space-y-4">
                                <div className="rounded-md bg-blue-50 p-4">
                                    <div className="flex items-center gap-2 font-medium text-blue-900">
                                        <Calendar className="h-4 w-4" />
                                        Scheduled Interview
                                    </div>
                                    <div className="mt-2 space-y-1 text-sm text-blue-800">
                                        <p>
                                            Date:{" "}
                                            {new Date(
                                                application.interview.slot.startTime
                                            ).toLocaleDateString()}
                                        </p>
                                        <p>
                                            Time:{" "}
                                            {new Date(
                                                application.interview.slot.startTime
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}{" "}
                                            -{" "}
                                            {new Date(
                                                application.interview.slot.endTime
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                        <p>Location: {application.interview.slot.location || "Online"}</p>
                                        <p>
                                            Interviewer(s):{" "}
                                            {application.interview.slot.interviewers.map((si, idx) => (
                                                <span key={si.id}>
                                                    {si.interviewer.firstName} {si.interviewer.lastName}
                                                    {idx < application.interview.slot.interviewers.length - 1 ? ", " : ""}
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                                {application.status === "INTERVIEW_COMPLETED" && (
                                    <div className="rounded-md border border-gray-200 p-4">
                                        <p className="font-medium text-gray-900">Result</p>
                                        <div className="mt-2 text-sm">
                                            <p>
                                                Pass Status:{" "}
                                                <span
                                                    className={
                                                        application.interview.isPassed
                                                            ? "font-bold text-green-600"
                                                            : "font-bold text-red-600"
                                                    }
                                                >
                                                    {application.interview.isPassed ? "PASSED" : "FAILED"}
                                                </span>
                                            </p>
                                            <p className="mt-1 text-gray-600">
                                                Score: {application.interview.score || "-"}
                                            </p>
                                            <p className="mt-1 text-gray-600">
                                                Comments: {application.interview.comments || "-"}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                Not ready for interview scheduling yet. Verify documents first.
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            Application Actions
                        </h2>
                        <ApplicationStatusActions
                            id={application.id}
                            currentStatus={application.status}
                        />
                        <ApplicationEditDeleteActions
                            id={application.id}
                            applicantName={`${application.applicant.firstName} ${application.applicant.lastName}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
