"use client";

import { useState } from "react";
import { Search, Save, RotateCw } from "lucide-react";
import { updateTranslation, seedTranslations } from "@/actions/translation";
import { useRouter } from "next/navigation";

interface Translation {
    key: string;
    en: string;
    th: string;
}

interface TranslationTableProps {
    initialTranslations: Translation[];
}

export function TranslationTable({ initialTranslations }: TranslationTableProps) {
    const router = useRouter();
    const [translations, setTranslations] = useState(initialTranslations);
    const [search, setSearch] = useState("");
    const [editingKey, setEditingKey] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<{ en: string; th: string }>({ en: "", th: "" });
    const [isSyncing, setIsSyncing] = useState(false);

    const filteredTranslations = translations.filter(
        (t) =>
            t.key.toLowerCase().includes(search.toLowerCase()) ||
            t.en.toLowerCase().includes(search.toLowerCase()) ||
            t.th.toLowerCase().includes(search.toLowerCase())
    );

    const handleEdit = (t: Translation) => {
        setEditingKey(t.key);
        setEditValues({ en: t.en, th: t.th });
    };

    const handleSave = async (key: string) => {
        try {
            await updateTranslation(key, editValues);
            setTranslations((prev) =>
                prev.map((t) => (t.key === key ? { ...t, ...editValues } : t))
            );
            setEditingKey(null);
            router.refresh();
        } catch (error) {
            alert("Failed to save translation");
        }
    };

    const handleSync = async () => {
        // Removed confirmation dialog to fix disappearing issue

        setIsSyncing(true);
        try {
            const result = await seedTranslations();
            if (result.success) {
                alert(`Success! Synced ${result.count} translations.`);
                router.refresh();
                // We might need to reload the page to get new data if the list changed drastically
                window.location.reload();
            } else {
                alert(`Failed to sync: ${result.error}`);
            }
        } catch (error) {
            alert("Failed to sync translations (Network/System Error)");
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search key or value..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-10 w-full rounded-md border border-gray-300 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 border border-gray-300"
                >
                    <RotateCw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
                    {isSyncing ? "Syncing..." : "Reset to Defaults"}
                </button>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Key
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                English
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Thai
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredTranslations.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                    No translations found. Try syncing with defaults.
                                </td>
                            </tr>
                        ) : (
                            filteredTranslations.map((t) => (
                                <tr key={t.key} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {t.key}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {editingKey === t.key ? (
                                            <input
                                                type="text"
                                                value={editValues.en}
                                                onChange={(e) =>
                                                    setEditValues({ ...editValues, en: e.target.value })
                                                }
                                                className="w-full rounded-md border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
                                            />
                                        ) : (
                                            t.en
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {editingKey === t.key ? (
                                            <input
                                                type="text"
                                                value={editValues.th}
                                                onChange={(e) =>
                                                    setEditValues({ ...editValues, th: e.target.value })
                                                }
                                                className="w-full rounded-md border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
                                            />
                                        ) : (
                                            t.th
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        {editingKey === t.key ? (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleSave(t.key)}
                                                    className="text-green-600 hover:text-green-900"
                                                >
                                                    <Save className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => setEditingKey(null)}
                                                    className="text-gray-600 hover:text-gray-900"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleEdit(t)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
