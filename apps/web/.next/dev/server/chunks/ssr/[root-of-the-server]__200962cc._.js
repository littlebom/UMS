module.exports = [
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/async_hooks [external] (async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("async_hooks", () => require("async_hooks"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/packages/lib/calendar/ics-generator.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateICS",
    ()=>generateICS
]);
function generateICS(title, description, location, startTime, endTime, url) {
    const formatDate = (date)=>{
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };
    const now = formatDate(new Date());
    const start = formatDate(startTime);
    const end = formatDate(endTime);
    const content = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//University Management System//Admissions//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `DTSTAMP:${now}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
        `LOCATION:${location}`,
        url ? `URL:${url}` : "",
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
    ];
    return content.filter(Boolean).join("\r\n");
}
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[project]/packages/lib/email/templates.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getInterviewInvitationTemplate",
    ()=>getInterviewInvitationTemplate,
    "getInterviewReminderTemplate",
    ()=>getInterviewReminderTemplate
]);
const getInterviewInvitationTemplate = (applicantName, programName, date, time, location, link)=>`
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
        .header { background-color: #033675; color: white; padding: 15px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { padding: 20px; }
        .details { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .button { display: inline-block; background-color: #03ccba; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Interview Invitation</h2>
        </div>
        <div class="content">
            <p>Dear ${applicantName},</p>
            <p>We are pleased to invite you to an interview for the <strong>${programName}</strong> program at our university.</p>
            
            <div class="details">
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Location:</strong> ${location}</p>
            </div>

            <p>Please review the details and confirm your attendance by clicking the button below:</p>
            
            <center>
                <a href="${link}" class="button">View Details & Confirm</a>
            </center>

            <p>If you have any questions or need to reschedule, please contact us immediately.</p>
        </div>
        <div class="footer">
            <p>This is an automated message. Please do not reply directly to this email.</p>
            <p>&copy; ${new Date().getFullYear()} University Management System</p>
        </div>
    </div>
</body>
</html>
`;
const getInterviewReminderTemplate = (applicantName, programName, date, time, location, link, daysLeft)=>`
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
        .header { background-color: #f59e0b; color: white; padding: 15px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { padding: 20px; }
        .details { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .button { display: inline-block; background-color: #033675; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Interview Reminder</h2>
        </div>
        <div class="content">
            <p>Dear ${applicantName},</p>
            <p>This is a reminder that your interview for <strong>${programName}</strong> is coming up in <strong>${daysLeft} day(s)</strong>.</p>
            
            <div class="details">
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Location:</strong> ${location}</p>
            </div>

            <p>Please ensure you are prepared and arrive on time. You can view the full details here:</p>
            
            <center>
                <a href="${link}" class="button">View Interview Details</a>
            </center>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} University Management System</p>
        </div>
    </div>
</body>
</html>
`;
}),
"[project]/packages/lib/email/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendEmail",
    ()=>sendEmail,
    "sendInterviewInvitation",
    ()=>sendInterviewInvitation,
    "sendInterviewReminder",
    ()=>sendInterviewReminder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nodemailer/lib/nodemailer.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>"); // Import prisma from lib root
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/lib/email/templates.ts [app-rsc] (ecmascript)");
;
;
;
// Helper to get transporter based on DB settings or Env vars
async function getTransporter() {
    // Try to get settings from DB
    const settings = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].systemSettings.findFirst();
    if (settings && settings.smtpHost) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createTransport({
            host: settings.smtpHost,
            port: settings.smtpPort,
            secure: settings.smtpSecure,
            auth: {
                user: settings.smtpUser || "",
                pass: settings.smtpPassword || ""
            }
        });
    }
    // Fallback to Env vars
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createTransport({
        host: process.env.SMTP_HOST || "smtp.ethereal.email",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER || "ethereal_user",
            pass: process.env.SMTP_PASS || "ethereal_pass"
        }
    });
}
async function sendEmail({ to, subject, html }) {
    try {
        const settings = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].systemSettings.findFirst();
        // In development, if no real SMTP is configured (neither in DB nor Env), we log
        if (("TURBOPACK compile-time value", "development") !== "production" && !process.env.SMTP_HOST && (!settings || !settings.smtpHost)) {
            console.log("📧 [MOCK EMAIL] -----------------------------------");
            console.log(`To: ${to}`);
            console.log(`Subject: ${subject}`);
            console.log("---------------------------------------------------");
            return {
                success: true,
                messageId: "mock-id"
            };
        }
        const transporter = await getTransporter();
        const fromName = settings?.smtpFromName || "UMS Admissions";
        const fromEmail = settings?.smtpFromEmail || "noreply@ums.ac.th";
        const info = await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to,
            subject,
            html
        });
        console.log("Message sent: %s", info.messageId);
        return {
            success: true,
            messageId: info.messageId
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            success: false,
            error
        };
    }
}
async function sendInterviewInvitation(email, applicantName, programName, date, startTime, endTime, location, applicationId) {
    const dateStr = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    const timeStr = `${startTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    })} - ${endTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    })}`;
    const link = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/admissions/application/${applicationId}`;
    const locationStr = location || "Online / To be announced";
    const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getInterviewInvitationTemplate"])(applicantName, programName, dateStr, timeStr, locationStr, link);
    return sendEmail({
        to: email,
        subject: `Interview Invitation: ${programName}`,
        html
    });
}
async function sendInterviewReminder(email, applicantName, programName, date, startTime, endTime, location, applicationId, daysLeft) {
    const dateStr = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    const timeStr = `${startTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    })} - ${endTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    })}`;
    const link = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/admissions/application/${applicationId}`;
    const locationStr = location || "Online / To be announced";
    const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getInterviewReminderTemplate"])(applicantName, programName, dateStr, timeStr, locationStr, link, daysLeft);
    return sendEmail({
        to: email,
        subject: `Reminder: Interview in ${daysLeft} day(s) - ${programName}`,
        html
    });
}
}),
"[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/lib/node_modules/@prisma/client/default.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$calendar$2f$ics$2d$generator$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/lib/calendar/ics-generator.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$email$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/lib/email/index.ts [app-rsc] (ecmascript)");
;
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma_new || new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PrismaClient"]({
    log: [
        "query"
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma_new = prisma;
;
;
;
}),
"[project]/apps/web/lib/dictionary.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dictionary",
    ()=>dictionary
]);
const dictionary = {
    en: {
        common: {
            searchPlaceholder: "Search...",
            signOut: "Sign Out",
            adminLogin: "Admin Login",
            studentPortal: "Student Portal",
            help: "Help",
            admissions: "Admissions",
            language: "Language"
        },
        menu: {
            home: "Home",
            curriculum: "Curriculum",
            students: "Students",
            dashboard: "Dashboard",
            overview: "Overview",
            coreManagement: "Core Management",
            programManagement: "Program Management",
            personnelManagement: "Personnel Management",
            studentManagement: "Student Management",
            academic: "Academic",
            academicManagement: "Academic Management",
            finance: "Finance",
            contentManagement: "Content Management",
            announcements: "Announcements",
            websiteBanners: "Website Banners",
            system: "System",
            reportsAnalytics: "Reports & Analytics",
            aiAgent: "AI Agent",
            helpCenter: "Help Center",
            fileManagement: "File Management",
            settings: "Settings"
        },
        landing: {
            welcome: "Welcome to University Management System",
            description: "A comprehensive platform for managing academic and administrative tasks.",
            getStarted: "Get Started",
            latestNews: "Latest News",
            noNews: "No news available at the moment.",
            readMore: "Read full story",
            copyright: "University Management System. All rights reserved."
        },
        student: {
            myProfile: "My Profile",
            grades: "Grades",
            schedule: "Class Schedule",
            registration: "Registration",
            transcript: "Transcript",
            finance: "Finance",
            announcements: "Announcements"
        },
        applicant: {
            title: "UMS Admissions",
            register: "Register",
            login: "Login",
            applicationStatus: "Application Status"
        }
    },
    th: {
        common: {
            searchPlaceholder: "ค้นหา...",
            signOut: "ออกจากระบบ",
            adminLogin: "เข้าสู่ระบบผู้ดูแล",
            studentPortal: "ระบบนักศึกษา",
            help: "ช่วยเหลือ",
            admissions: "รับสมัครนักศึกษา",
            language: "ภาษา"
        },
        menu: {
            home: "หน้าหลัก",
            curriculum: "หลักสูตร",
            students: "นักศึกษา",
            dashboard: "แดชบอร์ด",
            overview: "ภาพรวม",
            coreManagement: "การจัดการหลัก",
            programManagement: "จัดการหลักสูตร",
            personnelManagement: "จัดการบุคลากร",
            studentManagement: "จัดการนักศึกษา",
            academic: "วิชาการ",
            academicManagement: "จัดการวิชาการ",
            finance: "การเงิน",
            contentManagement: "จัดการเนื้อหา",
            announcements: "ประกาศ",
            websiteBanners: "แบนเนอร์เว็บไซต์",
            system: "ระบบ",
            reportsAnalytics: "รายงานและสถิติ",
            aiAgent: "AI Agent",
            helpCenter: "ศูนย์ช่วยเหลือ",
            fileManagement: "จัดการไฟล์",
            settings: "ตั้งค่าระบบ"
        },
        landing: {
            welcome: "ยินดีต้อนรับสู่ระบบจัดการมหาวิทยาลัย",
            description: "แพลตฟอร์มครบวงจรสำหรับการบริหารจัดการงานวิชาการและธุรการ",
            getStarted: "เริ่มต้นใช้งาน",
            latestNews: "ข่าวสารล่าสุด",
            noNews: "ไม่มีข่าวสารในขณะนี้",
            readMore: "อ่านต่อ",
            copyright: "ระบบจัดการมหาวิทยาลัย สงวนลิขสิทธิ์"
        },
        student: {
            myProfile: "โปรไฟล์ของฉัน",
            grades: "ผลการเรียน",
            schedule: "ตารางเรียน",
            registration: "ลงทะเบียนเรียน",
            transcript: "ทรานสคริปต์",
            finance: "การเงิน",
            announcements: "ประกาศ"
        },
        applicant: {
            title: "ระบบรับสมัครนักศึกษา",
            register: "ลงทะเบียน",
            login: "เข้าสู่ระบบ",
            applicationStatus: "สถานะการสมัคร"
        }
    }
};
}),
"[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0048abae6b6c31cf4a1031d6650cdc9969ec5f17a2":"getTranslations","00db175aea4f17421008b7a1ca8f3807609773b385":"seedTranslations","6046f7a2c658258bbe39ba6a7e5987b4833c898102":"updateTranslation"},"",""] */ __turbopack_context__.s([
    "getTranslations",
    ()=>getTranslations,
    "seedTranslations",
    ()=>seedTranslations,
    "updateTranslation",
    ()=>updateTranslation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$dictionary$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/dictionary.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getTranslations() {
    try {
        // @ts-ignore - Prisma client update might not be picked up by IDE yet
        const translations = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].translation.findMany();
        // Convert array to object { key: { en: valueEn, th: valueTh } }
        const translationMap = {};
        translations.forEach((t)=>{
            translationMap[t.key] = {
                en: t.valueEn,
                th: t.valueTh
            };
        });
        return translationMap;
    } catch (error) {
        console.error("Failed to fetch translations:", error);
        return {};
    }
}
async function updateTranslation(key, values) {
    try {
        // @ts-ignore
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].translation.upsert({
            where: {
                key
            },
            update: {
                valueEn: values.en,
                valueTh: values.th
            },
            create: {
                key,
                valueEn: values.en,
                valueTh: values.th
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
        return {
            success: true
        };
    } catch (error) {
        console.error("Failed to update translation:", error);
        return {
            success: false,
            error: "Failed to update translation"
        };
    }
}
async function seedTranslations() {
    try {
        const operations = [];
        // Helper to flatten the dictionary
        const flattenDictionary = (obj, prefix = "")=>{
            let result = {};
            for(const key in obj){
                if (typeof obj[key] === "object" && obj[key] !== null) {
                    const nested = flattenDictionary(obj[key], `${prefix}${key}.`);
                    result = {
                        ...result,
                        ...nested
                    };
                } else {
                    result[`${prefix}${key}`] = obj[key];
                }
            }
            return result;
        };
        const enFlat = flattenDictionary(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$dictionary$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dictionary"].en);
        const thFlat = flattenDictionary(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$dictionary$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dictionary"].th);
        // Get all unique keys
        const allKeys = new Set([
            ...Object.keys(enFlat),
            ...Object.keys(thFlat)
        ]);
        for (const key of Array.from(allKeys)){
            operations.push(// @ts-ignore
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].translation.upsert({
                where: {
                    key
                },
                update: {
                    // Only update if missing? Or overwrite? 
                    // Let's overwrite to ensure sync with file initially, 
                    // but in production we might want to be careful.
                    // For this task, we assume file is source of truth for initial seed.
                    valueEn: enFlat[key] || "",
                    valueTh: thFlat[key] || ""
                },
                create: {
                    key,
                    valueEn: enFlat[key] || "",
                    valueTh: thFlat[key] || ""
                }
            }));
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].$transaction(operations);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
        return {
            success: true,
            count: operations.length
        };
    } catch (error) {
        console.error("Failed to seed translations:", error);
        return {
            success: false,
            error: String(error)
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getTranslations,
    updateTranslation,
    seedTranslations
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTranslations, "0048abae6b6c31cf4a1031d6650cdc9969ec5f17a2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTranslation, "6046f7a2c658258bbe39ba6a7e5987b4833c898102", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(seedTranslations, "00db175aea4f17421008b7a1ca8f3807609773b385", null);
}),
"[project]/apps/web/actions/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"001a68931728d2f39ffd97a8ffc30f15808c5ce6a2":"logoutApplicant","0045601a2845d399df52f5438441f3026b65823e7d":"getApplicantSession","0063b6f134750ea789b31463ec6205679ea2b64a02":"getAdminSession","408f6721a5f41acdab580aa8d87b0b8cf6bb42b51d":"registerApplicant","40c4e9510a3e7dde545afcc668fed7b1334f615ff5":"loginApplicant"},"",""] */ __turbopack_context__.s([
    "getAdminSession",
    ()=>getAdminSession,
    "getApplicantSession",
    ()=>getApplicantSession,
    "loginApplicant",
    ()=>loginApplicant,
    "logoutApplicant",
    ()=>logoutApplicant,
    "registerApplicant",
    ()=>registerApplicant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function registerApplicant(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const confirmPassword = formData.get("confirmPassword");
    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }
    // Check if user exists
    const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.findUnique({
        where: {
            email
        }
    });
    if (existingUser) {
        throw new Error("Email already registered");
    }
    const bcrypt = __turbopack_context__.r("[project]/node_modules/bcryptjs/umd/index.js [app-rsc] (ecmascript)");
    const passwordHash = await bcrypt.hash(password, 10);
    // Create User & Applicant Profile
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.create({
        data: {
            email,
            passwordHash,
            role: "APPLICANT",
            applicantProfile: {
                create: {
                    firstName,
                    lastName
                }
            }
        },
        include: {
            applicantProfile: true
        }
    });
    // Set Session Cookie (Simple implementation)
    // In production, use a secure session library or JWT
    const sessionData = JSON.stringify({
        userId: user.id,
        role: user.role,
        applicantId: user.applicantProfile?.id
    });
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).set("applicant_session", sessionData, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admissions/dashboard");
}
async function loginApplicant(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.findUnique({
        where: {
            email
        },
        include: {
            applicantProfile: true
        }
    });
    if (!user || user.role !== "APPLICANT") {
        throw new Error("Invalid credentials");
    }
    const bcrypt = __turbopack_context__.r("[project]/node_modules/bcryptjs/umd/index.js [app-rsc] (ecmascript)");
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        throw new Error("Invalid credentials");
    }
    // Set Session Cookie
    const sessionData = JSON.stringify({
        userId: user.id,
        role: user.role,
        applicantId: user.applicantProfile?.id
    });
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).set("applicant_session", sessionData, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admissions/dashboard");
}
async function logoutApplicant() {
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).delete("applicant_session");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admissions/login");
}
async function getApplicantSession() {
    const sessionCookie = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get("applicant_session");
    if (!sessionCookie) return null;
    try {
        return JSON.parse(sessionCookie.value);
    } catch (e) {
        return null;
    }
}
async function getAdminSession() {
    const sessionCookie = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get("admin_session");
    if (!sessionCookie) return null;
    try {
        return JSON.parse(sessionCookie.value);
    } catch (e) {
        return null;
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    registerApplicant,
    loginApplicant,
    logoutApplicant,
    getApplicantSession,
    getAdminSession
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerApplicant, "408f6721a5f41acdab580aa8d87b0b8cf6bb42b51d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loginApplicant, "40c4e9510a3e7dde545afcc668fed7b1334f615ff5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logoutApplicant, "001a68931728d2f39ffd97a8ffc30f15808c5ce6a2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getApplicantSession, "0045601a2845d399df52f5438441f3026b65823e7d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAdminSession, "0063b6f134750ea789b31463ec6205679ea2b64a02", null);
}),
"[project]/apps/web/actions/cms.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"405b27246867884c0b73a86bdab39a605270e3377b":"getBanners","40998d90dd23938d898b4afbd92f8f33a5f7f9d02c":"deleteBanner","40ba6f4f34cd660e9e791b3e24d41828aec16d2fd8":"createBanner","60b0f22b6ae7bfb4fa057480b4fee229d269560cd2":"toggleBannerStatus","60d4e05cf0dcdf286641805cd5f33814732cb9da68":"updateBanner"},"",""] */ __turbopack_context__.s([
    "createBanner",
    ()=>createBanner,
    "deleteBanner",
    ()=>deleteBanner,
    "getBanners",
    ()=>getBanners,
    "toggleBannerStatus",
    ()=>toggleBannerStatus,
    "updateBanner",
    ()=>updateBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getBanners(onlyActive = true) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].banner.findMany({
        where: onlyActive ? {
            isActive: true
        } : undefined,
        orderBy: {
            order: "asc"
        }
    });
}
async function createBanner(formData) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminSession"])();
    if (!session) {
        throw new Error("Unauthorized");
    }
    const title = formData.get("title");
    const description = formData.get("description");
    const imageUrl = formData.get("imageUrl");
    const linkUrl = formData.get("linkUrl");
    const isActive = formData.get("isActive") === "true";
    const order = parseInt(formData.get("order")) || 0;
    if (!title || !imageUrl) {
        throw new Error("Title and Image URL are required");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].banner.create({
        data: {
            title,
            description,
            imageUrl,
            linkUrl,
            isActive,
            order
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/cms/banners");
}
async function updateBanner(id, formData) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminSession"])();
    if (!session) {
        throw new Error("Unauthorized");
    }
    const title = formData.get("title");
    const description = formData.get("description");
    const imageUrl = formData.get("imageUrl");
    const linkUrl = formData.get("linkUrl");
    const isActive = formData.get("isActive") === "true";
    const order = parseInt(formData.get("order")) || 0;
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].banner.update({
        where: {
            id
        },
        data: {
            title,
            description,
            imageUrl,
            linkUrl,
            isActive,
            order
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/cms/banners");
}
async function deleteBanner(id) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminSession"])();
    if (!session) {
        throw new Error("Unauthorized");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].banner.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/cms/banners");
}
async function toggleBannerStatus(id, isActive) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminSession"])();
    if (!session) {
        throw new Error("Unauthorized");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].banner.update({
        where: {
            id
        },
        data: {
            isActive
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/cms/banners");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getBanners,
    createBanner,
    updateBanner,
    deleteBanner,
    toggleBannerStatus
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getBanners, "405b27246867884c0b73a86bdab39a605270e3377b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createBanner, "40ba6f4f34cd660e9e791b3e24d41828aec16d2fd8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateBanner, "60d4e05cf0dcdf286641805cd5f33814732cb9da68", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteBanner, "40998d90dd23938d898b4afbd92f8f33a5f7f9d02c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleBannerStatus, "60b0f22b6ae7bfb4fa057480b4fee229d269560cd2", null);
}),
"[project]/apps/web/actions/announcement.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"008d4df3c6f000143f298a9f372b8cec9adb0cfda2":"getAnnouncements","00e53a3ad6d7e47bf8b70d927604dc8f1e709f468b":"getPublicAnnouncements","405b268d17009232826c5342fd8350674345da3de4":"getPublishedAnnouncements","409eff34f597a2542dcc2b2378282a036313ee72d3":"createAnnouncement","40b32bcc96422f2406908bdd370cfa27fef3445c99":"deleteAnnouncement","6055c2714d62024acfa5520b5bc603ed5ee0ac9fe2":"togglePublishAnnouncement"},"",""] */ __turbopack_context__.s([
    "createAnnouncement",
    ()=>createAnnouncement,
    "deleteAnnouncement",
    ()=>deleteAnnouncement,
    "getAnnouncements",
    ()=>getAnnouncements,
    "getPublicAnnouncements",
    ()=>getPublicAnnouncements,
    "getPublishedAnnouncements",
    ()=>getPublishedAnnouncements,
    "togglePublishAnnouncement",
    ()=>togglePublishAnnouncement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/lib/node_modules/@prisma/client/default.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function createAnnouncement(formData) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminSession"])();
    if (!session) {
        throw new Error("Unauthorized");
    }
    const title = formData.get("title");
    const content = formData.get("content");
    const target = formData.get("target");
    const isPublished = formData.get("isPublished") === "true";
    if (!title || !content || !target) {
        throw new Error("Missing required fields");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].announcement.create({
        data: {
            title,
            content,
            target,
            isPublished,
            publishedAt: isPublished ? new Date() : null,
            authorId: session.userId
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/announcements");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/student/announcements");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/instructor/announcements");
}
async function getAnnouncements() {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminSession"])();
    if (!session) {
        throw new Error("Unauthorized");
    }
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].announcement.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            author: {
                select: {
                    email: true
                }
            }
        }
    });
}
async function getPublishedAnnouncements(role) {
    // Logic to filter announcements based on user role
    // ALL -> everyone
    // STUDENTS -> only students
    // INSTRUCTORS -> only instructors
    // STAFF -> only staff
    const whereClause = {
        isPublished: true,
        OR: [
            {
                target: "ALL"
            }
        ]
    };
    if (role === "STUDENT") {
        whereClause.OR.push({
            target: "STUDENTS"
        });
    } else if (role === "INSTRUCTOR") {
        whereClause.OR.push({
            target: "INSTRUCTORS"
        });
    } else if (role === "STAFF") {
        whereClause.OR.push({
            target: "STAFF"
        });
    }
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].announcement.findMany({
        where: whereClause,
        orderBy: {
            publishedAt: "desc"
        },
        include: {
            author: {
                select: {
                    email: true
                }
            }
        }
    });
}
async function getPublicAnnouncements() {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].announcement.findMany({
        where: {
            isPublished: true,
            target: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AnnouncementTarget"].ALL
        },
        orderBy: {
            publishedAt: "desc"
        },
        take: 4,
        include: {
            author: {
                select: {
                    email: true
                }
            }
        }
    });
}
async function deleteAnnouncement(id) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminSession"])();
    if (!session) {
        throw new Error("Unauthorized");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].announcement.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/announcements");
}
async function togglePublishAnnouncement(id, isPublished) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminSession"])();
    if (!session) {
        throw new Error("Unauthorized");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].announcement.update({
        where: {
            id
        },
        data: {
            isPublished,
            publishedAt: isPublished ? new Date() : null
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/announcements");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/student/announcements");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createAnnouncement,
    getAnnouncements,
    getPublishedAnnouncements,
    getPublicAnnouncements,
    deleteAnnouncement,
    togglePublishAnnouncement
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createAnnouncement, "409eff34f597a2542dcc2b2378282a036313ee72d3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAnnouncements, "008d4df3c6f000143f298a9f372b8cec9adb0cfda2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPublishedAnnouncements, "405b268d17009232826c5342fd8350674345da3de4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPublicAnnouncements, "00e53a3ad6d7e47bf8b70d927604dc8f1e709f468b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAnnouncement, "40b32bcc96422f2406908bdd370cfa27fef3445c99", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePublishAnnouncement, "6055c2714d62024acfa5520b5bc603ed5ee0ac9fe2", null);
}),
"[project]/apps/web/actions/ai.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"009b75996dec458e430b34dbc60c17107d9bdbbaef":"getAiSettings","00e36b4800950908828cd7fe8977f049b5df21ee63":"getKnowledgeBaseItems","401b61ba13616d6d4fcc534c594bb9ffec07e0e89d":"getConversationMessages","402e30de12c19e84eaba61f94a74e395001c6c300e":"createKnowledgeBaseItem","407a375bae0ddb9d5085e49b0ea95a24f7c98b24e4":"deleteKnowledgeBaseItem","407dc370f61bf92dab74559686f23b3ccc582ce99f":"updateAiSettings","605c38fc64737e0e6141b0ba9926b445619bcd4d52":"sendMessageToAi"},"",""] */ __turbopack_context__.s([
    "createKnowledgeBaseItem",
    ()=>createKnowledgeBaseItem,
    "deleteKnowledgeBaseItem",
    ()=>deleteKnowledgeBaseItem,
    "getAiSettings",
    ()=>getAiSettings,
    "getConversationMessages",
    ()=>getConversationMessages,
    "getKnowledgeBaseItems",
    ()=>getKnowledgeBaseItems,
    "sendMessageToAi",
    ()=>sendMessageToAi,
    "updateAiSettings",
    ()=>updateAiSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getAiSettings() {
    const settings = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].aiSettings.findFirst();
    if (!settings) {
        // Create default settings if not exists
        return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].aiSettings.create({
            data: {}
        });
    }
    return settings;
}
async function updateAiSettings(formData) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminSession"])();
    if (!session) {
        throw new Error("Unauthorized");
    }
    const botName = formData.get("botName");
    const welcomeMessage = formData.get("welcomeMessage");
    const personality = formData.get("personality");
    const isActive = formData.get("isActive") === "true";
    const settings = await getAiSettings();
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].aiSettings.update({
        where: {
            id: settings.id
        },
        data: {
            botName,
            welcomeMessage,
            personality,
            isActive
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/ai-agent");
}
async function getKnowledgeBaseItems() {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].aiKnowledgeBase.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
}
async function createKnowledgeBaseItem(formData) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminSession"])();
    if (!session) {
        throw new Error("Unauthorized");
    }
    const question = formData.get("question");
    const answer = formData.get("answer");
    const category = formData.get("category");
    if (!question || !answer) {
        throw new Error("Question and Answer are required");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].aiKnowledgeBase.create({
        data: {
            question,
            answer,
            category
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/ai-agent/knowledge");
}
async function deleteKnowledgeBaseItem(id) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminSession"])();
    if (!session) {
        throw new Error("Unauthorized");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].aiKnowledgeBase.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/ai-agent/knowledge");
}
async function sendMessageToAi(conversationId, message) {
    // 1. Find or create conversation
    let conversation;
    if (conversationId) {
        conversation = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].aiConversation.findUnique({
            where: {
                id: conversationId
            }
        });
    }
    if (!conversation) {
        conversation = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].aiConversation.create({
            data: {}
        });
    }
    // 2. Save User Message
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].aiMessage.create({
        data: {
            conversationId: conversation.id,
            role: "user",
            content: message
        }
    });
    // 3. Generate AI Response (Simple Keyword Matching)
    const knowledgeBase = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].aiKnowledgeBase.findMany({
        where: {
            isActive: true
        }
    });
    let responseContent = "I'm sorry, I don't have information about that yet. Please contact the university staff directly.";
    const lowerMessage = message.toLowerCase();
    // Very basic keyword matching
    for (const item of knowledgeBase){
        const keywords = item.question.toLowerCase().split(" ");
        const matchCount = keywords.filter((k)=>lowerMessage.includes(k)).length;
        // If more than 50% of keywords match (simple heuristic)
        if (matchCount / keywords.length > 0.5) {
            responseContent = item.answer;
            break;
        }
    }
    // Fallback for greetings
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
        const settings = await getAiSettings();
        responseContent = settings.welcomeMessage;
    }
    // 4. Save AI Response
    const aiMessage = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].aiMessage.create({
        data: {
            conversationId: conversation.id,
            role: "assistant",
            content: responseContent
        }
    });
    return {
        conversationId: conversation.id,
        message: aiMessage
    };
}
async function getConversationMessages(conversationId) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].aiMessage.findMany({
        where: {
            conversationId
        },
        orderBy: {
            createdAt: "asc"
        }
    });
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getAiSettings,
    updateAiSettings,
    getKnowledgeBaseItems,
    createKnowledgeBaseItem,
    deleteKnowledgeBaseItem,
    sendMessageToAi,
    getConversationMessages
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAiSettings, "009b75996dec458e430b34dbc60c17107d9bdbbaef", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateAiSettings, "407dc370f61bf92dab74559686f23b3ccc582ce99f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getKnowledgeBaseItems, "00e36b4800950908828cd7fe8977f049b5df21ee63", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createKnowledgeBaseItem, "402e30de12c19e84eaba61f94a74e395001c6c300e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteKnowledgeBaseItem, "407a375bae0ddb9d5085e49b0ea95a24f7c98b24e4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendMessageToAi, "605c38fc64737e0e6141b0ba9926b445619bcd4d52", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getConversationMessages, "401b61ba13616d6d4fcc534c594bb9ffec07e0e89d", null);
}),
"[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0042d76f240ee2a93513d3b83c0a780d6960763f9a":"getSystemSettings","40f12440e68e60cbf1b5d5103ded4c22a400b131f4":"updateSystemSettings"},"",""] */ __turbopack_context__.s([
    "getSystemSettings",
    ()=>getSystemSettings,
    "updateSystemSettings",
    ()=>updateSystemSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getSystemSettings() {
    let settings = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].systemSettings.findFirst();
    if (!settings) {
        // Create default settings if not exists
        settings = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].systemSettings.create({
            data: {}
        });
    } else {
        // Auto-update legacy defaults if they match the old defaults
        // This ensures the user sees the requested default values
        const isOldDefaultName = settings.universityName === "University Management System";
        const isOldDefaultNameTh = settings.universityNameTh === "ระบบจัดการมหาวิทยาลัย";
        if (isOldDefaultName || isOldDefaultNameTh) {
            settings = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].systemSettings.update({
                where: {
                    id: settings.id
                },
                data: {
                    universityName: isOldDefaultName ? "University MS" : settings.universityName,
                    universityNameTh: isOldDefaultNameTh ? "ระบบจัดการข้อมูลมหาวิทยาลัย" : settings.universityNameTh
                }
            });
        }
    }
    return settings;
}
async function updateSystemSettings(formData) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminSession"])();
    if (!session) {
        throw new Error("Unauthorized");
    }
    const universityName = formData.get("universityName");
    const universityNameTh = formData.get("universityNameTh");
    const logoUrl = formData.get("logoUrl");
    const primaryColor = formData.get("primaryColor");
    const secondaryColor = formData.get("secondaryColor");
    const backgroundColor = formData.get("backgroundColor");
    const studentIdFormat = formData.get("studentIdFormat");
    const defaultLanguage = formData.get("defaultLanguage");
    console.log("Updating settings:", {
        universityName,
        universityNameTh,
        logoUrl
    });
    const settings = await getSystemSettings();
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].systemSettings.update({
        where: {
            id: settings.id
        },
        data: {
            universityName,
            universityNameTh,
            logoUrl: logoUrl || null,
            primaryColor,
            secondaryColor,
            backgroundColor,
            studentIdFormat,
            defaultLanguage
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/settings");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getSystemSettings,
    updateSystemSettings
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSystemSettings, "0042d76f240ee2a93513d3b83c0a780d6960763f9a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateSystemSettings, "40f12440e68e60cbf1b5d5103ded4c22a400b131f4", null);
}),
"[project]/apps/web/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/apps/web/actions/cms.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/apps/web/actions/announcement.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/apps/web/actions/ai.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/apps/web/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$cms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/cms.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$announcement$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/announcement.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$ai$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/ai.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/apps/web/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/apps/web/actions/cms.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/apps/web/actions/announcement.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/apps/web/actions/ai.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/apps/web/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "001a68931728d2f39ffd97a8ffc30f15808c5ce6a2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logoutApplicant"],
    "0042d76f240ee2a93513d3b83c0a780d6960763f9a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSystemSettings"],
    "0045601a2845d399df52f5438441f3026b65823e7d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getApplicantSession"],
    "0048abae6b6c31cf4a1031d6650cdc9969ec5f17a2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslations"],
    "0063b6f134750ea789b31463ec6205679ea2b64a02",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminSession"],
    "008d4df3c6f000143f298a9f372b8cec9adb0cfda2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$announcement$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAnnouncements"],
    "009b75996dec458e430b34dbc60c17107d9bdbbaef",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$ai$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAiSettings"],
    "00e36b4800950908828cd7fe8977f049b5df21ee63",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$ai$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getKnowledgeBaseItems"],
    "00e53a3ad6d7e47bf8b70d927604dc8f1e709f468b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$announcement$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPublicAnnouncements"],
    "401b61ba13616d6d4fcc534c594bb9ffec07e0e89d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$ai$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getConversationMessages"],
    "402e30de12c19e84eaba61f94a74e395001c6c300e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$ai$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createKnowledgeBaseItem"],
    "405b268d17009232826c5342fd8350674345da3de4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$announcement$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPublishedAnnouncements"],
    "405b27246867884c0b73a86bdab39a605270e3377b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$cms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBanners"],
    "407a375bae0ddb9d5085e49b0ea95a24f7c98b24e4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$ai$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteKnowledgeBaseItem"],
    "407dc370f61bf92dab74559686f23b3ccc582ce99f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$ai$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateAiSettings"],
    "408f6721a5f41acdab580aa8d87b0b8cf6bb42b51d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerApplicant"],
    "40998d90dd23938d898b4afbd92f8f33a5f7f9d02c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$cms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteBanner"],
    "409eff34f597a2542dcc2b2378282a036313ee72d3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$announcement$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAnnouncement"],
    "40b32bcc96422f2406908bdd370cfa27fef3445c99",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$announcement$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteAnnouncement"],
    "40ba6f4f34cd660e9e791b3e24d41828aec16d2fd8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$cms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createBanner"],
    "40c4e9510a3e7dde545afcc668fed7b1334f615ff5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loginApplicant"],
    "6055c2714d62024acfa5520b5bc603ed5ee0ac9fe2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$announcement$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["togglePublishAnnouncement"],
    "605c38fc64737e0e6141b0ba9926b445619bcd4d52",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$ai$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendMessageToAi"],
    "60b0f22b6ae7bfb4fa057480b4fee229d269560cd2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$cms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleBannerStatus"],
    "60d4e05cf0dcdf286641805cd5f33814732cb9da68",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$cms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateBanner"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$cms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$announcement$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$ai$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/apps/web/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/apps/web/actions/cms.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/apps/web/actions/announcement.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/apps/web/actions/ai.ts [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/apps/web/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$cms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/cms.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$announcement$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/announcement.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$ai$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/ai.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__200962cc._.js.map