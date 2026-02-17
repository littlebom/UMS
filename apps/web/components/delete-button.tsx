"use client";

import { useState } from "react";
import { Button } from "@ums/ui";
import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteButtonProps {
    itemName: string;
    onDelete: () => Promise<void>;
    size?: "sm" | "md";
}

export function DeleteButton({ itemName, onDelete, size = "md" }: DeleteButtonProps) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        setDeleting(true);
        setError(null);
        try {
            await onDelete();
            setShowConfirm(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <Button
                onClick={() => setShowConfirm(true)}
                className={`bg-red-600 hover:bg-red-700 text-white ${size === "sm" ? "h-8 w-8 p-0" : "px-5 py-2.5"
                    } flex items-center justify-center`}
                type="button"
            >
                <Trash2 className="h-4 w-4" />
                {size === "md" && <span className="ml-2">Delete</span>}
                <span className="sr-only">Delete {itemName}</span>
            </Button>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Confirm Deletion
                                </h3>
                                <p className="text-sm text-gray-500">This action cannot be undone</p>
                            </div>
                        </div>

                        <p className="mb-6 text-gray-700">
                            Are you sure you want to delete <strong>{itemName}</strong>?
                        </p>

                        {error && (
                            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-red-800 mb-1">
                                            Cannot Delete
                                        </h4>
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-3">
                            <Button
                                onClick={() => {
                                    setShowConfirm(false);
                                    setError(null);
                                }}
                                disabled={deleting}
                                className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-5 py-2.5"
                                type="button"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5"
                                type="button"
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
