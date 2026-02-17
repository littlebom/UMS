"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "./auth";

export async function getSystemSettings() {
    let settings = await prisma.systemSettings.findFirst();

    if (!settings) {
        // Create default settings if not exists
        settings = await prisma.systemSettings.create({
            data: {},
        });
    } else {
        // Auto-update legacy defaults if they match the old defaults
        // This ensures the user sees the requested default values
        const isOldDefaultName = settings.universityName === "University Management System";
        const isOldDefaultNameTh = settings.universityNameTh === "ระบบจัดการมหาวิทยาลัย";

        if (isOldDefaultName || isOldDefaultNameTh) {
            settings = await prisma.systemSettings.update({
                where: { id: settings.id },
                data: {
                    universityName: isOldDefaultName ? "University MS" : settings.universityName,
                    universityNameTh: isOldDefaultNameTh ? "ระบบจัดการข้อมูลมหาวิทยาลัย" : settings.universityNameTh,
                }
            });
        }
    }

    return settings;
}

export async function updateSystemSettings(formData: FormData) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const universityName = formData.get("universityName") as string;
    const universityNameTh = formData.get("universityNameTh") as string;
    const logoUrl = formData.get("logoUrl") as string;
    const primaryColor = formData.get("primaryColor") as string;
    const secondaryColor = formData.get("secondaryColor") as string;
    const backgroundColor = formData.get("backgroundColor") as string;
    const studentIdFormat = formData.get("studentIdFormat") as string;
    const defaultLanguage = formData.get("defaultLanguage") as string;

    console.log("Updating settings:", { universityName, universityNameTh, logoUrl });

    const settings = await getSystemSettings();

    await prisma.systemSettings.update({
        where: { id: settings.id },
        data: {
            universityName,
            universityNameTh,
            logoUrl: logoUrl || null,
            primaryColor,
            secondaryColor,
            backgroundColor,
            studentIdFormat,
            defaultLanguage,
        },
    });

    revalidatePath("/admin/settings");
    revalidatePath("/");
}
