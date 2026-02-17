import { getMyInvoices } from "@/actions/finance";
import { getStudentSession } from "@/actions/student-auth";
import { redirect } from "next/navigation";
import { PaymentUploadButton } from "./payment-upload-button";

export default async function StudentFinancePage() {
    const session = await getStudentSession();
    if (!session) {
        redirect("/student/login");
    }

    const invoices = await getMyInvoices();

    // Calculate totals
    const totalDue = invoices
        .filter(i => i.status === "PENDING")
        .reduce((sum, i) => sum + Number(i.amount), 0);

    const totalPaid = invoices
        .filter(i => i.status === "PAID")
        .reduce((sum, i) => sum + Number(i.amount), 0);

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Financial Information</h1>
                <p className="text-gray-500">View your invoices and payment history</p>
            </header>

            {/* Summary Cards */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Outstanding</h3>
                    <p className="mt-2 text-3xl font-bold text-orange-600">
                        ฿{totalDue.toLocaleString()}
                    </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Paid</h3>
                    <p className="mt-2 text-3xl font-bold text-green-600">
                        ฿{totalPaid.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Invoices List */}
            <div className="space-y-4">
                {invoices.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
                        No invoices found
                    </div>
                ) : (
                    invoices.map((invoice) => {
                        const totalPaidForInvoice = invoice.payments
                            .filter(p => p.verifiedAt)
                            .reduce((sum, p) => sum + Number(p.amount), 0);
                        const remainingAmount = Number(invoice.amount) - totalPaidForInvoice;

                        return (
                            <div
                                key={invoice.id}
                                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-bold text-gray-900">
                                                Invoice - {invoice.term.year}/{invoice.term.semester}
                                            </h3>
                                            <span
                                                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${invoice.status === "PAID"
                                                        ? "bg-green-100 text-green-800"
                                                        : invoice.status === "PENDING"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {invoice.status}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Due: {new Date(invoice.dueDate).toLocaleDateString()}
                                        </p>

                                        {/* Invoice Items */}
                                        <div className="mt-4 space-y-2">
                                            {invoice.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex justify-between text-sm"
                                                >
                                                    <span className="text-gray-600">{item.description}</span>
                                                    <span className="font-medium text-gray-900">
                                                        ฿{Number(item.amount).toLocaleString()}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Payment History */}
                                        {invoice.payments.length > 0 && (
                                            <div className="mt-4 border-t pt-4">
                                                <h4 className="text-sm font-medium text-gray-700">Payment History</h4>
                                                <div className="mt-2 space-y-2">
                                                    {invoice.payments.map((payment) => (
                                                        <div
                                                            key={payment.id}
                                                            className="flex justify-between text-sm"
                                                        >
                                                            <span className="text-gray-600">
                                                                {new Date(payment.paidAt).toLocaleDateString()}
                                                                {payment.verifiedAt ? (
                                                                    <span className="ml-2 text-green-600">✓ Verified</span>
                                                                ) : (
                                                                    <span className="ml-2 text-orange-600">⏳ Pending</span>
                                                                )}
                                                            </span>
                                                            <span className="font-medium text-gray-900">
                                                                ฿{Number(payment.amount).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
                                            <span>Remaining:</span>
                                            <span className="text-orange-600">
                                                ฿{remainingAmount.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Button */}
                                {invoice.status === "PENDING" && remainingAmount > 0 && (
                                    <div className="mt-4">
                                        <PaymentUploadButton
                                            invoiceId={invoice.id}
                                            amount={remainingAmount}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
