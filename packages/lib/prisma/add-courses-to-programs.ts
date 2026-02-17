import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Adding courses to programs...");

    // Get all programs and courses
    const programs = await prisma.program.findMany();
    const courses = await prisma.course.findMany();

    // Computer Science Program (Bachelor)
    const csProgram = programs.find(p => p.nameEn.includes("Computer Science") && p.degreeLevel === "BACHELOR");
    if (csProgram) {
        const csCourses = courses.filter(c => c.code.startsWith("CS"));
        for (const course of csCourses) {
            await prisma.programCourse.upsert({
                where: {
                    programId_courseId: {
                        programId: csProgram.id,
                        courseId: course.id,
                    },
                },
                update: {},
                create: {
                    programId: csProgram.id,
                    courseId: course.id,
                    isRequired: true,
                    semester: course.code === "CS101" ? 1 : course.code === "CS201" ? 3 : 5,
                },
            });
        }
        console.log(`✅ เพิ่ม ${csCourses.length} วิชาให้กับ ${csProgram.nameTh}`);
    }

    // Electrical Engineering Program
    const eeProgram = programs.find(p => p.nameEn.includes("Electrical Engineering") && p.degreeLevel === "BACHELOR");
    if (eeProgram) {
        const eeCourses = courses.filter(c => c.code.startsWith("EE") || c.code === "MATH101");
        for (const course of eeCourses) {
            await prisma.programCourse.upsert({
                where: {
                    programId_courseId: {
                        programId: eeProgram.id,
                        courseId: course.id,
                    },
                },
                update: {},
                create: {
                    programId: eeProgram.id,
                    courseId: course.id,
                    isRequired: true,
                    semester: course.code === "MATH101" ? 1 : 2,
                },
            });
        }
        console.log(`✅ เพิ่ม ${eeCourses.length} วิชาให้กับ ${eeProgram.nameTh}`);
    }

    // Mathematics Program
    const mathProgram = programs.find(p => p.nameEn.includes("Mathematics") && p.degreeLevel === "BACHELOR");
    if (mathProgram) {
        const mathCourses = courses.filter(c => c.code.startsWith("MATH"));
        for (const course of mathCourses) {
            await prisma.programCourse.upsert({
                where: {
                    programId_courseId: {
                        programId: mathProgram.id,
                        courseId: course.id,
                    },
                },
                update: {},
                create: {
                    programId: mathProgram.id,
                    courseId: course.id,
                    isRequired: true,
                    semester: 1,
                },
            });
        }
        console.log(`✅ เพิ่ม ${mathCourses.length} วิชาให้กับ ${mathProgram.nameTh}`);
    }

    // Business Administration Program
    const busProgram = programs.find(p => p.nameEn.includes("Business Administration") && p.degreeLevel === "BACHELOR");
    if (busProgram) {
        const busCourses = courses.filter(c => c.code.startsWith("BUS"));
        for (const course of busCourses) {
            await prisma.programCourse.upsert({
                where: {
                    programId_courseId: {
                        programId: busProgram.id,
                        courseId: course.id,
                    },
                },
                update: {},
                create: {
                    programId: busProgram.id,
                    courseId: course.id,
                    isRequired: true,
                    semester: 1,
                },
            });
        }
        console.log(`✅ เพิ่ม ${busCourses.length} วิชาให้กับ ${busProgram.nameTh}`);
    }

    // Master's in Computer Science
    const masterCS = programs.find(p => p.nameEn.includes("Computer Science") && p.degreeLevel === "MASTER");
    if (masterCS) {
        const advancedCourses = courses.filter(c => c.code === "CS201" || c.code === "CS301");
        for (const course of advancedCourses) {
            await prisma.programCourse.upsert({
                where: {
                    programId_courseId: {
                        programId: masterCS.id,
                        courseId: course.id,
                    },
                },
                update: {},
                create: {
                    programId: masterCS.id,
                    courseId: course.id,
                    isRequired: true,
                    semester: 1,
                },
            });
        }
        console.log(`✅ เพิ่ม ${advancedCourses.length} วิชาให้กับ ${masterCS.nameTh}`);
    }

    console.log("\n✨ เพิ่มรายวิชาให้ทุกหลักสูตรเรียบร้อยแล้ว!");
}

main()
    .catch((e) => {
        console.error("❌ Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
