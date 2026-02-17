import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultTrackTypes = [
    {
        code: "QUOTA",
        nameTh: "โควต้า",
        nameEn: "Quota Admission",
        description: "การรับสมัครผ่านระบบโควต้าสำหรับโรงเรียนเครือข่ายหรือพื้นที่เฉพาะ",
        color: "#3B82F6", // Blue
        icon: "Target",
        displayOrder: 1,
        isSystem: true
    },
    {
        code: "DIRECT",
        nameTh: "รับตรง",
        nameEn: "Direct Admission",
        description: "การรับสมัครแบบสอบตรงโดยมหาวิทยาลัย",
        color: "#10B981", // Green
        icon: "Award",
        displayOrder: 2,
        isSystem: true
    },
    {
        code: "PORTFOLIO",
        nameTh: "Portfolio",
        nameEn: "Portfolio Admission",
        description: "การรับสมัครโดยพิจารณาจากแฟ้มสะสมผลงาน",
        color: "#8B5CF6", // Purple
        icon: "Briefcase",
        displayOrder: 3,
        isSystem: false
    },
    {
        code: "SPECIAL_TALENT",
        nameTh: "ความสามารถพิเศษ",
        nameEn: "Special Talent",
        description: "การรับสมัครผู้มีความสามารถพิเศษด้านดนตรี กีฬา หรือศิลปะ",
        color: "#F59E0B", // Amber
        icon: "Star",
        displayOrder: 4,
        isSystem: false
    },
    {
        code: "EARLY",
        nameTh: "Early Admission",
        nameEn: "Early Admission",
        description: "การรับสมัครรอบพิเศษก่อนกำหนดการปกติ",
        color: "#EF4444", // Red
        icon: "Zap",
        displayOrder: 5,
        isSystem: false
    },
    {
        code: "TRANSFER",
        nameTh: "รับโอนย้าย",
        nameEn: "Transfer",
        description: "การรับสมัครนักศึกษาโอนย้ายจากสถาบันอื่น",
        color: "#6366F1", // Indigo
        icon: "ArrowRightLeft",
        displayOrder: 6,
        isSystem: false
    },
    {
        code: "INTERNATIONAL",
        nameTh: "นานาชาติ",
        nameEn: "International",
        description: "การรับสมัครนักศึกษานานาชาติ",
        color: "#EC4899", // Pink
        icon: "Globe",
        displayOrder: 7,
        isSystem: false
    }
];

async function main() {
    console.log('Start seeding Admission Track Types...');

    for (const type of defaultTrackTypes) {
        const existing = await prisma.admissionTrackType.findUnique({
            where: { code: type.code }
        });

        if (!existing) {
            await prisma.admissionTrackType.create({
                data: type
            });
            console.log(`Created track type: ${type.code}`);
        } else {
            console.log(`Track type ${type.code} already exists.`);
        }
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
