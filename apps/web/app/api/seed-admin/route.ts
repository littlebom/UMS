"use server";

import { prisma } from "@ums/lib";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const email = "admin@test.com";
        const password = "password123";

        // Check if admin already exists
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ message: "Admin already exists" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const admin = await prisma.user.create({
            data: {
                email,
                passwordHash,
                role: "ADMIN",
                personnelProfile: {
                    create: {
                        firstName: "Admin",
                        lastName: "User",
                        position: "Administrator",
                    },
                },
            },
        });

        return NextResponse.json({
            message: "Created test admin",
            email,
            password,
            adminId: admin.id,
        });
    } catch (e) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}
