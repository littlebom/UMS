"use client";

import { deleteStudentGroup } from "@/actions/student-group";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteGroupButtonProps {
    groupId: string;
    groupName: string;
    studentCount: number;
}

export function DeleteGroupButton({ groupId, groupName, studentCount }: DeleteGroupButtonProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);
        const result = await deleteStudentGroup(groupId);

        if (result.success) {
            router.refresh();
        } else {
            alert(result.error);
        }

        setIsDeleting(false);
        setShowConfirm(false);
    }

    if (studentCount > 0) {
        return (
            <button
                disabled
                className="cursor-not-allowed rounded p-1 text-gray-300"
                title="Cannot delete group with students"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        );
    }

    return (
        <>
            <button
                onClick={() => setShowConfirm(true)}
                className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
            >
                <Trash2 className="h-4 w-4" />
            </button>

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Delete Student Group
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Are you sure you want to delete &quot;{groupName}&quot;? This action cannot be
                            undone.
                        </p>
                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
