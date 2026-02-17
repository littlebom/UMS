"use client";

import { deleteFile } from "@/actions/files";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteFileButton({
    fileId,
    fileType,
}: {
    fileId: string;
    fileType: string;
}) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this file? This action cannot be undone.")) {
            return;
        }

        setIsDeleting(true);
        try {
            await deleteFile(fileId, fileType);
            router.refresh();
        } catch (error) {
            console.error("Failed to delete file:", error);
            alert("Failed to delete file. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-1 text-red-600 hover:text-red-900 disabled:opacity-50"
            title="Delete File"
        >
            <Trash2 className="h-4 w-4" />
        </button>
    );
}
