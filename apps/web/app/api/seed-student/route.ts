import { prisma } from "@ums/lib";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const email = "student@test.com";
        const password = "password123";
        const hashedPassword = await bcrypt.hash(password, 10);

        // 1. Create User
        const user = await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
                email,
                passwordHash: hashedPassword,
                role: "STUDENT",
            },
        });

        // 2. Ensure Program exists (using seed data or creating one)
        let program = await prisma.program.findFirst();
        if (!program) {
            // Create a dummy program if none exists
            const faculty = await prisma.faculty.create({
                data: {
                    code: "TEST",
                    nameTh: "Test Faculty",
                    nameEn: "Test Faculty",
                }
            });
            const department = await prisma.department.create({
                data: {
                    id: "TEST-DEPT",
                    nameTh: "Test Dept",
                    nameEn: "Test Dept",
                    facultyId: faculty.id
                }
            });
            program = await prisma.program.create({
                data: {
                    id: "TEST-PROG",
                    nameTh: "Test Program",
                    nameEn: "Test Program",
                    degreeLevel: "BACHELOR",
                    facultyId: faculty.id,
                    departmentId: department.id
                }
            });
        }

        // 3. Create Student Profile
        const student = await prisma.student.upsert({
            where: { userId: user.id },
            update: {},
            create: {
                userId: user.id,
                studentId: "66000001",
                firstName: "Test",
                lastName: "Student",
                programId: program.id,
                status: "ACTIVE",
                enrolledAt: new Date(),
            },
        });

        return NextResponse.json({
            message: "Created test student",
            email,
            password,
            studentId: student.studentId,
        });
    } catch (error) {
        console.error("Error seeding student:", error);
        return NextResponse.json(
            { error: "Failed to seed student" },
            { status: 500 }
        );
    }
}
