import {
    getDashboardStats,
    getAdmissionsData,
    getFinancialData,
    getStudentDistributionByFaculty,
} from "@/actions/analytics";
import { AdmissionsChart, FacultyDistributionChart } from "@/components/analytics/charts";
import { formatCurrency } from "@/lib/utils";
import { Users, GraduationCap, BookOpen, DollarSign, FileText } from "lucide-react";

export default async function AnalyticsPage() {
    const stats = await getDashboardStats();
    const admissionsData = await getAdmissionsData();
    const financialData = await getFinancialData();
    const facultyData = await getStudentDistributionByFaculty();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Users className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Total Students
                                    </dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">
                                            {stats.totalStudents}
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <GraduationCap className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Instructors
                                    </dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">
                                            {stats.totalInstructors}
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <BookOpen className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Active Programs
                                    </dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">
                                            {stats.totalPrograms}
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <FileText className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Pending Applications
                                    </dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">
                                            {stats.pendingApplications}
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Overview */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Financial Overview
                    </h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="rounded-lg bg-green-50 p-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <DollarSign className="h-8 w-8 text-green-600" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-green-800">
                                            Total Revenue (Verified)
                                        </dt>
                                        <dd>
                                            <div className="text-2xl font-bold text-green-900">
                                                {formatCurrency(financialData.totalRevenue)}
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-yellow-50 p-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <DollarSign className="h-8 w-8 text-yellow-600" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-yellow-800">
                                            Pending Payments
                                        </dt>
                                        <dd>
                                            <div className="text-2xl font-bold text-yellow-900">
                                                {formatCurrency(financialData.pendingRevenue)}
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Admissions Status */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Admissions Status
                        </h3>
                    </div>
                    <div className="p-6">
                        <AdmissionsChart data={admissionsData} />
                    </div>
                </div>

                {/* Student Distribution */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Student Distribution by Faculty
                        </h3>
                    </div>
                    <div className="p-6">
                        <FacultyDistributionChart data={facultyData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
