"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";

// Get all leave requests with filters  
export async function getLeaveRequests(filters?: {
    status?: "PENDING" | "APPROVED" | "REJECTED";
    facultyId?: string;
    programId?: string;
}) {
    try {
        const where: any = {};

        if (filters?.status) {
            where.status = filters.status;
        }

        if (filters?.programId) {
            where.student = {
                programId: filters.programId,
            };
        } else if (filters?.facultyId) {
            where.student = {
                program: {
                    facultyId: filters.facultyId,
                },
            };
        }

        const requests = await prisma.leaveRequest.findMany({
            where,
            include: {
                student: {
                    select: {
                        id: true,
                        studentId: true,
                        firstName: true,
                        lastName: true,
                        profileImageUrl: true,
                        status: true,
                        program: {
                            select: {
                                nameEn: true,
                                faculty: {
                                    select: {
                                        nameEn: true,
                                    },
                                },
                            },
                        },
                        user: {
                            select: {
                                email: true,
                            },
                        },
                    },
                },
                reviewer: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: [
                { status: "asc" }, // PENDING first
                { createdAt: "desc" },
            ],
        });

        return {
            success: true,
            requests,
        };
    } catch (error) {
        console.error("Error fetching leave requests:", error);
        return {
            success: false,
            error: "Failed to fetch leave requests",
            requests: [],
        };
    }
}

// Get single leave request
export async function getLeaveRequest(id: string) {
    try {
        const request = await prisma.leaveRequest.findUnique({
            where: { id },
            include: {
                student: {
                    select: {
                        id: true,
                        studentId: true,
                        firstName: true,
                        lastName: true,
                        profileImageUrl: true,
                        phone: true,
                        status: true,
                        program: {
                            select: {
                                nameEn: true,
                                faculty: {
                                    select: {
                                        nameEn: true,
                                    },
                                },
                            },
                        },
                        user: {
                            select: {
                                email: true,
                            },
                        },
                    },
                },
                reviewer: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });

        if (!request) {
            return {
                success: false,
                error: "Leave request not found",
            };
        }

        return {
            success: true,
            request,
        };
    } catch (error) {
        console.error("Error fetching leave request:", error);
        return {
            success: false,
            error: "Failed to fetch leave request",
        };
    }
}

// Approve leave request
export async function approveLeaveRequest(
    id: string,
    reviewedBy: string,
    reviewNote?: string
) {
    try {
        // Get the request first
        const request = await prisma.leaveRequest.findUnique({
            where: { id },
            include: {
                student: true,
            },
        });

        if (!request) {
            return {
                success: false,
                error: "Leave request not found",
            };
        }

        if (request.status !== "PENDING") {
            return {
                success: false,
                error: "Only pending requests can be approved",
            };
        }

        // Update request and student status in a transaction
        await prisma.$transaction([
            prisma.leaveRequest.update({
                where: { id },
                data: {
                    status: "APPROVED",
                    reviewedBy,
                    reviewedAt: new Date(),
                    reviewNote,
                },
            }),
            prisma.student.update({
                where: { id: request.studentId },
                data: {
                    status: "ON_LEAVE",
                },
            }),
        ]);

        revalidatePath("/admin/users/students/leave-management");
        revalidatePath("/admin/users/students/all-students");

        return {
            success: true,
            message: "Leave request approved successfully",
        };
    } catch (error) {
        console.error("Error approving leave request:", error);
        return {
            success: false,
            error: "Failed to approve leave request",
        };
    }
}

// Reject leave request
export async function rejectLeaveRequest(
    id: string,
    reviewedBy: string,
    reviewNote: string
) {
    try {
        const request = await prisma.leaveRequest.findUnique({
            where: { id },
        });

        if (!request) {
            return {
                success: false,
                error: "Leave request not found",
            };
        }

        if (request.status !== "PENDING") {
            return {
                success: false,
                error: "Only pending requests can be rejected",
            };
        }

        if (!reviewNote || reviewNote.trim() === "") {
            return {
                success: false,
                error: "Review note is required for rejection",
            };
        }

        await prisma.leaveRequest.update({
            where: { id },
            data: {
                status: "REJECTED",
                reviewedBy,
                reviewedAt: new Date(),
                reviewNote,
            },
        });

        revalidatePath("/admin/users/students/leave-management");

        return {
            success: true,
            message: "Leave request rejected successfully",
        };
    } catch (error) {
        console.error("Error rejecting leave request:", error);
        return {
            success: false,
            error: "Failed to reject leave request",
        };
    }
}

// Get statistics
export async function getLeaveRequestStats() {
    try {
        const [pending, approved, rejected, total] = await Promise.all([
            prisma.leaveRequest.count({ where: { status: "PENDING" } }),
            prisma.leaveRequest.count({ where: { status: "APPROVED" } }),
            prisma.leaveRequest.count({ where: { status: "REJECTED" } }),
            prisma.leaveRequest.count(),
        ]);

        return {
            success: true,
            stats: {
                pending,
                approved,
                rejected,
                total,
            },
        };
    } catch (error) {
        console.error("Error fetching leave request stats:", error);
        return {
            success: false,
            error: "Failed to fetch statistics",
            stats: {
                pending: 0,
                approved: 0,
                rejected: 0,
                total: 0,
            },
        };
    }
}
