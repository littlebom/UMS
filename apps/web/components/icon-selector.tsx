"use client";

import * as Icons from "lucide-react";
import { useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";

// Common icons suitable for admission tracks
const COMMON_ICONS = [
    "Target", "Award", "Star", "Trophy", "Zap", "Sparkles",
    "Crown", "Medal", "Briefcase", "GraduationCap", "BookOpen",
    "Globe", "ArrowRightLeft", "Users", "FileText", "Flag",
    "Heart", "Lightbulb", "Rocket", "Shield"
];

interface IconSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

export function IconSelector({ value, onChange }: IconSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const SelectedIcon = (Icons as any)[value] || Icons.Target;

    const filteredIcons = COMMON_ICONS.filter(icon =>
        icon.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
                <div className="flex items-center gap-2">
                    <SelectedIcon className="h-4 w-4 text-gray-500" />
                    <span>{value}</span>
                </div>
                <ChevronsUpDown className="h-4 w-4 text-gray-400" />
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
                    <div className="sticky top-0 border-b border-gray-100 bg-white p-2">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-3 w-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search icons..."
                                className="w-full rounded-md border border-gray-200 py-1 pl-7 pr-2 text-xs focus:border-blue-500 focus:outline-none"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="p-1">
                        {filteredIcons.map((iconName) => {
                            const Icon = (Icons as any)[iconName];
                            return (
                                <button
                                    key={iconName}
                                    type="button"
                                    onClick={() => {
                                        onChange(iconName);
                                        setIsOpen(false);
                                    }}
                                    className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-100 ${value === iconName ? "bg-blue-50 text-blue-600" : "text-gray-700"
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{iconName}</span>
                                    {value === iconName && <Check className="ml-auto h-3 w-3" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
