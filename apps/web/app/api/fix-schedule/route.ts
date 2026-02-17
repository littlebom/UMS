import { prisma } from "@ums/lib";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Hardcode the sectionId found in debug data or find any schedule
        const sectionId = "cmi69o86q0006yk48xugye7j2"; // From previous debug screenshot

        // Update all schedules for this section to Monday 09:00 - 12:00
        await prisma.classSchedule.updateMany({
            where: { sectionId: sectionId },
            data: {
                day: "MON",
                startTime: "09:00",
                endTime: "12:00",
                room: "EN101"
            },
        });

        return NextResponse.json({ message: "Updated all schedules for section " + sectionId });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
