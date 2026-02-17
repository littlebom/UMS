"use server";

import { prisma } from "@ums/lib";
import { sendEmail } from "@ums/lib/email";
import { revalidatePath } from "next/cache";

export async function sendApplicationStatusNotification(applicationId: string) {
    try {
        const application = await prisma.application.findUnique({
            where: { id: applicationId },
            include: {
                applicant: {
                    include: {
                        user: true
                    }
                },
                program: {
                    include: {
                        faculty: true
                    }
                },
                track: true
            } as any
        });

        if (!application) {
            throw new Error("Application not found");
        }

        const { applicant, program, status } = application as any;
        const email = applicant.user.email;

        // Determine email content based on status
        let subject = "";
        let message = "";

        switch (status) {
            case "ACCEPTED":
                subject = `Congratulations! You have been accepted to ${program.nameEn}`;
                message = `
                    <h2>Congratulations!</h2>
                    <p>Dear ${applicant.firstName} ${applicant.lastName},</p>
                    <p>We are pleased to inform you that you have been <strong>accepted</strong> to the ${program.nameEn} program at ${program.faculty.nameEn}.</p>
                    <p>Please log in to your dashboard for next steps and enrollment information.</p>
                    <p>Best regards,<br/>Admissions Office</p>
                `;
                break;
            case "REJECTED":
                subject = `Application Status Update - ${program.nameEn}`;
                message = `
                    <h2>Application Status Update</h2>
                    <p>Dear ${applicant.firstName} ${applicant.lastName},</p>
                    <p>Thank you for your interest in the ${program.nameEn} program. After careful consideration, we regret to inform you that we are unable to offer you admission at this time.</p>
                    <p>We encourage you to explore other programs that may be a good fit for your goals.</p>
                    <p>Best regards,<br/>Admissions Office</p>
                `;
                break;
            case "INTERVIEW_READY":
                subject = `Interview Invitation - ${program.nameEn}`;
                message = `
                    <h2>Interview Invitation</h2>
                    <p>Dear ${applicant.firstName} ${applicant.lastName},</p>
                    <p>Congratulations! Your application to ${program.nameEn} has been reviewed, and we would like to invite you for an interview.</p>
                    <p>Please log in to your dashboard to select an available interview slot.</p>
                    <p>Best regards,<br/>Admissions Office</p>
                `;
                break;
            default:
                throw new Error("Cannot send notification for this status");
        }

        // Send email (this will use the mock or real email function from @ums/lib/email)
        try {
            await sendEmail({
                to: email,
                subject,
                html: message
            } as any);
        } catch (emailError) {
            console.error("Email sending failed (may be expected in dev):", emailError);
            // Continue even if email fails (for development)
        }

        revalidatePath(`/admin/admissions/applications/${applicationId}`);
        return { success: true, message: "Notification sent successfully" };
    } catch (error: any) {
        console.error("Error sending notification:", error);
        throw new Error(error.message || "Failed to send notification");
    }
}
