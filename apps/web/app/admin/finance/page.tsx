import { getAllInvoices, getPendingPayments } from "@/actions/finance";
import { getAdminSession } from "@/actions/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DollarSign, FileText, Clock } from "lucide-react";

export default async function AdminFinancePage() {
    const session = await getAdminSession();
    if (!session) {
        redirect("/admin/login");
    }

    const invoices = await getAllInvoices();
    const pendingPayments = await getPendingPayments();

    // Calculate statistics
    const totalInvoices = invoices.length;
    const paidInvoices = invoices.filter(i => i.status === "PAID").length;
    const pendingInvoices = invoices.filter(i => i.status === "PENDING").length;
    const totalRevenue = invoices
        .filter(i => i.status === "PAID")
        .reduce((sum, i) => sum + Number(i.amount), 0);

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Financial Management</h1>
                <p className="text-gray-500">Manage invoices and payments</p>
            </header>

            {/* Statistics */}
            <div className="grid gap-6 md:grid-cols-4">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Invoices</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{totalInvoices}</p>
                        </div>
                        <FileText className="h-8 w-8 text-blue-500" />
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Paid</p>
                            <p className="mt-2 text-3xl font-bold text-green-600">{paidInvoices}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-green-500" />
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending</p>
                            <p className="mt-2 text-3xl font-bold text-orange-600">{pendingInvoices}</p>
                        </div>
                        <Clock className="h-8 w-8 text-orange-500" />
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                            <p className="mt-2 text-2xl font-bold text-blue-600">
                                ฿{totalRevenue.toLocaleString()}
                            </p>
                        </div>
                        <DollarSign className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-6 md:grid-cols-2">
                <Link
                    href="/admin/finance/invoices"
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                    <h3 className="text-lg font-medium text-gray-900">Manage Invoices</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        View and generate invoices for students
                    </p>
                </Link>

                <Link
                    href="/admin/finance/payments"
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                    <h3 className="text-lg font-medium text-gray-900">Verify Payments</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        {pendingPayments.length} payment(s) awaiting verification
                    </p>
                </Link>
            </div>
        </div>
    );
}
