"use client";

import { useLanguage } from "@/contexts/language-context";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();

    const toggleLanguage = () => {
        setLocale(locale === "en" ? "th" : "en");
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            title={locale === "en" ? "Switch to Thai" : "Switch to English"}
        >
            <Globe className="h-4 w-4" />
            <span>{locale === "en" ? "EN" : "TH"}</span>
        </button>
    );
}
