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
"[project]/apps/web/actions/personnel.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"009d9154802923e00403972bedb8e05a4cea9813a7":"getPersonnel","4059c1ebd627a5f3e6c253d26488d70e24f8e0ccaa":"deletePersonnel","4062199ab8fe103add992e37e5809273519fbb2cfe":"getPersonnelById","40a9abb716dbfa5f224f8ebe401da5fc68b5ec2c91":"createPersonnel","60ee3806925cbc56d21d987a4a84bc45778b2178bd":"updatePersonnel"},"",""] */ __turbopack_context__.s([
    "createPersonnel",
    ()=>createPersonnel,
    "deletePersonnel",
    ()=>deletePersonnel,
    "getPersonnel",
    ()=>getPersonnel,
    "getPersonnelById",
    ()=>getPersonnelById,
    "updatePersonnel",
    ()=>updatePersonnel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getPersonnel() {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].personnel.findMany({
        include: {
            user: {
                select: {
                    email: true,
                    role: true
                }
            },
            faculty: {
                select: {
                    id: true,
                    nameTh: true,
                    nameEn: true
                }
            },
            department: {
                select: {
                    id: true,
                    nameTh: true,
                    nameEn: true
                }
            }
        },
        orderBy: {
            lastName: "asc"
        }
    });
}
async function getPersonnelById(id) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].personnel.findUnique({
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
            department: true
        }
    });
}
async function createPersonnel(data) {
    const bcrypt = __turbopack_context__.r("[project]/node_modules/bcryptjs/umd/index.js [app-rsc] (ecmascript)");
    const passwordHash = await bcrypt.hash(data.password, 10);
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.create({
        data: {
            email: data.email,
            passwordHash,
            role: data.role,
            personnelProfile: {
                create: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    title: data.title,
                    position: data.position,
                    phone: data.phone,
                    facultyId: data.facultyId,
                    departmentId: data.departmentId
                }
            }
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/personnel");
    return result;
}
async function updatePersonnel(id, data) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].personnel.update({
        where: {
            id
        },
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            title: data.title,
            position: data.position,
            phone: data.phone,
            facultyId: data.facultyId,
            departmentId: data.departmentId
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/personnel");
    return result;
}
async function deletePersonnel(id) {
    // This will cascade delete the user as well
    const personnel = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].personnel.findUnique({
        where: {
            id
        },
        select: {
            userId: true
        }
    });
    if (!personnel) {
        throw new Error("Personnel not found");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.delete({
        where: {
            id: personnel.userId
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/personnel");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getPersonnel,
    getPersonnelById,
    createPersonnel,
    updatePersonnel,
    deletePersonnel
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPersonnel, "009d9154802923e00403972bedb8e05a4cea9813a7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPersonnelById, "4062199ab8fe103add992e37e5809273519fbb2cfe", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPersonnel, "40a9abb716dbfa5f224f8ebe401da5fc68b5ec2c91", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePersonnel, "60ee3806925cbc56d21d987a4a84bc45778b2178bd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePersonnel, "4059c1ebd627a5f3e6c253d26488d70e24f8e0ccaa", null);
}),
"[project]/apps/web/actions/program.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"004e5f690213c9f35e876ce2ab9b7a7a1806d535ed":"getCourses","00720d3b7b152044118128e1c5428c56f846c3f27a":"getPrograms","406ac3f7c742d84850f249b243cd0d75d76652cc6f":"getProgramById","40748706269859e655dca8ce99cfe0ba7bad230b31":"deleteProgram","40fec5913b9b6e4cbb88b5a91f9c2e868d007fd8d8":"createProgram","603a93e7b254e1decf103d59e7f33c5b6eb072f4d4":"updateProgram"},"",""] */ __turbopack_context__.s([
    "createProgram",
    ()=>createProgram,
    "deleteProgram",
    ()=>deleteProgram,
    "getCourses",
    ()=>getCourses,
    "getProgramById",
    ()=>getProgramById,
    "getPrograms",
    ()=>getPrograms,
    "updateProgram",
    ()=>updateProgram
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
async function getPrograms() {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].program.findMany({
        include: {
            faculty: true,
            department: true
        },
        orderBy: {
            nameEn: "asc"
        }
    });
}
async function getProgramById(id) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].program.findUnique({
        where: {
            id
        },
        include: {
            faculty: true,
            department: true,
            courses: {
                include: {
                    course: true
                },
                orderBy: {
                    semester: 'asc'
                }
            }
        }
    });
}
async function getCourses() {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].course.findMany({
        orderBy: {
            code: "asc"
        }
    });
}
async function createProgram(formData) {
    const nameTh = formData.get("nameTh");
    const nameEn = formData.get("nameEn");
    const degreeLevel = formData.get("degreeLevel");
    const departmentId = formData.get("departmentId");
    const description = formData.get("description");
    const credits = formData.get("credits") ? parseInt(formData.get("credits")) : null;
    const duration = formData.get("duration") || null;
    const objectives = formData.get("objectives") || null;
    const structure = formData.get("structure") || null;
    const admissionRequirements = formData.get("admissionRequirements") || null;
    const careerOpportunities = formData.get("careerOpportunities") || null;
    // Find faculty from department
    const department = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].department.findUnique({
        where: {
            id: departmentId
        }
    });
    if (!department) throw new Error("Department not found");
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].program.create({
        data: {
            nameTh,
            nameEn,
            degreeLevel,
            departmentId,
            facultyId: department.facultyId,
            description,
            credits,
            duration,
            objectives,
            structure,
            admissionRequirements,
            careerOpportunities
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/academic/program/programs");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin/academic/program/programs");
}
async function updateProgram(id, formData) {
    const nameTh = formData.get("nameTh");
    const nameEn = formData.get("nameEn");
    const degreeLevel = formData.get("degreeLevel");
    const departmentId = formData.get("departmentId");
    const description = formData.get("description") || null;
    const credits = formData.get("credits") ? parseInt(formData.get("credits")) : null;
    const duration = formData.get("duration") || null;
    const objectives = formData.get("objectives") || null;
    const structure = formData.get("structure") || null;
    const admissionRequirements = formData.get("admissionRequirements") || null;
    const careerOpportunities = formData.get("careerOpportunities") || null;
    const isAcceptingApplications = formData.get("isAcceptingApplications") === "true";
    // Find faculty from department
    const department = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].department.findUnique({
        where: {
            id: departmentId
        }
    });
    if (!department) throw new Error("Department not found");
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].program.update({
        where: {
            id
        },
        data: {
            nameTh,
            nameEn,
            degreeLevel,
            departmentId,
            facultyId: department.facultyId,
            description,
            credits,
            duration,
            objectives,
            structure,
            admissionRequirements,
            careerOpportunities,
            isAcceptingApplications
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/academic/program/programs");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin/academic/program/programs");
}
async function deleteProgram(id) {
    // Check for related data
    const program = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].program.findUnique({
        where: {
            id
        },
        include: {
            students: true
        }
    });
    if (!program) {
        throw new Error("Program not found");
    }
    // Check if program has related data
    if (program.students.length > 0) {
        throw new Error(`Cannot delete this program. It has ${program.students.length} student(s). Please remove or reassign them first.`);
    }
    // If no related data, proceed with deletion
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].program.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/program/programs");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getPrograms,
    getProgramById,
    getCourses,
    createProgram,
    updateProgram,
    deleteProgram
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPrograms, "00720d3b7b152044118128e1c5428c56f846c3f27a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProgramById, "406ac3f7c742d84850f249b243cd0d75d76652cc6f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCourses, "004e5f690213c9f35e876ce2ab9b7a7a1806d535ed", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createProgram, "40fec5913b9b6e4cbb88b5a91f9c2e868d007fd8d8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateProgram, "603a93e7b254e1decf103d59e7f33c5b6eb072f4d4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteProgram, "40748706269859e655dca8ce99cfe0ba7bad230b31", null);
}),
"[project]/apps/web/actions/faculty.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00bef1b00c4a741bb69b1b548539a2884dfb46efd0":"getFaculties","405e23e4c1f488eff9576cc8dec324306b3640cad9":"createFaculty","407bc182b1419741960b4ad086fa4b1ecce915cf8b":"deleteFaculty","40f919fbe87505cfbc920038347949c99407118840":"getFacultyById","609c7a2de25fcd5560e308343c2f35d8d45156001c":"updateFaculty"},"",""] */ __turbopack_context__.s([
    "createFaculty",
    ()=>createFaculty,
    "deleteFaculty",
    ()=>deleteFaculty,
    "getFaculties",
    ()=>getFaculties,
    "getFacultyById",
    ()=>getFacultyById,
    "updateFaculty",
    ()=>updateFaculty
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
async function getFaculties() {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].faculty.findMany({
        orderBy: {
            code: "asc"
        }
    });
}
async function getFacultyById(id) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].faculty.findUnique({
        where: {
            id
        }
    });
}
async function createFaculty(formData) {
    const code = formData.get("code");
    const nameTh = formData.get("nameTh");
    const nameEn = formData.get("nameEn");
    const description = formData.get("description");
    const logoUrl = formData.get("logoUrl");
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].faculty.create({
        data: {
            code,
            nameTh,
            nameEn,
            description,
            logoUrl: logoUrl || null
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/academic/program/faculties");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin/academic/program/faculties");
}
async function updateFaculty(id, formData) {
    const code = formData.get("code");
    const nameTh = formData.get("nameTh");
    const nameEn = formData.get("nameEn");
    const description = formData.get("description");
    const logoUrl = formData.get("logoUrl");
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].faculty.update({
        where: {
            id
        },
        data: {
            code,
            nameTh,
            nameEn,
            description,
            logoUrl: logoUrl || null
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/academic/program/faculties");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin/academic/program/faculties");
}
async function deleteFaculty(id) {
    // Check for related data
    const faculty = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].faculty.findUnique({
        where: {
            id
        },
        include: {
            departments: true,
            programs: true,
            personnel: true
        }
    });
    if (!faculty) {
        throw new Error("Faculty not found");
    }
    // Check if faculty has related data
    const relatedData = [];
    if (faculty.departments.length > 0) {
        relatedData.push(`${faculty.departments.length} department(s)`);
    }
    if (faculty.programs.length > 0) {
        relatedData.push(`${faculty.programs.length} program(s)`);
    }
    if (faculty.personnel.length > 0) {
        relatedData.push(`${faculty.personnel.length} personnel`);
    }
    if (relatedData.length > 0) {
        throw new Error(`Cannot delete this faculty. It has ${relatedData.join(", ")}. Please remove or reassign them first.`);
    }
    // If no related data, proceed with deletion
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].faculty.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/program/faculties");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getFaculties,
    getFacultyById,
    createFaculty,
    updateFaculty,
    deleteFaculty
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getFaculties, "00bef1b00c4a741bb69b1b548539a2884dfb46efd0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getFacultyById, "40f919fbe87505cfbc920038347949c99407118840", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createFaculty, "405e23e4c1f488eff9576cc8dec324306b3640cad9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateFaculty, "609c7a2de25fcd5560e308343c2f35d8d45156001c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteFaculty, "407bc182b1419741960b4ad086fa4b1ecce915cf8b", null);
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/apps/web/lib/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$next$2d$auth$2f$prisma$2d$adapter$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@next-auth/prisma-adapter/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/credentials.js [app-rsc] (ecmascript)");
;
;
;
;
const authOptions = {
    adapter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$next$2d$auth$2f$prisma$2d$adapter$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PrismaAdapter"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"]),
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login"
    },
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!user || !user.passwordHash) {
                    return null;
                }
                // Verify password
                const isValid = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].compare(credentials.password, user.passwordHash);
                if (!isValid) {
                    return null;
                }
                return {
                    id: user.id,
                    email: user.email,
                    role: user.role
                };
            }
        })
    ],
    callbacks: {
        async session ({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
        async jwt ({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        }
    }
};
}),
"[project]/apps/web/actions/interview.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4023c56cfcbf773f885484f779333e2c87edd44891":"createInterviewSlot","403c927a1516df76908a825a4af984bb4829ea2de7":"getMyInterviewDetails","405129c7ff5ad8470f46c637fe08017679a9342b07":"getAvailableInterviewSlots","40cdbc9d15640b80f4a76c0097bff8e51e7603a352":"getInterviewSlots","40fafa6a68fd02048d5efeef8b4c054a44c107d1e3":"getInterviewSlotDetails","60baca26bd002c5ee5ed03537c7a359d19f47dfa69":"updateInterviewScore","60bebc34c286cc12e9b1a40a4d6984b495932bb092":"bookInterviewSlot"},"",""] */ __turbopack_context__.s([
    "bookInterviewSlot",
    ()=>bookInterviewSlot,
    "createInterviewSlot",
    ()=>createInterviewSlot,
    "getAvailableInterviewSlots",
    ()=>getAvailableInterviewSlots,
    "getInterviewSlotDetails",
    ()=>getInterviewSlotDetails,
    "getInterviewSlots",
    ()=>getInterviewSlots,
    "getMyInterviewDetails",
    ()=>getMyInterviewDetails,
    "updateInterviewScore",
    ()=>updateInterviewScore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function getInterviewSlots(filters) {
    try {
        const where = {};
        if (filters?.programId) {
            where.programId = filters.programId;
        }
        if (filters?.upcoming) {
            where.startTime = {
                gte: new Date()
            };
        }
        const slots = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].interviewSlot.findMany({
            where,
            include: {
                program: {
                    select: {
                        id: true,
                        nameEn: true,
                        nameTh: true
                    }
                },
                interviewers: {
                    include: {
                        interviewer: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                title: true
                            }
                        }
                    }
                },
                interviewResults: {
                    select: {
                        id: true,
                        confirmedAt: true,
                        checkedInAt: true
                    }
                },
                _count: {
                    select: {
                        interviewResults: true
                    }
                }
            },
            orderBy: {
                startTime: "desc"
            }
        });
        return slots;
    } catch (error) {
        console.error("Error fetching interview slots:", error);
        return [];
    }
}
async function getAvailableInterviewSlots(programId) {
    try {
        const now = new Date();
        const slots = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].interviewSlot.findMany({
            where: {
                programId,
                startTime: {
                    gte: now // Only future slots
                }
            },
            include: {
                interviewResults: true,
                interviewers: {
                    include: {
                        interviewer: {
                            select: {
                                firstName: true,
                                lastName: true,
                                title: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                startTime: 'asc'
            }
        });
        // Filter slots that still have capacity
        const availableSlots = slots.filter((slot)=>{
            // Assuming each slot can handle multiple interviews (or set a max capacity)
            // For simplicity, we'll allow unlimited bookings per slot
            // In production, you might want to add a capacity field
            return true;
        });
        return availableSlots;
    } catch (error) {
        console.error("Error fetching interview slots:", error);
        return [];
    }
}
async function bookInterviewSlot(applicationId, slotId) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }
    try {
        // Check if application exists and belongs to user
        const application = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.findUnique({
            where: {
                id: applicationId
            },
            include: {
                applicant: true,
                interview: true
            }
        });
        if (!application) {
            throw new Error("Application not found");
        }
        const userId = session.user.id;
        if (application.applicant.userId !== userId) {
            throw new Error("Unauthorized: This application does not belong to you");
        }
        // Check if already has interview scheduled
        if (application.interview) {
            throw new Error("You already have an interview scheduled for this application");
        }
        // Check if slot exists and is in the future
        const slot = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].interviewSlot.findUnique({
            where: {
                id: slotId
            }
        });
        if (!slot) {
            throw new Error("Interview slot not found");
        }
        if (new Date(slot.startTime) < new Date()) {
            throw new Error("This interview slot has already passed");
        }
        // Create interview result (booking)
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].interviewResult.create({
            data: {
                applicationId,
                slotId,
                confirmedAt: new Date()
            }
        });
        // Update application status
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.update({
            where: {
                id: applicationId
            },
            data: {
                status: "INTERVIEW_COMPLETED" // Will be updated after actual interview
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/applicant/dashboard");
        return {
            success: true
        };
    } catch (error) {
        console.error("Error booking interview slot:", error);
        throw new Error(error.message || "Failed to book interview slot");
    }
}
async function getMyInterviewDetails(applicationId) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session || !session.user) {
        return null;
    }
    try {
        const application = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.findUnique({
            where: {
                id: applicationId
            },
            include: {
                interview: {
                    include: {
                        slot: {
                            include: {
                                interviewers: {
                                    include: {
                                        interviewer: {
                                            select: {
                                                firstName: true,
                                                lastName: true,
                                                title: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return application?.interview || null;
    } catch (error) {
        console.error("Error fetching interview details:", error);
        return null;
    }
}
async function updateInterviewScore(interviewResultId, data) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].interviewResult.update({
            where: {
                id: interviewResultId
            },
            data: {
                score: data.score,
                comments: data.comments,
                isPassed: data.isPassed,
                checkedInAt: new Date() // Mark as checked in when scored
            }
        });
        // Update application status to INTERVIEW_COMPLETED
        const interviewResult = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].interviewResult.findUnique({
            where: {
                id: interviewResultId
            },
            select: {
                applicationId: true
            }
        });
        if (interviewResult) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].application.update({
                where: {
                    id: interviewResult.applicationId
                },
                data: {
                    status: "INTERVIEW_COMPLETED"
                }
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/admissions/interviews");
        return {
            success: true
        };
    } catch (error) {
        console.error("Error updating interview score:", error);
        throw new Error("Failed to update interview score");
    }
}
async function getInterviewSlotDetails(slotId) {
    try {
        const slot = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].interviewSlot.findUnique({
            where: {
                id: slotId
            },
            include: {
                program: {
                    select: {
                        nameEn: true,
                        nameTh: true
                    }
                },
                interviewers: {
                    include: {
                        interviewer: {
                            select: {
                                firstName: true,
                                lastName: true,
                                title: true
                            }
                        }
                    }
                },
                interviewResults: {
                    include: {
                        application: {
                            include: {
                                applicant: true,
                                program: {
                                    select: {
                                        nameEn: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return slot;
    } catch (error) {
        console.error("Error fetching interview slot details:", error);
        return null;
    }
}
async function createInterviewSlot(data) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }
    // Check if user is admin or staff
    const userRole = session.user.role;
    if (userRole !== "ADMIN" && userRole !== "STAFF") {
        throw new Error("Unauthorized: Only admins and staff can create interview slots");
    }
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].$transaction(async (tx)=>{
            // 1. Create the interview slot
            const slot = await tx.interviewSlot.create({
                data: {
                    startTime: data.startTime,
                    endTime: data.endTime,
                    location: data.location,
                    coordinatorName: data.coordinatorName,
                    coordinatorPhone: data.coordinatorPhone,
                    description: data.description,
                    programId: data.programId || null,
                    interviewers: {
                        create: data.interviewerIds.map((id)=>({
                                interviewerId: id
                            }))
                    }
                }
            });
            // 2. Handle auto-assignment if requested and programId is provided
            if (data.autoAssignApplicants && data.programId) {
                const eligibleApplications = await tx.application.findMany({
                    where: {
                        programId: data.programId,
                        status: "INTERVIEW_READY",
                        interview: null
                    }
                });
                if (eligibleApplications.length > 0) {
                    // Create interview results for all eligible applicants
                    await tx.interviewResult.createMany({
                        data: eligibleApplications.map((app)=>({
                                applicationId: app.id,
                                slotId: slot.id
                            }))
                    });
                }
            }
            return slot;
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/admissions/interviews");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/admissions/interviews/new");
        return {
            success: true,
            slotId: result.id
        };
    } catch (error) {
        console.error("Error creating interview slot:", error);
        throw new Error("Failed to create interview slot");
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getInterviewSlots,
    getAvailableInterviewSlots,
    bookInterviewSlot,
    getMyInterviewDetails,
    updateInterviewScore,
    getInterviewSlotDetails,
    createInterviewSlot
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInterviewSlots, "40cdbc9d15640b80f4a76c0097bff8e51e7603a352", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAvailableInterviewSlots, "405129c7ff5ad8470f46c637fe08017679a9342b07", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(bookInterviewSlot, "60bebc34c286cc12e9b1a40a4d6984b495932bb092", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMyInterviewDetails, "403c927a1516df76908a825a4af984bb4829ea2de7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateInterviewScore, "60baca26bd002c5ee5ed03537c7a359d19f47dfa69", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInterviewSlotDetails, "40fafa6a68fd02048d5efeef8b4c054a44c107d1e3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createInterviewSlot, "4023c56cfcbf773f885484f779333e2c87edd44891", null);
}),
"[project]/apps/web/.next-internal/server/app/admin/admissions/interviews/new/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/apps/web/actions/personnel.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/apps/web/actions/program.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/apps/web/actions/faculty.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/apps/web/actions/interview.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$personnel$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/personnel.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$program$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/program.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$faculty$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/faculty.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$interview$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/interview.ts [app-rsc] (ecmascript)");
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
"[project]/apps/web/.next-internal/server/app/admin/admissions/interviews/new/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/apps/web/actions/personnel.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/apps/web/actions/program.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/apps/web/actions/faculty.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/apps/web/actions/interview.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "000f7a1cb658a9a6741f035a805f2983db08d56808",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logoutAdmin"],
    "0042d76f240ee2a93513d3b83c0a780d6960763f9a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSystemSettings"],
    "0048abae6b6c31cf4a1031d6650cdc9969ec5f17a2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTranslations"],
    "004e5f690213c9f35e876ce2ab9b7a7a1806d535ed",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$program$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCourses"],
    "00720d3b7b152044118128e1c5428c56f846c3f27a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$program$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrograms"],
    "009d9154802923e00403972bedb8e05a4cea9813a7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$personnel$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPersonnel"],
    "00bef1b00c4a741bb69b1b548539a2884dfb46efd0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$faculty$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFaculties"],
    "4023c56cfcbf773f885484f779333e2c87edd44891",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$interview$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createInterviewSlot"],
    "4059c1ebd627a5f3e6c253d26488d70e24f8e0ccaa",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$personnel$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deletePersonnel"],
    "405e23e4c1f488eff9576cc8dec324306b3640cad9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$faculty$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createFaculty"],
    "4062199ab8fe103add992e37e5809273519fbb2cfe",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$personnel$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPersonnelById"],
    "406ac3f7c742d84850f249b243cd0d75d76652cc6f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$program$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProgramById"],
    "40748706269859e655dca8ce99cfe0ba7bad230b31",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$program$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteProgram"],
    "407bc182b1419741960b4ad086fa4b1ecce915cf8b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$faculty$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteFaculty"],
    "40a9abb716dbfa5f224f8ebe401da5fc68b5ec2c91",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$personnel$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPersonnel"],
    "40f919fbe87505cfbc920038347949c99407118840",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$faculty$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFacultyById"],
    "40fec5913b9b6e4cbb88b5a91f9c2e868d007fd8d8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$program$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createProgram"],
    "603a93e7b254e1decf103d59e7f33c5b6eb072f4d4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$program$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateProgram"],
    "609c7a2de25fcd5560e308343c2f35d8d45156001c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$faculty$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateFaculty"],
    "60ee3806925cbc56d21d987a4a84bc45778b2178bd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$personnel$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePersonnel"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$admissions$2f$interviews$2f$new$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$personnel$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$program$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$faculty$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE6__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$actions$2f$interview$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/apps/web/.next-internal/server/app/admin/admissions/interviews/new/page/actions.js { ACTIONS_MODULE0 => "[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/apps/web/actions/personnel.ts [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/apps/web/actions/program.ts [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/apps/web/actions/faculty.ts [app-rsc] (ecmascript)", ACTIONS_MODULE6 => "[project]/apps/web/actions/interview.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$translation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/translation.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$admin$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/admin-auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$settings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/settings.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$personnel$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/personnel.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$program$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/program.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$faculty$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/faculty.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$actions$2f$interview$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/actions/interview.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d3f4bd5a._.js.map