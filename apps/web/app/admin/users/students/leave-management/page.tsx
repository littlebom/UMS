import {
    getLeaveRequests,
    getLeaveRequestStats,
} from "@/actions/leave-requests";
import { getFaculties, getPrograms } from "@/actions/user-students-filters";
import { SubNavigation } from "@/components/sub-navigation";
import { LeaveRequestCard } from "@/components/leave-requests/leave-request-card";
import { LeaveRequestFilters } from "@/components/leave-requests/leave-request-filters";
import { Clock, CheckCircle, XCircle, FileText } from "lucide-react";

const subNavItems = [
    { label: "Overview", href: "/admin/users/students" },
    { label: "All Students", href: "/admin/users/students/all-students" },
    { label: "Leave Management", href: "/admin/users/students/leave-management" },
];

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LeaveManagementPage({ searchParams }: PageProps) {
    const params = await searchParams;

    const filters = {
        status: (typeof params.status === "string" &&
            (params.status === "PENDING" || params.status === "APPROVED" || params.status === "REJECTED"))
            ? params.status
            : undefined,
        facultyId: typeof params.facultyId === "string" ? params.facultyId : undefined,
        programId: typeof params.programId === "string" ? params.programId : undefined,
    };

    const [requestsResult, statsResult, facultiesResult, programsResult] = await Promise.all([
        getLeaveRequests(filters),
        getLeaveRequestStats(),
        getFaculties(),
        getPrograms(),
    ]);

    const requests = requestsResult.success ? requestsResult.requests : [];
    const stats = statsResult.success ? statsResult.stats : { pending: 0, approved: 0, rejected: 0, total: 0 };
    const faculties = facultiesResult.success ? facultiesResult.faculties : [];
    const programs = programsResult.success ? programsResult.programs : [];

    return (
        <div className="flex h-full flex-col">
            <SubNavigation items={subNavItems} />

            <div className="flex-1 space-y-6 p-8 overflow-auto">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
                    <p className="text-muted-foreground">
                        Manage student leave requests and approvals
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
                            </div>
                            <Clock className="h-10 w-10 text-orange-600 opacity-50" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                            </div>
                            <CheckCircle className="h-10 w-10 text-green-600 opacity-50" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                            </div>
                            <XCircle className="h-10 w-10 text-red-600 opacity-50" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total</p>
                                <p className="text-3xl font-bold">{stats.total}</p>
                            </div>
                            <FileText className="h-10 w-10 text-gray-600 opacity-50" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <LeaveRequestFilters
                    faculties={faculties}
                    programs={programs}
                />

                {/* Requests List */}
                <div className="space-y-4">
                    {requests.length > 0 ? (
                        requests.map((request: any) => (
                            <LeaveRequestCard
                                key={request.id}
                                request={request}
                            />
                        ))
                    ) : (
                        <div className="rounded-lg border bg-card p-12 text-center">
                            <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-4" />
                            <p className="text-lg font-medium">No leave requests found</p>
                            <p className="text-sm text-muted-foreground mt-2">
                                {filters.status || filters.facultyId || filters.programId
                                    ? "Try adjusting your filters"
                                    : "No students have submitted leave requests yet"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
