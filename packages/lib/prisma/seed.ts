import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding test users...");

    // Hash password
    const password = "password123";
    const passwordHash = await bcrypt.hash(password, 10);

    // 1. Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: "admin@ums.ac.th" },
        update: {},
        create: {
            email: "admin@ums.ac.th",
            passwordHash,
            role: "ADMIN",
            personnelProfile: {
                create: {
                    firstName: "Admin",
                    lastName: "User",
                    title: "Mr.",
                    position: "System Administrator",
                },
            },
        },
    });
    console.log("✅ Admin created:", admin.email);

    // 2. Create Staff User
    const staff = await prisma.user.upsert({
        where: { email: "staff@ums.ac.th" },
        update: {},
        create: {
            email: "staff@ums.ac.th",
            passwordHash,
            role: "STAFF",
            personnelProfile: {
                create: {
                    firstName: "Staff",
                    lastName: "Member",
                    title: "Ms.",
                    position: "Registrar",
                },
            },
        },
    });
    console.log("✅ Staff created:", staff.email);

    // 3. Create Instructor User
    const instructor = await prisma.user.upsert({
        where: { email: "instructor@ums.ac.th" },
        update: {},
        create: {
            email: "instructor@ums.ac.th",
            passwordHash,
            role: "INSTRUCTOR",
            personnelProfile: {
                create: {
                    firstName: "John",
                    lastName: "Doe",
                    title: "Dr.",
                    position: "Associate Professor",
                },
            },
        },
    });
    console.log("✅ Instructor created:", instructor.email);

    // 4. Create Applicant User
    const applicant = await prisma.user.upsert({
        where: { email: "applicant@ums.ac.th" },
        update: {},
        create: {
            email: "applicant@ums.ac.th",
            passwordHash,
            role: "APPLICANT",
            applicantProfile: {
                create: {
                    firstName: "Bob",
                    lastName: "Johnson",
                },
            },
        },
    });
    console.log("✅ Applicant created:", applicant.email);

    // 5. Create Faculties, Departments, Programs, and Courses
    console.log("\n🌱 Seeding academic structure...");

    // Faculty of Engineering
    const engineering = await prisma.faculty.upsert({
        where: { code: "01" },
        update: {},
        create: {
            code: "01",
            nameEn: "Faculty of Engineering",
            nameTh: "คณะวิศวกรรมศาสตร์",
            description: "Leading faculty in engineering education and research",
        },
    });
    console.log("✅ Faculty created:", engineering.nameEn);

    const cseDept = await prisma.department.upsert({
        where: { id: "dept-cse-01" },
        update: {},
        create: {
            id: "dept-cse-01",
            nameEn: "Department of Computer Science and Engineering",
            nameTh: "ภาควิชาวิทยาการคอมพิวเตอร์และวิศวกรรม",
            facultyId: engineering.id,
        },
    });

    const eeDept = await prisma.department.upsert({
        where: { id: "dept-ee-01" },
        update: {},
        create: {
            id: "dept-ee-01",
            nameEn: "Department of Electrical Engineering",
            nameTh: "ภาควิชาวิศวกรรมไฟฟ้า",
            facultyId: engineering.id,
        },
    });

    // Faculty of Science
    const science = await prisma.faculty.upsert({
        where: { code: "02" },
        update: {},
        create: {
            code: "02",
            nameEn: "Faculty of Science",
            nameTh: "คณะวิทยาศาสตร์",
            description: "Excellence in scientific research and education",
        },
    });
    console.log("✅ Faculty created:", science.nameEn);

    const mathDept = await prisma.department.upsert({
        where: { id: "dept-math-02" },
        update: {},
        create: {
            id: "dept-math-02",
            nameEn: "Department of Mathematics",
            nameTh: "ภาควิชาคณิตศาสตร์",
            facultyId: science.id,
        },
    });

    const physicsDept = await prisma.department.upsert({
        where: { id: "dept-physics-02" },
        update: {},
        create: {
            id: "dept-physics-02",
            nameEn: "Department of Physics",
            nameTh: "ภาควิชาฟิสิกส์",
            facultyId: science.id,
        },
    });

    // Faculty of Business Administration
    const business = await prisma.faculty.upsert({
        where: { code: "03" },
        update: {},
        create: {
            code: "03",
            nameEn: "Faculty of Business Administration",
            nameTh: "คณะบริหารธุรกิจ",
            description: "Preparing future business leaders",
        },
    });
    console.log("✅ Faculty created:", business.nameEn);

    const mgmtDept = await prisma.department.upsert({
        where: { id: "dept-mgmt-03" },
        update: {},
        create: {
            id: "dept-mgmt-03",
            nameEn: "Department of Management",
            nameTh: "ภาควิชาการจัดการ",
            facultyId: business.id,
        },
    });

    console.log("✅ Departments created");

    // Create Programs
    const csProgram = await prisma.program.create({
        data: {
            nameEn: "Bachelor of Science in Computer Science",
            nameTh: "วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์",
            degreeLevel: "BACHELOR",
            facultyId: engineering.id,
            departmentId: cseDept.id,
            description: "Comprehensive program in computer science covering software development, algorithms, and system design",
            credits: 132,
            duration: "4 years",
            objectives: "1. Develop strong foundation in computer science principles\n2. Master software development and engineering practices\n3. Prepare for careers in technology industry\n4. Foster innovation and problem-solving skills",
            structure: "Year 1-2: Core courses in programming, data structures, algorithms\nYear 3-4: Advanced courses and specialization tracks\nFinal year: Capstone project",
            admissionRequirements: "- High school diploma with GPA 3.0 or above\n- Strong background in mathematics\n- Pass entrance examination\n- English proficiency (TOEFL 550 or IELTS 6.0)",
            careerOpportunities: "- Software Engineer\n- Data Scientist\n- System Architect\n- IT Consultant\n- Technology Entrepreneur",
        },
    });

    await prisma.program.create({
        data: {
            nameEn: "Bachelor of Engineering in Electrical Engineering",
            nameTh: "วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมไฟฟ้า",
            degreeLevel: "BACHELOR",
            facultyId: engineering.id,
            departmentId: eeDept.id,
            description: "Comprehensive electrical engineering program focusing on power systems, electronics, and control systems",
            credits: 140,
            duration: "4 years",
        },
    });

    await prisma.program.create({
        data: {
            nameEn: "Bachelor of Science in Mathematics",
            nameTh: "วิทยาศาสตรบัณฑิต สาขาวิชาคณิตศาสตร์",
            degreeLevel: "BACHELOR",
            facultyId: science.id,
            departmentId: mathDept.id,
            description: "Pure and applied mathematics program",
            credits: 128,
            duration: "4 years",
        },
    });

    await prisma.program.create({
        data: {
            nameEn: "Bachelor of Business Administration",
            nameTh: "บริหารธุรกิจบัณฑิต",
            degreeLevel: "BACHELOR",
            facultyId: business.id,
            departmentId: mgmtDept.id,
            description: "Comprehensive business administration program",
            credits: 126,
            duration: "4 years",
        },
    });

    await prisma.program.create({
        data: {
            nameEn: "Master of Science in Computer Science",
            nameTh: "วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์",
            degreeLevel: "MASTER",
            facultyId: engineering.id,
            departmentId: cseDept.id,
            description: "Advanced computer science program for research and development",
            credits: 36,
            duration: "2 years",
        },
    });

    console.log("✅ Programs created");

    // Create Courses
    await prisma.course.createMany({
        data: [
            {
                code: "CS101",
                nameEn: "Introduction to Computer Science",
                nameTh: "การเขียนโปรแกรมเบื้องต้น",
                credits: 3,
                description: "Fundamental concepts of computer science and programming",
            },
            {
                code: "CS201",
                nameEn: "Data Structures and Algorithms",
                nameTh: "โครงสร้างข้อมูลและอัลกอริทึม",
                credits: 3,
                description: "Study of fundamental data structures and algorithms",
            },
            {
                code: "CS301",
                nameEn: "Database Systems",
                nameTh: "ระบบฐานข้อมูล",
                credits: 3,
                description: "Database design, SQL, and database management",
            },
            {
                code: "EE101",
                nameEn: "Circuit Analysis",
                nameTh: "การวิเคราะห์วงจรไฟฟ้า",
                credits: 3,
                description: "Fundamental electrical circuit analysis",
            },
            {
                code: "MATH101",
                nameEn: "Calculus I",
                nameTh: "แคลคูลัส 1",
                credits: 3,
                description: "Differential and integral calculus",
            },
            {
                code: "BUS101",
                nameEn: "Principles of Management",
                nameTh: "หลักการจัดการ",
                credits: 3,
                description: "Introduction to management principles and practices",
            },
        ],
    });

    console.log("✅ Courses created");

    console.log("\n✨ Seeding completed!");
    console.log("\n📋 Test Accounts:");
    console.log("==========================================");
    console.log("Admin:      admin@ums.ac.th      / password123");
    console.log("Staff:      staff@ums.ac.th      / password123");
    console.log("Instructor: instructor@ums.ac.th / password123");
    console.log("Applicant:  applicant@ums.ac.th  / password123");
    console.log("==========================================");
    console.log("\n📚 Academic Structure:");
    console.log("- 3 Faculties (Engineering, Science, Business)");
    console.log("- 5 Departments");
    console.log("- 5 Programs (4 Bachelor's, 1 Master's)");
    console.log("- 6 Courses");
    console.log("\nNote: Student account requires a Program to be created first.");
    console.log("You can create it manually via admin panel.\n");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
