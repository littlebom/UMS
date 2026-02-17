import { getTranslations } from "@/actions/translation";
import { TranslationTable } from "./translation-table";

export default async function TranslationsPage() {
    const translationsMap = await getTranslations();

    // Convert map to array for the table
    const translations = Object.entries(translationsMap).map(([key, value]) => ({
        key,
        en: value.en,
        th: value.th,
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Translation Management</h1>
                    <p className="text-sm text-gray-500">
                        Manage translations for English and Thai languages.
                    </p>
                </div>
            </div>

            <TranslationTable initialTranslations={translations} />
        </div>
    );
}
