import { getAdminSession } from "@/actions/auth";
import { redirect } from "next/navigation";
import { prisma } from "@ums/lib";
import { GenerateInvoiceForm } from "./generate-form";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function GenerateInvoicesPage() {
    const session = await getAdminSession();
    if (!session) {
        redirect("/admin/login");
    }

    const terms = await prisma.academicTerm.findMany({
        orderBy: [
            { year: "desc" },
            { semester: "desc" },
        ],
    });

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/finance/invoices"
                    className="rounded-full p-2 hover:bg-gray-100"
                >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Generate Invoices</h1>
                    <p className="text-sm text-gray-500">Create invoices for all students in a term</p>
                </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <GenerateInvoiceForm terms={terms} />
            </div>
        </div>
    );
}
