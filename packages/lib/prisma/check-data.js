const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function checkData() {
    console.log("🔍 Checking Application data...\n");

    const applications = await prisma.application.findMany({
        include: {
            applicant: true,
            program: true,
        },
        take: 5,
    });

    applications.forEach((app, index) => {
        console.log(`Application ${index + 1}:`);
        console.log(`  ID: ${app.id}`);
        console.log(`  Applicant ID: ${app.applicantId}`);
        console.log(`  Applicant: ${app.applicant ? `${app.applicant.firstName} ${app.applicant.lastName}` : "NULL"}`);
        console.log(`  Citizen ID: ${app.applicant?.citizenId || "NULL"}`);
        console.log(`  Program: ${app.program.nameEn}`);
        console.log("");
    });

    await prisma.$disconnect();
}

checkData().catch(console.error);
