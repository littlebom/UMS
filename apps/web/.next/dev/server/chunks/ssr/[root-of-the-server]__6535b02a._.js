module.exports = [
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/apps/web/lib/two-factor.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40ea26d9e48da64fe0cc93af405be99c7d7b0109e2":"is2FAEnabled","60419f5816413eadf0cd78ecbd091561f3afba3d26":"verify2FAToken","606d2831050cb27e71f2be388caaeb214d4eb0064d":"verify2FACode","609792c38d4910a9763936d65978bfa47a833d64ea":"disable2FA","60f6fdc79e6b90727bf036cf8a55c8d04c7649670c":"generate2FASecret","70fa5943847165d1cb133bbae4f4f32faa6177ca73":"enable2FA"},"",""] */ __turbopack_context__.s([
    "disable2FA",
    ()=>disable2FA,
    "enable2FA",
    ()=>enable2FA,
    "generate2FASecret",
    ()=>generate2FASecret,
    "is2FAEnabled",
    ()=>is2FAEnabled,
    "verify2FACode",
    ()=>verify2FACode,
    "verify2FAToken",
    ()=>verify2FAToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$speakeasy$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/speakeasy/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qrcode/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/lib/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function generate2FASecret(userId, email) {
    const secret = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$speakeasy$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].generateSecret({
        name: `UMS (${email})`,
        issuer: "University Management System",
        length: 32
    });
    // Generate QR code
    const qrCodeUrl = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].toDataURL(secret.otpauth_url);
    return {
        secret: secret.base32,
        qrCode: qrCodeUrl,
        otpauthUrl: secret.otpauth_url
    };
}
async function verify2FAToken(secret, token) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$speakeasy$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].totp.verify({
        secret,
        encoding: "base32",
        token,
        window: 2
    });
}
async function enable2FA(userId, secret, token) {
    // Verify the token first
    const isValid = await verify2FAToken(secret, token);
    if (!isValid) {
        throw new Error("Invalid verification code");
    }
    // Generate backup codes
    const backupCodes = generateBackupCodes();
    // Save to database
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.update({
        where: {
            id: userId
        },
        data: {
            twoFactorSecret: secret,
            twoFactorEnabled: true,
            twoFactorBackupCodes: JSON.stringify(backupCodes)
        }
    });
    return backupCodes;
}
async function disable2FA(userId, password) {
    const bcrypt = __turbopack_context__.r("[project]/node_modules/bcryptjs/umd/index.js [app-rsc] (ecmascript)");
    // Verify password first
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.findUnique({
        where: {
            id: userId
        }
    });
    if (!user) {
        throw new Error("User not found");
    }
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
        throw new Error("Invalid password");
    }
    // Disable 2FA
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.update({
        where: {
            id: userId
        },
        data: {
            twoFactorSecret: null,
            twoFactorEnabled: false,
            twoFactorBackupCodes: null
        }
    });
}
async function verify2FACode(userId, code) {
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.findUnique({
        where: {
            id: userId
        },
        select: {
            twoFactorSecret: true,
            twoFactorBackupCodes: true
        }
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
        const backupCodes = JSON.parse(user.twoFactorBackupCodes);
        const codeIndex = backupCodes.indexOf(code);
        if (codeIndex !== -1) {
            // Remove used backup code
            backupCodes.splice(codeIndex, 1);
            await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.update({
                where: {
                    id: userId
                },
                data: {
                    twoFactorBackupCodes: JSON.stringify(backupCodes)
                }
            });
            return true;
        }
    }
    return false;
}
/**
 * Generate backup codes
 */ function generateBackupCodes(count = 10) {
    const codes = [];
    for(let i = 0; i < count; i++){
        const code = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(4).toString("hex").toUpperCase();
        codes.push(code);
    }
    return codes;
}
async function is2FAEnabled(userId) {
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$lib$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].user.findUnique({
        where: {
            id: userId
        },
        select: {
            twoFactorEnabled: true
        }
    });
    return user?.twoFactorEnabled || false;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    generate2FASecret,
    verify2FAToken,
    enable2FA,
    disable2FA,
    verify2FACode,
    is2FAEnabled
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(generate2FASecret, "60f6fdc79e6b90727bf036cf8a55c8d04c7649670c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(verify2FAToken, "60419f5816413eadf0cd78ecbd091561f3afba3d26", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(enable2FA, "70fa5943847165d1cb133bbae4f4f32faa6177ca73", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(disable2FA, "609792c38d4910a9763936d65978bfa47a833d64ea", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(verify2FACode, "606d2831050cb27e71f2be388caaeb214d4eb0064d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(is2FAEnabled, "40ea26d9e48da64fe0cc93af405be99c7d7b0109e2", null);
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6535b02a._.js.map