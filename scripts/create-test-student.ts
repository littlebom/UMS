import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const email = "student@test.com";
    const password = "password123";
    const studentId = "66010001";

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        console.log("Test student already exists.");
        return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Get a program to assign to the student
    const program = await prisma.program.findFirst();
    if (!program) {
        console.error("No program found. Please create a program first.");
        return;
    }

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
                },
            },
        },
    });

    console.log(`Created test student: ${email} / ${password}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
