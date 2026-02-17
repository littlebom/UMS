import { BarChart3, Download, Calendar, TrendingUp, PieChart } from "lucide-react";

export default function FinancialReportsPage() {
    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
                        <p className="text-muted-foreground">
                            View and export financial analytics and reports
                        </p>
                    </div>
                    <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                        <Download className="h-4 w-4" />
                        Export Report
                    </button>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                                <p className="text-2xl font-bold">฿0</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Outstanding</p>
                                <p className="text-2xl font-bold">฿0</p>
                            </div>
                            <BarChart3 className="h-8 w-8 text-yellow-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Collection Rate</p>
                                <p className="text-2xl font-bold">0%</p>
                            </div>
                            <PieChart className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                                <p className="text-2xl font-bold">฿0</p>
                            </div>
                            <Calendar className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>
                </div>

                {/* Report Types */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border bg-card p-6 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <BarChart3 className="h-10 w-10 text-blue-600" />
                            <div>
                                <h3 className="font-semibold">Revenue Report</h3>
                                <p className="text-sm text-muted-foreground">Income and collection analysis</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <PieChart className="h-10 w-10 text-green-600" />
                            <div>
                                <h3 className="font-semibold">Payment Analysis</h3>
                                <p className="text-sm text-muted-foreground">Payment methods and trends</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <TrendingUp className="h-10 w-10 text-purple-600" />
                            <div>
                                <h3 className="font-semibold">Outstanding Report</h3>
                                <p className="text-sm text-muted-foreground">Unpaid invoices and aging</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <BarChart3 className="h-10 w-10 text-orange-600" />
                            <div>
                                <h3 className="font-semibold">Scholarship Report</h3>
                                <p className="text-sm text-muted-foreground">Scholarship disbursements</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <Calendar className="h-10 w-10 text-red-600" />
                            <div>
                                <h3 className="font-semibold">Monthly Summary</h3>
                                <p className="text-sm text-muted-foreground">Month-by-month breakdown</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <PieChart className="h-10 w-10 text-teal-600" />
                            <div>
                                <h3 className="font-semibold">Program Revenue</h3>
                                <p className="text-sm text-muted-foreground">Revenue by program</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
