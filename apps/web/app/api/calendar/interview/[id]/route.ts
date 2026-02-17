import { prisma, generateICS } from "@ums/lib";
import { getApplicantSession } from "@/actions/auth";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getApplicantSession();
        if (!session || !session.applicantId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const applicationId = params.id;

        const application = await prisma.application.findUnique({
            where: {
                id: applicationId,
                applicantId: session.applicantId,
            },
            include: {
                program: true,
                interview: {
                    include: {
                        slot: {
                            include: {
                                interviewer: true,
                            },
                        },
                    },
                },
            },
        });

        if (!application || !application.interview || !application.interview.slot) {
            return new NextResponse("Interview not found", { status: 404 });
        }

        const { slot } = application.interview;
        const { program } = application;

        const title = `Interview: ${program.nameEn}`;
        const description = `Interview for ${program.nameEn} program.\nInterviewer: ${slot.interviewer.firstName} ${slot.interviewer.lastName}`;
        const location = slot.location || "Online";
        const url = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/admissions/application/${applicationId}`;

        const icsContent = generateICS(
            title,
            description,
            location,
            slot.startTime,
            slot.endTime,
            url
        );

        return new NextResponse(icsContent, {
            headers: {
                "Content-Type": "text/calendar; charset=utf-8",
                "Content-Disposition": `attachment; filename="interview-${applicationId}.ics"`,
            },
        });
    } catch (error) {
        console.error("Calendar export error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
