import { prisma } from "@ums/lib";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const email = "instructor@test.com";
        const sectionId = "cmi69o86q0006yk48xugye7j2"; // Hardcoded from previous steps

        // Find Instructor Personnel ID
        const user = await prisma.user.findUnique({
            where: { email },
            include: { personnelProfile: true },
        });

        if (!user || !user.personnelProfile) {
            return NextResponse.json({ error: "Instructor not found" }, { status: 404 });
        }

        const instructorId = user.personnelProfile.id;

        // Update Section
        await prisma.classSection.updateMany({
            where: {
                // Update ANY section to be taught by this instructor for testing purpose
                // Or specific section if we want
                id: sectionId
            },
            data: {
                instructorId: instructorId,
            },
        });

        return NextResponse.json({ message: "Assigned instructor to section", instructorId });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
