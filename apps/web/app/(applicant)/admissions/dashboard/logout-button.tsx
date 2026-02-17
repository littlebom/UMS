"use client";

import { logoutApplicant } from "@/actions/auth";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => logoutApplicant()}
            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
            <LogOut className="h-4 w-4" />
            Sign Out
        </button>
    );
}
