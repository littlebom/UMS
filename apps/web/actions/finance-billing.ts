"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";

// Get all invoices with filters
export async function getInvoices(filters?: {
    status?: string;
    search?: string;
    termId?: string;
}) {
    try {
        const where: any = {};

        if (filters?.status && filters.status !== "ALL") {
            where.status = filters.status;
        }

        if (filters?.search) {
            where.student = {
                OR: [
                    { firstName: { contains: filters.search } },
                    { lastName: { contains: filters.search } },
                    { studentId: { contains: filters.search } },
                ],
            };
        }

        if (filters?.termId) {
            where.termId = filters.termId;
        }

        const invoices = await prisma.invoice.findMany({
            where,
            include: {
                student: {
                    select: {
                        id: true,
                        studentId: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                term: {
                    select: {
                        year: true,
                        semester: true,
                    },
                },
                items: true,
                payments: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return { success: true, invoices };
    } catch (error) {
        console.error("Error fetching invoices:", error);
        return { success: false, error: "Failed to fetch invoices" };
    }
}

// Get invoice statistics
export async function getInvoiceStats() {
    try {
        const [total, pending, paid, overdue] = await Promise.all([
            prisma.invoice.count(),
            prisma.invoice.count({ where: { status: "PENDING" } }),
            prisma.invoice.count({ where: { status: "PAID" } }),
            prisma.invoice.count({ where: { status: "OVERDUE" } }),
        ]);

        // Calculate total amounts
        const invoiceAmounts = await prisma.invoice.groupBy({
            by: ["status"],
            _sum: {
                amount: true,
            },
        });

        const totalAmount = invoiceAmounts.reduce(
            (sum, item) => sum + (Number(item._sum.amount) || 0),
            0
        );

        const paidAmount =
            invoiceAmounts.find((item) => item.status === "PAID")?._sum.amount || 0;

        return {
            success: true,
            stats: {
                total,
                pending,
                paid,
                overdue,
                totalAmount,
                paidAmount: Number(paidAmount),
                pendingAmount: totalAmount - Number(paidAmount),
            },
        };
    } catch (error) {
        console.error("Error fetching invoice stats:", error);
        return { success: false, error: "Failed to fetch statistics" };
    }
}

// Get invoice by ID
export async function getInvoiceById(id: string) {
    try {
        const invoice = await prisma.invoice.findUnique({
            where: { id },
            include: {
                student: {
                    include: {
                        user: {
                            select: {
                                email: true,
                            },
                        },
                        program: {
                            select: {
                                nameEn: true,
                                nameTh: true,
                            },
                        },
                    },
                },
                term: true,
                items: true,
                payments: true,
            },
        });

        if (!invoice) {
            return { success: false, error: "Invoice not found" };
        }

        return { success: true, invoice };
    } catch (error) {
        console.error("Error fetching invoice:", error);
        return { success: false, error: "Failed to fetch invoice" };
    }
}

// Create invoice
export async function createInvoice(data: {
    studentId: string;
    termId: string;
    amount: number;
    dueDate: Date;
    items: Array<{ description: string; amount: number }>;
}) {
    try {
        const invoice = await prisma.invoice.create({
            data: {
                studentId: data.studentId,
                termId: data.termId,
                amount: data.amount,
                dueDate: data.dueDate,
                status: "PENDING",
                items: {
                    create: data.items,
                },
            },
            include: {
                student: true,
                items: true,
            },
        });

        revalidatePath("/admin/finance/billing");
        return { success: true, invoice };
    } catch (error) {
        console.error("Error creating invoice:", error);
        return { success: false, error: "Failed to create invoice" };
    }
}

// Update invoice status
export async function updateInvoiceStatus(id: string, status: string) {
    try {
        const invoice = await prisma.invoice.update({
            where: { id },
            data: { status: status as any },
        });

        revalidatePath("/admin/finance/billing");
        return { success: true, invoice };
    } catch (error) {
        console.error("Error updating invoice:", error);
        return { success: false, error: "Failed to update invoice" };
    }
}

// Delete invoice
export async function deleteInvoice(id: string) {
    try {
        await prisma.invoice.delete({
            where: { id },
        });

        revalidatePath("/admin/finance/billing");
        return { success: true };
    } catch (error) {
        console.error("Error deleting invoice:", error);
        return { success: false, error: "Failed to delete invoice" };
    }
}
