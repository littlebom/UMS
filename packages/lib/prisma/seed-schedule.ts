// Seed script for Schedule Management sample data
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedScheduleData() {
    console.log("🌱 Starting Schedule Management seed...\n");

    try {
        // 1. Get existing programs
        const programs = await prisma.program.findMany({
            take: 3,
            select: { id: true, nameEn: true },
        });

        if (programs.length === 0) {
            console.log("❌ No programs found. Please seed programs first.");
            return;
        }

        console.log(`✅ Found ${programs.length} programs`);

        // 2. Create Student Groups
        console.log("\n📚 Creating Student Groups...");
        const studentGroups = [];

        for (const program of programs) {
            // Create groups for years 2022, 2023, 2024
            for (const year of [2022, 2023, 2024]) {
                for (const section of ["A", "B"]) {
                    const groupName = `Section ${section}`;

                    const existing = await prisma.studentGroup.findFirst({
                        where: {
                            programId: program.id,
                            admissionYear: year,
                            name: groupName,
                        },
                    });

                    if (!existing) {
                        const group = await prisma.studentGroup.create({
                            data: {
                                name: groupName,
                                programId: program.id,
                                admissionYear: year,
                            },
                        });
                        studentGroups.push(group);
                        console.log(`   Created: ${program.nameEn} - ${year} - ${groupName}`);
                    } else {
                        studentGroups.push(existing);
                        console.log(`   Exists: ${program.nameEn} - ${year} - ${groupName}`);
                    }
                }
            }
        }

        // 3. Create or get Rooms
        console.log("\n🏢 Creating Rooms...");
        const roomsData = [
            { code: "A101", name: "Lecture Hall A", building: "Building A", floor: 1, roomType: "LECTURE_ROOM" as const, capacity: 100 },
            { code: "A102", name: "Lecture Hall B", building: "Building A", floor: 1, roomType: "LECTURE_ROOM" as const, capacity: 80 },
            { code: "B201", name: "Computer Lab 1", building: "Building B", floor: 2, roomType: "COMPUTER_LAB" as const, capacity: 40 },
            { code: "B202", name: "Computer Lab 2", building: "Building B", floor: 2, roomType: "COMPUTER_LAB" as const, capacity: 40 },
            { code: "C301", name: "Seminar Room 1", building: "Building C", floor: 3, roomType: "SEMINAR_ROOM" as const, capacity: 30 },
            { code: "C302", name: "Seminar Room 2", building: "Building C", floor: 3, roomType: "SEMINAR_ROOM" as const, capacity: 25 },
        ];

        const rooms = [];
        for (const roomData of roomsData) {
            const existing = await prisma.room.findFirst({
                where: { code: roomData.code },
            });

            if (!existing) {
                const room = await prisma.room.create({
                    data: {
                        ...roomData,
                        isAvailable: true,
                    },
                });
                rooms.push(room);
                console.log(`   Created: ${roomData.code} - ${roomData.name}`);
            } else {
                rooms.push(existing);
                console.log(`   Exists: ${roomData.code} - ${roomData.name}`);
            }
        }

        // 4. Get current term or create one
        console.log("\n📅 Getting/Creating Academic Term...");
        let currentTerm = await prisma.academicTerm.findFirst({
            where: { isCurrent: true },
        });

        if (!currentTerm) {
            currentTerm = await prisma.academicTerm.create({
                data: {
                    year: 2024,
                    semester: 1,
                    startDate: new Date("2024-08-01"),
                    endDate: new Date("2024-12-31"),
                    isCurrent: true,
                },
            });
            console.log(`   Created: ${currentTerm.semester}/${currentTerm.year} (Current)`);
        } else {
            console.log(`   Exists: ${currentTerm.semester}/${currentTerm.year} (Current)`);
        }

        // 5. Get courses
        const courses = await prisma.course.findMany({
            take: 6,
            select: { id: true, code: true, nameEn: true },
        });

        if (courses.length === 0) {
            console.log("❌ No courses found. Please seed courses first.");
            return;
        }

        console.log(`\n📖 Found ${courses.length} courses`);

        // 6. Get instructors (Personnel who are instructors based on user role)
        const instructors = await prisma.personnel.findMany({
            take: 4,
            select: { id: true, firstName: true, lastName: true },
        });

        console.log(`👨‍🏫 Found ${instructors.length} personnel`);

        // 7. Create Class Sections
        console.log("\n📝 Creating Class Sections...");
        const sections = [];

        for (let i = 0; i < Math.min(courses.length, 6); i++) {
            const course = courses[i];
            const instructor = instructors[i % Math.max(instructors.length, 1)];

            // Create 2 sections per course
            for (let secNum = 1; secNum <= 2; secNum++) {
                const sectionNumber = secNum.toString().padStart(3, "0");

                const existing = await prisma.classSection.findFirst({
                    where: {
                        courseId: course.id,
                        termId: currentTerm.id,
                        sectionNumber,
                    },
                });

                if (!existing) {
                    const section = await prisma.classSection.create({
                        data: {
                            courseId: course.id,
                            termId: currentTerm.id,
                            sectionNumber,
                            capacity: 40,
                            instructorId: instructor?.id,
                        },
                    });
                    sections.push(section);
                    console.log(`   Created: ${course.code} - Section ${sectionNumber}`);
                } else {
                    sections.push(existing);
                    console.log(`   Exists: ${course.code} - Section ${sectionNumber}`);
                }
            }
        }

        // 8. Create Class Schedules
        console.log("\n⏰ Creating Class Schedules...");
        const days = ["MON", "TUE", "WED", "THU", "FRI"] as const;
        const timeSlots = [
            { start: "08:00", end: "10:00" },
            { start: "10:00", end: "12:00" },
            { start: "13:00", end: "15:00" },
            { start: "15:00", end: "17:00" },
        ];

        let scheduleCount = 0;
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const day = days[i % days.length];
            const timeSlot = timeSlots[i % timeSlots.length];
            const room = rooms[i % rooms.length];
            const instructor = instructors[i % Math.max(instructors.length, 1)];

            // Check if schedule exists
            const existingSchedule = await prisma.classSchedule.findFirst({
                where: {
                    sectionId: section.id,
                    day: day,
                },
            });

            if (!existingSchedule) {
                // Get course for this section
                const sectionWithCourse = await prisma.classSection.findUnique({
                    where: { id: section.id },
                    include: { course: true },
                });

                await prisma.classSchedule.create({
                    data: {
                        sectionId: section.id,
                        day: day,
                        startTime: timeSlot.start,
                        endTime: timeSlot.end,
                        roomId: room.id,
                        courseId: sectionWithCourse?.courseId,
                        instructorId: instructor?.id,
                        termId: currentTerm.id,
                    },
                });
                scheduleCount++;
                console.log(`   Created: ${sectionWithCourse?.course.code} - ${day} ${timeSlot.start}-${timeSlot.end} @ ${room.code}`);
            }
        }

        console.log(`\n✅ Created ${scheduleCount} new schedules`);

        // 9. Connect some student groups to sections
        console.log("\n🔗 Connecting Student Groups to Sections...");
        if (sections.length > 0 && studentGroups.length > 0) {
            // Connect first few groups to first few sections
            for (let i = 0; i < Math.min(sections.length, studentGroups.length, 6); i++) {
                await (prisma.classSection.update as any)({
                    where: { id: sections[i].id },
                    data: {
                        studentGroups: {
                            connect: { id: studentGroups[i].id }
                        }
                    }
                });
                console.log(`   Connected: Section ${i + 1} ↔ ${studentGroups[i].name}`);
            }
        }

        // Summary
        console.log("\n" + "=".repeat(50));
        console.log("📊 SEED SUMMARY");
        console.log("=".repeat(50));
        console.log(`   Student Groups: ${studentGroups.length}`);
        console.log(`   Rooms: ${rooms.length}`);
        console.log(`   Class Sections: ${sections.length}`);
        console.log(`   Class Schedules: ${scheduleCount} new`);
        console.log("=".repeat(50));
        console.log("\n🎉 Schedule Management seed completed!");

    } catch (error) {
        console.error("❌ Error seeding data:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

seedScheduleData();
