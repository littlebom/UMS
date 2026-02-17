"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { deletePersonnel } from "@/actions/personnel";

interface StaffActionsMenuProps {
    personnelId: string;
    fullName: string;
}

export default function StaffActionsMenu({
    personnelId,
    fullName
}: StaffActionsMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    async function handleDelete() {
        const confirmed = confirm(
            `Are you sure you want to delete staff member "${fullName}"?\n\nThis action cannot be undone.`
        );

        if (!confirmed) return;

        setIsDeleting(true);
        setIsOpen(false);

        try {
            await deletePersonnel(personnelId);
            // No need to refresh as server action does revalidatePath, 
            // but for client-side feedback we might want to ensure UI updates
        } catch (error: any) {
            alert(`Failed to delete staff: ${error.message}`);
            setIsDeleting(false);
        }
    }

    return (
        <div className="relative" ref={menuRef}>
            {/* Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isDeleting}
                className="rounded p-1 hover:bg-gray-100 disabled:opacity-50"
                title="Actions"
            >
                {isDeleting ? (
                    <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
                ) : (
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && !isDeleting && (
                <div className="absolute right-0 z-50 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                    <div className="py-1">
                        {/* Preview (View Details) */}
                        <Link
                            href={`/admin/personnel/${personnelId}`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            <Eye className="h-4 w-4" />
                            Preview
                        </Link>

                        {/* Edit */}
                        <Link
                            href={`/admin/personnel/${personnelId}/edit`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            <Pencil className="h-4 w-4" />
                            Edit
                        </Link>

                        {/* Divider */}
                        <div className="my-1 border-t border-gray-200"></div>

                        {/* Delete */}
                        <button
                            onClick={handleDelete}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
