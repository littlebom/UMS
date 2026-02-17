import { getStudentStats } from "@/actions/user-students";
import {
    getEnrollmentTrend,
    getProgramDistribution,
} from "@/actions/user-students-charts";
import {
    getRecentStudents,
    getAcademicPerformance,
    getStudentsNeedingAttention,
} from "@/actions/user-students-dashboard";
import { SubNavigation } from "@/components/sub-navigation";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { EnrollmentTrendChart } from "@/components/dashboard/charts/enrollment-trend-chart";
import { ProgramDistributionChart } from "@/components/dashboard/charts/program-distribution-chart";
import { StatusDistributionChart } from "@/components/dashboard/charts/status-distribution-chart";
import {
    Users,
    UserCheck,
    TrendingUp,
    GraduationCap,
    Plus,
    Upload,
    FileText,
    AlertCircle,
    Clock,
    Award,
    UserX,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

const subNavItems = [
    { label: "Overview", href: "/admin/users/students" },
    { label: "All Students", href: "/admin/users/students/all-students" },
    { label: "Leave Management", href: "/admin/users/students/leave-management" },
];

export default async function StudentsOverviewPage() {
    const [
        statsResult,
        enrollmentTrendResult,
        programDistResult,
        recentStudentsResult,
        academicPerfResult,
        attentionResult,
    ] = await Promise.all([
        getStudentStats(),
        getEnrollmentTrend(),
        getProgramDistribution(),
        getRecentStudents(7),
        getAcademicPerformance(),
        getStudentsNeedingAttention(),
    ]);

    const stats = statsResult.success
        ? statsResult.stats
        : { total: 0, studying: 0, graduated: 0, onLeave: 0 };

    const enrollmentData = enrollmentTrendResult.success ? enrollmentTrendResult.data : [];
    const programData = programDistResult.success ? programDistResult.data : [];
    const recentStudents = recentStudentsResult.success ? recentStudentsResult.students : [];
    const academicPerf = academicPerfResult.success
        ? academicPerfResult.data
        : { averageGPA: 0, totalStudents: 0, atRiskCount: 0, honorCount: 0, expectedGraduates: 0 };
    const attention = attentionResult.success
        ? attentionResult.data
        : { atRisk: 0, onLeave: 0, newStudents: 0, total: 0 };

    const currentStudentsTotal = (stats?.studying ?? 0) + (stats?.onLeave ?? 0);

    // Prepare status distribution data
    const statusData = [
        {
            status: "Studying",
            count: stats?.studying ?? 0,
            percentage: currentStudentsTotal > 0
                ? parseFloat(((stats.studying / currentStudentsTotal) * 100).toFixed(1))
                : 0,
            color: "#10b981",
        },
        {
            status: "On Leave",
            count: stats?.onLeave ?? 0,
            percentage: currentStudentsTotal > 0
                ? parseFloat(((stats.onLeave / currentStudentsTotal) * 100).toFixed(1))
                : 0,
            color: "#f59e0b",
        },
    ];

    return (
        <div className="flex h-full flex-col">
            <SubNavigation items={subNavItems} />
            <div className="flex-1 space-y-6 p-8 overflow-auto">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Students Overview</h1>
                    <p className="text-muted-foreground">
                        Comprehensive dashboard for student management and analytics
                    </p>
                </div>

                {/* KPI Stats Grid */}
                <div className="grid gap-4 md:grid-cols-4">
                    <StatsCard
                        title="Total Students"
                        value={currentStudentsTotal}
                        icon={Users}
                        color="blue"
                        description="Currently enrolled"
                    />
                    <StatsCard
                        title="Active (Studying)"
                        value={`${stats?.studying ?? 0}`}
                        icon={UserCheck}
                        color="green"
                        description={`${currentStudentsTotal > 0 ? Math.round((stats.studying / currentStudentsTotal) * 100) : 0}% of total`}
                    />
                    <StatsCard
                        title="On Leave"
                        value={`${stats?.onLeave ?? 0}`}
                        icon={TrendingUp}
                        color="orange"
                        description={`${currentStudentsTotal > 0 ? Math.round((stats.onLeave / currentStudentsTotal) * 100) : 0}% of total`}
                    />
                    <StatsCard
                        title="New This Week"
                        value={attention.newStudents}
                        icon={Clock}
                        color="purple"
                        description="Last 7 days"
                    />
                </div>

                {/* Charts Row 1: Trends & Distribution */}
                <div className="grid gap-6 md:grid-cols-2">
                    <ChartCard
                        title="Enrollment Trends"
                        description="New student enrollments over the last 6 months"
                    >
                        {enrollmentData.length > 0 ? (
                            <EnrollmentTrendChart data={enrollmentData} />
                        ) : (
                            <div className="flex items-center justify-center h-64 text-muted-foreground">
                                <p className="text-sm">No enrollment data available</p>
                            </div>
                        )}
                    </ChartCard>

                    <ChartCard
                        title="Program Distribution"
                        description="Current students by academic program (Top 8)"
                    >
                        {programData.length > 0 ? (
                            <ProgramDistributionChart data={programData} />
                        ) : (
                            <div className="flex items-center justify-center h-64 text-muted-foreground">
                                <p className="text-sm">No program data available</p>
                            </div>
                        )}
                    </ChartCard>
                </div>

                {/* Charts Row 2: Status & Performance */}
                <div className="grid gap-6 md:grid-cols-2">
                    <ChartCard
                        title="Status Distribution"
                        description="Current student status breakdown"
                    >
                        {statusData.length > 0 && currentStudentsTotal > 0 ? (
                            <StatusDistributionChart data={statusData} />
                        ) : (
                            <div className="flex items-center justify-center h-64 text-muted-foreground">
                                <p className="text-sm">No status data available</p>
                            </div>
                        )}
                    </ChartCard>

                    <div className="rounded-lg border bg-card p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Award className="h-5 w-5 text-purple-600" />
                            Academic Performance
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                                <span className="text-sm font-medium">Average GPA</span>
                                <span className="text-2xl font-bold text-blue-600">
                                    {academicPerf.averageGPA.toFixed(2)}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-lg bg-green-50">
                                    <p className="text-xs text-muted-foreground">Honor Students</p>
                                    <p className="text-lg font-bold text-green-600">
                                        {academicPerf.honorCount}
                                    </p>
                                    <p className="text-xs text-muted-foreground">GPA ≥ 3.5</p>
                                </div>
                                <div className="p-3 rounded-lg bg-red-50">
                                    <p className="text-xs text-muted-foreground">At Risk</p>
                                    <p className="text-lg font-bold text-red-600">
                                        {academicPerf.atRiskCount}
                                    </p>
                                    <p className="text-xs text-muted-foreground">GPA &lt; 2.0</p>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-50">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Expected Graduates</span>
                                    <span className="text-xl font-bold text-purple-600">
                                        {academicPerf.expectedGraduates}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">This academic year</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <QuickActions
                    actions={[
                        {
                            label: "Add Student",
                            href: "/admin/users/students/create",
                            icon: Plus,
                            variant: "primary",
                        },
                        {
                            label: "View Active Students",
                            href: "/admin/users/students/all-students",
                            icon: Users,
                            variant: "outline",
                        },
                        {
                            label: "Import Students",
                            href: "#",
                            icon: Upload,
                            variant: "outline",
                        },
                        {
                            label: "Generate Report",
                            href: "/admin/users/students/reports",
                            icon: FileText,
                            variant: "outline",
                        },
                    ]}
                />

                {/* Activity & Alerts Row */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Enrollments */}
                    <div className="rounded-lg border bg-card p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-blue-600" />
                            Recent Enrollments
                            <span className="text-sm font-normal text-muted-foreground">(Last 7 days)</span>
                        </h3>
                        {recentStudents.length > 0 ? (
                            <div className="space-y-3">
                                {recentStudents.slice(0, 5).map((student: any) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">
                                                {student.firstName} {student.lastName}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {student.program?.nameEn || "No program"}
                                            </p>
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {format(new Date(student.createdAt), "MMM d")}
                                        </span>
                                    </div>
                                ))}
                                {recentStudents.length > 5 && (
                                    <Link
                                        href="/admin/users/students/all-students"
                                        className="block text-center text-sm text-blue-600 hover:underline mt-3"
                                    >
                                        View all {recentStudents.length} new students →
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <Users className="mx-auto h-8 w-8 mb-2 opacity-30" />
                                <p className="text-sm">No recent enrollments</p>
                            </div>
                        )}
                    </div>

                    {/* Requires Attention */}
                    <div className="rounded-lg border bg-card p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-orange-600" />
                            Requires Attention
                        </h3>
                        <div className="space-y-3">
                            {attention.atRisk > 0 && (
                                <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
                                    <div className="flex items-center gap-2">
                                        <UserX className="h-4 w-4 text-red-600" />
                                        <span className="text-sm font-medium">Students at Risk</span>
                                    </div>
                                    <span className="text-lg font-bold text-red-600">
                                        {attention.atRisk}
                                    </span>
                                </div>
                            )}
                            {attention.onLeave > 0 && (
                                <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-orange-600" />
                                        <span className="text-sm font-medium">On Leave (Follow-up)</span>
                                    </div>
                                    <span className="text-lg font-bold text-orange-600">
                                        {attention.onLeave}
                                    </span>
                                </div>
                            )}
                            {attention.newStudents > 0 && (
                                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-purple-600" />
                                        <span className="text-sm font-medium">New Students (Orientation)</span>
                                    </div>
                                    <span className="text-lg font-bold text-purple-600">
                                        {attention.newStudents}
                                    </span>
                                </div>
                            )}
                            {attention.total === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <GraduationCap className="mx-auto h-8 w-8 mb-2 opacity-30" />
                                    <p className="text-sm">All students are doing well! 🎉</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
