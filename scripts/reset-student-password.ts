import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function resetStudentPassword() {
    const studentId = "25010001";
    const newPassword = "student123"; // Default password

    try {
        // Find student
        const student = await prisma.student.findUnique({
            where: { studentId },
            include: { user: true },
        });

        if (!student) {
            console.log(`❌ Student ${studentId} not found`);
            return;
        }

        // Hash new password
        const passwordHash = await bcrypt.hash(newPassword, 10);

        // Update user password
        await prisma.user.update({
            where: { id: student.userId },
            data: { passwordHash },
        });

        console.log(`✅ Password reset successful!`);
        console.log(`\n📋 Login Credentials:`);
        console.log(`   Email: ${student.user.email}`);
        console.log(`   Password: ${newPassword}`);
        console.log(`   Student ID: ${studentId}`);
        console.log(`\n🔗 Login at: http://localhost:3000/login`);
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

resetStudentPassword();
