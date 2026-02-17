"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";
import { dictionary } from "@/lib/dictionary";

export async function getTranslations() {
    try {
        // @ts-ignore - Prisma client update might not be picked up by IDE yet
        const translations = await prisma.translation.findMany();

        // Convert array to object { key: { en: valueEn, th: valueTh } }
        const translationMap: Record<string, { en: string; th: string }> = {};

        translations.forEach((t: any) => {
            translationMap[t.key] = {
                en: t.valueEn,
                th: t.valueTh,
            };
        });

        return translationMap;
    } catch (error) {
        console.error("Failed to fetch translations:", error);
        return {};
    }
}

export async function updateTranslation(key: string, values: { en: string; th: string }) {
    try {
        // @ts-ignore
        await prisma.translation.upsert({
            where: { key },
            update: {
                valueEn: values.en,
                valueTh: values.th,
            },
            create: {
                key,
                valueEn: values.en,
                valueTh: values.th,
            },
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to update translation:", error);
        return { success: false, error: "Failed to update translation" };
    }
}

export async function seedTranslations() {
    try {
        const operations = [];

        // Helper to flatten the dictionary
        const flattenDictionary = (obj: any, prefix = "") => {
            let result: Record<string, string> = {};
            for (const key in obj) {
                if (typeof obj[key] === "object" && obj[key] !== null) {
                    const nested = flattenDictionary(obj[key], `${prefix}${key}.`);
                    result = { ...result, ...nested };
                } else {
                    result[`${prefix}${key}`] = obj[key];
                }
            }
            return result;
        };

        const enFlat = flattenDictionary(dictionary.en);
        const thFlat = flattenDictionary(dictionary.th);

        // Get all unique keys
        const allKeys = new Set([...Object.keys(enFlat), ...Object.keys(thFlat)]);

        for (const key of Array.from(allKeys)) {
            operations.push(
                // @ts-ignore
                prisma.translation.upsert({
                    where: { key },
                    update: {
                        // Only update if missing? Or overwrite? 
                        // Let's overwrite to ensure sync with file initially, 
                        // but in production we might want to be careful.
                        // For this task, we assume file is source of truth for initial seed.
                        valueEn: enFlat[key] || "",
                        valueTh: thFlat[key] || "",
                    },
                    create: {
                        key,
                        valueEn: enFlat[key] || "",
                        valueTh: thFlat[key] || "",
                    },
                })
            );
        }

        await prisma.$transaction(operations);

        revalidatePath("/");
        return { success: true, count: operations.length };
    } catch (error) {
        console.error("Failed to seed translations:", error);
        return { success: false, error: String(error) };
    }
}
