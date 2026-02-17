import { getApplicationById } from "@/actions/application";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, User, GraduationCap, FileText, Calendar, MapPin, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";
import StatusActionPanel from "./status-action-panel";

export default async function ApplicationDetailPage({ params }: { params: { id: string } }) {
    const app = await getApplicationById(params.id);

    if (!app) {
        notFound();
    }

    // Status Badge Logic
    let statusColor = "bg-gray-100 text-gray-800";
    let StatusIcon = Clock;

    switch (app.status) {
        case "SUBMITTED":
            statusColor = "bg-blue-100 text-blue-800";
            break;
        case "UNDER_REVIEW":
            statusColor = "bg-yellow-100 text-yellow-800";
            break;
        case "INTERVIEW_READY":
            statusColor = "bg-purple-100 text-purple-800";
            StatusIcon = Calendar;
            break;
        case "ACCEPTED":
            statusColor = "bg-green-100 text-green-800";
            StatusIcon = CheckCircle;
            break;
        case "REJECTED":
            statusColor = "bg-red-100 text-red-800";
            StatusIcon = XCircle;
            break;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/admissions/applications">
                        <button className="rounded-md border border-gray-300 p-2 hover:bg-gray-50">
                            <ArrowLeft className="h-4 w-4" />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {app.applicant.firstName} {app.applicant.lastName}
                        </h1>
                        <p className="text-sm text-gray-500">Application ID: {app.id.slice(0, 8)}</p>
                    </div>
                </div>
                <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${statusColor}`}>
                    <StatusIcon className="h-4 w-4" />
                    {app.status.replace("_", " ")}
                </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content - Left Column */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Personal Information */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6">
                        <div className="mb-4 flex items-center gap-2 border-b pb-3">
                            <User className="h-5 w-5 text-gray-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                        </div>
                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Full Name (Thai)</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {app.applicant.firstNameTh || app.applicant.firstName} {app.applicant.lastNameTh || app.applicant.lastName}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Full Name (English)</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {app.applicant.firstName} {app.applicant.lastName}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">National ID</dt>
                                <dd className="mt-1 text-sm text-gray-900">{app.applicant.citizenId || "-"}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                <dd className="mt-1 text-sm text-gray-900">{app.applicant.phone || "-"}</dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-gray-500">Address</dt>
                                <dd className="mt-1 text-sm text-gray-900">{app.applicant.address || "-"}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Education History */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6">
                        <div className="mb-4 flex items-center gap-2 border-b pb-3">
                            <GraduationCap className="h-5 w-5 text-gray-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Education Background</h2>
                        </div>
                        {app.applicant.educationHistory && app.applicant.educationHistory.length > 0 ? (
                            <div className="space-y-4">
                                {app.applicant.educationHistory.map((edu: any) => (
                                    <div key={edu.id} className="rounded-md bg-gray-50 p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                                                <p className="text-sm text-gray-600">{edu.degreeName}</p>
                                                <p className="mt-1 text-xs text-gray-500">{edu.level}</p>
                                            </div>
                                            {edu.gpa && (
                                                <div className="text-right">
                                                    <p className="text-sm font-medium text-gray-900">GPA: {edu.gpa}</p>
                                                    {edu.graduationYear && (
                                                        <p className="text-xs text-gray-500">Year: {edu.graduationYear}</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No education history recorded.</p>
                        )}
                    </div>

                    {/* Documents */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6">
                        <div className="mb-4 flex items-center gap-2 border-b pb-3">
                            <FileText className="h-5 w-5 text-gray-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Submitted Documents</h2>
                        </div>
                        {app.documents && app.documents.length > 0 ? (
                            <div className="space-y-2">
                                {app.documents.map((doc: any) => (
                                    <div key={doc.id} className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{doc.type.replace("_", " ")}</p>
                                                <p className="text-xs text-gray-500">
                                                    Uploaded: {format(new Date(doc.uploadedAt), "MMM d, yyyy")}
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                        >
                                            View
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No documents uploaded.</p>
                        )}
                    </div>

                    {/* Interview Information */}
                    {app.interview && (
                        <div className="rounded-lg border border-gray-200 bg-white p-6">
                            <div className="mb-4 flex items-center gap-2 border-b pb-3">
                                <Calendar className="h-5 w-5 text-gray-600" />
                                <h2 className="text-lg font-semibold text-gray-900">Interview Details</h2>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-900">
                                        {format(new Date(app.interview.slot.startTime), "PPP p")} - {format(new Date(app.interview.slot.endTime), "p")}
                                    </span>
                                </div>
                                {app.interview.slot.location && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-900">{app.interview.slot.location}</span>
                                    </div>
                                )}
                                {app.interview.score !== null && (
                                    <div className="mt-4 rounded-md bg-blue-50 p-3">
                                        <p className="text-sm font-medium text-blue-900">Score: {app.interview.score}</p>
                                        {app.interview.comments && (
                                            <p className="mt-1 text-sm text-blue-800">{app.interview.comments}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Program Information */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">Program Details</h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Program</p>
                                <p className="mt-1 text-sm text-gray-900">{app.program.nameEn}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Faculty</p>
                                <p className="mt-1 text-sm text-gray-900">{app.program.faculty.nameEn}</p>
                            </div>
                            {app.track && (
                                <>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Admission Track</p>
                                        <p className="mt-1 text-sm text-gray-900">{app.track.nameEn}</p>
                                        <span className="mt-1 inline-block rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                                            {app.track.type.nameEn}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Academic Year</p>
                                        <p className="mt-1 text-sm text-gray-900">{app.track.academicYear}</p>
                                    </div>
                                </>
                            )}
                            <div>
                                <p className="text-sm font-medium text-gray-500">Submitted Date</p>
                                <p className="mt-1 text-sm text-gray-900">
                                    {app.submittedAt ? format(new Date(app.submittedAt), "PPP") : "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Status Actions */}
                    <StatusActionPanel applicationId={app.id} currentStatus={app.status} />
                </div>
            </div>
        </div>
    );
}
