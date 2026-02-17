"use client";

import Link from "next/link";
import { Search, Bell, User } from "lucide-react";

import { getSystemSettings } from "@/actions/settings";
import { useEffect, useState } from "react";

export function TopNav() {
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        getSystemSettings().then(setSettings);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#050f2c] text-white shadow-sm">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo Section */}
                <div className="flex items-center gap-2 md:w-64">
                    <Link href="/admin" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        {settings?.logoUrl ? (
                            <img
                                src={settings.logoUrl}
                                alt="Logo"
                                className="h-10 w-auto object-contain"
                            />
                        ) : (
                            <>
                                <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white">
                                    {settings?.universityName ? settings.universityName.charAt(0) : "U"}
                                </div>
                                <span>
                                    {settings?.universityName || "UMS"}
                                    <span className="text-blue-400 ml-1">Admin</span>
                                </span>
                            </>
                        )}
                    </Link>
                </div>

                {/* Search Bar (Algolia Style) */}
                <div className="hidden flex-1 items-center justify-center md:flex">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for students, programs, or settings..."
                            className="h-10 w-full rounded-lg border-none bg-[#1c2645] pl-10 pr-4 text-sm text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-gray-600 bg-[#050f2c] px-1.5 py-0.5 text-xs text-gray-400">
                            ⌘K
                        </div>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <button className="relative rounded-full p-2 hover:bg-[#1c2645] transition-colors">
                        <Bell className="h-5 w-5 text-gray-300" />
                        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#050f2c]" />
                    </button>
                    <div className="flex items-center gap-3 border-l border-gray-700 pl-4">
                        <div className="hidden text-right md:block">
                            <p className="text-sm font-medium text-gray-200">Admin User</p>
                            <p className="text-xs text-gray-400">System Administrator</p>
                        </div>
                        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px]">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#050f2c]">
                                <User className="h-4 w-4 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
