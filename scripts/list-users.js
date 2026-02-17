const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listUsers() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    console.log('\n=== Users in Database ===\n');
    users.forEach((user, index) => {
        console.log(`${index + 1}. Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Created: ${user.createdAt.toLocaleDateString()}`);
        console.log('');
    });

    console.log(`Total users: ${users.length}\n`);

    await prisma.$disconnect();
}

listUsers().catch(console.error);
