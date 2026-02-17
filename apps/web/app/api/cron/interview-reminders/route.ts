import { prisma } from "@ums/lib";
import { sendInterviewReminder } from "@ums/lib/email";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        // Verify secret if needed (e.g. Bearer token)
        // const authHeader = request.headers.get('authorization');
        // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        //     return new Response('Unauthorized', { status: 401 });
        // }

        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const nextWeek = new Date(now);
        nextWeek.setDate(nextWeek.getDate() + 7);
        nextWeek.setHours(0, 0, 0, 0);

        // Find interviews happening tomorrow
        const tomorrowInterviews = await prisma.interviewResult.findMany({
            where: {
                slot: {
                    startTime: {
                        gte: tomorrow,
                        lt: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000),
                    },
                },
                application: {
                    status: {
                        in: ["INTERVIEW_READY"],
                    },
                },
            },
            include: {
                application: {
                    include: {
                        applicant: {
                            include: {
                                user: true,
                            },
                        },
                        program: true,
                    },
                },
                slot: true,
            },
        });

        // Find interviews happening in 7 days
        const nextWeekInterviews = await prisma.interviewResult.findMany({
            where: {
                slot: {
                    startTime: {
                        gte: nextWeek,
                        lt: new Date(nextWeek.getTime() + 24 * 60 * 60 * 1000),
                    },
                },
                application: {
                    status: {
                        in: ["INTERVIEW_READY"],
                    },
                },
            },
            include: {
                application: {
                    include: {
                        applicant: {
                            include: {
                                user: true,
                            },
                        },
                        program: true,
                    },
                },
                slot: true,
            },
        });

        let sentCount = 0;

        // Send 1-day reminders
        for (const interview of tomorrowInterviews) {
            // Prisma types should be correct now with the include
            const { application, slot } = interview;
            const { applicant, program } = application;

            await sendInterviewReminder(
                applicant.user.email,
                applicant.firstName,
                program.nameEn,
                slot.startTime,
                slot.startTime,
                slot.endTime,
                slot.location,
                application.id,
                1
            );
            sentCount++;
        }

        // Send 7-day reminders
        for (const interview of nextWeekInterviews) {
            const { application, slot } = interview;
            const { applicant, program } = application;

            await sendInterviewReminder(
                applicant.user.email,
                applicant.firstName,
                program.nameEn,
                slot.startTime,
                slot.startTime,
                slot.endTime,
                slot.location,
                application.id,
                7
            );
            sentCount++;
        }

        return NextResponse.json({
            success: true,
            message: `Sent ${sentCount} reminders`,
            details: {
                tomorrow: tomorrowInterviews.length,
                nextWeek: nextWeekInterviews.length,
            },
        });

    } catch (error) {
        console.error("Cron job error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
