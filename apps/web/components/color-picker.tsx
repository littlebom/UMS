"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const PRESET_COLORS = [
    "#3B82F6", // Blue
    "#10B981", // Green
    "#8B5CF6", // Purple
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#EC4899", // Pink
    "#6366F1", // Indigo
    "#14B8A6", // Teal
    "#F97316", // Orange
    "#64748B", // Slate
];

interface ColorPickerProps {
    value: string;
    onChange: (value: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((color) => (
                    <button
                        key={color}
                        type="button"
                        onClick={() => onChange(color)}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${value === color ? "border-gray-400 ring-2 ring-gray-400" : "border-transparent"
                            }`}
                        style={{ backgroundColor: color }}
                    >
                        {value === color && <Check className="h-4 w-4 text-white" />}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded border border-gray-300 p-0.5"
                />
                <span className="text-sm text-gray-500 uppercase">{value}</span>
            </div>
        </div>
    );
}
