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
"[project]/apps/web/lib/csrf.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"005e462bb9c186e33423fb8a78b8d8a2096d9f0d12":"generateCsrfToken","008d06a450480b6f5d4a3bf0f48464f1d29d85f94e":"getCsrfToken","406cf13e30c57e6751e7a4ee63b66861a3d1c0687c":"verifyCsrfToken","40cb00c69f8f9a2a4a77d57aef5ca48816d5dcd8bf":"requireCsrfToken"},"",""] */ __turbopack_context__.s([
    "generateCsrfToken",
    ()=>generateCsrfToken,
    "getCsrfToken",
    ()=>getCsrfToken,
    "requireCsrfToken",
    ()=>requireCsrfToken,
    "verifyCsrfToken",
    ()=>verifyCsrfToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function generateCsrfToken() {
    const token = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32).toString("hex");
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).set({
        name: "csrf_token",
        value: token,
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/"
    });
    return token;
}
async function verifyCsrfToken(formToken) {
    const cookieToken = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get("csrf_token");
    if (!cookieToken || !formToken) {
        return false;
    }
    // Use timing-safe comparison to prevent timing attacks
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].timingSafeEqual(Buffer.from(cookieToken.value), Buffer.from(formToken));
}
async function getCsrfToken() {
    const token = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get("csrf_token");
    return token?.value || null;
}
async function requireCsrfToken(formData) {
    const formToken = formData.get("csrf_token");
    if (!formToken) {
        throw new Error("CSRF token is missing");
    }
    const isValid = await verifyCsrfToken(formToken);
    if (!isValid) {
        throw new Error("Invalid CSRF token. Please refresh the page and try again.");
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    generateCsrfToken,
    verifyCsrfToken,
    getCsrfToken,
    requireCsrfToken
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(generateCsrfToken, "005e462bb9c186e33423fb8a78b8d8a2096d9f0d12", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(verifyCsrfToken, "406cf13e30c57e6751e7a4ee63b66861a3d1c0687c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCsrfToken, "008d06a450480b6f5d4a3bf0f48464f1d29d85f94e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(requireCsrfToken, "40cb00c69f8f9a2a4a77d57aef5ca48816d5dcd8bf", null);
}),
"[project]/apps/web/lib/rate-limit.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00f8cfd2d8dab27e55c4304ab9f8bd91fe90e64d09":"cleanupRateLimitStore","400d95d3d51ce9eddc36deef88d0224a2d80c35f55":"getRemainingAttempts","405cc874d2c6a581edd7cbab1f6938732e1244c336":"checkRateLimit","40d68b9ea84bd423b7907c4fe97d548897d7c850c9":"resetRateLimit","40e6f9a14cab9975cb97e2075ad31521d4c0e1302f":"recordFailedAttempt"},"",""] */ __turbopack_context__.s([
    "checkRateLimit",
    ()=>checkRateLimit,
    "cleanupRateLimitStore",
    ()=>cleanupRateLimitStore,
    "getRemainingAttempts",
    ()=>getRemainingAttempts,
    "recordFailedAttempt",
    ()=>recordFailedAttempt,
    "resetRateLimit",
    ()=>resetRateLimit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2d$cleanup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/rate-limit-cleanup.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
// Re-export for backward compatibility
const loginAttempts = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2d$cleanup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loginAttemptsStore"];
/**
 * Get client identifier (IP address or session ID)
 */ async function getClientId() {
    // Try to get from cookies first (for consistent tracking)
    const clientCookie = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get("client_id");
    if (clientCookie) {
        return clientCookie.value;
    }
    // Generate new client ID
    const newClientId = crypto.randomUUID();
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).set({
        name: "client_id",
        value: newClientId,
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 365,
        path: "/"
    });
    return newClientId;
}
async function checkRateLimit(identifier) {
    const clientId = identifier || await getClientId();
    const now = Date.now();
    const attempt = loginAttempts.get(clientId);
    if (!attempt) {
        return null; // No previous attempts
    }
    // Check if currently blocked
    if (attempt.blockedUntil && now < attempt.blockedUntil) {
        const remainingMinutes = Math.ceil((attempt.blockedUntil - now) / 60000);
        return `Too many login attempts. Please try again in ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}.`;
    }
    // Check if window has expired
    if (now - attempt.firstAttempt > __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2d$cleanup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RATE_LIMIT_CONFIG"].windowMs) {
        // Reset the attempt counter
        loginAttempts.delete(clientId);
        return null;
    }
    // Check if max attempts reached
    if (attempt.count >= __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2d$cleanup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RATE_LIMIT_CONFIG"].maxAttempts) {
        // Block the client
        attempt.blockedUntil = now + __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2d$cleanup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RATE_LIMIT_CONFIG"].blockDurationMs;
        loginAttempts.set(clientId, attempt);
        const blockMinutes = Math.ceil(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2d$cleanup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RATE_LIMIT_CONFIG"].blockDurationMs / 60000);
        return `Too many login attempts. Your account has been temporarily blocked for ${blockMinutes} minutes.`;
    }
    return null; // Allowed
}
async function recordFailedAttempt(identifier) {
    const clientId = identifier || await getClientId();
    const now = Date.now();
    const attempt = loginAttempts.get(clientId);
    if (!attempt) {
        // First attempt
        loginAttempts.set(clientId, {
            count: 1,
            firstAttempt: now
        });
    } else if (now - attempt.firstAttempt > __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2d$cleanup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RATE_LIMIT_CONFIG"].windowMs) {
        // Window expired, reset
        loginAttempts.set(clientId, {
            count: 1,
            firstAttempt: now
        });
    } else {
        // Increment counter
        attempt.count++;
        loginAttempts.set(clientId, attempt);
    }
}
async function resetRateLimit(identifier) {
    const clientId = identifier || await getClientId();
    loginAttempts.delete(clientId);
}
async function getRemainingAttempts(identifier) {
    const clientId = identifier || await getClientId();
    const attempt = loginAttempts.get(clientId);
    if (!attempt) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2d$cleanup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RATE_LIMIT_CONFIG"].maxAttempts;
    }
    const now = Date.now();
    // Check if window expired
    if (now - attempt.firstAttempt > __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2d$cleanup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RATE_LIMIT_CONFIG"].windowMs) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2d$cleanup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RATE_LIMIT_CONFIG"].maxAttempts;
    }
    return Math.max(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2d$cleanup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RATE_LIMIT_CONFIG"].maxAttempts - attempt.count);
}
async function cleanupRateLimitStore() {
    const now = Date.now();
    const expiredTime = now - __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2d$cleanup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RATE_LIMIT_CONFIG"].windowMs - __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2d$cleanup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RATE_LIMIT_CONFIG"].blockDurationMs;
    const entries = Array.from(loginAttempts.entries());
    for (const [clientId, attempt] of entries){
        if (attempt.firstAttempt < expiredTime) {
            loginAttempts.delete(clientId);
        }
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    checkRateLimit,
    recordFailedAttempt,
    resetRateLimit,
    getRemainingAttempts,
    cleanupRateLimitStore
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkRateLimit, "405cc874d2c6a581edd7cbab1f6938732e1244c336", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(recordFailedAttempt, "40e6f9a14cab9975cb97e2075ad31521d4c0e1302f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resetRateLimit, "40d68b9ea84bd423b7907c4fe97d548897d7c850c9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRemainingAttempts, "400d95d3d51ce9eddc36deef88d0224a2d80c35f55", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(cleanupRateLimitStore, "00f8cfd2d8dab27e55c4304ab9f8bd91fe90e64d09", null);
}),
"[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"000f7a1cb658a9a6741f035a805f2983db08d56808":"logoutAdmin","4018d6eb528981b8dfb3c7613b8b4a78cd4d0ba148":"verify2FALogin","407c7a43c0bb5e74f357e8d455c17ee793ce819a43":"loginAdmin"},"",""] */ __turbopack_context__.s([
    "loginAdmin",
    ()=>loginAdmin,
    "logoutAdmin",
    ()=>logoutAdmin,
    "verify2FALogin",
    ()=>verify2FALogin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$csrf$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/csrf.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/rate-limit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
async function loginAdmin(formData) {
    // CSRF Protection
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$csrf$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireCsrfToken"])(formData);
    // Rate Limiting Check
    const rateLimitError = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkRateLimit"])();
    if (rateLimitError) {
        throw new Error(rateLimitError);
    }
    const email = formData.get("email")?.trim();
    const password = formData.get("password");
    if (!email || !password) {
        throw new Error("Email and password are required");
    }
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            email: true,
            passwordHash: true,
            role: true,
            twoFactorEnabled: true,
            twoFactorSecret: true,
            personnelProfile: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
    if (!user || user.role !== "ADMIN" || !user.personnelProfile) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["recordFailedAttempt"])(); // Record failed attempt
        throw new Error("Invalid credentials");
    }
    const passwordMatch = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].compare(password, user.passwordHash);
    if (!passwordMatch) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["recordFailedAttempt"])(); // Record failed attempt
        throw new Error("Invalid credentials");
    }
    // Check if user has 2FA enabled
    if (user.twoFactorEnabled && user.twoFactorSecret) {
        // Store temporary session for 2FA verification
        (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).set({
            name: "admin_2fa_pending",
            value: JSON.stringify({
                userId: user.id,
                role: user.role,
                personnelId: user.personnelProfile.id
            }),
            httpOnly: true,
            path: "/",
            maxAge: 5 * 60
        });
        // Redirect to 2FA verification page
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin/login/verify");
    }
    // No 2FA - proceed with normal login
    const session = {
        userId: user.id,
        role: user.role,
        personnelId: user.personnelProfile.id
    };
    // Reset rate limit on successful login
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resetRateLimit"])();
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).set({
        name: "admin_session",
        value: JSON.stringify(session),
        httpOnly: true,
        path: "/",
        // secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin");
}
async function logoutAdmin() {
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).delete("admin_session");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin/login");
}
async function verify2FALogin(code) {
    // Get pending session
    const pendingCookie = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get("admin_2fa_pending");
    if (!pendingCookie) {
        throw new Error("No pending 2FA verification. Please login again.");
    }
    let pendingSession;
    try {
        pendingSession = JSON.parse(pendingCookie.value);
    } catch (e) {
        throw new Error("Invalid session data");
    }
    // Import verify function
    const { verify2FACode } = await __turbopack_context__.A("[project]/apps/web/lib/two-factor.ts [app-rsc] (ecmascript, async loader)");
    // Verify the 2FA code
    const isValid = await verify2FACode(pendingSession.userId, code);
    if (!isValid) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["recordFailedAttempt"])();
        throw new Error("Invalid verification code");
    }
    // Delete pending session
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).delete("admin_2fa_pending");
    // Reset rate limit
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$rate$2d$limit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resetRateLimit"])();
    // Create actual session
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).set({
        name: "admin_session",
        value: JSON.stringify(pendingSession),
        httpOnly: true,
        path: "/",
        // secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    loginAdmin,
    logoutAdmin,
    verify2FALogin
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loginAdmin, "407c7a43c0bb5e74f357e8d455c17ee793ce819a43", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logoutAdmin, "000f7a1cb658a9a6741f035a805f2983db08d56808", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(verify2FALogin, "4018d6eb528981b8dfb3c7613b8b4a78cd4d0ba148", null);
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
"[project]/apps/web/actions/admission.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"005ee1df38c018a0bcfcd52b3fff328ed035ad9f6b":"getApplications","00688f9f6b750f686ed5ec397f91f57f4b20842d7e":"getAdmissionsStats","401772354165c616a2bdcf6663a014db3cfc206024":"convertApplicantToStudent","406f469fabc7efea0e037b672f37811bbdb12d0b9e":"submitApplication","409859d010854a43ecd970037a89b9149b8e8d35af":"createMockApplication","40d83b8375713af3fc38ee83e57438202242f58133":"getApplicationById","40efbcece22a89dee9a9e39d2ac963c44bfe307bf8":"deleteApplication","606cca4f5c178651ae8ec0132532ae26100b99abb6":"updateApplicationStatus"},"",""] */ __turbopack_context__.s([
    "convertApplicantToStudent",
    ()=>convertApplicantToStudent,
    "createMockApplication",
    ()=>createMockApplication,
    "deleteApplication",
    ()=>deleteApplication,
    "getAdmissionsStats",
    ()=>getAdmissionsStats,
    "getApplicationById",
    ()=>getApplicationById,
    "getApplications",
    ()=>getApplications,
    "submitApplication",
    ()=>submitApplication,
    "updateApplicationStatus",
    ()=>updateApplicationStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getApplications() {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.findMany({
        include: {
            applicant: true,
            program: {
                include: {
                    faculty: true
                }
            }
        },
        orderBy: {
            submittedAt: "desc"
        }
    });
}
async function getApplicationById(id) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.findUnique({
        where: {
            id
        },
        include: {
            applicant: {
                include: {
                    user: true
                }
            },
            program: {
                include: {
                    faculty: true,
                    department: true
                }
            },
            documents: true,
            interview: {
                include: {
                    slot: {
                        include: {
                            interviewers: {
                                include: {
                                    interviewer: true
                                }
                            },
                            program: true
                        }
                    }
                }
            }
        }
    });
}
async function updateApplicationStatus(id, status) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.update({
        where: {
            id
        },
        data: {
            status
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/admissions");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/admissions/${id}`);
}
async function createMockApplication(data) {
    const bcrypt = __turbopack_context__.r("[project]/node_modules/bcryptjs/umd/index.js [app-rsc] (ecmascript)");
    const passwordHash = await bcrypt.hash("password123", 10);
    // 1. Create User
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.create({
        data: {
            email: data.email,
            passwordHash,
            role: "APPLICANT"
        }
    });
    // 2. Create Applicant Profile
    const applicant = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].applicant.create({
        data: {
            userId: user.id,
            firstName: data.firstName,
            lastName: data.lastName,
            citizenId: Math.floor(Math.random() * 10000000000000).toString().padStart(13, "0"),
            phone: "0812345678",
            birthDate: new Date("2005-01-01"),
            address: "123 Mock Street, Bangkok, Thailand 10100"
        }
    });
    // 3. Create Application
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.create({
        data: {
            applicantId: applicant.id,
            programId: data.programId,
            status: "SUBMITTED",
            submittedAt: new Date()
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/admissions");
}
async function submitApplication(data) {
    // Create application (no need to update applicant data as it already exists from registration)
    const application = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.create({
        data: {
            applicantId: data.applicantId,
            programId: data.programId,
            status: "SUBMITTED",
            submittedAt: new Date()
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admissions/dashboard");
    return application.id;
}
async function convertApplicantToStudent(applicationId) {
    // 1. Get application with applicant info
    const application = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.findUnique({
        where: {
            id: applicationId
        },
        include: {
            applicant: {
                include: {
                    user: true
                }
            },
            program: true
        }
    });
    if (!application) {
        throw new Error("Application not found");
    }
    if (application.status !== "ACCEPTED") {
        throw new Error("Only accepted applications can be converted to students");
    }
    // 2. Check if already converted
    const existingStudent = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].student.findUnique({
        where: {
            userId: application.applicant.userId
        }
    });
    if (existingStudent) {
        throw new Error("This applicant has already been converted to a student");
    }
    // 3. Generate Student ID (Format: YYXXXXXX where YY = year, XXXXXX = sequential)
    const currentYear = new Date().getFullYear();
    const yearPrefix = currentYear.toString().slice(-2); // Last 2 digits of year
    // Find the latest student ID for this year
    const latestStudent = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].student.findFirst({
        where: {
            studentId: {
                startsWith: yearPrefix
            }
        },
        orderBy: {
            studentId: "desc"
        }
    });
    let newStudentId;
    if (latestStudent) {
        // Increment the last student ID
        const lastNumber = parseInt(latestStudent.studentId.slice(2));
        const nextNumber = lastNumber + 1;
        newStudentId = `${yearPrefix}${nextNumber.toString().padStart(6, "0")}`;
    } else {
        // First student of the year
        newStudentId = `${yearPrefix}010001`;
    }
    // 4. Create Student record with all applicant data
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].student.create({
        data: {
            studentId: newStudentId,
            userId: application.applicant.userId,
            // Personal Information
            title: application.applicant.title,
            firstName: application.applicant.firstName,
            lastName: application.applicant.lastName,
            firstNameTh: application.applicant.firstNameTh,
            lastNameTh: application.applicant.lastNameTh,
            nationality: application.applicant.nationality,
            citizenId: application.applicant.citizenId,
            birthDate: application.applicant.birthDate || new Date(),
            gender: application.applicant.gender,
            phone: application.applicant.phone,
            profileImageUrl: application.applicant.profileImageUrl,
            // Address Information
            address: application.applicant.address,
            subDistrict: application.applicant.subDistrict,
            district: application.applicant.district,
            province: application.applicant.province,
            zipCode: application.applicant.zipCode,
            // Academic Information
            programId: application.programId,
            status: "STUDYING",
            gpax: 0.0
        }
    });
    // 5. Update User role to STUDENT
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.update({
        where: {
            id: application.applicant.userId
        },
        data: {
            role: "STUDENT"
        }
    });
    // 6. Update Application status to ENROLLED
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.update({
        where: {
            id: applicationId
        },
        data: {
            status: "ENROLLED"
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/admissions/${applicationId}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/admissions");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/students");
    return newStudentId;
}
async function deleteApplication(id) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/admissions");
}
async function getAdmissionsStats() {
    const [totalApplications, interviewSlots, pendingApplications, acceptedApplications] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.count(),
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].interviewSlot.count(),
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.count({
            where: {
                status: "SUBMITTED"
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.count({
            where: {
                status: "ACCEPTED"
            }
        })
    ]);
    return {
        totalApplications,
        interviewSlots,
        pendingApplications,
        acceptedApplications
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getApplications,
    getApplicationById,
    updateApplicationStatus,
    createMockApplication,
    submitApplication,
    convertApplicantToStudent,
    deleteApplication,
    getAdmissionsStats
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getApplications, "005ee1df38c018a0bcfcd52b3fff328ed035ad9f6b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getApplicationById, "40d83b8375713af3fc38ee83e57438202242f58133", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateApplicationStatus, "606cca4f5c178651ae8ec0132532ae26100b99abb6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createMockApplication, "409859d010854a43ecd970037a89b9149b8e8d35af", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitApplication, "406f469fabc7efea0e037b672f37811bbdb12d0b9e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(convertApplicantToStudent, "401772354165c616a2bdcf6663a014db3cfc206024", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteApplication, "40efbcece22a89dee9a9e39d2ac963c44bfe307bf8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAdmissionsStats, "00688f9f6b750f686ed5ec397f91f57f4b20842d7e", null);
}),
"[project]/apps/web/app/admin/admissions/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"004bcfab11d5dbc908d335149a53d0b658309713f6":"$$RSC_SERVER_ACTION_0"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_ACTION_0",
    ()=>$$RSC_SERVER_ACTION_0,
    "default",
    ()=>AdmissionsDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/admission.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-rsc] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-rsc] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-rsc] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-rsc] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-rsc] (ecmascript) <export default as GraduationCap>");
;
;
;
;
;
const $$RSC_SERVER_ACTION_0 = async function action() {
    const { seedAdmissionsData } = await __turbopack_context__.A("[project]/apps/web/actions/seed-admissions.ts [app-rsc] (ecmascript, async loader)");
    await seedAdmissionsData();
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_ACTION_0, "004bcfab11d5dbc908d335149a53d0b658309713f6", null);
async function AdmissionsDashboard() {
    const stats = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdmissionsStats"])();
    const statCards = [
        {
            title: "Applications",
            count: stats.totalApplications,
            href: "/admin/admissions/applications",
            color: "text-blue-600",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
            description: "Total applications received"
        },
        {
            title: "Interviews",
            count: stats.interviewSlots,
            href: "/admin/admissions/interviews",
            color: "text-purple-600",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"],
            description: "Scheduled interview slots"
        },
        {
            title: "Pending Review",
            count: stats.pendingApplications,
            href: "/admin/admissions/applications?status=SUBMITTED",
            color: "text-orange-600",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
            description: "Applications awaiting review"
        },
        {
            title: "Accepted",
            count: stats.acceptedApplications,
            href: "/admin/admissions/applications?status=ACCEPTED",
            color: "text-green-600",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
            description: "Accepted students"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto py-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "mb-8 text-3xl font-bold",
                children: "Admissions Dashboard"
            }, void 0, false, {
                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
                children: statCards.map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: stat.href,
                        className: "rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-gray-600",
                                                children: stat.title
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                                lineNumber: 56,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-3xl font-bold text-gray-900",
                                                children: stat.count
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                                lineNumber: 57,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                        lineNumber: 55,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `p-3 ${stat.color} bg-opacity-10 rounded-full`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(stat.icon, {
                                            className: "h-6 w-6"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                            lineNumber: 60,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                        lineNumber: 59,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                lineNumber: 54,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-xs text-gray-500",
                                children: stat.description
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                lineNumber: 63,
                                columnNumber: 25
                            }, this)
                        ]
                    }, stat.title, true, {
                        fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                        lineNumber: 49,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                lineNumber: 47,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 rounded-lg border border-gray-200 bg-white p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-4 text-xl font-semibold",
                        children: "Quick Actions"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 md:grid-cols-2 lg:grid-cols-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/admissions/applications",
                                className: "flex items-center gap-3 rounded border border-gray-300 p-4 hover:bg-gray-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                        className: "h-5 w-5 text-blue-600"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                        lineNumber: 75,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-medium",
                                                children: "Manage Applications"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                                lineNumber: 77,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600",
                                                children: "Review and process applications"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                                lineNumber: 78,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                        lineNumber: 76,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                lineNumber: 71,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/admissions/interviews",
                                className: "flex items-center gap-3 rounded border border-gray-300 p-4 hover:bg-gray-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        className: "h-5 w-5 text-purple-600"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                        lineNumber: 85,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-medium",
                                                children: "Interview Schedule"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                                lineNumber: 87,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600",
                                                children: "Manage interview slots and assignments"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                                lineNumber: 88,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                lineNumber: 81,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/students",
                                className: "flex items-center gap-3 rounded border border-gray-300 p-4 hover:bg-gray-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                        className: "h-5 w-5 text-green-600"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                        lineNumber: 95,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-medium",
                                                children: "Student Management"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                                lineNumber: 97,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600",
                                                children: "View enrolled students"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                                lineNumber: 98,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                        lineNumber: 96,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                                lineNumber: 91,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                        lineNumber: 70,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                lineNumber: 68,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 rounded-lg border border-gray-200 bg-white p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-4 text-xl font-semibold",
                        children: "Development Tools"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                        lineNumber: 106,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        action: $$RSC_SERVER_ACTION_0,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700",
                            children: "🌱 Seed Mock Admissions Data"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                            lineNumber: 114,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                        lineNumber: 107,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
                lineNumber: 105,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/app/admin/admissions/page.tsx",
        lineNumber: 44,
        columnNumber: 9
    }, this);
}
}),
"[project]/apps/web/actions/seed-admissions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0030fbce1ba544997950360b7fed98c79ec8c6be75":"seedAdmissionsData"},"",""] */ __turbopack_context__.s([
    "seedAdmissionsData",
    ()=>seedAdmissionsData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function seedAdmissionsData() {
    console.log("🌱 Seeding Admissions Data...");
    try {
        // 1. Get existing programs and personnel (potential interviewers)
        let programs = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].program.findMany();
        const interviewers = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].personnel.findMany();
        if (programs.length === 0) {
            console.log("⚠️ No programs found. Creating mock program structure...");
            // Create Mock Faculty
            const faculty = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].faculty.create({
                data: {
                    code: "MOCK-" + Math.floor(Math.random() * 1000),
                    nameTh: "คณะตัวอย่าง",
                    nameEn: "Mock Faculty"
                }
            });
            // Create Mock Department
            const department = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].department.create({
                data: {
                    nameTh: "ภาควิชาตัวอย่าง",
                    nameEn: "Mock Department",
                    facultyId: faculty.id
                }
            });
            // Create Mock Program
            const program = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].program.create({
                data: {
                    nameTh: "หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์ (ตัวอย่าง)",
                    nameEn: "Bachelor of Science in Computer Science (Mock)",
                    degreeLevel: "BACHELOR",
                    facultyId: faculty.id,
                    departmentId: department.id,
                    isAcceptingApplications: true
                }
            });
            programs = [
                program
            ];
            console.log("✅ Created mock program:", program.nameEn);
        }
        if (interviewers.length === 0) {
            console.warn("No personnel found. Skipping interviewer assignment.");
        }
        // 2. Create Mock Applicants & Applications
        const statuses = [
            "SUBMITTED",
            "DOCUMENT_VERIFIED",
            "INTERVIEW_READY",
            "ACCEPTED",
            "REJECTED"
        ];
        for(let i = 0; i < 20; i++){
            const randomProgram = programs[Math.floor(Math.random() * programs.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const randomId = Math.floor(Math.random() * 100000);
            // Create User
            const user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.create({
                data: {
                    email: `applicant${randomId}@example.com`,
                    passwordHash: "mock_hash",
                    role: "APPLICANT"
                }
            });
            // Create Applicant
            const applicant = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].applicant.create({
                data: {
                    userId: user.id,
                    firstName: `Applicant`,
                    lastName: `${randomId}`,
                    firstNameTh: `ผู้สมัคร`,
                    lastNameTh: `${randomId}`,
                    citizenId: Math.floor(Math.random() * 10000000000000).toString().padStart(13, "0"),
                    phone: `08${Math.floor(Math.random() * 100000000)}`,
                    birthDate: new Date("2000-01-01")
                }
            });
            // Create Application
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.create({
                data: {
                    applicantId: applicant.id,
                    programId: randomProgram.id,
                    status: status,
                    submittedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000))
                }
            });
            console.log(`Created application for ${applicant.firstName} (${status})`);
        }
        // 3. Create Interview Slots & Bookings
        const today = new Date();
        const locations = [
            "Building A, Room 101",
            "Building B, Room 202",
            "Online (Zoom)",
            "Conference Room 3"
        ];
        // Fetch created applications to link them
        const createdApplications = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.findMany({
            where: {
                status: {
                    in: [
                        "INTERVIEW_READY",
                        "ACCEPTED",
                        "REJECTED"
                    ]
                }
            }
        });
        let appIndex = 0;
        for(let i = 0; i < 15; i++){
            const randomProgram = Math.random() > 0.3 ? programs[Math.floor(Math.random() * programs.length)] : null;
            const randomInterviewer = interviewers.length > 0 ? interviewers[Math.floor(Math.random() * interviewers.length)] : null;
            // Random date: some in past (for completed interviews), some in future
            const isPast = Math.random() > 0.5;
            const slotDate = new Date(today);
            slotDate.setDate(today.getDate() + (isPast ? -Math.floor(Math.random() * 5) : Math.floor(Math.random() * 14)));
            slotDate.setHours(9 + Math.floor(Math.random() * 7), 0, 0, 0);
            const endTime = new Date(slotDate);
            endTime.setHours(slotDate.getHours() + 1);
            const slot = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].interviewSlot.create({
                data: {
                    startTime: slotDate,
                    endTime: endTime,
                    location: locations[Math.floor(Math.random() * locations.length)],
                    programId: randomProgram?.id,
                    coordinatorName: "Jane Doe",
                    coordinatorPhone: "02-123-4567",
                    description: "Please bring your ID card and transcript.",
                    ...randomInterviewer && {
                        interviewers: {
                            create: {
                                interviewerId: randomInterviewer.id
                            }
                        }
                    }
                }
            });
            // Book this slot if we have available apps and it matches program (or generic slot)
            if (appIndex < createdApplications.length) {
                const app = createdApplications[appIndex];
                // Simple matching logic: if slot is generic OR slot program matches app program
                if (!slot.programId || slot.programId === app.programId) {
                    // Create Interview Result (Booking)
                    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].interviewResult.create({
                        data: {
                            applicationId: app.id,
                            slotId: slot.id,
                            // If past date, assume checked in
                            checkedInAt: isPast ? slotDate : null,
                            // If past date, maybe add score
                            ...isPast && {
                                score: Math.floor(Math.random() * 50) + 50,
                                notes: "Candidate showed strong potential.",
                                status: Math.random() > 0.3 ? "PASSED" : "FAILED"
                            }
                        }
                    });
                    // Update App Status if passed/failed
                    if (isPast) {
                        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.update({
                            where: {
                                id: app.id
                            },
                            data: {
                                status: result.status === "PASSED" ? "ACCEPTED" : "REJECTED"
                            }
                        });
                    }
                    console.log(`Booked interview for App ${app.id} at ${slotDate.toLocaleString()}`);
                    appIndex++;
                }
            }
            console.log(`Created interview slot at ${slotDate.toLocaleString()}`);
        }
        console.log("✅ Admissions data seeding completed!");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/admissions");
        return {
            success: true,
            message: "Mock data created successfully"
        };
    } catch (error) {
        console.error("Failed to seed data:", error);
        return {
            success: false,
            error: "Failed to seed data"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    seedAdmissionsData
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(seedAdmissionsData, "0030fbce1ba544997950360b7fed98c79ec8c6be75", null);
}),
"[project]/apps/web/.next-internal/server/app/admin/admissions/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/apps/web/app/admin/admissions/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/apps/web/actions/admission.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/apps/web/actions/seed-admissions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$admin$2f$admissions$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/app/admin/admissions/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/admission.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$seed$2d$admissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/seed-admissions.ts [app-rsc] (ecmascript)");
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
"[project]/apps/web/.next-internal/server/app/admin/admissions/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/apps/web/app/admin/admissions/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/apps/web/actions/admission.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/apps/web/actions/seed-admissions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "000f7a1cb658a9a6741f035a805f2983db08d56808",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logoutAdmin"],
    "0030fbce1ba544997950360b7fed98c79ec8c6be75",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$seed$2d$admissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["seedAdmissionsData"],
    "0042d76f240ee2a93513d3b83c0a780d6960763f9a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSystemSettings"],
    "0048abae6b6c31cf4a1031d6650cdc9969ec5f17a2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslations"],
    "004bcfab11d5dbc908d335149a53d0b658309713f6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$admin$2f$admissions$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_ACTION_0"],
    "005ee1df38c018a0bcfcd52b3fff328ed035ad9f6b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getApplications"],
    "00688f9f6b750f686ed5ec397f91f57f4b20842d7e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdmissionsStats"],
    "401772354165c616a2bdcf6663a014db3cfc206024",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertApplicantToStudent"],
    "406f469fabc7efea0e037b672f37811bbdb12d0b9e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["submitApplication"],
    "409859d010854a43ecd970037a89b9149b8e8d35af",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createMockApplication"],
    "40d83b8375713af3fc38ee83e57438202242f58133",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getApplicationById"],
    "40efbcece22a89dee9a9e39d2ac963c44bfe307bf8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteApplication"],
    "606cca4f5c178651ae8ec0132532ae26100b99abb6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateApplicationStatus"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$admissions$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$app$2f$admin$2f$admissions$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$seed$2d$admissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/apps/web/.next-internal/server/app/admin/admissions/page/actions.js { ACTIONS_MODULE0 => "[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/apps/web/app/admin/admissions/page.tsx [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/apps/web/actions/admission.ts [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/apps/web/actions/seed-admissions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$admin$2f$admissions$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/app/admin/admissions/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/admission.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$seed$2d$admissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/seed-admissions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c112b3ad._.js.map