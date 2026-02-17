"use server";

import { prisma } from "@ums/lib";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitApplication(formData: any) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        throw new Error("Unauthorized: Please sign in to submit an application.");
    }

    const userId = (session.user as any).id;

    // Extract data from formData object (passed from client)
    const {
        trackId,
        programId,
        // Personal
        firstName,
        lastName,
        nationalId,
        phone,
        email, // Just for verification, usually from user account
        address,
        // Education
        schoolName,
        gpax,
        studyPlan,
        // Documents (URLs or Placeholders)
        transcriptUrl,
        idCardUrl
    } = formData;

    try {
        // 1. Find or Create Applicant Profile
        let applicant = await prisma.applicant.findUnique({
            where: { userId }
        });

        if (!applicant) {
            applicant = await prisma.applicant.create({
                data: {
                    userId,
                    firstName,
                    lastName,
                    citizenId: nationalId,
                    phone,
                    address,
                    // Default values
                    firstNameTh: firstName, // Assuming input is Thai
                    lastNameTh: lastName,
                }
            });
        } else {
            // Update existing profile
            await prisma.applicant.update({
                where: { id: applicant.id },
                data: {
                    firstName,
                    lastName,
                    citizenId: nationalId,
                    phone,
                    address,
                }
            });
        }

        // 2. Update Education History
        // Delete existing high school record to replace with new one (simplified)
        await prisma.educationHistory.deleteMany({
            where: {
                applicantId: applicant.id,
                level: "High School"
            }
        });

        await prisma.educationHistory.create({
            data: {
                applicantId: applicant.id,
                level: "High School",
                institution: schoolName,
                gpa: gpax.toString(),
                degreeName: studyPlan
            }
        });

        // 3. Create Application
        // Check for existing application for this track
        // Cast to any to avoid TS error if Prisma client is outdated
        const existingApp = await prisma.application.findFirst({
            where: {
                applicantId: applicant.id,
                trackId: trackId
            } as any
        });

        if (existingApp) {
            throw new Error("You have already applied for this track.");
        }

        const application = await prisma.application.create({
            data: {
                applicantId: applicant.id,
                trackId,
                programId,
                status: "SUBMITTED",
                submittedAt: new Date(),
                documents: {
                    create: [
                        ...(transcriptUrl ? [{ type: "TRANSCRIPT", url: transcriptUrl }] : []),
                        ...(idCardUrl ? [{ type: "ID_CARD", url: idCardUrl }] : [])
                    ]
                }
            } as any
        });

        // 4. Update Admission Track Stats (Increment filled seats - simplified, usually done after payment/verification)
        // For now, we just count applications, not seats until enrolled.

        revalidatePath("/applicant/dashboard");
        return { success: true, applicationId: application.id };

    } catch (error: any) {
        console.error("Error submitting application:", error);
        throw new Error(error.message || "Failed to submit application");
    }
}

export async function getMyApplications() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return [];
    }

    const userId = (session.user as any).id;

    try {
        const applicant = await prisma.applicant.findUnique({
            where: { userId }
        });

        if (!applicant) {
            return [];
        }

        const applications = await prisma.application.findMany({
            where: {
                applicantId: applicant.id
            },
            include: {
                program: {
                    select: {
                        nameTh: true,
                        nameEn: true,
                        faculty: {
                            select: { nameTh: true, nameEn: true }
                        }
                    }
                },
                track: {
                    select: {
                        nameTh: true,
                        nameEn: true,
                        academicYear: true,
                        type: {
                            select: { nameEn: true, color: true, icon: true }
                        }
                    }
                },
                interview: {
                    select: {
                        slot: {
                            select: { startTime: true, endTime: true, location: true }
                        },
                        isPassed: true
                    }
                }
            } as any,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return applications;
    } catch (error) {
        console.error("Error fetching applications:", error);
        return [];
    }
}

export async function getAllApplications() {
    try {
        const applications = await prisma.application.findMany({
            include: {
                applicant: true,
                program: {
                    select: {
                        nameTh: true,
                        nameEn: true,
                        faculty: {
                            select: { nameTh: true, nameEn: true }
                        }
                    }
                },
                track: {
                    select: {
                        nameTh: true,
                        nameEn: true,
                        code: true
                    }
                }
            } as any,
            orderBy: {
                createdAt: 'desc'
            }
        });
        return applications;
    } catch (error) {
        console.error("Error fetching all applications:", error);
        return [];
    }
}

export async function getApplicationById(id: string) {
    try {
        const application = await prisma.application.findUnique({
            where: { id },
            include: {
                applicant: {
                    include: {
                        educationHistory: true
                    }
                },
                program: {
                    include: {
                        faculty: true
                    }
                },
                track: {
                    include: {
                        type: true
                    }
                },
                documents: true,
                interview: {
                    include: {
                        slot: true
                    }
                }
            } as any
        });
        return application;
    } catch (error) {
        console.error("Error fetching application:", error);
        return null;
    }
}

export async function updateApplicationStatus(id: string, status: string) {
    try {
        await prisma.application.update({
            where: { id },
            data: { status: status as any }
        });
        revalidatePath(`/admin/admissions/applications/${id}`);
        revalidatePath("/admin/admissions/applications");
        return { success: true };
    } catch (error) {
        console.error("Error updating application status:", error);
        throw new Error("Failed to update status");
    }
}
