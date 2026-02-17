"use client";

import { useState, useEffect } from "react";
import { generate2FASecret, enable2FA, disable2FA, is2FAEnabled } from "@/lib/two-factor";
import { getAdminSession } from "@/actions/auth";
import { Shield, Copy, Check, AlertTriangle } from "lucide-react";

export default function SecuritySettingsPage() {
    const [session, setSession] = useState<any>(null);
    const [is2FAActive, setIs2FAActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [setupMode, setSetupMode] = useState(false);

    // Setup state
    const [qrCode, setQrCode] = useState("");
    const [secret, setSecret] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [backupCodes, setBackupCodes] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    // Disable state
    const [disablePassword, setDisablePassword] = useState("");
    const [showDisableForm, setShowDisableForm] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const sessionData = await getAdminSession();
            if (!sessionData) {
                window.location.href = "/admin/login";
                return;
            }
            setSession(sessionData);

            const enabled = await is2FAEnabled(sessionData.userId);
            setIs2FAActive(enabled);
        } catch (err) {
            setError("Failed to load security settings");
        } finally {
            setLoading(false);
        }
    }

    async function handleStartSetup() {
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const result = await generate2FASecret(session.userId, session.email || "admin@ums.ac.th");
            setQrCode(result.qrCode);
            setSecret(result.secret);
            setSetupMode(true);
        } catch (err: any) {
            setError(err.message || "Failed to generate 2FA secret");
        } finally {
            setLoading(false);
        }
    }

    async function handleEnable2FA(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const codes = await enable2FA(session.userId, secret, verificationCode);
            setBackupCodes(codes);
            setIs2FAActive(true);
            setSuccess("2FA enabled successfully! Please save your backup codes.");
        } catch (err: any) {
            setError(err.message || "Invalid verification code");
        } finally {
            setLoading(false);
        }
    }

    async function handleDisable2FA(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await disable2FA(session.userId, disablePassword);
            setIs2FAActive(false);
            setSetupMode(false);
            setBackupCodes([]);
            setShowDisableForm(false);
            setDisablePassword("");
            setSuccess("2FA disabled successfully");
        } catch (err: any) {
            setError(err.message || "Failed to disable 2FA");
        } finally {
            setLoading(false);
        }
    }

    function copyBackupCodes() {
        const text = backupCodes.join("\n");
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    if (loading && !session) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-4xl py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Security Settings</h1>
                <p className="mt-2 text-gray-600">Manage your account security and two-factor authentication</p>
            </div>

            {error && (
                <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        {error}
                    </div>
                </div>
            )}

            {success && (
                <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800">
                    <div className="flex items-center gap-2">
                        <Check className="h-5 w-5" />
                        {success}
                    </div>
                </div>
            )}

            {/* 2FA Status Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`rounded-lg p-3 ${is2FAActive ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <Shield className={`h-6 w-6 ${is2FAActive ? 'text-green-600' : 'text-gray-600'}`} />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Two-Factor Authentication</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                {is2FAActive
                                    ? "Your account is protected with 2FA"
                                    : "Add an extra layer of security to your account"}
                            </p>
                            <div className="mt-2">
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${is2FAActive
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {is2FAActive ? "Enabled" : "Disabled"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {!is2FAActive && !setupMode && (
                        <button
                            onClick={handleStartSetup}
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            Enable 2FA
                        </button>
                    )}

                    {is2FAActive && !showDisableForm && (
                        <button
                            onClick={() => setShowDisableForm(true)}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                            Disable 2FA
                        </button>
                    )}
                </div>

                {/* Setup Form */}
                {setupMode && !backupCodes.length && (
                    <div className="mt-6 border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Setup Two-Factor Authentication</h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-sm text-gray-600 mb-4">
                                    1. Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                                </p>
                                <div className="flex justify-center bg-white p-4 rounded-lg border border-gray-200">
                                    <img src={qrCode} alt="2FA QR Code" className="h-64 w-64" />
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-2">
                                    2. Or enter this secret key manually:
                                </p>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-mono text-sm">
                                        {secret}
                                    </code>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(secret);
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 2000);
                                        }}
                                        className="rounded-lg bg-gray-200 p-2 hover:bg-gray-300"
                                    >
                                        {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleEnable2FA} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        3. Enter the 6-digit code from your authenticator app
                                    </label>
                                    <input
                                        type="text"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                        placeholder="000000"
                                        maxLength={6}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-center text-2xl font-mono tracking-widest focus:border-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={loading || verificationCode.length !== 6}
                                        className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
                                    >
                                        {loading ? "Verifying..." : "Verify and Enable"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSetupMode(false);
                                            setVerificationCode("");
                                        }}
                                        className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Backup Codes */}
                {backupCodes.length > 0 && (
                    <div className="mt-6 border-t border-gray-200 pt-6">
                        <div className="rounded-lg bg-yellow-50 p-4 mb-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-yellow-900">Save Your Backup Codes</h4>
                                    <p className="mt-1 text-sm text-yellow-800">
                                        Store these codes in a safe place. You can use them to access your account if you lose your authenticator device.
                                        Each code can only be used once.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-gray-900">Backup Codes</h4>
                                <button
                                    onClick={copyBackupCodes}
                                    className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-300"
                                >
                                    {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                                    {copied ? "Copied!" : "Copy All"}
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {backupCodes.map((code, index) => (
                                    <code key={index} className="rounded bg-white px-3 py-2 font-mono text-sm text-center border border-gray-200">
                                        {code}
                                    </code>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setBackupCodes([]);
                                setSetupMode(false);
                                setVerificationCode("");
                            }}
                            className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                        >
                            I've Saved My Backup Codes
                        </button>
                    </div>
                )}

                {/* Disable Form */}
                {showDisableForm && (
                    <div className="mt-6 border-t border-gray-200 pt-6">
                        <div className="rounded-lg bg-red-50 p-4 mb-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-red-900">Disable Two-Factor Authentication</h4>
                                    <p className="mt-1 text-sm text-red-800">
                                        This will make your account less secure. Enter your password to confirm.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleDisable2FA} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={disablePassword}
                                    onChange={(e) => setDisablePassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 disabled:bg-gray-400"
                                >
                                    {loading ? "Disabling..." : "Disable 2FA"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowDisableForm(false);
                                        setDisablePassword("");
                                    }}
                                    className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
