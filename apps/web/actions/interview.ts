"use server";

import { prisma } from "@ums/lib";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Get all interview slots for admin listing
export async function getInterviewSlots(filters?: {
    programId?: string;
    upcoming?: boolean;
}) {
    try {
        const where: any = {};

        if (filters?.programId) {
            where.programId = filters.programId;
        }

        if (filters?.upcoming) {
            where.startTime = { gte: new Date() };
        }

        const slots = await prisma.interviewSlot.findMany({
            where,
            include: {
                program: {
                    select: {
                        id: true,
                        nameEn: true,
                        nameTh: true,
                    },
                },
                interviewers: {
                    include: {
                        interviewer: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                title: true,
                            },
                        },
                    },
                },
                interviewResults: {
                    select: {
                        id: true,
                        confirmedAt: true,
                        checkedInAt: true,
                    },
                },
                _count: {
                    select: {
                        interviewResults: true,
                    },
                },
            },
            orderBy: { startTime: "desc" },
        });

        return slots;
    } catch (error) {
        console.error("Error fetching interview slots:", error);
        return [];
    }
}


export async function getAvailableInterviewSlots(programId: string) {
    try {
        const now = new Date();

        const slots = await prisma.interviewSlot.findMany({
            where: {
                programId,
                startTime: {
                    gte: now // Only future slots
                }
            },
            include: {
                interviewResults: true,
                interviewers: {
                    include: {
                        interviewer: {
                            select: {
                                firstName: true,
                                lastName: true,
                                title: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                startTime: 'asc'
            }
        });

        // Filter slots that still have capacity
        const availableSlots = slots.filter(slot => {
            // Assuming each slot can handle multiple interviews (or set a max capacity)
            // For simplicity, we'll allow unlimited bookings per slot
            // In production, you might want to add a capacity field
            return true;
        });

        return availableSlots;
    } catch (error) {
        console.error("Error fetching interview slots:", error);
        return [];
    }
}

export async function bookInterviewSlot(applicationId: string, slotId: string) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }

    try {
        // Check if application exists and belongs to user
        const application = await prisma.application.findUnique({
            where: { id: applicationId },
            include: {
                applicant: true,
                interview: true
            }
        });

        if (!application) {
            throw new Error("Application not found");
        }

        const userId = (session.user as any).id;
        if (application.applicant.userId !== userId) {
            throw new Error("Unauthorized: This application does not belong to you");
        }

        // Check if already has interview scheduled
        if (application.interview) {
            throw new Error("You already have an interview scheduled for this application");
        }

        // Check if slot exists and is in the future
        const slot = await prisma.interviewSlot.findUnique({
            where: { id: slotId }
        });

        if (!slot) {
            throw new Error("Interview slot not found");
        }

        if (new Date(slot.startTime) < new Date()) {
            throw new Error("This interview slot has already passed");
        }

        // Create interview result (booking)
        await prisma.interviewResult.create({
            data: {
                applicationId,
                slotId,
                confirmedAt: new Date()
            }
        });

        // Update application status
        await prisma.application.update({
            where: { id: applicationId },
            data: {
                status: "INTERVIEW_COMPLETED" // Will be updated after actual interview
            }
        });

        revalidatePath("/applicant/dashboard");
        return { success: true };
    } catch (error: any) {
        console.error("Error booking interview slot:", error);
        throw new Error(error.message || "Failed to book interview slot");
    }
}

export async function getMyInterviewDetails(applicationId: string) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return null;
    }

    try {
        const application = await prisma.application.findUnique({
            where: { id: applicationId },
            include: {
                interview: {
                    include: {
                        slot: {
                            include: {
                                interviewers: {
                                    include: {
                                        interviewer: {
                                            select: {
                                                firstName: true,
                                                lastName: true,
                                                title: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        return application?.interview || null;
    } catch (error) {
        console.error("Error fetching interview details:", error);
        return null;
    }
}

export async function updateInterviewScore(
    interviewResultId: string,
    data: { score: number; comments?: string; isPassed: boolean }
) {
    try {
        await prisma.interviewResult.update({
            where: { id: interviewResultId },
            data: {
                score: data.score,
                comments: data.comments,
                isPassed: data.isPassed,
                checkedInAt: new Date() // Mark as checked in when scored
            }
        });

        // Update application status to INTERVIEW_COMPLETED
        const interviewResult = await prisma.interviewResult.findUnique({
            where: { id: interviewResultId },
            select: { applicationId: true }
        });

        if (interviewResult) {
            await prisma.application.update({
                where: { id: interviewResult.applicationId },
                data: { status: "INTERVIEW_COMPLETED" }
            });
        }

        revalidatePath("/admin/admissions/interviews");
        return { success: true };
    } catch (error) {
        console.error("Error updating interview score:", error);
        throw new Error("Failed to update interview score");
    }
}

export async function getInterviewSlotDetails(slotId: string) {
    try {
        const slot = await prisma.interviewSlot.findUnique({
            where: { id: slotId },
            include: {
                program: {
                    select: {
                        nameEn: true,
                        nameTh: true
                    }
                },
                interviewers: {
                    include: {
                        interviewer: {
                            select: {
                                firstName: true,
                                lastName: true,
                                title: true
                            }
                        }
                    }
                },
                interviewResults: {
                    include: {
                        application: {
                            include: {
                                applicant: true,
                                program: {
                                    select: {
                                        nameEn: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return slot;
    } catch (error) {
        console.error("Error fetching interview slot details:", error);
        return null;
    }
}

export async function createInterviewSlot(data: {
    startTime: Date;
    endTime: Date;
    location?: string;
    interviewerIds: string[];
    coordinatorName?: string;
    coordinatorPhone?: string;
    description?: string;
    programId?: string;
    notifyEligibleApplicants?: boolean;
    autoAssignApplicants?: boolean;
}) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }

    // Check if user is admin or staff
    const userRole = (session.user as any).role;
    if (userRole !== "ADMIN" && userRole !== "STAFF") {
        throw new Error("Unauthorized: Only admins and staff can create interview slots");
    }

    try {
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create the interview slot
            const slot = await tx.interviewSlot.create({
                data: {
                    startTime: data.startTime,
                    endTime: data.endTime,
                    location: data.location,
                    coordinatorName: data.coordinatorName,
                    coordinatorPhone: data.coordinatorPhone,
                    description: data.description,
                    programId: data.programId || null,
                    interviewers: {
                        create: data.interviewerIds.map((id) => ({
                            interviewerId: id,
                        })),
                    },
                },
            });

            // 2. Handle auto-assignment if requested and programId is provided
            if (data.autoAssignApplicants && data.programId) {
                const eligibleApplications = await tx.application.findMany({
                    where: {
                        programId: data.programId,
                        status: "INTERVIEW_READY",
                        interview: null, // Not already scheduled
                    },
                });

                if (eligibleApplications.length > 0) {
                    // Create interview results for all eligible applicants
                    await tx.interviewResult.createMany({
                        data: eligibleApplications.map((app) => ({
                            applicationId: app.id,
                            slotId: slot.id,
                        })),
                    });
                }
            }

            return slot;
        });

        revalidatePath("/admin/admissions/interviews");
        revalidatePath("/admin/admissions/interviews/new");

        return { success: true, slotId: result.id };
    } catch (error) {
        console.error("Error creating interview slot:", error);
        throw new Error("Failed to create interview slot");
    }
}
