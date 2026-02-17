import { getApplicantSession } from "@/actions/auth";
import { redirect } from "next/navigation";
import { prisma } from "@ums/lib";
import Link from "next/link";
import { Plus, FileText, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import LogoutButton from "./logout-button";

export default async function ApplicantDashboardPage() {
    const session = await getApplicantSession();

    if (!session || !session.applicantId) {
        redirect("/admissions/login");
    }

    // Fetch applicant data and applications
    const applicant = await prisma.applicant.findUnique({
        where: { id: session.applicantId },
        include: {
            user: true,
            applications: {
                include: {
                    program: {
                        include: {
                            faculty: true,
                        },
                    },
                    track: {
                        include: {
                            type: true,
                        },
                    },
                    interview: {
                        include: {
                            slot: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    if (!applicant) {
        redirect("/admissions/login");
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "ACCEPTED":
                return <CheckCircle className="h-5 w-5 text-green-600" />;
            case "REJECTED":
                return <XCircle className="h-5 w-5 text-red-600" />;
            case "SUBMITTED":
            case "DOCUMENT_VERIFIED":
            case "INTERVIEW_READY":
            case "INTERVIEW_COMPLETED":
                return <Clock className="h-5 w-5 text-yellow-600" />;
            default:
                return <FileText className="h-5 w-5 text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACCEPTED":
                return "bg-green-100 text-green-800";
            case "REJECTED":
                return "bg-red-100 text-red-800";
            case "SUBMITTED":
                return "bg-yellow-100 text-yellow-800";
            case "DOCUMENT_VERIFIED":
            case "INTERVIEW_READY":
                return "bg-blue-100 text-blue-800";
            case "INTERVIEW_COMPLETED":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome, {applicant.firstName}!
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">{applicant.user.email}</p>
                    </div>
                    <LogoutButton />
                </div>

                {/* Quick Actions */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Link
                        href="/admissions/apply"
                        className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
                            <Plus className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">New Application</h3>
                            <p className="text-sm text-gray-500">Apply to a program</p>
                        </div>
                    </Link>
                </div>

                {/* Applications List */}
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">My Applications</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {applicant.applications.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    No applications yet
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Get started by creating your first application.
                                </p>
                                <div className="mt-6">
                                    <Link
                                        href="/admissions/apply"
                                        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        New Application
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            applicant.applications.map((app) => (
                                <div key={app.id} className="px-6 py-4 hover:bg-gray-50">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1">{getStatusIcon(app.status)}</div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">
                                                    {app.program.nameEn}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {app.program.faculty.nameEn}
                                                </p>
                                                {(app as any).track && (
                                                    <div className="mt-1 flex items-center gap-2">
                                                        <span
                                                            className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                                                            style={{
                                                                backgroundColor: `${(app as any).track.type.color}20`,
                                                                color: (app as any).track.type.color
                                                            }}
                                                        >
                                                            {(app as any).track.nameTh}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                                    <span>
                                                        Submitted:{" "}
                                                        {app.submittedAt
                                                            ? new Date(app.submittedAt).toLocaleDateString()
                                                            : "Not submitted"}
                                                    </span>
                                                    {app.interview && (
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            Interview:{" "}
                                                            {new Date(
                                                                app.interview.slot.startTime
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                                                    app.status
                                                )}`}
                                            >
                                                {app.status.replace("_", " ")}
                                            </span>
                                            <Link
                                                href={`/admissions/application/${app.id}`}
                                                className="text-sm font-medium text-blue-600 hover:underline"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
