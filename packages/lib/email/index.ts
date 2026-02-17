import nodemailer from "nodemailer";
import { prisma } from ".."; // Import prisma from lib root
import { getInterviewInvitationTemplate, getInterviewReminderTemplate } from "./templates";

// Helper to get transporter based on DB settings or Env vars
async function getTransporter() {
    // Try to get settings from DB
    const settings = await prisma.systemSettings.findFirst();

    if (settings && settings.smtpHost) {
        return nodemailer.createTransport({
            host: settings.smtpHost,
            port: settings.smtpPort,
            secure: settings.smtpSecure,
            auth: {
                user: settings.smtpUser || "",
                pass: settings.smtpPassword || "",
            },
        });
    }

    // Fallback to Env vars
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.ethereal.email",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER || "ethereal_user",
            pass: process.env.SMTP_PASS || "ethereal_pass",
        },
    });
}

interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
    try {
        const settings = await prisma.systemSettings.findFirst();

        // In development, if no real SMTP is configured (neither in DB nor Env), we log
        if (process.env.NODE_ENV !== "production" && !process.env.SMTP_HOST && (!settings || !settings.smtpHost)) {
            console.log("📧 [MOCK EMAIL] -----------------------------------");
            console.log(`To: ${to}`);
            console.log(`Subject: ${subject}`);
            console.log("---------------------------------------------------");
            return { success: true, messageId: "mock-id" };
        }

        const transporter = await getTransporter();

        const fromName = settings?.smtpFromName || "UMS Admissions";
        const fromEmail = settings?.smtpFromEmail || "noreply@ums.ac.th";

        const info = await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to,
            subject,
            html,
        });

        console.log("Message sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}

export async function sendInterviewInvitation(
    email: string,
    applicantName: string,
    programName: string,
    date: Date,
    startTime: Date,
    endTime: Date,
    location: string | null,
    applicationId: string
) {
    const dateStr = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const timeStr = `${startTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} - ${endTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;

    const link = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/admissions/application/${applicationId}`;
    const locationStr = location || "Online / To be announced";

    const html = getInterviewInvitationTemplate(
        applicantName,
        programName,
        dateStr,
        timeStr,
        locationStr,
        link
    );

    return sendEmail({
        to: email,
        subject: `Interview Invitation: ${programName}`,
        html,
    });
}

export async function sendInterviewReminder(
    email: string,
    applicantName: string,
    programName: string,
    date: Date,
    startTime: Date,
    endTime: Date,
    location: string | null,
    applicationId: string,
    daysLeft: number
) {
    const dateStr = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const timeStr = `${startTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} - ${endTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;

    const link = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/admissions/application/${applicationId}`;
    const locationStr = location || "Online / To be announced";

    const html = getInterviewReminderTemplate(
        applicantName,
        programName,
        dateStr,
        timeStr,
        locationStr,
        link,
        daysLeft
    );

    return sendEmail({
        to: email,
        subject: `Reminder: Interview in ${daysLeft} day(s) - ${programName}`,
        html,
    });
}
