
import { PrismaClient, UserRole, Gender } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const email = "applicant@example.com";
    const password = "password";
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(`Creating user with email: ${email}`);

    // Check if user exists
    let user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                role: UserRole.APPLICANT,
            },
        });
        console.log(`User created with ID: ${user.id}`);
    } else {
        console.log(`User already exists with ID: ${user.id}`);
    }

    // Check if applicant profile exists
    const existingApplicant = await prisma.applicant.findUnique({
        where: { userId: user.id },
    });

    if (!existingApplicant) {
        const applicant = await prisma.applicant.create({
            data: {
                userId: user.id,
                firstName: "John",
                lastName: "Doe",
                firstNameTh: "จอห์น",
                lastNameTh: "โด",
                title: "Mr.",
                citizenId: "1234567890123",
                birthDate: new Date("2000-01-01"),
                gender: Gender.MALE,
                phone: "0812345678",
                address: "123 Main St",
                subDistrict: "Pathum Wan",
                district: "Pathum Wan",
                province: "Bangkok",
                zipCode: "10330",
                nationality: "Thai",
            },
        });
        console.log(`Applicant profile created with ID: ${applicant.id}`);
    } else {
        console.log(`Applicant profile already exists with ID: ${existingApplicant.id}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
