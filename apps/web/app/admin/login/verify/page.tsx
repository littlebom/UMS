"use client";

import { useState } from "react";
import { verify2FALogin } from "@/actions/admin-auth";
import { Shield, AlertTriangle } from "lucide-react";

export default function TwoFactorVerifyPage() {
    const [code, setCode] = useState("");
    const [useBackupCode, setUseBackupCode] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await verify2FALogin(code);
            // Redirect will happen in the action
        } catch (err: any) {
            setError(err.message || "Invalid verification code");
            setCode("");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-2xl p-8">
                <div className="text-center mb-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <Shield className="h-8 w-8 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Two-Factor Authentication
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        {useBackupCode
                            ? "Enter one of your backup codes"
                            : "Enter the 6-digit code from your authenticator app"}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            {error}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {useBackupCode ? "Backup Code" : "Verification Code"}
                        </label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => {
                                if (useBackupCode) {
                                    setCode(e.target.value.toUpperCase());
                                } else {
                                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                                }
                            }}
                            placeholder={useBackupCode ? "XXXXXXXX" : "000000"}
                            maxLength={useBackupCode ? 8 : 6}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-2xl font-mono tracking-widest focus:border-blue-500 focus:outline-none"
                            autoFocus
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || (!useBackupCode && code.length !== 6) || (useBackupCode && code.length !== 8)}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? "Verifying..." : "Verify"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setUseBackupCode(!useBackupCode);
                            setCode("");
                            setError("");
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        {useBackupCode
                            ? "Use authenticator app instead"
                            : "Use backup code instead"}
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <a
                        href="/admin/login"
                        className="text-sm text-gray-600 hover:text-gray-700"
                    >
                        ← Back to login
                    </a>
                </div>
            </div>
        </div>
    );
}
