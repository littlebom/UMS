"use server";

import { prisma } from "@ums/lib";
import { getApplicantSession } from "./auth";
import { revalidatePath } from "next/cache";

/**
 * Get application details with interview information for applicant
 */
export async function getApplicantApplicationDetail(applicationId: string) {
    const session = await getApplicantSession();

    if (!session || !session.applicantId) {
        throw new Error("Unauthorized");
    }

    const application = await prisma.application.findUnique({
        where: {
            id: applicationId,
            applicantId: session.applicantId, // Ensure applicant can only see their own application
        },
        include: {
            program: {
                include: {
                    faculty: true,
                    department: true,
                },
            },
            documents: {
                orderBy: {
                    uploadedAt: "desc",
                },
            },
            interview: {
                include: {
                    slot: {
                        include: {
                            interviewers: {
                                include: {
                                    interviewer: {
                                        include: {
                                            user: {
                                                select: {
                                                    email: true,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    feedback: true,
                },
            },
        },
    });

    if (!application) {
        throw new Error("Application not found");
    }

    return application;
}

/**
 * Confirm interview attendance
 */
export async function confirmInterviewAttendance(applicationId: string) {
    const session = await getApplicantSession();

    if (!session || !session.applicantId) {
        throw new Error("Unauthorized");
    }

    // Verify ownership
    const application = await prisma.application.findUnique({
        where: {
            id: applicationId,
            applicantId: session.applicantId,
        },
        include: {
            interview: true,
        },
    });

    if (!application) {
        throw new Error("Application not found");
    }

    if (!application.interview) {
        throw new Error("No interview scheduled");
    }

    // Update confirmation
    await prisma.interviewResult.update({
        where: {
            id: application.interview.id,
        },
        data: {
            confirmedAt: new Date(),
        },
    });

    return { success: true };
}

/**
 * Request interview reschedule
 */
export async function requestInterviewReschedule(
    applicationId: string,
    reason: string
) {
    const session = await getApplicantSession();

    if (!session || !session.applicantId) {
        throw new Error("Unauthorized");
    }

    // Verify ownership
    const application = await prisma.application.findUnique({
        where: {
            id: applicationId,
            applicantId: session.applicantId,
        },
        include: {
            interview: true,
        },
    });

    if (!application) {
        throw new Error("Application not found");
    }

    if (!application.interview) {
        throw new Error("No interview scheduled");
    }

    // Update reschedule request
    await prisma.interviewResult.update({
        where: {
            id: application.interview.id,
        },
        data: {
            rescheduleRequested: true,
            rescheduleReason: reason,
        },
    });

    return { success: true };
}

/**
 * Get available interview slots for a program
 * Shows slots that are either:
 * 1. Specific to the applicant's program (programId matches)
 * 2. Generic slots available to all programs (programId is null)
 */
export async function getAvailableSlots(programId: string) {
    const session = await getApplicantSession();
    if (!session) throw new Error("Unauthorized");

    return await prisma.interviewSlot.findMany({
        where: {
            OR: [
                { programId: programId }, // Program-specific slots
                { programId: null },      // Generic slots
            ],
            startTime: {
                gt: new Date(), // Future slots only
            },
            // interviewResult: null, // Allow multiple bookings per slot
        },
        include: {
            interviewers: {
                include: {
                    interviewer: {
                        select: {
                            firstName: true,
                            lastName: true,
                            position: true,
                        },
                    },
                },
            },
            program: {
                select: {
                    nameEn: true,
                    nameTh: true,
                },
            },
        },
        orderBy: {
            startTime: "asc",
        },
    });
}

/**
 * Book a slot by applicant
 */
export async function bookSelfServiceSlot(applicationId: string, slotId: string) {
    const session = await getApplicantSession();
    if (!session || !session.applicantId) throw new Error("Unauthorized");

    // 1. Verify application ownership and status
    const application = await prisma.application.findUnique({
        where: {
            id: applicationId,
            applicantId: session.applicantId,
        },
        include: {
            interview: true,
            program: true,
        },
    });

    if (!application) throw new Error("Application not found");

    // Allow booking if status is DOCUMENT_VERIFIED or INTERVIEW_READY
    // And no interview booked yet
    if (!["DOCUMENT_VERIFIED", "INTERVIEW_READY"].includes(application.status)) {
        throw new Error("Application is not ready for interview booking");
    }

    if (application.interview) {
        throw new Error("You already have an interview scheduled");
    }

    // 2. Verify slot availability
    const slot = await prisma.interviewSlot.findUnique({
        where: { id: slotId },
        include: { interviewResult: true },
    });

    if (!slot) throw new Error("Slot not found");
    // Removed single-booking check - slots can now have multiple candidates
    // if (slot.interviewResult) throw new Error("Slot is already booked");
    if (slot.programId && slot.programId !== application.programId) {
        throw new Error("This slot is not for your program");
    }

    // 3. Book the slot
    await prisma.interviewResult.create({
        data: {
            applicationId,
            slotId,
        },
    });

    // 4. Update status to INTERVIEW_READY (if not already)
    if (application.status !== "INTERVIEW_READY") {
        await prisma.application.update({
            where: { id: applicationId },
            data: { status: "INTERVIEW_READY" },
        });
    }

    // 5. Send Email Notification
    try {
        const { sendInterviewInvitation } = await import("@ums/lib/email");
        await sendInterviewInvitation(
            session.email,
            session.firstName,
            application.program.nameEn,
            slot.startTime,
            slot.startTime,
            slot.endTime,
            slot.location,
            application.id
        );
    } catch (error) {
        console.error("Failed to send email:", error);
    }

    revalidatePath(`/admissions/application/${applicationId}`);
    return { success: true };
}

/**
 * Check-in for interview
 */
export async function checkInInterview(applicationId: string) {
    const session = await getApplicantSession();
    if (!session || !session.applicantId) throw new Error("Unauthorized");

    const application = await prisma.application.findUnique({
        where: {
            id: applicationId,
            applicantId: session.applicantId,
        },
        include: {
            interview: {
                include: {
                    slot: true,
                },
            },
        },
    });

    if (!application || !application.interview) throw new Error("Interview not found");

    // Allow check-in only on the interview day (e.g., 1 hour before start time)
    const now = new Date();
    const startTime = new Date(application.interview.slot.startTime);
    const oneHourBefore = new Date(startTime.getTime() - 60 * 60 * 1000);
    const endTime = new Date(application.interview.slot.endTime);

    if (now < oneHourBefore) {
        throw new Error("Check-in is available 1 hour before the interview.");
    }

    if (now > endTime) {
        throw new Error("Interview time has passed.");
    }

    await prisma.interviewResult.update({
        where: { id: application.interview.id },
        data: { checkedInAt: new Date() },
    });

    revalidatePath(`/admissions/application/${applicationId}`);
    return { success: true };
}

/**
 * Submit interview feedback
 */
export async function submitInterviewFeedback(
    applicationId: string,
    rating: number,
    comment: string
) {
    const session = await getApplicantSession();
    if (!session || !session.applicantId) throw new Error("Unauthorized");

    const application = await prisma.application.findUnique({
        where: {
            id: applicationId,
            applicantId: session.applicantId,
        },
        include: {
            interview: {
                include: {
                    feedback: true,
                },
            },
        },
    });

    if (!application || !application.interview) throw new Error("Interview not found");

    if (application.interview.feedback) {
        throw new Error("Feedback already submitted");
    }

    await prisma.interviewFeedback.create({
        data: {
            interviewResultId: application.interview.id,
            rating,
            comment,
        },
    });

    revalidatePath(`/admissions/application/${applicationId}`);
    return { success: true };
}
