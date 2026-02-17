const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting seed...");

    // 1. Create Faculty
    const faculty = await prisma.faculty.upsert({
        where: { code: "01" },
        update: {},
        create: {
            code: "01",
            nameTh: "คณะวิศวกรรมศาสตร์",
            nameEn: "Faculty of Engineering",
            description: "Engineering programs",
        },
    });
    console.log("✅ Created Faculty:", faculty.nameEn);

    // 2. Create Department
    const department = await prisma.department.upsert({
        where: { id: "dept-comp-eng" },
        update: {},
        create: {
            id: "dept-comp-eng",
            nameTh: "ภาควิชาวิศวกรรมคอมพิวเตอร์",
            nameEn: "Computer Engineering",
            facultyId: faculty.id,
        },
    });
    console.log("✅ Created Department:", department.nameEn);

    // 3. Create Program
    const program = await prisma.program.upsert({
        where: { id: "prog-comp-eng-bachelor" },
        update: {},
        create: {
            id: "prog-comp-eng-bachelor",
            nameTh: "วิศวกรรมศาสตรบัณฑิต (วิศวกรรมคอมพิวเตอร์)",
            nameEn: "Bachelor of Engineering (Computer Engineering)",
            degreeLevel: "BACHELOR",
            facultyId: faculty.id,
            departmentId: department.id,
        },
    });
    console.log("✅ Created Program:", program.nameEn);

    // 4. Create Courses
    const courses = await Promise.all([
        prisma.course.upsert({
            where: { code: "CS101" },
            update: {},
            create: {
                code: "CS101",
                nameTh: "การเขียนโปรแกรมเบื้องต้น",
                nameEn: "Introduction to Programming",
                credits: 3,
            },
        }),
        prisma.course.upsert({
            where: { code: "CS201" },
            update: {},
            create: {
                code: "CS201",
                nameTh: "โครงสร้างข้อมูล",
                nameEn: "Data Structures",
                credits: 3,
            },
        }),
    ]);
    console.log("✅ Created", courses.length, "Courses");

    // 5. Create Personnel (Instructor)
    const passwordHash = await bcrypt.hash("password123", 10);
    const instructorUser = await prisma.user.upsert({
        where: { email: "instructor@ums.ac.th" },
        update: {},
        create: {
            email: "instructor@ums.ac.th",
            passwordHash,
            role: "INSTRUCTOR",
        },
    });

    const instructor = await prisma.personnel.upsert({
        where: { userId: instructorUser.id },
        update: {},
        create: {
            userId: instructorUser.id,
            firstName: "Dr. John",
            lastName: "Smith",
            title: "Dr.",
            position: "Associate Professor",
            facultyId: faculty.id,
            departmentId: department.id,
        },
    });
    console.log("✅ Created Instructor:", instructor.firstName, instructor.lastName);

    // 6. Check if John Doe applicant exists
    const johnDoeUser = await prisma.user.findUnique({
        where: { email: "john.doe@example.com" },
        include: { applicantProfile: true },
    });

    if (johnDoeUser && johnDoeUser.applicantProfile) {
        console.log("✅ Found existing applicant: John Doe");

        // Update applicant profile with missing data
        await prisma.applicant.update({
            where: { id: johnDoeUser.applicantProfile.id },
            data: {
                citizenId: "1234567890123",
                birthDate: new Date("2005-01-15"),
                phone: "0812345678",
                address: "123 Test Street, Bangkok, Thailand",
            },
        });
        console.log("   Updated applicant profile with complete data");

        // Check if application already exists
        const existingApp = await prisma.application.findFirst({
            where: {
                applicantId: johnDoeUser.applicantProfile.id,
                programId: program.id,
            },
        });

        if (!existingApp) {
            console.log("   Creating application for John Doe...");
            const application = await prisma.application.create({
                data: {
                    applicantId: johnDoeUser.applicantProfile.id,
                    programId: program.id,
                    status: "SUBMITTED",
                    submittedAt: new Date(),
                },
            });
            console.log("✅ Created Application for John Doe");
        } else {
            console.log("ℹ️  Application already exists for John Doe");
        }
    } else {
        console.log("ℹ️  John Doe not found - please register via /admissions/register");
    }

    console.log("\n🎉 Seed completed successfully!");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
