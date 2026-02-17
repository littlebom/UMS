"use server";

import { prisma } from "@ums/lib";
import { getAdminSession } from "./auth";

export interface FileInfo {
    id: string;
    url: string;
    type: string;
    uploadedAt: Date;
    size?: number;
    relatedTo: string;
    relatedId: string;
    uploaderName?: string;
    fileName: string;
}

export async function getAllFiles() {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    // 1. Documents
    const documents = await prisma.document.findMany({
        include: {
            application: {
                include: {
                    applicant: true,
                    program: true,
                },
            },
        },
        orderBy: { uploadedAt: "desc" },
    });

    const documentFiles: FileInfo[] = documents.map((doc) => ({
        id: doc.id,
        url: doc.url,
        type: doc.type,
        uploadedAt: doc.uploadedAt,
        relatedTo: "Application",
        relatedId: doc.applicationId,
        uploaderName: `${doc.application.applicant.firstName} ${doc.application.applicant.lastName}`,
        fileName: doc.url.split("/").pop() || "Document",
    }));

    // 2. Payment Slips
    const payments = await prisma.payment.findMany({
        where: { slipUrl: { not: null } },
        include: {
            invoice: {
                include: {
                    student: {
                        include: { user: true },
                    },
                },
            },
        },
        orderBy: { paidAt: "desc" },
    });

    const paymentFiles: FileInfo[] = payments.map((pay) => ({
        id: pay.id,
        url: pay.slipUrl!,
        type: "PAYMENT_SLIP",
        uploadedAt: pay.paidAt,
        relatedTo: "Payment",
        relatedId: pay.id,
        uploaderName: `${pay.invoice.student.firstName} ${pay.invoice.student.lastName}`,
        fileName: pay.slipUrl!.split("/").pop() || "Payment Slip",
    }));

    // 3. Faculty Logos
    const faculties = await prisma.faculty.findMany({
        where: { logoUrl: { not: null } },
    });
    const facultyFiles: FileInfo[] = faculties.map((f) => ({
        id: f.id,
        url: f.logoUrl!,
        type: "LOGO",
        uploadedAt: new Date(), // No timestamp available
        relatedTo: "Faculty",
        relatedId: f.id,
        uploaderName: "System Admin",
        fileName: f.logoUrl!.split("/").pop() || `${f.nameEn} Logo`,
    }));

    // 4. Announcement Images
    const announcements = await prisma.announcement.findMany({
        where: { imageUrl: { not: null } },
        orderBy: { createdAt: "desc" },
    });
    const announcementFiles: FileInfo[] = announcements.map((a) => ({
        id: a.id,
        url: a.imageUrl!,
        type: "IMAGE",
        uploadedAt: a.createdAt,
        relatedTo: "Announcement",
        relatedId: a.id,
        uploaderName: "System Admin",
        fileName: a.imageUrl!.split("/").pop() || a.title,
    }));

    // 5. Banner Images
    const banners = await prisma.banner.findMany({
        // imageUrl is required in schema, so no filter needed strictly, but good for safety if changed
        orderBy: { createdAt: "desc" },
    });
    const bannerFiles: FileInfo[] = banners.map((b) => ({
        id: b.id,
        url: b.imageUrl,
        type: "BANNER",
        uploadedAt: b.createdAt,
        relatedTo: "Banner",
        relatedId: b.id,
        uploaderName: "System Admin",
        fileName: b.imageUrl.split("/").pop() || b.title,
    }));

    // 6. Profile Images (Applicant, Personnel, Student)
    const applicants = await prisma.applicant.findMany({
        where: { profileImageUrl: { not: null } },
    });
    const applicantFiles: FileInfo[] = applicants.map((a) => ({
        id: a.id,
        url: a.profileImageUrl!,
        type: "PROFILE_PHOTO",
        uploadedAt: new Date(),
        relatedTo: "Applicant",
        relatedId: a.id,
        uploaderName: `${a.firstName} ${a.lastName}`,
        fileName: a.profileImageUrl!.split("/").pop() || `${a.firstName} ${a.lastName}`,
    }));

    const personnel = await prisma.personnel.findMany({
        where: { profileImageUrl: { not: null } },
    });
    const personnelFiles: FileInfo[] = personnel.map((p) => ({
        id: p.id,
        url: p.profileImageUrl!,
        type: "PROFILE_PHOTO",
        uploadedAt: new Date(),
        relatedTo: "Personnel",
        relatedId: p.id,
        uploaderName: `${p.firstName} ${p.lastName}`,
        fileName: p.profileImageUrl!.split("/").pop() || `${p.firstName} ${p.lastName}`,
    }));

    const students = await prisma.student.findMany({
        where: { profileImageUrl: { not: null } },
    });
    const studentFiles: FileInfo[] = students.map((s) => ({
        id: s.id,
        url: s.profileImageUrl!,
        type: "PROFILE_PHOTO",
        uploadedAt: new Date(), // Students have birthDate but no createdAt
        relatedTo: "Student",
        relatedId: s.id,
        uploaderName: `${s.firstName} ${s.lastName}`,
        fileName: s.profileImageUrl!.split("/").pop() || `${s.firstName} ${s.lastName}`,
    }));

    // Combine all
    const allFiles = [
        ...documentFiles,
        ...paymentFiles,
        ...facultyFiles,
        ...announcementFiles,
        ...bannerFiles,
        ...applicantFiles,
        ...personnelFiles,
        ...studentFiles,
    ];

    // Sort by uploadedAt desc
    return allFiles.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
}

export async function getFileStats() {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    const [docs, payments, faculties, announcements, banners, applicants, personnel, students] = await Promise.all([
        prisma.document.count(),
        prisma.payment.count({ where: { slipUrl: { not: null } } }),
        prisma.faculty.count({ where: { logoUrl: { not: null } } }),
        prisma.announcement.count({ where: { imageUrl: { not: null } } }),
        prisma.banner.count(),
        prisma.applicant.count({ where: { profileImageUrl: { not: null } } }),
        prisma.personnel.count({ where: { profileImageUrl: { not: null } } }),
        prisma.student.count({ where: { profileImageUrl: { not: null } } }),
    ]);

    return {
        totalFiles: docs + payments + faculties + announcements + banners + applicants + personnel + students,
        documentFiles: docs,
        paymentFiles: payments,
        mediaFiles: faculties + announcements + banners + applicants + personnel + students,
    };
}

export async function getAllMedia() {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    // Announcements with images
    const announcements = await prisma.announcement.findMany({
        where: { imageUrl: { not: null } },
        select: { id: true, imageUrl: true, title: true },
        orderBy: { createdAt: "desc" },
        take: 8,
    });

    // Banners with images
    const banners = await prisma.banner.findMany({
        select: { id: true, imageUrl: true, title: true },
        orderBy: { createdAt: "desc" },
        take: 8,
    });

    // Faculty logos
    const facultyLogos = await prisma.faculty.findMany({
        where: { logoUrl: { not: null } },
        select: { id: true, logoUrl: true, nameTh: true, nameEn: true },
        take: 8,
    });

    return { announcements, banners, facultyLogos };
}

export async function getRecentProfiles() {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const applicants = await prisma.applicant.findMany({
        where: { profileImageUrl: { not: null } },
        select: { profileImageUrl: true, firstName: true, lastName: true },
        orderBy: { id: "desc" }, // Applicant doesn't have createdAt, use id
        take: 4,
    });
    const personnel = await prisma.personnel.findMany({
        where: { profileImageUrl: { not: null } },
        select: { profileImageUrl: true, firstName: true, lastName: true },
        orderBy: { id: "desc" }, // Personnel doesn't have createdAt, use id
        take: 4,
    });
    const students = await prisma.student.findMany({
        where: { profileImageUrl: { not: null } },
        select: { profileImageUrl: true, firstName: true, lastName: true },
        orderBy: { id: "desc" }, // Student doesn't have createdAt, use id
        take: 4,
    });

    const profiles: { url: string; name: string; type: string }[] = [];
    applicants.forEach((a) => {
        profiles.push({ url: a.profileImageUrl!, name: `${a.firstName} ${a.lastName}`, type: "Applicant" });
    });
    personnel.forEach((p) => {
        profiles.push({ url: p.profileImageUrl!, name: `${p.firstName} ${p.lastName}`, type: "Personnel" });
    });
    students.forEach((s) => {
        profiles.push({ url: s.profileImageUrl!, name: `${s.firstName} ${s.lastName}`, type: "Student" });
    });
    return profiles;
}


export async function deleteFile(fileId: string, fileType: string) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    switch (fileType) {
        case "document":
        case "Application": // Handle both cases just in case
            await prisma.document.delete({ where: { id: fileId } });
            break;
        case "payment":
        case "Payment":
            await prisma.payment.update({ where: { id: fileId }, data: { slipUrl: null } });
            break;
        case "faculty":
        case "Faculty":
            await prisma.faculty.update({ where: { id: fileId }, data: { logoUrl: null } });
            break;
        case "announcement":
        case "Announcement":
            await prisma.announcement.update({ where: { id: fileId }, data: { imageUrl: null } });
            break;
        case "banner":
        case "Banner":
            // Banner imageUrl is required, so we might delete the banner or set to empty string?
            // Schema says String (required). So we probably have to delete the banner or replace with placeholder.
            // Let's assume delete banner for now as it's "File Management" -> "Delete File" implies removing the resource if it's just a wrapper.
            // But Banner has other fields. Let's try to delete the Banner record itself if it's just an image wrapper.
            await prisma.banner.delete({ where: { id: fileId } });
            break;
        case "applicant":
        case "Applicant":
            await prisma.applicant.update({ where: { id: fileId }, data: { profileImageUrl: null } });
            break;
        case "personnel":
        case "Personnel":
            await prisma.personnel.update({ where: { id: fileId }, data: { profileImageUrl: null } });
            break;
        case "student":
        case "Student":
            await prisma.student.update({ where: { id: fileId }, data: { profileImageUrl: null } });
            break;
        default:
            throw new Error(`Unknown file type: ${fileType}`);
    }
}
