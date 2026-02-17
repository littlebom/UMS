"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";

// Get all payments with filters
export async function getPayments(filters?: {
    search?: string;
    startDate?: Date;
    endDate?: Date;
    verified?: boolean;
}) {
    try {
        const where: any = {};

        if (filters?.search) {
            where.invoice = {
                student: {
                    OR: [
                        { firstName: { contains: filters.search } },
                        { lastName: { contains: filters.search } },
                        { studentId: { contains: filters.search } },
                    ],
                },
            };
        }

        if (filters?.startDate || filters?.endDate) {
            where.paidAt = {};
            if (filters.startDate) {
                where.paidAt.gte = filters.startDate;
            }
            if (filters.endDate) {
                where.paidAt.lte = filters.endDate;
            }
        }

        if (filters?.verified !== undefined) {
            if (filters.verified) {
                where.verifiedAt = { not: null };
            } else {
                where.verifiedAt = null;
            }
        }

        const payments = await prisma.payment.findMany({
            where,
            include: {
                invoice: {
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
                    },
                },
            },
            orderBy: {
                paidAt: "desc",
            },
        });

        return { success: true, payments };
    } catch (error) {
        console.error("Error fetching payments:", error);
        return { success: false, error: "Failed to fetch payments" };
    }
}

// Get payment statistics
export async function getPaymentStats() {
    try {
        const [totalCount, verifiedCount, pendingCount] = await Promise.all([
            prisma.payment.count(),
            prisma.payment.count({ where: { verifiedAt: { not: null } } }),
            prisma.payment.count({ where: { verifiedAt: null } }),
        ]);

        // Calculate amounts
        const totalPayments = await prisma.payment.aggregate({
            _sum: {
                amount: true,
            },
        });

        const thisMonth = new Date();
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);

        const monthlyPayments = await prisma.payment.aggregate({
            where: {
                paidAt: {
                    gte: thisMonth,
                },
            },
            _sum: {
                amount: true,
            },
        });

        const pendingPayments = await prisma.payment.aggregate({
            where: {
                verifiedAt: null,
            },
            _sum: {
                amount: true,
            },
        });

        return {
            success: true,
            stats: {
                totalReceived: Number(totalPayments._sum.amount) || 0,
                thisMonth: Number(monthlyPayments._sum.amount) || 0,
                pending: Number(pendingPayments._sum.amount) || 0,
                transactions: totalCount,
                verified: verifiedCount,
                pendingVerification: pendingCount,
            },
        };
    } catch (error) {
        console.error("Error fetching payment stats:", error);
        return { success: false, error: "Failed to fetch statistics" };
    }
}

// Get payment by ID
export async function getPaymentById(id: string) {
    try {
        const payment = await prisma.payment.findUnique({
            where: { id },
            include: {
                invoice: {
                    include: {
                        student: {
                            include: {
                                user: true,
                            },
                        },
                        term: true,
                        items: true,
                    },
                },
            },
        });

        if (!payment) {
            return { success: false, error: "Payment not found" };
        }

        return { success: true, payment };
    } catch (error) {
        console.error("Error fetching payment:", error);
        return { success: false, error: "Failed to fetch payment" };
    }
}

// Verify payment
export async function verifyPayment(id: string, verifiedBy: string) {
    try {
        const payment = await prisma.payment.update({
            where: { id },
            data: {
                verifiedAt: new Date(),
                verifiedBy,
            },
        });

        // Update invoice status to PAID if fully paid
        const invoice = await prisma.invoice.findUnique({
            where: { id: payment.invoiceId },
            include: {
                payments: true,
            },
        });

        if (invoice) {
            const totalPaid = invoice.payments.reduce(
                (sum, p) => sum + Number(p.amount),
                0
            );

            if (totalPaid >= Number(invoice.amount)) {
                await prisma.invoice.update({
                    where: { id: invoice.id },
                    data: { status: "PAID" },
                });
            }
        }

        revalidatePath("/admin/finance/payments");
        revalidatePath("/admin/finance/billing");
        return { success: true, payment };
    } catch (error) {
        console.error("Error verifying payment:", error);
        return { success: false, error: "Failed to verify payment" };
    }
}

// Record payment
export async function recordPayment(data: {
    invoiceId: string;
    amount: number;
    slipUrl?: string;
}) {
    try {
        const payment = await prisma.payment.create({
            data: {
                invoiceId: data.invoiceId,
                amount: data.amount,
                slipUrl: data.slipUrl,
                paidAt: new Date(),
            },
        });

        revalidatePath("/admin/finance/payments");
        revalidatePath("/admin/finance/billing");
        return { success: true, payment };
    } catch (error) {
        console.error("Error recording payment:", error);
        return { success: false, error: "Failed to record payment" };
    }
}
