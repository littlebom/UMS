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
"[project]/apps/web/actions/admission-track.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0071f873c1045454a303773abfaa03690373411892":"getPublicAdmissionTracks","4002460a4c74320dde93f01a3d643b813502c87ce5":"getAdmissionTracks","404f47bac2ba17a56a657ba851aecdc4cd7dd2aef9":"getAdmissionTrackById","40ba1b86f29fd9c23ab001b00134cbe4a7557d34d2":"deleteAdmissionTrack","40c007c85f6076ae20ba2729b3064b25e4a2b18851":"createAdmissionTrack","40d3f01507251ab51e65f102062abb7f2b05afc5e1":"checkTrackAvailability","60991a87adf623df7a22f3ea91e282f2b48228373c":"updateAdmissionTrack"},"",""] */ __turbopack_context__.s([
    "checkTrackAvailability",
    ()=>checkTrackAvailability,
    "createAdmissionTrack",
    ()=>createAdmissionTrack,
    "deleteAdmissionTrack",
    ()=>deleteAdmissionTrack,
    "getAdmissionTrackById",
    ()=>getAdmissionTrackById,
    "getAdmissionTracks",
    ()=>getAdmissionTracks,
    "getPublicAdmissionTracks",
    ()=>getPublicAdmissionTracks,
    "updateAdmissionTrack",
    ()=>updateAdmissionTrack
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getAdmissionTracks(filters) {
    try {
        const where = {};
        if (filters?.programId) where.programId = filters.programId;
        if (filters?.typeId) where.typeId = filters.typeId;
        if (filters?.academicYear) where.academicYear = filters.academicYear;
        if (filters?.isActive !== undefined) where.isActive = filters.isActive;
        return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].admissionTrack.findMany({
            where,
            include: {
                program: {
                    select: {
                        nameTh: true,
                        nameEn: true,
                        degreeLevel: true
                    }
                },
                type: {
                    select: {
                        nameTh: true,
                        nameEn: true,
                        color: true,
                        icon: true
                    }
                },
                _count: {
                    select: {
                        applications: true
                    }
                }
            },
            orderBy: [
                {
                    academicYear: 'desc'
                },
                {
                    openDate: 'asc'
                }
            ]
        });
    } catch (error) {
        console.error("Error fetching admission tracks:", error);
        throw new Error("Failed to fetch admission tracks");
    }
}
async function getAdmissionTrackById(id) {
    try {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].admissionTrack.findUnique({
            where: {
                id
            },
            include: {
                program: true,
                type: true,
                _count: {
                    select: {
                        applications: true
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error fetching admission track:", error);
        throw new Error("Failed to fetch admission track");
    }
}
async function createAdmissionTrack(formData) {
    const code = formData.get("code");
    const nameTh = formData.get("nameTh");
    const nameEn = formData.get("nameEn");
    const typeId = formData.get("typeId");
    const programId = formData.get("programId");
    const academicYear = formData.get("academicYear");
    const openDate = new Date(formData.get("openDate"));
    const closeDate = new Date(formData.get("closeDate"));
    const announceDateStr = formData.get("announceDate");
    const announceDate = announceDateStr ? new Date(announceDateStr) : null;
    const totalSeats = parseInt(formData.get("totalSeats"));
    const reservedSeats = formData.get("reservedSeats") ? parseInt(formData.get("reservedSeats")) : null;
    const enableWaitlist = formData.get("enableWaitlist") === "true";
    const applicationFee = formData.get("applicationFee") ? parseFloat(formData.get("applicationFee")) : null;
    const requirements = formData.get("requirements"); // JSON string
    const isActive = formData.get("isActive") === "true";
    const isPublished = formData.get("isPublished") === "true";
    if (!code || !nameTh || !nameEn || !typeId || !programId || !academicYear || !openDate || !closeDate || !totalSeats) {
        throw new Error("Missing required fields");
    }
    // Check if code already exists
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].admissionTrack.findUnique({
        where: {
            code
        }
    });
    if (existing) {
        throw new Error("Admission track code already exists");
    }
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].admissionTrack.create({
            data: {
                code,
                nameTh,
                nameEn,
                typeId,
                programId,
                academicYear,
                openDate,
                closeDate,
                announceDate,
                totalSeats,
                reservedSeats,
                enableWaitlist,
                applicationFee,
                requirements: requirements || null,
                isActive,
                isPublished
            }
        });
    } catch (error) {
        console.error("Error creating admission track:", error);
        throw new Error("Failed to create admission track");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/admissions/tracks");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin/admissions/tracks");
}
async function updateAdmissionTrack(id, formData) {
    const nameTh = formData.get("nameTh");
    const nameEn = formData.get("nameEn");
    const typeId = formData.get("typeId");
    const academicYear = formData.get("academicYear");
    const openDate = new Date(formData.get("openDate"));
    const closeDate = new Date(formData.get("closeDate"));
    const announceDateStr = formData.get("announceDate");
    const announceDate = announceDateStr ? new Date(announceDateStr) : null;
    const totalSeats = parseInt(formData.get("totalSeats"));
    const reservedSeats = formData.get("reservedSeats") ? parseInt(formData.get("reservedSeats")) : null;
    const enableWaitlist = formData.get("enableWaitlist") === "true";
    const applicationFee = formData.get("applicationFee") ? parseFloat(formData.get("applicationFee")) : null;
    const requirements = formData.get("requirements"); // JSON string
    const isActive = formData.get("isActive") === "true";
    const isPublished = formData.get("isPublished") === "true";
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].admissionTrack.update({
            where: {
                id
            },
            data: {
                nameTh,
                nameEn,
                typeId,
                academicYear,
                openDate,
                closeDate,
                announceDate,
                totalSeats,
                reservedSeats,
                enableWaitlist,
                applicationFee,
                requirements: requirements || null,
                isActive,
                isPublished
            }
        });
    } catch (error) {
        console.error("Error updating admission track:", error);
        throw new Error("Failed to update admission track");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/admissions/tracks");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/admissions/tracks/${id}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin/admissions/tracks");
}
async function deleteAdmissionTrack(id) {
    try {
        const track = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].admissionTrack.findUnique({
            where: {
                id
            },
            include: {
                _count: {
                    select: {
                        applications: true
                    }
                }
            }
        });
        if (!track) {
            throw new Error("Admission track not found");
        }
        if (track._count.applications > 0) {
            throw new Error(`Cannot delete admission track. ${track._count.applications} application(s) are linked to this track.`);
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].admissionTrack.delete({
            where: {
                id
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/admissions/tracks");
    } catch (error) {
        console.error("Error deleting admission track:", error);
        throw error;
    }
}
async function checkTrackAvailability(trackId) {
    const track = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].admissionTrack.findUnique({
        where: {
            id: trackId
        }
    });
    if (!track) {
        return {
            isOpen: false,
            hasSeats: false,
            message: "Track not found"
        };
    }
    const now = new Date();
    const isOpen = track.isActive && track.isPublished && now >= track.openDate && now <= track.closeDate;
    const hasSeats = track.filledSeats < track.totalSeats;
    let message = "Available";
    if (!track.isActive || !track.isPublished) message = "Track is not active";
    else if (now < track.openDate) message = "Applications not yet open";
    else if (now > track.closeDate) message = "Applications closed";
    else if (!hasSeats) message = "Seats full";
    return {
        isOpen,
        hasSeats,
        message
    };
}
async function getPublicAdmissionTracks() {
    try {
        const now = new Date();
        return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].admissionTrack.findMany({
            where: {
                isActive: true,
                isPublished: true,
                closeDate: {
                    gte: now // Not yet closed
                }
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
                                nameTh: true,
                                nameEn: true
                            }
                        }
                    }
                },
                type: {
                    select: {
                        nameTh: true,
                        nameEn: true,
                        color: true,
                        icon: true
                    }
                },
                _count: {
                    select: {
                        applications: true
                    }
                }
            },
            orderBy: [
                {
                    openDate: 'asc'
                },
                {
                    program: {
                        nameTh: 'asc'
                    }
                }
            ]
        });
    } catch (error) {
        console.error("Error fetching public admission tracks:", error);
        return [];
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getAdmissionTracks,
    getAdmissionTrackById,
    createAdmissionTrack,
    updateAdmissionTrack,
    deleteAdmissionTrack,
    checkTrackAvailability,
    getPublicAdmissionTracks
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAdmissionTracks, "4002460a4c74320dde93f01a3d643b813502c87ce5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAdmissionTrackById, "404f47bac2ba17a56a657ba851aecdc4cd7dd2aef9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createAdmissionTrack, "40c007c85f6076ae20ba2729b3064b25e4a2b18851", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateAdmissionTrack, "60991a87adf623df7a22f3ea91e282f2b48228373c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAdmissionTrack, "40ba1b86f29fd9c23ab001b00134cbe4a7557d34d2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkTrackAvailability, "40d3f01507251ab51e65f102062abb7f2b05afc5e1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPublicAdmissionTracks, "0071f873c1045454a303773abfaa03690373411892", null);
}),
"[project]/apps/web/app/admin/admissions/tracks/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40470ae05c7793149a57545969ae2e3ff7642f8dd8":"$$RSC_SERVER_ACTION_0"},"",""] */ __turbopack_context__.s([
    "$$RSC_SERVER_ACTION_0",
    ()=>$$RSC_SERVER_ACTION_0,
    "default",
    ()=>AdmissionTracksPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2d$track$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/admission-track.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-rsc] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-rsc] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-rsc] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-rsc] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$lucide$2d$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/lucide-react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-rsc] (ecmascript) <locals>");
;
;
;
;
;
;
;
;
const $$RSC_SERVER_ACTION_0 = async function action($$ACTION_CLOSURE_BOUND) {
    var [$$ACTION_ARG_0] = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decryptActionBoundArgs"])("40470ae05c7793149a57545969ae2e3ff7642f8dd8", $$ACTION_CLOSURE_BOUND);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2d$track$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteAdmissionTrack"])($$ACTION_ARG_0);
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_ACTION_0, "40470ae05c7793149a57545969ae2e3ff7642f8dd8", null);
async function AdmissionTracksPage() {
    const tracks = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2d$track$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdmissionTracks"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-gray-900",
                                children: "Admission Tracks"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                lineNumber: 14,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500",
                                children: "Manage admission rounds, timelines, and capacities"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                lineNumber: 15,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                        lineNumber: 13,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/admin/admissions/tracks/create",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                    lineNumber: 19,
                                    columnNumber: 25
                                }, this),
                                "New Admission Track"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                            lineNumber: 18,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                        lineNumber: 17,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                lineNumber: 12,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border border-gray-200 bg-white shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-left text-sm text-gray-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "bg-gray-50 text-xs uppercase text-gray-700",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3",
                                            children: "Track Info"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                            lineNumber: 32,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3",
                                            children: "Program"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                            lineNumber: 33,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3",
                                            children: "Timeline"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                            lineNumber: 34,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3",
                                            children: "Capacity"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                            lineNumber: 35,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3",
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                            lineNumber: 36,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3 text-right",
                                            children: "Actions"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                            lineNumber: 37,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                    lineNumber: 31,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                lineNumber: 30,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                className: "divide-y divide-gray-200",
                                children: tracks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 6,
                                        className: "px-6 py-12 text-center text-gray-500",
                                        children: "No admission tracks found. Create one to get started."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                        lineNumber: 43,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                    lineNumber: 42,
                                    columnNumber: 33
                                }, this) : tracks.map((track)=>{
                                    const IconComponent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$lucide$2d$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__[track.type.icon] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$lucide$2d$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__.Target;
                                    const now = new Date();
                                    const isOpen = track.isActive && track.isPublished && now >= track.openDate && now <= track.closeDate;
                                    const percentFilled = Math.round(track.filledSeats / track.totalSeats * 100);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "hover:bg-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
                                                            style: {
                                                                backgroundColor: `${track.type.color}20`,
                                                                color: track.type.color
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                                lineNumber: 62,
                                                                columnNumber: 57
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                            lineNumber: 58,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-medium text-gray-900",
                                                                    children: track.nameTh
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                                    lineNumber: 65,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-gray-500",
                                                                    children: track.nameEn
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                                    lineNumber: 66,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1 font-mono text-xs text-gray-400",
                                                                    children: track.code
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                                    lineNumber: 67,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                            lineNumber: 64,
                                                            columnNumber: 53
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                    lineNumber: 57,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                lineNumber: 56,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-medium text-gray-900",
                                                        children: track.program.nameTh
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-500",
                                                        children: track.program.degreeLevel
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                        lineNumber: 73,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600",
                                                        children: [
                                                            "Year ",
                                                            track.academicYear
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                        lineNumber: 74,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                lineNumber: 71,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-1 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1 text-green-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium",
                                                                    children: "Open:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                                    lineNumber: 81,
                                                                    columnNumber: 57
                                                                }, this),
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(track.openDate), "dd MMM yyyy")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                            lineNumber: 80,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1 text-red-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium",
                                                                    children: "Close:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                                    lineNumber: 85,
                                                                    columnNumber: 57
                                                                }, this),
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(track.closeDate), "dd MMM yyyy")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                            lineNumber: 84,
                                                            columnNumber: 53
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                    lineNumber: 79,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                lineNumber: 78,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-32",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-1 flex justify-between text-xs",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium text-gray-700",
                                                                    children: [
                                                                        track.filledSeats,
                                                                        " / ",
                                                                        track.totalSeats
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                                    lineNumber: 93,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-500",
                                                                    children: [
                                                                        percentFilled,
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                                    lineNumber: 94,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                            lineNumber: 92,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-1.5 w-full rounded-full bg-gray-100",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `h-1.5 rounded-full ${percentFilled >= 100 ? 'bg-red-500' : 'bg-blue-500'}`,
                                                                style: {
                                                                    width: `${Math.min(percentFilled, 100)}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                                lineNumber: 97,
                                                                columnNumber: 57
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                            lineNumber: 96,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 text-xs text-gray-400",
                                                            children: [
                                                                track._count.applications,
                                                                " applications"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                            lineNumber: 102,
                                                            columnNumber: 53
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                lineNumber: 90,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-1",
                                                    children: [
                                                        isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex w-fit items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800",
                                                            children: "Open Now"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                            lineNumber: 110,
                                                            columnNumber: 57
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex w-fit items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800",
                                                            children: "Closed"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                            lineNumber: 114,
                                                            columnNumber: 57
                                                        }, this),
                                                        !track.isPublished && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex w-fit items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800",
                                                            children: "Draft"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                            lineNumber: 119,
                                                            columnNumber: 57
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                lineNumber: 107,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 text-right",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-end gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/admin/admissions/tracks/${track.id}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white p-0 hover:bg-gray-50",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                    className: "h-4 w-4 text-gray-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                                    lineNumber: 129,
                                                                    columnNumber: 61
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                                lineNumber: 128,
                                                                columnNumber: 57
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                            lineNumber: 127,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/admin/admissions/tracks/${track.id}/edit`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white p-0 hover:bg-gray-50",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                    className: "h-4 w-4 text-gray-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                                    lineNumber: 134,
                                                                    columnNumber: 61
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                                lineNumber: 133,
                                                                columnNumber: 57
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                            lineNumber: 132,
                                                            columnNumber: 53
                                                        }, this),
                                                        track._count.applications === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                            action: $$RSC_SERVER_ACTION_0.bind(null, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encryptActionBoundArgs"])("40470ae05c7793149a57545969ae2e3ff7642f8dd8", track.id)),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white p-0 hover:bg-red-50 hover:text-red-600",
                                                                type: "submit",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                                    lineNumber: 147,
                                                                    columnNumber: 65
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                                lineNumber: 143,
                                                                columnNumber: 61
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                            lineNumber: 139,
                                                            columnNumber: 57
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                                lineNumber: 125,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, track.id, true, {
                                        fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                        lineNumber: 55,
                                        columnNumber: 41
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                                lineNumber: 40,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                        lineNumber: 29,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                    lineNumber: 28,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/app/admin/admissions/tracks/page.tsx",
        lineNumber: 11,
        columnNumber: 9
    }, this);
}
}),
"[project]/apps/web/.next-internal/server/app/admin/admissions/tracks/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/apps/web/app/admin/admissions/tracks/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/apps/web/actions/admission-track.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$admin$2f$admissions$2f$tracks$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/app/admin/admissions/tracks/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2d$track$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/admission-track.ts [app-rsc] (ecmascript)");
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
"[project]/apps/web/.next-internal/server/app/admin/admissions/tracks/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/apps/web/app/admin/admissions/tracks/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/apps/web/actions/admission-track.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "000f7a1cb658a9a6741f035a805f2983db08d56808",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logoutAdmin"],
    "0042d76f240ee2a93513d3b83c0a780d6960763f9a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSystemSettings"],
    "0048abae6b6c31cf4a1031d6650cdc9969ec5f17a2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslations"],
    "0071f873c1045454a303773abfaa03690373411892",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2d$track$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPublicAdmissionTracks"],
    "4002460a4c74320dde93f01a3d643b813502c87ce5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2d$track$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdmissionTracks"],
    "40470ae05c7793149a57545969ae2e3ff7642f8dd8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$admin$2f$admissions$2f$tracks$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_ACTION_0"],
    "404f47bac2ba17a56a657ba851aecdc4cd7dd2aef9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2d$track$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdmissionTrackById"],
    "40ba1b86f29fd9c23ab001b00134cbe4a7557d34d2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2d$track$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteAdmissionTrack"],
    "40c007c85f6076ae20ba2729b3064b25e4a2b18851",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2d$track$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdmissionTrack"],
    "40d3f01507251ab51e65f102062abb7f2b05afc5e1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2d$track$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkTrackAvailability"],
    "60991a87adf623df7a22f3ea91e282f2b48228373c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2d$track$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateAdmissionTrack"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$admissions$2f$tracks$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$app$2f$admin$2f$admissions$2f$tracks$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2d$track$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/apps/web/.next-internal/server/app/admin/admissions/tracks/page/actions.js { ACTIONS_MODULE0 => "[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/apps/web/app/admin/admissions/tracks/page.tsx [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/apps/web/actions/admission-track.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$admin$2f$admissions$2f$tracks$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/app/admin/admissions/tracks/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admission$2d$track$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/admission-track.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c51ce35b._.js.map