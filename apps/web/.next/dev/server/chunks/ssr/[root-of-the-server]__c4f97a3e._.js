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
"[project]/apps/web/actions/academic.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00a1fd4383e6c7b044e32761a433241d44a0cc2799":"getAcademicTerms","405df935337fa3c97bb2b1d0e0c65bc101e9c11d5b":"deleteClassSection","40b0fa9e872708e5bb0a074f1dec6e32a85267a341":"createClassSection","40d04cfb7840d65ed5621248993e49eb17e7661a40":"getClassSections","40ff16435c2a7e03d3da33034d775e1c2930a2241b":"createAcademicTerm"},"",""] */ __turbopack_context__.s([
    "createAcademicTerm",
    ()=>createAcademicTerm,
    "createClassSection",
    ()=>createClassSection,
    "deleteClassSection",
    ()=>deleteClassSection,
    "getAcademicTerms",
    ()=>getAcademicTerms,
    "getClassSections",
    ()=>getClassSections
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getAcademicTerms() {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].academicTerm.findMany({
        orderBy: [
            {
                year: "desc"
            },
            {
                semester: "desc"
            }
        ]
    });
}
async function createAcademicTerm(formData) {
    const year = parseInt(formData.get("year"));
    const semester = parseInt(formData.get("semester"));
    const startDate = new Date(formData.get("startDate"));
    const endDate = new Date(formData.get("endDate"));
    const isCurrent = formData.get("isCurrent") === "true";
    // If setting as current, unset all others
    if (isCurrent) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].academicTerm.updateMany({
            where: {
                isCurrent: true
            },
            data: {
                isCurrent: false
            }
        });
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].academicTerm.create({
        data: {
            year,
            semester,
            startDate,
            endDate,
            isCurrent
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/academic");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/academic/terms");
}
async function getClassSections(termId) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSection.findMany({
        where: termId ? {
            termId
        } : undefined,
        include: {
            course: true,
            term: true,
            instructor: true,
            schedules: true,
            _count: {
                select: {
                    enrollments: true
                }
            }
        },
        orderBy: {
            sectionNumber: "asc"
        }
    });
}
async function createClassSection(formData) {
    const courseId = formData.get("courseId");
    const termId = formData.get("termId");
    const sectionNumber = formData.get("sectionNumber");
    const capacity = parseInt(formData.get("capacity"));
    const instructorId = formData.get("instructorId");
    const day = formData.get("day");
    const startTime = formData.get("startTime");
    const endTime = formData.get("endTime");
    const room = formData.get("room");
    const section = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSection.create({
        data: {
            courseId,
            termId,
            sectionNumber,
            capacity,
            instructorId: instructorId || undefined,
            schedules: {
                create: [
                    {
                        day,
                        startTime,
                        endTime,
                        room
                    }
                ]
            }
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/academic/sections");
    return section.id;
}
async function deleteClassSection(id) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSection.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/academic/sections");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getAcademicTerms,
    createAcademicTerm,
    getClassSections,
    createClassSection,
    deleteClassSection
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAcademicTerms, "00a1fd4383e6c7b044e32761a433241d44a0cc2799", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createAcademicTerm, "40ff16435c2a7e03d3da33034d775e1c2930a2241b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getClassSections, "40d04cfb7840d65ed5621248993e49eb17e7661a40", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createClassSection, "40b0fa9e872708e5bb0a074f1dec6e32a85267a341", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteClassSection, "405df935337fa3c97bb2b1d0e0c65bc101e9c11d5b", null);
}),
"[project]/apps/web/actions/schedule-rooms.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00f1477430444d03e28f78f2ecff887a02b1315377":"getRoomStats","400773fb3e715c534af1f1839c720a8d18b96f9799":"getRoomById","40526fbe49fbd5c36f5c9380bc7f2fa6cc01d3bef6":"getRooms","4072e8197f0f37b44486735a334be462cf6b5bcf24":"createRoom","407c3ba9d2d12beaf96c32d7714d60209ac8c91a8c":"deleteRoom","60dd67f2f191f31405ff07ca4ef5384bfade7e4b75":"updateRoom","7caa8f330e9518e051d2e1a00ea73423d893a9bdb7":"checkRoomAvailability"},"",""] */ __turbopack_context__.s([
    "checkRoomAvailability",
    ()=>checkRoomAvailability,
    "createRoom",
    ()=>createRoom,
    "deleteRoom",
    ()=>deleteRoom,
    "getRoomById",
    ()=>getRoomById,
    "getRoomStats",
    ()=>getRoomStats,
    "getRooms",
    ()=>getRooms,
    "updateRoom",
    ()=>updateRoom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getRooms(filters) {
    try {
        const where = {};
        if (filters?.search) {
            where.OR = [
                {
                    code: {
                        contains: filters.search
                    }
                },
                {
                    name: {
                        contains: filters.search
                    }
                },
                {
                    building: {
                        contains: filters.search
                    }
                }
            ];
        }
        if (filters?.roomType && filters.roomType !== "ALL") {
            where.roomType = filters.roomType;
        }
        if (filters?.building) {
            where.building = filters.building;
        }
        if (filters?.isAvailable !== undefined) {
            where.isAvailable = filters.isAvailable;
        }
        const rooms = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].room.findMany({
            where,
            include: {
                schedules: {
                    select: {
                        id: true,
                        day: true,
                        startTime: true,
                        endTime: true
                    }
                },
                examSlots: {
                    select: {
                        id: true
                    }
                }
            },
            orderBy: [
                {
                    building: "asc"
                },
                {
                    floor: "asc"
                },
                {
                    code: "asc"
                }
            ]
        });
        return {
            success: true,
            rooms
        };
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return {
            success: false,
            error: "Failed to fetch rooms"
        };
    }
}
async function getRoomStats() {
    try {
        const [total, available, inUse] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].room.count({
                where: {
                    isActive: true
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].room.count({
                where: {
                    isActive: true,
                    isAvailable: true
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].room.count({
                where: {
                    isActive: true,
                    isAvailable: false
                }
            })
        ]);
        // Count by room type
        const roomsByType = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].room.groupBy({
            by: [
                "roomType"
            ],
            where: {
                isActive: true
            },
            _count: true
        });
        const typeBreakdown = {};
        roomsByType.forEach((item)=>{
            typeBreakdown[item.roomType] = item._count;
        });
        // Calculate utilization (rooms with schedules / total rooms)
        const roomsWithSchedules = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].room.count({
            where: {
                isActive: true,
                schedules: {
                    some: {}
                }
            }
        });
        const utilization = total > 0 ? Math.round(roomsWithSchedules / total * 100) : 0;
        return {
            success: true,
            stats: {
                total,
                available,
                inUse,
                utilization,
                byType: typeBreakdown
            }
        };
    } catch (error) {
        console.error("Error fetching room stats:", error);
        return {
            success: false,
            error: "Failed to fetch statistics"
        };
    }
}
async function getRoomById(id) {
    try {
        const room = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].room.findUnique({
            where: {
                id
            },
            include: {
                schedules: {
                    include: {
                        section: {
                            include: {
                                course: {
                                    select: {
                                        code: true,
                                        nameEn: true
                                    }
                                },
                                instructor: {
                                    select: {
                                        firstName: true,
                                        lastName: true
                                    }
                                }
                            }
                        }
                    }
                },
                examSlots: {
                    include: {
                        examSchedule: {
                            include: {
                                course: {
                                    select: {
                                        code: true,
                                        nameEn: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        if (!room) {
            return {
                success: false,
                error: "Room not found"
            };
        }
        return {
            success: true,
            room
        };
    } catch (error) {
        console.error("Error fetching room:", error);
        return {
            success: false,
            error: "Failed to fetch room"
        };
    }
}
async function createRoom(data) {
    try {
        const room = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].room.create({
            data: {
                code: data.code,
                name: data.name,
                building: data.building,
                floor: data.floor,
                capacity: data.capacity,
                roomType: data.roomType,
                facilities: data.facilities,
                isActive: true,
                isAvailable: true
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/schedule/rooms");
        return {
            success: true,
            room
        };
    } catch (error) {
        console.error("Error creating room:", error);
        return {
            success: false,
            error: "Failed to create room"
        };
    }
}
async function updateRoom(id, data) {
    try {
        const room = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].room.update({
            where: {
                id
            },
            data: {
                ...data.code && {
                    code: data.code
                },
                ...data.name && {
                    name: data.name
                },
                ...data.building && {
                    building: data.building
                },
                ...data.floor !== undefined && {
                    floor: data.floor
                },
                ...data.capacity !== undefined && {
                    capacity: data.capacity
                },
                ...data.roomType && {
                    roomType: data.roomType
                },
                ...data.facilities !== undefined && {
                    facilities: data.facilities
                },
                ...data.isAvailable !== undefined && {
                    isAvailable: data.isAvailable
                }
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/schedule/rooms");
        return {
            success: true,
            room
        };
    } catch (error) {
        console.error("Error updating room:", error);
        return {
            success: false,
            error: "Failed to update room"
        };
    }
}
async function deleteRoom(id) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].room.delete({
            where: {
                id
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/schedule/rooms");
        return {
            success: true
        };
    } catch (error) {
        console.error("Error deleting room:", error);
        return {
            success: false,
            error: "Failed to delete room"
        };
    }
}
async function checkRoomAvailability(roomId, day, startTime, endTime, excludeScheduleId) {
    try {
        const conflicts = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSchedule.findMany({
            where: {
                roomId,
                day: day,
                ...excludeScheduleId && {
                    id: {
                        not: excludeScheduleId
                    }
                },
                OR: [
                    {
                        AND: [
                            {
                                startTime: {
                                    lte: startTime
                                }
                            },
                            {
                                endTime: {
                                    gt: startTime
                                }
                            }
                        ]
                    },
                    {
                        AND: [
                            {
                                startTime: {
                                    lt: endTime
                                }
                            },
                            {
                                endTime: {
                                    gte: endTime
                                }
                            }
                        ]
                    },
                    {
                        AND: [
                            {
                                startTime: {
                                    gte: startTime
                                }
                            },
                            {
                                endTime: {
                                    lte: endTime
                                }
                            }
                        ]
                    }
                ]
            },
            include: {
                section: {
                    include: {
                        course: {
                            select: {
                                code: true,
                                nameEn: true
                            }
                        }
                    }
                }
            }
        });
        return {
            success: true,
            isAvailable: conflicts.length === 0,
            conflicts
        };
    } catch (error) {
        console.error("Error checking room availability:", error);
        return {
            success: false,
            error: "Failed to check availability"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getRooms,
    getRoomStats,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    checkRoomAvailability
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRooms, "40526fbe49fbd5c36f5c9380bc7f2fa6cc01d3bef6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRoomStats, "00f1477430444d03e28f78f2ecff887a02b1315377", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRoomById, "400773fb3e715c534af1f1839c720a8d18b96f9799", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createRoom, "4072e8197f0f37b44486735a334be462cf6b5bcf24", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateRoom, "60dd67f2f191f31405ff07ca4ef5384bfade7e4b75", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteRoom, "407c3ba9d2d12beaf96c32d7714d60209ac8c91a8c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkRoomAvailability, "7caa8f330e9518e051d2e1a00ea73423d893a9bdb7", null);
}),
"[project]/apps/web/actions/user-instructors.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00c6864fcb4b07e60f02a72f68ae5fa4c423129054":"getInstructorStats","400a3e532e7cf1cb18583c94fc3832adfc252ea15d":"deleteInstructor","404ce9b1d8a5a4965230428e679315c7e2160621a2":"getInstructorById","4059d0c789086449b36698910c0668c7d569850cce":"getInstructors"},"",""] */ __turbopack_context__.s([
    "deleteInstructor",
    ()=>deleteInstructor,
    "getInstructorById",
    ()=>getInstructorById,
    "getInstructorStats",
    ()=>getInstructorStats,
    "getInstructors",
    ()=>getInstructors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getInstructors(filters) {
    try {
        const where = {};
        // Search by name
        if (filters?.search) {
            where.OR = [
                {
                    firstName: {
                        contains: filters.search
                    }
                },
                {
                    lastName: {
                        contains: filters.search
                    }
                }
            ];
        }
        // Filter by faculty
        if (filters?.facultyId) {
            where.facultyId = filters.facultyId;
        }
        // Filter by department
        if (filters?.departmentId) {
            where.departmentId = filters.departmentId;
        }
        const instructors = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].personnel.findMany({
            where,
            include: {
                user: {
                    select: {
                        email: true,
                        role: true
                    }
                },
                faculty: {
                    select: {
                        nameTh: true,
                        nameEn: true
                    }
                },
                department: {
                    select: {
                        nameTh: true,
                        nameEn: true
                    }
                },
                instructedSections: {
                    select: {
                        id: true
                    }
                }
            },
            orderBy: {
                user: {
                    createdAt: "desc"
                }
            }
        });
        // Filter by role (only instructors)
        const filteredInstructors = instructors.filter((p)=>p.user.role === "INSTRUCTOR" || p.user.role === "ADMIN");
        return {
            success: true,
            instructors: filteredInstructors
        };
    } catch (error) {
        console.error("Error fetching instructors:", error);
        return {
            success: false,
            error: "Failed to fetch instructors"
        };
    }
}
async function getInstructorById(id) {
    try {
        const instructor = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].personnel.findUnique({
            where: {
                id
            },
            include: {
                user: {
                    select: {
                        email: true,
                        role: true
                    }
                },
                faculty: true,
                department: true,
                instructedSections: {
                    include: {
                        course: true,
                        term: true
                    }
                }
            }
        });
        if (!instructor) {
            return {
                success: false,
                error: "Instructor not found"
            };
        }
        return {
            success: true,
            instructor
        };
    } catch (error) {
        console.error("Error fetching instructor:", error);
        return {
            success: false,
            error: "Failed to fetch instructor"
        };
    }
}
async function getInstructorStats() {
    try {
        const allPersonnel = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].personnel.findMany({
            include: {
                user: {
                    select: {
                        role: true
                    }
                },
                instructedSections: true
            }
        });
        const instructors = allPersonnel.filter((p)=>p.user.role === "INSTRUCTOR" || p.user.role === "ADMIN");
        const total = instructors.length;
        // Calculate average teaching hours (assuming each section = 3 hours/week)
        const totalSections = instructors.reduce((sum, i)=>sum + i.instructedSections.length, 0);
        const avgTeachingHours = total > 0 ? Math.round(totalSections * 3 / total) : 0;
        return {
            success: true,
            stats: {
                total,
                fullTime: 0,
                partTime: 0,
                avgTeachingHours
            }
        };
    } catch (error) {
        console.error("Error fetching instructor stats:", error);
        return {
            success: false,
            error: "Failed to fetch statistics"
        };
    }
}
async function deleteInstructor(id) {
    try {
        // Check if instructor has sections
        const sectionCount = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSection.count({
            where: {
                instructorId: id
            }
        });
        if (sectionCount > 0) {
            return {
                success: false,
                error: "Cannot delete instructor with assigned sections"
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].personnel.delete({
            where: {
                id
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/users/instructors");
        return {
            success: true
        };
    } catch (error) {
        console.error("Error deleting instructor:", error);
        return {
            success: false,
            error: "Failed to delete instructor"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getInstructors,
    getInstructorById,
    getInstructorStats,
    deleteInstructor
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInstructors, "4059d0c789086449b36698910c0668c7d569850cce", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInstructorById, "404ce9b1d8a5a4965230428e679315c7e2160621a2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInstructorStats, "00c6864fcb4b07e60f02a72f68ae5fa4c423129054", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteInstructor, "400a3e532e7cf1cb18583c94fc3832adfc252ea15d", null);
}),
"[project]/apps/web/actions/student-group.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"402afe96257a83a6508e80cfd3fff0130565464bae":"getStudentGroupById","402dcba9ecc50d7de93bbcd7fce3af4e6781e344ba":"getStudentGroupsWithYearLevel","4050208e4d90398286114e1600f3ebd3292651face":"getStudentGroups","405b92423cdb1029387bdca05b54b84bcec2b67284":"createStudentGroup","406c8db0422fcc6cff2a628e110208ab7992b75e0f":"deleteStudentGroup","40707d3c53fce3a7da3a9c07cedea7b0a45bb68300":"getGroupTimetable","4087a1dfefee6e3aed54e57c9dc0c531f3f1e4f957":"removeStudentsFromGroup","40a4f42c7df4213b3ad8a0efbb523470789243cae0":"getUnassignedStudents","604e6b0590d36314a5115a7c3e516f47a1fcc2737d":"updateStudentGroup","60c1dbacac3e32b9113422045facf7291516d8ff73":"addSectionToGroup","60cdc3b332beb1c0f54c33661867f20630d31d3def":"assignStudentsToGroup","60f3514fb2f049bcbdaf4cf8fa96865ee05bd05134":"removeSectionFromGroup"},"",""] */ __turbopack_context__.s([
    "addSectionToGroup",
    ()=>addSectionToGroup,
    "assignStudentsToGroup",
    ()=>assignStudentsToGroup,
    "createStudentGroup",
    ()=>createStudentGroup,
    "deleteStudentGroup",
    ()=>deleteStudentGroup,
    "getGroupTimetable",
    ()=>getGroupTimetable,
    "getStudentGroupById",
    ()=>getStudentGroupById,
    "getStudentGroups",
    ()=>getStudentGroups,
    "getStudentGroupsWithYearLevel",
    ()=>getStudentGroupsWithYearLevel,
    "getUnassignedStudents",
    ()=>getUnassignedStudents,
    "removeSectionFromGroup",
    ()=>removeSectionFromGroup,
    "removeStudentsFromGroup",
    ()=>removeStudentsFromGroup,
    "updateStudentGroup",
    ()=>updateStudentGroup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getStudentGroups(filters) {
    try {
        const where = {};
        if (filters?.programId) {
            where.programId = filters.programId;
        }
        if (filters?.admissionYear) {
            where.admissionYear = filters.admissionYear;
        }
        if (filters?.search) {
            where.name = {
                contains: filters.search
            };
        }
        const groups = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].studentGroup.findMany({
            where,
            include: {
                program: {
                    select: {
                        id: true,
                        nameTh: true,
                        nameEn: true,
                        degreeLevel: true,
                        faculty: {
                            select: {
                                code: true,
                                nameTh: true,
                                nameEn: true
                            }
                        }
                    }
                },
                advisor: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        title: true
                    }
                },
                _count: {
                    select: {
                        students: true,
                        sections: true
                    }
                }
            },
            orderBy: [
                {
                    admissionYear: "desc"
                },
                {
                    program: {
                        nameEn: "asc"
                    }
                },
                {
                    name: "asc"
                }
            ]
        });
        return {
            success: true,
            groups
        };
    } catch (error) {
        console.error("Error fetching student groups:", error);
        return {
            success: false,
            error: "Failed to fetch student groups"
        };
    }
}
async function getStudentGroupById(id) {
    try {
        const group = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].studentGroup.findUnique({
            where: {
                id
            },
            include: {
                program: {
                    select: {
                        id: true,
                        nameTh: true,
                        nameEn: true,
                        degreeLevel: true,
                        faculty: {
                            select: {
                                code: true,
                                nameTh: true,
                                nameEn: true
                            }
                        }
                    }
                },
                advisor: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        title: true
                    }
                },
                students: {
                    select: {
                        id: true,
                        studentId: true,
                        firstName: true,
                        lastName: true,
                        status: true
                    },
                    orderBy: {
                        studentId: "asc"
                    }
                },
                sections: {
                    include: {
                        course: {
                            select: {
                                code: true,
                                nameEn: true
                            }
                        },
                        term: {
                            select: {
                                year: true,
                                semester: true
                            }
                        }
                    }
                }
            }
        });
        if (!group) {
            return {
                success: false,
                error: "Student group not found"
            };
        }
        return {
            success: true,
            group
        };
    } catch (error) {
        console.error("Error fetching student group:", error);
        return {
            success: false,
            error: "Failed to fetch student group"
        };
    }
}
async function getGroupTimetable(groupId) {
    try {
        // Get all sections assigned to this group
        const group = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].studentGroup.findUnique({
            where: {
                id: groupId
            },
            include: {
                sections: {
                    select: {
                        id: true
                    }
                }
            }
        });
        if (!group) {
            return {
                success: false,
                error: "Student group not found"
            };
        }
        const sectionIds = group.sections.map((s)=>s.id);
        // Get all schedules for these sections
        const schedules = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSchedule.findMany({
            where: {
                sectionId: {
                    in: sectionIds
                }
            },
            include: {
                section: {
                    include: {
                        course: {
                            select: {
                                code: true,
                                nameEn: true,
                                nameTh: true
                            }
                        }
                    }
                },
                course: {
                    select: {
                        code: true,
                        nameEn: true,
                        nameTh: true
                    }
                },
                room: {
                    select: {
                        code: true,
                        name: true,
                        building: true
                    }
                },
                instructor: {
                    select: {
                        firstName: true,
                        lastName: true,
                        title: true
                    }
                },
                term: {
                    select: {
                        year: true,
                        semester: true
                    }
                }
            },
            orderBy: [
                {
                    day: 'asc'
                },
                {
                    startTime: 'asc'
                }
            ]
        });
        return {
            success: true,
            schedules
        };
    } catch (error) {
        console.error("Error fetching group timetable:", error);
        return {
            success: false,
            error: "Failed to fetch timetable"
        };
    }
}
async function createStudentGroup(data) {
    try {
        // Check for duplicate
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].studentGroup.findUnique({
            where: {
                programId_admissionYear_name: {
                    programId: data.programId,
                    admissionYear: data.admissionYear,
                    name: data.name
                }
            }
        });
        if (existing) {
            return {
                success: false,
                error: "A group with this name already exists for this program and year"
            };
        }
        const group = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].studentGroup.create({
            data: {
                name: data.name,
                admissionYear: data.admissionYear,
                programId: data.programId,
                advisorId: data.advisorId || null
            },
            include: {
                program: true,
                advisor: true
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/academic/groups");
        return {
            success: true,
            group
        };
    } catch (error) {
        console.error("Error creating student group:", error);
        return {
            success: false,
            error: "Failed to create student group"
        };
    }
}
async function updateStudentGroup(id, data) {
    try {
        // If changing name/year/program, check for duplicate
        if (data.name || data.admissionYear || data.programId) {
            const current = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].studentGroup.findUnique({
                where: {
                    id
                }
            });
            if (current) {
                const checkData = {
                    programId: data.programId || current.programId,
                    admissionYear: data.admissionYear || current.admissionYear,
                    name: data.name || current.name
                };
                const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].studentGroup.findFirst({
                    where: {
                        AND: [
                            {
                                id: {
                                    not: id
                                }
                            },
                            {
                                programId: checkData.programId
                            },
                            {
                                admissionYear: checkData.admissionYear
                            },
                            {
                                name: checkData.name
                            }
                        ]
                    }
                });
                if (existing) {
                    return {
                        success: false,
                        error: "A group with this name already exists for this program and year"
                    };
                }
            }
        }
        const group = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].studentGroup.update({
            where: {
                id
            },
            data: {
                name: data.name,
                admissionYear: data.admissionYear,
                programId: data.programId,
                advisorId: data.advisorId
            },
            include: {
                program: true,
                advisor: true
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/academic/groups");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/academic/groups/${id}`);
        return {
            success: true,
            group
        };
    } catch (error) {
        console.error("Error updating student group:", error);
        return {
            success: false,
            error: "Failed to update student group"
        };
    }
}
async function deleteStudentGroup(id) {
    try {
        // Check if group has students
        const group = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].studentGroup.findUnique({
            where: {
                id
            },
            include: {
                _count: {
                    select: {
                        students: true,
                        sections: true
                    }
                }
            }
        });
        if (!group) {
            return {
                success: false,
                error: "Student group not found"
            };
        }
        if (group._count.students > 0) {
            return {
                success: false,
                error: `Cannot delete group with ${group._count.students} student(s). Please reassign them first.`
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].studentGroup.delete({
            where: {
                id
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/academic/groups");
        return {
            success: true
        };
    } catch (error) {
        console.error("Error deleting student group:", error);
        return {
            success: false,
            error: "Failed to delete student group"
        };
    }
}
async function assignStudentsToGroup(groupId, studentIds) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].student.updateMany({
            where: {
                id: {
                    in: studentIds
                }
            },
            data: {
                studentGroupId: groupId
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/academic/groups");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/academic/groups/${groupId}`);
        return {
            success: true
        };
    } catch (error) {
        console.error("Error assigning students to group:", error);
        return {
            success: false,
            error: "Failed to assign students"
        };
    }
}
async function removeStudentsFromGroup(studentIds) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].student.updateMany({
            where: {
                id: {
                    in: studentIds
                }
            },
            data: {
                studentGroupId: null
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/academic/groups");
        return {
            success: true
        };
    } catch (error) {
        console.error("Error removing students from group:", error);
        return {
            success: false,
            error: "Failed to remove students"
        };
    }
}
async function getUnassignedStudents(filters) {
    try {
        const where = {
            studentGroupId: null
        };
        if (filters?.programId) {
            where.programId = filters.programId;
        }
        if (filters?.admissionYear) {
            where.admissionYear = filters.admissionYear;
        }
        const students = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].student.findMany({
            where,
            select: {
                id: true,
                studentId: true,
                firstName: true,
                lastName: true,
                admissionYear: true,
                program: {
                    select: {
                        nameEn: true
                    }
                }
            },
            orderBy: {
                studentId: "asc"
            }
        });
        return {
            success: true,
            students
        };
    } catch (error) {
        console.error("Error fetching unassigned students:", error);
        return {
            success: false,
            error: "Failed to fetch students"
        };
    }
}
// Calculate year level from admission year (internal helper function)
function calculateYearLevel(admissionYear) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // 0-11
    // Academic year typically starts in August (month 7)
    // If we're past August, we're in the new academic year
    const academicYear = currentMonth >= 7 ? currentYear : currentYear - 1;
    // +1 because first year students have yearLevel = 1
    return academicYear - admissionYear + 1;
}
async function getStudentGroupsWithYearLevel(filters) {
    const result = await getStudentGroups(filters);
    if (!result.success || !result.groups) {
        return result;
    }
    const groupsWithYearLevel = result.groups.map((group)=>({
            ...group,
            yearLevel: calculateYearLevel(group.admissionYear)
        }));
    // Filter by year level if specified
    if (filters?.yearLevel) {
        return {
            success: true,
            groups: groupsWithYearLevel.filter((g)=>g.yearLevel === filters.yearLevel)
        };
    }
    return {
        success: true,
        groups: groupsWithYearLevel
    };
}
async function addSectionToGroup(groupId, sectionId) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].studentGroup.update({
            where: {
                id: groupId
            },
            data: {
                sections: {
                    connect: {
                        id: sectionId
                    }
                }
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/academic/groups/${groupId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/academic/groups/${groupId}/schedule`);
        return {
            success: true
        };
    } catch (error) {
        console.error("Error adding section to group:", error);
        return {
            success: false,
            error: "Failed to add section to group"
        };
    }
}
async function removeSectionFromGroup(groupId, sectionId) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].studentGroup.update({
            where: {
                id: groupId
            },
            data: {
                sections: {
                    disconnect: {
                        id: sectionId
                    }
                }
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/academic/groups/${groupId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/academic/groups/${groupId}/schedule`);
        return {
            success: true
        };
    } catch (error) {
        console.error("Error removing section from group:", error);
        return {
            success: false,
            error: "Failed to remove section from group"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getStudentGroups,
    getStudentGroupById,
    getGroupTimetable,
    createStudentGroup,
    updateStudentGroup,
    deleteStudentGroup,
    assignStudentsToGroup,
    removeStudentsFromGroup,
    getUnassignedStudents,
    getStudentGroupsWithYearLevel,
    addSectionToGroup,
    removeSectionFromGroup
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudentGroups, "4050208e4d90398286114e1600f3ebd3292651face", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudentGroupById, "402afe96257a83a6508e80cfd3fff0130565464bae", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getGroupTimetable, "40707d3c53fce3a7da3a9c07cedea7b0a45bb68300", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createStudentGroup, "405b92423cdb1029387bdca05b54b84bcec2b67284", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateStudentGroup, "604e6b0590d36314a5115a7c3e516f47a1fcc2737d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteStudentGroup, "406c8db0422fcc6cff2a628e110208ab7992b75e0f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(assignStudentsToGroup, "60cdc3b332beb1c0f54c33661867f20630d31d3def", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeStudentsFromGroup, "4087a1dfefee6e3aed54e57c9dc0c531f3f1e4f957", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUnassignedStudents, "40a4f42c7df4213b3ad8a0efbb523470789243cae0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudentGroupsWithYearLevel, "402dcba9ecc50d7de93bbcd7fce3af4e6781e344ba", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addSectionToGroup, "60c1dbacac3e32b9113422045facf7291516d8ff73", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeSectionFromGroup, "60f3514fb2f049bcbdaf4cf8fa96865ee05bd05134", null);
}),
"[project]/apps/web/actions/schedule-timetable.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4073dbbda55cac31da933c408c09372119de61ad76":"createClassSchedule","407fd585b7b66b62c915ad2293f7db0d3b5397d240":"getClassSchedules","4096a48455b5adaa0c442b4c40a4c8cf01cc7d19b0":"getWeeklyTimetable","409fd56ea6ab34c08dff7140c43a0ec69603987c2b":"getScheduleStats","40b1e93f2319db56123aaf3a43435e4208f4b637a1":"getScheduleById","40d76a1099300f6ec09334bc4b02a7ebd536faebb3":"deleteClassSchedule","6089342d5b6220a200fc2208b17dcf1cd06c5a5241":"updateClassSchedule"},"",""] */ __turbopack_context__.s([
    "createClassSchedule",
    ()=>createClassSchedule,
    "deleteClassSchedule",
    ()=>deleteClassSchedule,
    "getClassSchedules",
    ()=>getClassSchedules,
    "getScheduleById",
    ()=>getScheduleById,
    "getScheduleStats",
    ()=>getScheduleStats,
    "getWeeklyTimetable",
    ()=>getWeeklyTimetable,
    "updateClassSchedule",
    ()=>updateClassSchedule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getClassSchedules(filters) {
    try {
        const where = {};
        if (filters?.termId) {
            where.termId = filters.termId;
        }
        if (filters?.day && filters.day !== "ALL") {
            where.day = filters.day;
        }
        if (filters?.instructorId) {
            where.instructorId = filters.instructorId;
        }
        if (filters?.search) {
            where.OR = [
                {
                    course: {
                        OR: [
                            {
                                code: {
                                    contains: filters.search
                                }
                            },
                            {
                                nameEn: {
                                    contains: filters.search
                                }
                            }
                        ]
                    }
                },
                {
                    instructor: {
                        OR: [
                            {
                                firstName: {
                                    contains: filters.search
                                }
                            },
                            {
                                lastName: {
                                    contains: filters.search
                                }
                            }
                        ]
                    }
                }
            ];
        }
        const schedules = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSchedule.findMany({
            where,
            include: {
                section: {
                    include: {
                        course: {
                            select: {
                                code: true,
                                nameEn: true,
                                nameTh: true
                            }
                        },
                        instructor: {
                            select: {
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                },
                room: {
                    select: {
                        code: true,
                        name: true,
                        building: true
                    }
                },
                course: {
                    select: {
                        code: true,
                        nameEn: true
                    }
                },
                instructor: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                },
                term: {
                    select: {
                        year: true,
                        semester: true
                    }
                }
            },
            orderBy: [
                {
                    day: "asc"
                },
                {
                    startTime: "asc"
                }
            ]
        });
        return {
            success: true,
            schedules
        };
    } catch (error) {
        console.error("Error fetching schedules:", error);
        return {
            success: false,
            error: "Failed to fetch schedules"
        };
    }
}
async function getScheduleStats(termId) {
    try {
        const where = termId ? {
            termId
        } : {};
        const [totalSchedules, activeCourses, roomsUsed] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSchedule.count({
                where
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSchedule.findMany({
                where,
                distinct: [
                    "courseId"
                ],
                select: {
                    courseId: true
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSchedule.findMany({
                where,
                distinct: [
                    "roomId"
                ],
                select: {
                    roomId: true
                }
            })
        ]);
        // Get current week's schedules
        const thisWeek = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSchedule.count({
            where: {
                ...where
            }
        });
        return {
            success: true,
            stats: {
                totalSchedules,
                activeCourses: activeCourses.length,
                roomsUsed: roomsUsed.filter((r)=>r.roomId).length,
                thisWeek
            }
        };
    } catch (error) {
        console.error("Error fetching schedule stats:", error);
        return {
            success: false,
            error: "Failed to fetch statistics"
        };
    }
}
async function getScheduleById(id) {
    try {
        const schedule = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSchedule.findUnique({
            where: {
                id
            },
            include: {
                section: {
                    include: {
                        course: true,
                        instructor: true,
                        enrollments: {
                            include: {
                                student: {
                                    select: {
                                        studentId: true,
                                        firstName: true,
                                        lastName: true
                                    }
                                }
                            }
                        }
                    }
                },
                room: true,
                course: true,
                instructor: true,
                term: true
            }
        });
        if (!schedule) {
            return {
                success: false,
                error: "Schedule not found"
            };
        }
        return {
            success: true,
            schedule
        };
    } catch (error) {
        console.error("Error fetching schedule:", error);
        return {
            success: false,
            error: "Failed to fetch schedule"
        };
    }
}
async function createClassSchedule(data) {
    try {
        // Check for conflicts
        if (data.roomId) {
            const roomConflicts = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSchedule.findMany({
                where: {
                    roomId: data.roomId,
                    day: data.day,
                    OR: [
                        {
                            AND: [
                                {
                                    startTime: {
                                        lte: data.startTime
                                    }
                                },
                                {
                                    endTime: {
                                        gt: data.startTime
                                    }
                                }
                            ]
                        },
                        {
                            AND: [
                                {
                                    startTime: {
                                        lt: data.endTime
                                    }
                                },
                                {
                                    endTime: {
                                        gte: data.endTime
                                    }
                                }
                            ]
                        }
                    ]
                }
            });
            if (roomConflicts.length > 0) {
                return {
                    success: false,
                    error: "Room is already booked for this time slot"
                };
            }
        }
        // Check for student group schedule conflicts (if groups are specified)
        if (data.studentGroupIds && data.studentGroupIds.length > 0) {
            // Find existing schedules for the same groups at the same time
            const groupConflicts = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSchedule.findMany({
                where: {
                    day: data.day,
                    section: {
                        studentGroups: {
                            some: {
                                id: {
                                    in: data.studentGroupIds
                                }
                            }
                        }
                    },
                    OR: [
                        {
                            AND: [
                                {
                                    startTime: {
                                        lte: data.startTime
                                    }
                                },
                                {
                                    endTime: {
                                        gt: data.startTime
                                    }
                                }
                            ]
                        },
                        {
                            AND: [
                                {
                                    startTime: {
                                        lt: data.endTime
                                    }
                                },
                                {
                                    endTime: {
                                        gte: data.endTime
                                    }
                                }
                            ]
                        }
                    ]
                },
                include: {
                    course: {
                        select: {
                            code: true,
                            nameEn: true
                        }
                    },
                    section: {
                        include: {
                            studentGroups: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
            if (groupConflicts.length > 0) {
                const conflictInfo = groupConflicts[0];
                return {
                    success: false,
                    error: `Schedule conflict! The selected student group(s) already have "${conflictInfo?.course?.code || 'another class'}" at this time.`
                };
            }
        }
        // Create the schedule
        const schedule = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSchedule.create({
            data: {
                sectionId: data.sectionId,
                day: data.day,
                startTime: data.startTime,
                endTime: data.endTime,
                ...data.roomId && {
                    roomId: data.roomId
                },
                ...data.courseId && {
                    courseId: data.courseId
                },
                ...data.instructorId && {
                    instructorId: data.instructorId
                },
                ...data.termId && {
                    termId: data.termId
                }
            }
        });
        // If student groups are specified, connect them to the section
        if (data.studentGroupIds && data.studentGroupIds.length > 0) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSection.update({
                where: {
                    id: data.sectionId
                },
                data: {
                    studentGroups: {
                        connect: data.studentGroupIds.map((id)=>({
                                id
                            }))
                    }
                }
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/schedule/timetable");
        return {
            success: true,
            schedule
        };
    } catch (error) {
        console.error("Error creating schedule:", error);
        return {
            success: false,
            error: "Failed to create schedule"
        };
    }
}
async function updateClassSchedule(id, data) {
    try {
        const schedule = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSchedule.update({
            where: {
                id
            },
            data: {
                ...data.day && {
                    day: data.day
                },
                ...data.startTime && {
                    startTime: data.startTime
                },
                ...data.endTime && {
                    endTime: data.endTime
                },
                ...data.roomId !== undefined && {
                    roomId: data.roomId
                }
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/schedule/timetable");
        return {
            success: true,
            schedule
        };
    } catch (error) {
        console.error("Error updating schedule:", error);
        return {
            success: false,
            error: "Failed to update schedule"
        };
    }
}
async function deleteClassSchedule(id) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSchedule.delete({
            where: {
                id
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/schedule/timetable");
        return {
            success: true
        };
    } catch (error) {
        console.error("Error deleting schedule:", error);
        return {
            success: false,
            error: "Failed to delete schedule"
        };
    }
}
async function getWeeklyTimetable(termId) {
    try {
        const where = termId ? {
            termId
        } : {};
        const schedules = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].classSchedule.findMany({
            where,
            include: {
                section: {
                    include: {
                        course: {
                            select: {
                                code: true,
                                nameEn: true
                            }
                        }
                    }
                },
                room: {
                    select: {
                        code: true
                    }
                },
                course: {
                    select: {
                        code: true,
                        nameEn: true
                    }
                }
            },
            orderBy: [
                {
                    day: "asc"
                },
                {
                    startTime: "asc"
                }
            ]
        });
        // Group by day and time
        const timetable = {
            MONDAY: [],
            TUESDAY: [],
            WEDNESDAY: [],
            THURSDAY: [],
            FRIDAY: [],
            SATURDAY: [],
            SUNDAY: []
        };
        schedules.forEach((schedule)=>{
            if (timetable[schedule.day]) {
                timetable[schedule.day].push(schedule);
            }
        });
        return {
            success: true,
            timetable
        };
    } catch (error) {
        console.error("Error fetching weekly timetable:", error);
        return {
            success: false,
            error: "Failed to fetch timetable"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getClassSchedules,
    getScheduleStats,
    getScheduleById,
    createClassSchedule,
    updateClassSchedule,
    deleteClassSchedule,
    getWeeklyTimetable
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getClassSchedules, "407fd585b7b66b62c915ad2293f7db0d3b5397d240", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getScheduleStats, "409fd56ea6ab34c08dff7140c43a0ec69603987c2b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getScheduleById, "40b1e93f2319db56123aaf3a43435e4208f4b637a1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createClassSchedule, "4073dbbda55cac31da933c408c09372119de61ad76", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateClassSchedule, "6089342d5b6220a200fc2208b17dcf1cd06c5a5241", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteClassSchedule, "40d76a1099300f6ec09334bc4b02a7ebd536faebb3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getWeeklyTimetable, "4096a48455b5adaa0c442b4c40a4c8cf01cc7d19b0", null);
}),
"[project]/apps/web/.next-internal/server/app/admin/schedule/timetable/create/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/apps/web/actions/academic.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/apps/web/actions/schedule-rooms.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/apps/web/actions/user-instructors.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/apps/web/actions/student-group.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE7 => \"[project]/apps/web/actions/schedule-timetable.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$academic$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/academic.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$schedule$2d$rooms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/schedule-rooms.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$user$2d$instructors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/user-instructors.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$student$2d$group$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/student-group.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$schedule$2d$timetable$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/schedule-timetable.ts [app-rsc] (ecmascript)");
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
;
;
;
;
;
;
}),
"[project]/apps/web/.next-internal/server/app/admin/schedule/timetable/create/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/apps/web/actions/academic.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/apps/web/actions/schedule-rooms.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/apps/web/actions/user-instructors.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/apps/web/actions/student-group.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE7 => \"[project]/apps/web/actions/schedule-timetable.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "000f7a1cb658a9a6741f035a805f2983db08d56808",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logoutAdmin"],
    "0042d76f240ee2a93513d3b83c0a780d6960763f9a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSystemSettings"],
    "0048abae6b6c31cf4a1031d6650cdc9969ec5f17a2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslations"],
    "00a1fd4383e6c7b044e32761a433241d44a0cc2799",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$academic$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAcademicTerms"],
    "00c6864fcb4b07e60f02a72f68ae5fa4c423129054",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$user$2d$instructors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getInstructorStats"],
    "00f1477430444d03e28f78f2ecff887a02b1315377",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$schedule$2d$rooms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRoomStats"],
    "400773fb3e715c534af1f1839c720a8d18b96f9799",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$schedule$2d$rooms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRoomById"],
    "400a3e532e7cf1cb18583c94fc3832adfc252ea15d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$user$2d$instructors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteInstructor"],
    "402afe96257a83a6508e80cfd3fff0130565464bae",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$student$2d$group$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStudentGroupById"],
    "402dcba9ecc50d7de93bbcd7fce3af4e6781e344ba",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$student$2d$group$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStudentGroupsWithYearLevel"],
    "404ce9b1d8a5a4965230428e679315c7e2160621a2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$user$2d$instructors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getInstructorById"],
    "4050208e4d90398286114e1600f3ebd3292651face",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$student$2d$group$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStudentGroups"],
    "40526fbe49fbd5c36f5c9380bc7f2fa6cc01d3bef6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$schedule$2d$rooms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRooms"],
    "4059d0c789086449b36698910c0668c7d569850cce",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$user$2d$instructors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getInstructors"],
    "405b92423cdb1029387bdca05b54b84bcec2b67284",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$student$2d$group$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createStudentGroup"],
    "405df935337fa3c97bb2b1d0e0c65bc101e9c11d5b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$academic$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteClassSection"],
    "406c8db0422fcc6cff2a628e110208ab7992b75e0f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$student$2d$group$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteStudentGroup"],
    "40707d3c53fce3a7da3a9c07cedea7b0a45bb68300",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$student$2d$group$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getGroupTimetable"],
    "4072e8197f0f37b44486735a334be462cf6b5bcf24",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$schedule$2d$rooms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createRoom"],
    "4073dbbda55cac31da933c408c09372119de61ad76",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$schedule$2d$timetable$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClassSchedule"],
    "407c3ba9d2d12beaf96c32d7714d60209ac8c91a8c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$schedule$2d$rooms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteRoom"],
    "4087a1dfefee6e3aed54e57c9dc0c531f3f1e4f957",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$student$2d$group$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeStudentsFromGroup"],
    "40a4f42c7df4213b3ad8a0efbb523470789243cae0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$student$2d$group$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUnassignedStudents"],
    "40b0fa9e872708e5bb0a074f1dec6e32a85267a341",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$academic$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClassSection"],
    "40d04cfb7840d65ed5621248993e49eb17e7661a40",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$academic$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClassSections"],
    "40ff16435c2a7e03d3da33034d775e1c2930a2241b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$academic$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAcademicTerm"],
    "604e6b0590d36314a5115a7c3e516f47a1fcc2737d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$student$2d$group$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateStudentGroup"],
    "60c1dbacac3e32b9113422045facf7291516d8ff73",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$student$2d$group$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addSectionToGroup"],
    "60cdc3b332beb1c0f54c33661867f20630d31d3def",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$student$2d$group$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["assignStudentsToGroup"],
    "60dd67f2f191f31405ff07ca4ef5384bfade7e4b75",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$schedule$2d$rooms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateRoom"],
    "60f3514fb2f049bcbdaf4cf8fa96865ee05bd05134",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$student$2d$group$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeSectionFromGroup"],
    "7caa8f330e9518e051d2e1a00ea73423d893a9bdb7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$schedule$2d$rooms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkRoomAvailability"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$schedule$2f$timetable$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$academic$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$schedule$2d$rooms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$user$2d$instructors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE6__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$student$2d$group$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE7__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$schedule$2d$timetable$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/apps/web/.next-internal/server/app/admin/schedule/timetable/create/page/actions.js { ACTIONS_MODULE0 => "[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/apps/web/actions/academic.ts [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/apps/web/actions/schedule-rooms.ts [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/apps/web/actions/user-instructors.ts [app-rsc] (ecmascript)", ACTIONS_MODULE6 => "[project]/apps/web/actions/student-group.ts [app-rsc] (ecmascript)", ACTIONS_MODULE7 => "[project]/apps/web/actions/schedule-timetable.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$academic$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/academic.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$schedule$2d$rooms$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/schedule-rooms.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$user$2d$instructors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/user-instructors.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$student$2d$group$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/student-group.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$schedule$2d$timetable$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/schedule-timetable.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c4f97a3e._.js.map