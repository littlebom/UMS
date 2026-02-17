"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { getSystemSettings } from "@/actions/settings";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";

export function PublicNavbar() {
    return <PublicNavbarClient />;
}

function PublicNavbarClient() {
    const [settings, setSettings] = useState<any>(null);
    const { t } = useLanguage();

    useEffect(() => {
        getSystemSettings().then(setSettings);
    }, []);

    return (
        <nav className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Left: Logo */}
                    <div className="flex flex-shrink-0 items-center">
                        <Link href="/" className="flex items-center">
                            {settings?.logoUrl ? (
                                <img
                                    src={settings.logoUrl}
                                    alt="Logo"
                                    className="h-10 w-auto object-contain"
                                />
                            ) : (
                                <>
                                    <GraduationCap className="h-8 w-8 text-blue-600" />
                                    <span className="ml-2 text-xl font-bold text-gray-900">
                                        {settings?.universityName || "UMS"}
                                    </span>
                                </>
                            )}
                        </Link>
                    </div>

                    {/* Center: Menu */}
                    <div className="hidden md:flex md:flex-1 md:justify-center md:space-x-8">
                        <Link
                            href="/"
                            className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            {t.menu.home}
                        </Link>
                        <Link
                            href="/curriculum"
                            className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            {t.menu.curriculum}
                        </Link>
                        <Link
                            href="/admissions"
                            className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            {t.common.admissions}
                        </Link>
                        <Link
                            href="/students"
                            className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            {t.menu.students}
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher />
                        <Link
                            href="/login"
                            className="rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            {t.applicant.login}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

