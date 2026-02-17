import { DollarSign, Search, Filter, Download, CreditCard, CheckCircle } from "lucide-react";
import { getPayments, getPaymentStats } from "@/actions/finance-payments";
import { format } from "date-fns";

export default async function PaymentsPage() {
    const [paymentsResult, statsResult] = await Promise.all([
        getPayments(),
        getPaymentStats(),
    ]);

    const payments = paymentsResult.success ? paymentsResult.payments : [];
    const stats = statsResult.success ? statsResult.stats : {
        totalReceived: 0,
        thisMonth: 0,
        pending: 0,
        transactions: 0,
    };

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6 p-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
                    <p className="text-muted-foreground">
                        Track and manage all payment transactions
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Received</p>
                                <p className="text-2xl font-bold">฿{stats.totalReceived.toLocaleString()}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                                <p className="text-2xl font-bold">฿{stats.thisMonth.toLocaleString()}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                <p className="text-2xl font-bold">฿{stats.pending.toLocaleString()}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-yellow-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                                <p className="text-2xl font-bold">{stats.transactions}</p>
                            </div>
                            <CreditCard className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by transaction ID or student..."
                            className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-gray-50">
                        <Filter className="h-4 w-4" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-gray-50">
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                </div>

                {/* Payments Table */}
                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Payment Transactions ({payments?.length || 0})</h2>

                        {payments && payments.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr className="text-left text-sm text-muted-foreground">
                                            <th className="pb-3 font-medium">Date</th>
                                            <th className="pb-3 font-medium">Student</th>
                                            <th className="pb-3 font-medium">Term</th>
                                            <th className="pb-3 font-medium">Amount</th>
                                            <th className="pb-3 font-medium">Status</th>
                                            <th className="pb-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {payments.map((payment: any) => (
                                            <tr key={payment.id} className="text-sm">
                                                <td className="py-3">
                                                    {format(new Date(payment.paidAt), "MMM d, yyyy HH:mm")}
                                                </td>
                                                <td className="py-3">
                                                    <div>
                                                        <p className="font-medium">
                                                            {payment.invoice?.student?.firstName} {payment.invoice?.student?.lastName}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {payment.invoice?.student?.studentId}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="py-3">
                                                    {payment.invoice?.term?.year}/{payment.invoice?.term?.semester}
                                                </td>
                                                <td className="py-3 font-medium">
                                                    ฿{Number(payment.amount).toLocaleString()}
                                                </td>
                                                <td className="py-3">
                                                    {payment.verifiedAt ? (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                                            <CheckCircle className="h-3 w-3" />
                                                            Verified
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                                                            Pending
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3">
                                                    <button className="text-blue-600 hover:underline text-sm">
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <DollarSign className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p className="text-lg font-medium">No payment records</p>
                                <p className="text-sm">Payment transactions will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
