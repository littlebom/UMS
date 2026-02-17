import { prisma } from "@ums/lib";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Find ANY schedule for the section we know exists
        const sectionId = "cmi69o86q0006yk48xugye7j2";

        // Update all schedules for this section to Monday 09:00 - 12:00
        const result = await prisma.classSchedule.updateMany({
            where: { sectionId: sectionId },
            data: {
                day: "MON",
                startTime: "09:00",
                endTime: "12:00",
                room: "EN101"
            },
        });

        return NextResponse.json({ message: "Updated schedules", count: result.count });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
