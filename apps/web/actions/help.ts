"use server";

import { prisma, HelpArticleVisibility } from "@ums/lib";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "./auth";

// --- Categories ---

export async function getHelpCategories() {
    return await prisma.helpCategory.findMany({
        orderBy: { order: "asc" },
        include: {
            _count: {
                select: { articles: true },
            },
        },
    });
}

export async function createHelpCategory(formData: FormData) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    if (!name) {
        throw new Error("Category name is required");
    }

    await prisma.helpCategory.create({
        data: {
            name,
            description,
            order,
        },
    });

    revalidatePath("/admin/help-center");
}

export async function deleteHelpCategory(id: string) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    await prisma.helpCategory.delete({
        where: { id },
    });

    revalidatePath("/admin/help-center");
}

// --- Articles ---

export async function getHelpArticles(categoryId?: string) {
    return await prisma.helpArticle.findMany({
        where: categoryId ? { categoryId } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
            category: true,
            author: {
                select: { email: true },
            },
        },
    });
}

export async function getPublicHelpArticles(userRole?: string) {
    const visibilityFilter: HelpArticleVisibility[] = [HelpArticleVisibility.PUBLIC];

    if (userRole === "STUDENT") {
        visibilityFilter.push(HelpArticleVisibility.STUDENT);
    } else if (userRole === "INSTRUCTOR") {
        visibilityFilter.push(HelpArticleVisibility.INSTRUCTOR);
    } else if (userRole === "STAFF") {
        visibilityFilter.push(HelpArticleVisibility.STAFF);
    } else if (userRole === "ADMIN") {
        visibilityFilter.push(HelpArticleVisibility.ADMIN);
    }

    return await prisma.helpArticle.findMany({
        where: {
            isPublished: true,
            visibility: {
                in: visibilityFilter,
            },
        },
        orderBy: { createdAt: "desc" },
        include: {
            category: true,
        },
    });
}

export async function getHelpArticleById(id: string) {
    const article = await prisma.helpArticle.findUnique({
        where: { id },
        include: {
            category: true,
            author: {
                select: { email: true },
            },
        },
    });

    if (article) {
        // Increment view count
        await prisma.helpArticle.update({
            where: { id },
            data: { views: { increment: 1 } },
        });
    }

    return article;
}

export async function createHelpArticle(formData: FormData) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const categoryId = formData.get("categoryId") as string;
    const visibility = formData.get("visibility") as HelpArticleVisibility;
    const isPublished = formData.get("isPublished") === "true";

    if (!title || !content || !categoryId) {
        throw new Error("Title, content, and category are required");
    }

    await prisma.helpArticle.create({
        data: {
            title,
            content,
            categoryId,
            visibility,
            isPublished,
            authorId: session.userId,
        },
    });

    revalidatePath("/admin/help-center");
    revalidatePath("/help");
}

export async function deleteHelpArticle(id: string) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    await prisma.helpArticle.delete({
        where: { id },
    });

    revalidatePath("/admin/help-center");
    revalidatePath("/help");
}

export async function togglePublishHelpArticle(id: string, isPublished: boolean) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    await prisma.helpArticle.update({
        where: { id },
        data: { isPublished },
    });

    revalidatePath("/admin/help-center");
    revalidatePath("/help");
}

export async function searchHelpArticles(query: string, userRole?: string) {
    const visibilityFilter: HelpArticleVisibility[] = [HelpArticleVisibility.PUBLIC];

    if (userRole === "STUDENT") {
        visibilityFilter.push(HelpArticleVisibility.STUDENT);
    } else if (userRole === "INSTRUCTOR") {
        visibilityFilter.push(HelpArticleVisibility.INSTRUCTOR);
    } else if (userRole === "STAFF") {
        visibilityFilter.push(HelpArticleVisibility.STAFF);
    } else if (userRole === "ADMIN") {
        visibilityFilter.push(HelpArticleVisibility.ADMIN);
    }

    return await prisma.helpArticle.findMany({
        where: {
            isPublished: true,
            visibility: {
                in: visibilityFilter,
            },
            OR: [
                { title: { contains: query } },
                { content: { contains: query } },
            ],
        },
        orderBy: { views: "desc" },
        include: {
            category: true,
        },
        take: 10,
    });
}
