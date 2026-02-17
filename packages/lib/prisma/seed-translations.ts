import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const translations = [
    // Personal Information
    { key: "register.title", en: "Title", th: "คำนำหน้าชื่อ" },
    { key: "register.first_name_en", en: "First Name (English)", th: "ชื่อจริง (ภาษาอังกฤษ)" },
    { key: "register.last_name_en", en: "Last Name (English)", th: "นามสกุล (ภาษาอังกฤษ)" },
    { key: "register.first_name_th", en: "First Name (Thai)", th: "ชื่อจริง (ภาษาไทย)" },
    { key: "register.last_name_th", en: "Last Name (Thai)", th: "นามสกุล (ภาษาไทย)" },
    { key: "register.nationality", en: "Nationality", th: "สัญชาติ" },
    { key: "register.citizen_id", en: "Citizen ID / Passport No.", th: "เลขบัตรประชาชน / เลขที่หนังสือเดินทาง" },
    { key: "register.phone_number", en: "Phone Number", th: "เบอร์โทรศัพท์" },
    { key: "register.birth_date", en: "Birth Date", th: "วันเกิด" },
    { key: "register.gender", en: "Gender", th: "เพศ" },

    // Address
    { key: "register.address", en: "Address (House No, Village, Road)", th: "ที่อยู่ (บ้านเลขที่, หมู่บ้าน, ถนน)" },
    { key: "register.sub_district", en: "Sub-district (Tambon)", th: "ตำบล / แขวง" },
    { key: "register.district", en: "District (Amphoe)", th: "อำเภอ / เขต" },
    { key: "register.province", en: "Province", th: "จังหวัด" },
    { key: "register.zip_code", en: "Zip Code", th: "รหัสไปรษณีย์" },
    { key: "register.country", en: "Country", th: "ประเทศ" },
    { key: "register.country_name", en: "Country Name", th: "ชื่อประเทศ" },

    // Account
    { key: "register.email", en: "Email address", th: "อีเมล" },
    { key: "register.password", en: "Password", th: "รหัสผ่าน" },
    { key: "register.confirm_password", en: "Confirm Password", th: "ยืนยันรหัสผ่าน" },

    // Buttons
    { key: "register.submit", en: "Register", th: "ลงทะเบียน" },
    { key: "register.back", en: "Back", th: "ย้อนกลับ" },
    { key: "register.next", en: "Next", th: "ถัดไป" },
    { key: "register.cancel", en: "Cancel", th: "ยกเลิก" },
];

async function main() {
    console.log("🌱 Seeding translations...");

    for (const t of translations) {
        await prisma.translation.upsert({
            where: { key: t.key },
            update: {
                valueEn: t.en,
                valueTh: t.th,
            },
            create: {
                key: t.key,
                valueEn: t.en,
                valueTh: t.th,
            },
        });
    }

    console.log(`✅ Seeded ${translations.length} translations.`);
}

main()
    .catch((e) => {
        console.error("❌ Error seeding translations:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
