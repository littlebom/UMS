"use server";

import { sendInterviewInvitation } from "@ums/lib/email";

export async function testSendInterviewEmail(email: string) {
    console.log(`Testing email send to: ${email}`);

    try {
        const result = await sendInterviewInvitation(
            email,
            "Test Applicant",
            "Computer Science (International Program)",
            new Date(), // Today
            new Date(new Date().setHours(9, 0, 0, 0)), // 9:00 AM
            new Date(new Date().setHours(10, 0, 0, 0)), // 10:00 AM
            "Building 1, Room 101",
            "test-application-id"
        );

        console.log("Email send result:", result);
        return result;
    } catch (error) {
        console.error("Failed to send test email:", error);
        throw error;
    }
}
