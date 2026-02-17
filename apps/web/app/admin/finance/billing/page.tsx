import { Wallet, Plus, Search, Filter, Download } from "lucide-react";
import Link from "next/link";
import { getInvoices, getInvoiceStats } from "@/actions/finance-billing";
import { format } from "date-fns";

export default async function StudentBillingPage() {
    const [invoicesResult, statsResult] = await Promise.all([
        getInvoices(),
        getInvoiceStats(),
    ]);

    const invoices = invoicesResult.success ? invoicesResult.invoices : [];
    const stats = statsResult.success ? statsResult.stats : {
        total: 0,
        pending: 0,
        paid: 0,
        overdue: 0,
    };

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Student Billing</h1>
                        <p className="text-muted-foreground">
                            Manage student invoices and billing records
                        </p>
                    </div>
                    <Link href="/admin/finance/billing/create">
                        <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                            <Plus className="h-4 w-4" />
                            Create Invoice
                        </button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Invoices</p>
                                <p className="text-2xl font-bold">{stats.total}</p>
                            </div>
                            <Wallet className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                <p className="text-2xl font-bold">{stats.pending}</p>
                            </div>
                            <Wallet className="h-8 w-8 text-yellow-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Paid</p>
                                <p className="text-2xl font-bold">{stats.paid}</p>
                            </div>
                            <Wallet className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                                <p className="text-2xl font-bold">{stats.overdue}</p>
                            </div>
                            <Wallet className="h-8 w-8 text-red-600" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by student name or ID..."
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

                {/* Invoices Table */}
                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Invoices ({invoices?.length || 0})</h2>

                        {invoices && invoices.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b">
                                        <tr className="text-left text-sm text-muted-foreground">
                                            <th className="pb-3 font-medium">Student</th>
                                            <th className="pb-3 font-medium">Term</th>
                                            <th className="pb-3 font-medium">Amount</th>
                                            <th className="pb-3 font-medium">Due Date</th>
                                            <th className="pb-3 font-medium">Status</th>
                                            <th className="pb-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {invoices.map((invoice: any) => (
                                            <tr key={invoice.id} className="text-sm">
                                                <td className="py-3">
                                                    <div>
                                                        <p className="font-medium">
                                                            {invoice.student?.firstName} {invoice.student?.lastName}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {invoice.student?.studentId}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="py-3">
                                                    {invoice.term?.year}/{invoice.term?.semester}
                                                </td>
                                                <td className="py-3 font-medium">
                                                    ฿{Number(invoice.amount).toLocaleString()}
                                                </td>
                                                <td className="py-3">
                                                    {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                                                </td>
                                                <td className="py-3">
                                                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${invoice.status === "PAID" ? "bg-green-100 text-green-700" :
                                                            invoice.status === "OVERDUE" ? "bg-red-100 text-red-700" :
                                                                invoice.status === "CANCELLED" ? "bg-gray-100 text-gray-700" :
                                                                    "bg-yellow-100 text-yellow-700"
                                                        }`}>
                                                        {invoice.status}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <Link
                                                        href={`/admin/finance/billing/${invoice.id}`}
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <Wallet className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p className="text-lg font-medium">No invoices yet</p>
                                <p className="text-sm">Create your first invoice to get started</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
