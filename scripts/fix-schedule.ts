import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Find the schedule with the weird time
    const schedule = await prisma.classSchedule.findFirst({
        where: {
            startTime: "01:20",
        },
    });

    if (!schedule) {
        console.log("No weird schedule found.");
        return;
    }

    console.log("Found schedule:", schedule);

    // Update to Monday 09:00 - 12:00
    await prisma.classSchedule.update({
        where: { id: schedule.id },
        data: {
            day: "MON",
            startTime: "09:00",
            endTime: "12:00",
        },
    });

    console.log("Updated schedule to MON 09:00-12:00");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
