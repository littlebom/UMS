"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dictionary as defaultDictionary } from "@/lib/dictionary";
import { getTranslations } from "@/actions/translation";

type Locale = "en" | "th";
type Dictionary = typeof defaultDictionary.en;

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: Dictionary;
    isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>("en");
    const [dynamicDictionary, setDynamicDictionary] = useState<typeof defaultDictionary>(defaultDictionary);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Load locale preference
        const savedLocale = localStorage.getItem("locale") as Locale;
        if (savedLocale) {
            setLocale(savedLocale);
        }

        // Fetch translations from DB
        const fetchTranslations = async () => {
            try {
                const dbTranslations = await getTranslations();

                if (Object.keys(dbTranslations).length > 0) {
                    // Reconstruct nested dictionary from flat keys
                    const newDictionary = JSON.parse(JSON.stringify(defaultDictionary)); // Deep copy structure

                    Object.entries(dbTranslations).forEach(([key, values]) => {
                        const parts = key.split(".");
                        // We assume 2 levels deep for now based on current dictionary (e.g., common.welcome)
                        // If deeper, we'd need a recursive helper.
                        // Current dictionary has: common, menu, landing, student, applicant.
                        if (parts.length === 2) {
                            const [section, item] = parts;
                            if (newDictionary.en[section as keyof Dictionary] && newDictionary.th[section as keyof Dictionary]) {
                                // @ts-ignore - Dynamic assignment
                                newDictionary.en[section][item] = values.en;
                                // @ts-ignore
                                newDictionary.th[section][item] = values.th;
                            }
                        }
                    });
                    setDynamicDictionary(newDictionary);
                }
            } catch (error) {
                console.error("Failed to load translations", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTranslations();
    }, []);

    const handleSetLocale = (newLocale: Locale) => {
        setLocale(newLocale);
        if (typeof window !== 'undefined') {
            localStorage.setItem("locale", newLocale);
        }
    };

    const t = dynamicDictionary[locale];

    // Prevent hydration mismatch
    if (!mounted) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t, isLoading }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}

