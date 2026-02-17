"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "./auth";

export async function getBanners(onlyActive = true) {
    return await prisma.banner.findMany({
        where: onlyActive ? { isActive: true } : undefined,
        orderBy: { order: "asc" },
    });
}

export async function createBanner(formData: FormData) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const linkUrl = formData.get("linkUrl") as string;
    const isActive = formData.get("isActive") === "true";
    const order = parseInt(formData.get("order") as string) || 0;

    if (!title || !imageUrl) {
        throw new Error("Title and Image URL are required");
    }

    await prisma.banner.create({
        data: {
            title,
            description,
            imageUrl,
            linkUrl,
            isActive,
            order,
        },
    });

    revalidatePath("/");
    revalidatePath("/admin/cms/banners");
}

export async function updateBanner(id: string, formData: FormData) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const linkUrl = formData.get("linkUrl") as string;
    const isActive = formData.get("isActive") === "true";
    const order = parseInt(formData.get("order") as string) || 0;

    await prisma.banner.update({
        where: { id },
        data: {
            title,
            description,
            imageUrl,
            linkUrl,
            isActive,
            order,
        },
    });

    revalidatePath("/");
    revalidatePath("/admin/cms/banners");
}

export async function deleteBanner(id: string) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    await prisma.banner.delete({
        where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/cms/banners");
}

export async function toggleBannerStatus(id: string, isActive: boolean) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    await prisma.banner.update({
        where: { id },
        data: { isActive },
    });

    revalidatePath("/");
    revalidatePath("/admin/cms/banners");
}
