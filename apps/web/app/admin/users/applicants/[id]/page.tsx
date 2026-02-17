import { getApplicantById } from "@/actions/user-applicants";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Calendar,
    FileText,
    CheckCircle,
    XCircle,
    Clock,
    GraduationCap
} from "lucide-react";
import { format } from "date-fns";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ApplicantDetailPage({ params }: PageProps) {
    const { id } = await params;
    const result = await getApplicantById(id);

    if (!result.success || !result.applicant) {
        notFound();
    }

    const applicant = result.applicant;
    const latestApplication = applicant.applications?.[0];

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b bg-white p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/users/applicants">
                            <button className="rounded-md border p-2 hover:bg-gray-50">
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {applicant.firstName} {applicant.lastName}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Applicant ID: {applicant.id.slice(0, 8)}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700">
                            <CheckCircle className="h-4 w-4" />
                            Accept
                        </button>
                        <button className="flex items-center gap-2 rounded-md border border-red-600 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            <XCircle className="h-4 w-4" />
                            Reject
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">First Name (EN)</p>
                                    <p className="font-medium">{applicant.firstName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Last Name (EN)</p>
                                    <p className="font-medium">{applicant.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">First Name (TH)</p>
                                    <p className="font-medium">{applicant.firstNameTh}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Last Name (TH)</p>
                                    <p className="font-medium">{applicant.lastNameTh}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{applicant.user?.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">{applicant.phone || "-"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-medium">
                                            {applicant.birthDate
                                                ? format(new Date(applicant.birthDate), "MMMM d, yyyy")
                                                : "-"
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Nationality</p>
                                    <p className="font-medium">{applicant.nationality || "-"}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-sm text-muted-foreground">Address</p>
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                                        <p className="font-medium">{applicant.address || "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Applications */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Applications ({applicant.applications?.length || 0})
                            </h2>
                            {applicant.applications && applicant.applications.length > 0 ? (
                                <div className="space-y-4">
                                    {applicant.applications.map((application: any) => (
                                        <div key={application.id} className="rounded-lg border p-4">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <p className="font-medium">{application.program?.nameEn}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {application.program?.faculty?.nameEn}
                                                    </p>
                                                </div>
                                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${application.status === "ACCEPTED" ? "bg-green-100 text-green-700" :
                                                    application.status === "REJECTED" ? "bg-red-100 text-red-700" :
                                                        application.status === "SUBMITTED" ? "bg-blue-100 text-blue-700" :
                                                            "bg-yellow-100 text-yellow-700"
                                                    }`}>
                                                    {application.status}
                                                </span>
                                            </div>
                                            {application.track && (
                                                <div className="mb-2">
                                                    <p className="text-sm text-muted-foreground">Admission Track</p>
                                                    <p className="text-sm font-medium">{application.track.nameEn}</p>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <span>Applied: {format(new Date(application.createdAt), "MMM d, yyyy")}</span>
                                                {application.submittedAt && (
                                                    <span>Submitted: {format(new Date(application.submittedAt), "MMM d, yyyy")}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center py-8 text-muted-foreground">No applications yet</p>
                            )}
                        </div>

                        {/* Education History */}
                        {applicant.educationHistory && applicant.educationHistory.length > 0 && (
                            <div className="rounded-lg border bg-card p-6">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5" />
                                    Education History
                                </h2>
                                <div className="space-y-3">
                                    {applicant.educationHistory.map((edu: any) => (
                                        <div key={edu.id} className="rounded-lg border p-3">
                                            <p className="font-medium">{edu.institutionName}</p>
                                            <p className="text-sm text-muted-foreground">{edu.degree}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {edu.fieldOfStudy} • GPA: {edu.gpa}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {edu.startYear} - {edu.endYear || "Present"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Stats & Actions */}
                    <div className="space-y-6">
                        {/* Application Summary */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Application Summary</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Total Applications</span>
                                    <span className="font-bold">{applicant.applications?.length || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Accepted</span>
                                    <span className="font-bold text-green-600">
                                        {applicant.applications?.filter((a: any) => a.status === "ACCEPTED").length || 0}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Pending</span>
                                    <span className="font-bold text-yellow-600">
                                        {applicant.applications?.filter((a: any) =>
                                            a.status === "SUBMITTED" || a.status === "DRAFT"
                                        ).length || 0}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Rejected</span>
                                    <span className="font-bold text-red-600">
                                        {applicant.applications?.filter((a: any) => a.status === "REJECTED").length || 0}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Latest Application Status */}
                        {latestApplication && (
                            <div className="rounded-lg border bg-card p-6">
                                <h2 className="text-lg font-semibold mb-4">Latest Application</h2>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Program</p>
                                        <p className="font-medium text-sm">{latestApplication.program?.nameEn}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Status</p>
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${latestApplication.status === "ACCEPTED" ? "bg-green-100 text-green-700" :
                                            latestApplication.status === "REJECTED" ? "bg-red-100 text-red-700" :
                                                "bg-yellow-100 text-yellow-700"
                                            }`}>
                                            {latestApplication.status}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Submitted</p>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <p className="text-sm">
                                                {latestApplication.submittedAt
                                                    ? format(new Date(latestApplication.submittedAt), "MMM d, yyyy")
                                                    : "Not submitted"
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-4">Actions</h2>
                            <div className="space-y-2">
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    View All Applications
                                </button>
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    Schedule Interview
                                </button>
                                <button className="w-full rounded-md border p-2 text-sm hover:bg-gray-50 text-left">
                                    View Documents
                                </button>
                                <button className="w-full rounded-md border border-green-600 p-2 text-sm text-green-600 hover:bg-green-50 text-left">
                                    Accept Application
                                </button>
                                <button className="w-full rounded-md border border-red-600 p-2 text-sm text-red-600 hover:bg-red-50 text-left">
                                    Reject Application
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
