"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@ums/ui";

interface ImageUploadProps {
    label: string;
    currentImageUrl?: string;
    onImageChange: (url: string | null) => void;
    folder?: string;
    required?: boolean;
}

export function ImageUpload({
    label,
    currentImageUrl,
    onImageChange,
    folder = "general",
    required = false,
}: ImageUploadProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(currentImageUrl || null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", folder);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || "Upload failed");
            }

            setImageUrl(data.url);
            onImageChange(data.url);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to upload image");
            console.error("Upload error:", err);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setImageUrl(null);
        onImageChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className="flex items-start gap-4">
                {/* Preview */}
                <div className="flex-shrink-0">
                    {imageUrl ? (
                        <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-300 bg-gray-50">
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="h-full w-full object-contain"
                            />
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                        </div>
                    )}
                </div>

                {/* Upload Controls */}
                <div className="flex-1 space-y-2">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                        onChange={handleFileSelect}
                        className="hidden"
                        id={`file-upload-${label}`}
                    />
                    <label htmlFor={`file-upload-${label}`}>
                        <Button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-5 py-2.5 gap-2"
                        >
                            <Upload className="h-4 w-4" />
                            {uploading ? "Uploading..." : "Choose Image"}
                        </Button>
                    </label>
                    <p className="text-xs text-gray-500">
                        PNG, JPG, WebP or GIF (max. 5MB)
                    </p>
                    {error && <p className="text-xs text-red-500">{error}</p>}
                </div>
            </div>

            {/* Hidden input to store the URL for form submission */}
            <input type="hidden" name="logoUrl" value={imageUrl || ""} />
        </div>
    );
}
