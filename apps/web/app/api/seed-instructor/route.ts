import { prisma } from "@ums/lib";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const email = "instructor@test.com";
        const password = "password123";

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ message: "Test instructor already exists" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // Get a department
        const department = await prisma.department.findFirst();
        if (!department) {
            return NextResponse.json({ error: "No department found" }, { status: 400 });
        }

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                role: "INSTRUCTOR",
                personnelProfile: {
                    create: {
                        firstName: "Test",
                        lastName: "Instructor",
                        departmentId: department.id,
                        position: "Lecturer",
                    },
                },
            },
        });

        return NextResponse.json({ message: "Created test instructor", email, password, instructorId: user.id });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
