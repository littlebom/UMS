import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Creating test student...");

    const email = "student@test.com";
    const password = "password123";
    const studentId = "66010001";
    const passwordHash = await bcrypt.hash(password, 10);

    // Get first program
    const program = await prisma.program.findFirst();
    if (!program) {
        console.error("❌ No program found. Please create a program first via admin panel.");
        return;
    }

    // Check if student already exists
    const existing = await prisma.user.findUnique({
        where: { email },
    });

    if (existing) {
        console.log("ℹ️  Student already exists");
        return;
    }

    // Create student
    const user = await prisma.user.create({
        data: {
            email,
            passwordHash,
            role: "STUDENT",
            studentProfile: {
                create: {
                    studentId,
                    firstName: "Test",
                    lastName: "Student",
                    birthDate: new Date("2000-01-01"),
                    programId: program.id,
                    status: "STUDYING",
                    gpax: 0.00,
                },
            },
        },
    });

    console.log("✅ Student created successfully!");
    console.log("📋 Student Account:");
    console.log("==========================================");
    console.log(`Email:      ${email}`);
    console.log(`Password:   ${password}`);
    console.log(`Student ID: ${studentId}`);
    console.log(`Program:    ${program.nameEn}`);
    console.log("==========================================");
}

main()
    .catch((e) => {
        console.error("❌ Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
