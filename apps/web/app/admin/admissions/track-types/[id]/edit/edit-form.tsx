"use client";

import { updateTrackType } from "@/actions/admission-track-type";
import { Save, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IconSelector } from "@/components/icon-selector";
import { ColorPicker } from "@/components/color-picker";

interface EditTrackTypeFormProps {
    trackType: any; // Type from Prisma
}

export default function EditTrackTypeForm({ trackType }: EditTrackTypeFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [color, setColor] = useState(trackType.color);
    const [icon, setIcon] = useState(trackType.icon);

    return (
        <form
            action={async (formData) => {
                setIsLoading(true);
                formData.append("color", color);
                formData.append("icon", icon);
                await updateTrackType(trackType.id, formData);
                setIsLoading(false);
            }}
            className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">Code</label>
                        <div className="flex items-center gap-2">
                            <input
                                id="code"
                                name="code"
                                defaultValue={trackType.code}
                                disabled
                                className="w-full rounded-md border border-gray-300 bg-gray-50 p-2 font-mono text-sm text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500">Code cannot be changed once created</p>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700">Display Order</label>
                        <input
                            id="displayOrder"
                            name="displayOrder"
                            type="number"
                            defaultValue={trackType.displayOrder}
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
                            defaultValue={trackType.nameTh}
                            required
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="nameEn" className="block text-sm font-medium text-gray-700">English Name (Required)</label>
                        <input
                            id="nameEn"
                            name="nameEn"
                            defaultValue={trackType.nameEn}
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
                        defaultValue={trackType.description || ""}
                        rows={3}
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                        defaultChecked={trackType.isActive}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="isActive" className="font-normal text-sm text-gray-700">Active</label>
                </div>

                {trackType.isSystem && (
                    <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-700">
                        <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            <span className="font-medium">System Track Type</span>
                        </div>
                        <p className="mt-1 text-xs">This is a core system type and cannot be deleted, but you can edit its display properties.</p>
                    </div>
                )}
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
                    {isLoading ? "Saving..." : "Save Changes"}
                    {!isLoading && <Save className="ml-2 h-4 w-4" />}
                </button>
            </div>
        </form>
    );
}
