"use server";

import { prisma, AnnouncementTarget, UserRole } from "@ums/lib";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "./auth";

export async function createAnnouncement(formData: FormData) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const target = formData.get("target") as AnnouncementTarget;
    const isPublished = formData.get("isPublished") === "true";

    if (!title || !content || !target) {
        throw new Error("Missing required fields");
    }

    await prisma.announcement.create({
        data: {
            title,
            content,
            target,
            isPublished,
            publishedAt: isPublished ? new Date() : null,
            authorId: session.userId,
        },
    });

    revalidatePath("/admin/announcements");
    revalidatePath("/student/announcements");
    revalidatePath("/instructor/announcements");
}

export async function getAnnouncements() {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    return await prisma.announcement.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            author: {
                select: { email: true },
            },
        },
    });
}

export async function getPublishedAnnouncements(role: UserRole) {
    // Logic to filter announcements based on user role
    // ALL -> everyone
    // STUDENTS -> only students
    // INSTRUCTORS -> only instructors
    // STAFF -> only staff

    const whereClause: any = {
        isPublished: true,
        OR: [
            { target: "ALL" },
        ],
    };

    if (role === "STUDENT") {
        whereClause.OR.push({ target: "STUDENTS" });
    } else if (role === "INSTRUCTOR") {
        whereClause.OR.push({ target: "INSTRUCTORS" });
    } else if (role === "STAFF") {
        whereClause.OR.push({ target: "STAFF" });
    }

    return await prisma.announcement.findMany({
        where: whereClause,
        orderBy: { publishedAt: "desc" },
        include: {
            author: {
                select: { email: true }, // Or name if available
            },
        },
    });
}

export async function getPublicAnnouncements() {
    return await prisma.announcement.findMany({
        where: {
            isPublished: true,
            target: AnnouncementTarget.ALL,
        },
        orderBy: { publishedAt: "desc" },
        take: 4,
        include: {
            author: {
                select: { email: true },
            },
        },
    });
}

export async function deleteAnnouncement(id: string) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    await prisma.announcement.delete({
        where: { id },
    });

    revalidatePath("/admin/announcements");
}

export async function togglePublishAnnouncement(id: string, isPublished: boolean) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    await prisma.announcement.update({
        where: { id },
        data: {
            isPublished,
            publishedAt: isPublished ? new Date() : null,
        },
    });

    revalidatePath("/admin/announcements");
    revalidatePath("/student/announcements");
}
