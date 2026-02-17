"use server";

import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { prisma } from "@ums/lib";
import crypto from "crypto";

/**
 * Generate 2FA secret for a user
 */
export async function generate2FASecret(userId: string, email: string) {
    const secret = speakeasy.generateSecret({
        name: `UMS (${email})`,
        issuer: "University Management System",
        length: 32,
    });

    // Generate QR code
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

    return {
        secret: secret.base32,
        qrCode: qrCodeUrl,
        otpauthUrl: secret.otpauth_url,
    };
}

/**
 * Verify 2FA token
 */
export async function verify2FAToken(secret: string, token: string): Promise<boolean> {
    return speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token,
        window: 2, // Allow 2 time steps before/after for clock skew
    });
}

/**
 * Enable 2FA for a user
 */
export async function enable2FA(userId: string, secret: string, token: string) {
    // Verify the token first
    const isValid = await verify2FAToken(secret, token);

    if (!isValid) {
        throw new Error("Invalid verification code");
    }

    // Generate backup codes
    const backupCodes = generateBackupCodes();

    // Save to database
    await prisma.user.update({
        where: { id: userId },
        data: {
            twoFactorSecret: secret,
            twoFactorEnabled: true,
            twoFactorBackupCodes: JSON.stringify(backupCodes),
        },
    });

    return backupCodes;
}

/**
 * Disable 2FA for a user
 */
export async function disable2FA(userId: string, password: string) {
    const bcrypt = require("bcryptjs");

    // Verify password first
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
        throw new Error("Invalid password");
    }

    // Disable 2FA
    await prisma.user.update({
        where: { id: userId },
        data: {
            twoFactorSecret: null,
            twoFactorEnabled: false,
            twoFactorBackupCodes: null,
        },
    });
}

/**
 * Verify 2FA code (including backup codes)
 */
export async function verify2FACode(userId: string, code: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            twoFactorSecret: true,
            twoFactorBackupCodes: true,
        },
    });

    if (!user || !user.twoFactorSecret) {
        return false;
    }

    // Try TOTP first
    const isValidTotp = await verify2FAToken(user.twoFactorSecret, code);

    if (isValidTotp) {
        return true;
    }

    // Try backup codes
    if (user.twoFactorBackupCodes) {
        const backupCodes: string[] = JSON.parse(user.twoFactorBackupCodes);
        const codeIndex = backupCodes.indexOf(code);

        if (codeIndex !== -1) {
            // Remove used backup code
            backupCodes.splice(codeIndex, 1);

            await prisma.user.update({
                where: { id: userId },
                data: {
                    twoFactorBackupCodes: JSON.stringify(backupCodes),
                },
            });

            return true;
        }
    }

    return false;
}

/**
 * Generate backup codes
 */
function generateBackupCodes(count: number = 10): string[] {
    const codes: string[] = [];

    for (let i = 0; i < count; i++) {
        const code = crypto.randomBytes(4).toString("hex").toUpperCase();
        codes.push(code);
    }

    return codes;
}

/**
 * Check if user has 2FA enabled
 */
export async function is2FAEnabled(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { twoFactorEnabled: true },
    });

    return user?.twoFactorEnabled || false;
}
