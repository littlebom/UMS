"use server";

import { prisma } from "@ums/lib";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "./auth";

// --- Settings ---

export async function getAiSettings() {
    const settings = await prisma.aiSettings.findFirst();
    if (!settings) {
        // Create default settings if not exists
        return await prisma.aiSettings.create({
            data: {},
        });
    }
    return settings;
}

export async function updateAiSettings(formData: FormData) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const botName = formData.get("botName") as string;
    const welcomeMessage = formData.get("welcomeMessage") as string;
    const personality = formData.get("personality") as string;
    const isActive = formData.get("isActive") === "true";

    const settings = await getAiSettings();

    await prisma.aiSettings.update({
        where: { id: settings.id },
        data: {
            botName,
            welcomeMessage,
            personality,
            isActive,
        },
    });

    revalidatePath("/admin/ai-agent");
}

// --- Knowledge Base ---

export async function getKnowledgeBaseItems() {
    return await prisma.aiKnowledgeBase.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function createKnowledgeBaseItem(formData: FormData) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;
    const category = formData.get("category") as string;

    if (!question || !answer) {
        throw new Error("Question and Answer are required");
    }

    await prisma.aiKnowledgeBase.create({
        data: {
            question,
            answer,
            category,
        },
    });

    revalidatePath("/admin/ai-agent/knowledge");
}

export async function deleteKnowledgeBaseItem(id: string) {
    const session = await getAdminSession();
    if (!session) {
        throw new Error("Unauthorized");
    }

    await prisma.aiKnowledgeBase.delete({
        where: { id },
    });

    revalidatePath("/admin/ai-agent/knowledge");
}

// --- Chat Logic (Simple Rule-Based for now) ---

export async function sendMessageToAi(conversationId: string | null, message: string) {
    // 1. Find or create conversation
    let conversation;
    if (conversationId) {
        conversation = await prisma.aiConversation.findUnique({
            where: { id: conversationId },
        });
    }

    if (!conversation) {
        conversation = await prisma.aiConversation.create({
            data: {},
        });
    }

    // 2. Save User Message
    await prisma.aiMessage.create({
        data: {
            conversationId: conversation.id,
            role: "user",
            content: message,
        },
    });

    // 3. Generate AI Response (Simple Keyword Matching)
    const knowledgeBase = await prisma.aiKnowledgeBase.findMany({
        where: { isActive: true },
    });

    let responseContent = "I'm sorry, I don't have information about that yet. Please contact the university staff directly.";
    const lowerMessage = message.toLowerCase();

    // Very basic keyword matching
    for (const item of knowledgeBase) {
        const keywords = item.question.toLowerCase().split(" ");
        const matchCount = keywords.filter(k => lowerMessage.includes(k)).length;

        // If more than 50% of keywords match (simple heuristic)
        if (matchCount / keywords.length > 0.5) {
            responseContent = item.answer;
            break;
        }
    }

    // Fallback for greetings
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
        const settings = await getAiSettings();
        responseContent = settings.welcomeMessage;
    }

    // 4. Save AI Response
    const aiMessage = await prisma.aiMessage.create({
        data: {
            conversationId: conversation.id,
            role: "assistant",
            content: responseContent,
        },
    });

    return {
        conversationId: conversation.id,
        message: aiMessage,
    };
}

export async function getConversationMessages(conversationId: string) {
    return await prisma.aiMessage.findMany({
        where: { conversationId },
        orderBy: { createdAt: "asc" },
    });
}
