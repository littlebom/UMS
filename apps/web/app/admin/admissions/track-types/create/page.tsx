"use client";

import { createTrackType } from "@/actions/admission-track-type";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IconSelector } from "@/components/icon-selector";
import { ColorPicker } from "@/components/color-picker";

export default function CreateTrackTypePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [color, setColor] = useState("#3B82F6");
    const [icon, setIcon] = useState("Target");

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/admissions/track-types">
                    <button className="rounded-full p-2 hover:bg-gray-100">
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Create Track Type</h1>
                    <p className="text-gray-500">Add a new type of admission round</p>
                </div>
            </div>

            <form
                action={async (formData) => {
                    setIsLoading(true);
                    // Append state values to formData
                    formData.append("color", color);
                    formData.append("icon", icon);
                    await createTrackType(formData);
                    setIsLoading(false);
                }}
                className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Code (Required)</label>
                            <input
                                id="code"
                                name="code"
                                placeholder="e.g., QUOTA"
                                required
                                className="w-full rounded-md border border-gray-300 p-2 text-sm uppercase focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                pattern="[A-Z0-9_]+"
                                title="Uppercase letters, numbers, and underscores only"
                            />
                            <p className="text-xs text-gray-500">Unique identifier (A-Z, 0-9, _)</p>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700">Display Order</label>
                            <input
                                id="displayOrder"
                                name="displayOrder"
                                type="number"
                                defaultValue="0"
                                min="0"
                                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="nameTh" className="block text-sm font-medium text-gray-700">Thai Name (Required)</label>
                            <input
                                id="nameTh"
                                name="nameTh"
                                placeholder="e.g., โควต้า"
                                required
                                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="nameEn" className="block text-sm font-medium text-gray-700">English Name (Required)</label>
                            <input
                                id="nameEn"
                                name="nameEn"
                                placeholder="e.g., Quota Admission"
                                required
                                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Optional description..."
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Color</label>
                            <ColorPicker value={color} onChange={setColor} />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Icon</label>
                            <IconSelector value={icon} onChange={setIcon} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            value="true"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="isActive" className="font-normal text-sm text-gray-700">Active (Visible in selection)</label>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Link href="/admin/admissions/track-types">
                        <button
                            type="button"
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                    </Link>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
                    >
                        {isLoading ? "Creating..." : "Create Track Type"}
                        {!isLoading && <Save className="ml-2 h-4 w-4" />}
                    </button>
                </div>
            </form>
        </div>
    );
}
