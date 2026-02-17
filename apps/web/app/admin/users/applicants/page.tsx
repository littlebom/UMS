import { SubNavigation } from "@/components/sub-navigation";
import { getApplicants, getApplicantStats } from "@/actions/user-applicants";
import { UserPlus, FileText, CheckCircle, XCircle, Search } from "lucide-react";
import Link from "next/link";

const subNavItems = [
    { label: "All Applicants", href: "/admin/users/applicants" },
    { label: "Application Status", href: "/admin/users/applicants/status" },
    { label: "Reports", href: "/admin/users/applicants/reports" },
];

export default async function ApplicantsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const currentStatus = (params.status as string) || "ALL";

    const [applicantsResult, statsResult] = await Promise.all([
        getApplicants(),
        getApplicantStats(),
    ]);

    const allApplicants = applicantsResult.success ? applicantsResult.applicants || [] : [];
    const stats = statsResult.success ? statsResult.stats : {
        total: 0,
        withApplications: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
    };

    // Filter applicants based on latest application status
    const filteredApplicants = currentStatus === "ALL"
        ? allApplicants
        : allApplicants.filter((applicant: any) => {
            const latestApp = applicant.applications?.[0];
            return latestApp?.status === currentStatus;
        });

    const tabs = [
        { id: "ALL", label: "All Applicants", count: stats.total },
        { id: "SUBMITTED", label: "Pending Review", count: stats.pending },
        { id: "ACCEPTED", label: "Accepted", count: stats.accepted },
        { id: "REJECTED", label: "Rejected", count: stats.rejected },
    ];

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Applicants</h1>
                        <p className="text-muted-foreground">
                            Manage all applicants and their application status.
                        </p>
                    </div>
                </div>

                {/* Combined Stats & Tabs */}
                <div className="grid gap-4 md:grid-cols-4">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.id}
                            href={`/admin/users/applicants?status=${tab.id}`}
                            className={`rounded-lg border p-6 transition-all hover:shadow-md ${currentStatus === tab.id
                                ? "border-blue-500 bg-blue-50/50 shadow-sm"
                                : "bg-card"
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{tab.label}</p>
                                    <p className="text-2xl font-bold">{tab.count}</p>
                                </div>
                                {tab.id === "ALL" && <UserPlus className="h-8 w-8 text-blue-600" />}
                                {tab.id === "SUBMITTED" && <FileText className="h-8 w-8 text-yellow-600" />}
                                {tab.id === "ACCEPTED" && <CheckCircle className="h-8 w-8 text-green-600" />}
                                {tab.id === "REJECTED" && <XCircle className="h-8 w-8 text-red-600" />}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Search & Action Bar */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm"
                        />
                    </div>
                    {/* Placeholder for export/reporting actions */}
                    <button className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50">
                        <FileText className="h-4 w-4" />
                        Generate Report
                    </button>
                </div>

                {/* Applicants Table */}
                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">
                                {tabs.find(t => t.id === currentStatus)?.label} ({filteredApplicants.length})
                            </h2>
                        </div>

                        {filteredApplicants.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr className="text-left text-sm text-muted-foreground">
                                            <th className="pb-3 font-medium">Name</th>
                                            <th className="pb-3 font-medium">Email</th>
                                            <th className="pb-3 font-medium">Applications</th>
                                            <th className="pb-3 font-medium">Latest Program</th>
                                            <th className="pb-3 font-medium">Status</th>
                                            <th className="pb-3 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {filteredApplicants.map((applicant: any) => {
                                            const latestApp = applicant.applications?.[0];
                                            return (
                                                <tr key={applicant.id} className="text-sm hover:bg-gray-50/50">
                                                    <td className="py-3 font-medium">
                                                        {applicant.firstName} {applicant.lastName}
                                                    </td>
                                                    <td className="py-3 text-muted-foreground">{applicant.user?.email}</td>
                                                    <td className="py-3">{applicant.applications?.length || 0}</td>
                                                    <td className="py-3">
                                                        {latestApp ? (
                                                            <div>
                                                                <p className="font-medium">{latestApp.program?.nameEn}</p>
                                                                <p className="text-xs text-muted-foreground">
                                                                    {latestApp.track?.nameEn}
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td className="py-3">
                                                        {latestApp && (
                                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${latestApp.status === "ACCEPTED" ? "bg-green-100 text-green-700" :
                                                                latestApp.status === "REJECTED" ? "bg-red-100 text-red-700" :
                                                                    "bg-yellow-100 text-yellow-700"
                                                                }`}>
                                                                {latestApp.status}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="py-3 text-right">
                                                        <Link
                                                            href={`/admin/users/applicants/${applicant.id}`}
                                                            className="inline-flex items-center justify-center rounded-md border px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50"
                                                        >
                                                            View Details
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <UserPlus className="mx-auto h-12 w-12 mb-4 opacity-30" />
                                <p>No applicants found matching this status</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
