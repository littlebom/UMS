"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "./auth";

// Generate invoices for all students in a term
export async function generateInvoicesForTerm(termId: string, tuitionFee: number) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    // Get all students enrolled in this term
    const enrollments = await prisma.enrollment.findMany({
        where: {
            section: { termId },
        },
        select: {
            studentId: true,
        },
        distinct: ["studentId"],
    });

    const studentIds = enrollments.map(e => e.studentId);

    // Get term details for due date
    const term = await prisma.academicTerm.findUnique({
        where: { id: termId },
    });

    if (!term) {
        throw new Error("Term not found");
    }

    // Set due date to 30 days after term start
    const dueDate = new Date(term.startDate);
    dueDate.setDate(dueDate.getDate() + 30);

    // Create invoices
    const invoices = await Promise.all(
        studentIds.map(async (studentId) => {
            // Check if invoice already exists
            const existing = await prisma.invoice.findFirst({
                where: {
                    studentId,
                    termId,
                },
            });

            if (existing) {
                return existing;
            }

            return await prisma.invoice.create({
                data: {
                    studentId,
                    termId,
                    amount: tuitionFee,
                    dueDate,
                    items: {
                        create: [
                            {
                                description: `Tuition Fee - ${term.year}/${term.semester}`,
                                amount: tuitionFee,
                            },
                        ],
                    },
                },
            });
        })
    );

    revalidatePath("/admin/finance/invoices");
    return invoices;
}

// Get all invoices
export async function getAllInvoices() {
    const session = await getAdminSession();
    if (!session) {
        return [];
    }

    return await prisma.invoice.findMany({
        include: {
            student: true,
            term: true,
            items: true,
            payments: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

// Get student invoices
export async function getStudentInvoices(studentId: string) {
    return await prisma.invoice.findMany({
        where: { studentId },
        include: {
            term: true,
            items: true,
            payments: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

// Submit payment (upload slip)
export async function submitPayment(invoiceId: string, amount: number, slipUrl: string) {
    const payment = await prisma.payment.create({
        data: {
            invoiceId,
            amount,
            slipUrl,
        },
    });

    revalidatePath("/student/finance");
    return payment;
}

// Verify payment (Admin)
export async function verifyPayment(paymentId: string) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const payment = await prisma.payment.update({
        where: { id: paymentId },
        data: {
            verifiedAt: new Date(),
            verifiedBy: session.userId,
        },
        include: {
            invoice: true,
        },
    });

    // Check if invoice is fully paid
    const invoice = await prisma.invoice.findUnique({
        where: { id: payment.invoiceId },
        include: {
            payments: {
                where: {
                    verifiedAt: { not: null },
                },
            },
        },
    });

    if (invoice) {
        const totalPaid = invoice.payments.reduce((sum, p) => sum + Number(p.amount), 0);
        if (totalPaid >= Number(invoice.amount)) {
            await prisma.invoice.update({
                where: { id: invoice.id },
                data: { status: "PAID" },
            });
        }
    }

    revalidatePath("/admin/finance/payments");
    return payment;
}

// Get pending payments (Admin)
export async function getPendingPayments() {
    const session = await getAdminSession();
    if (!session) {
        return [];
    }

    return await prisma.payment.findMany({
        where: {
            verifiedAt: null,
        },
        include: {
            invoice: {
                include: {
                    student: true,
                    term: true,
                },
            },
        },
        orderBy: {
            paidAt: "desc",
        },
    });
}

// Get my invoices (Student)
export async function getMyInvoices() {
    // This will be called from Student pages, so we need to import student session
    const { getStudentSession } = await import("./student-auth");
    const session = await getStudentSession();

    if (!session || !session.studentId) {
        return [];
    }

    return await prisma.invoice.findMany({
        where: { studentId: session.studentId },
        include: {
            term: true,
            items: true,
            payments: {
                orderBy: {
                    paidAt: "desc",
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}
