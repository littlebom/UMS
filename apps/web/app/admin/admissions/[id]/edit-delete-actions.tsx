"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";

import { deleteApplication } from "@/actions/admission";

export default function ApplicationEditDeleteActions({
    id,
    applicantName
}: {
    id: string;
    applicantName: string;
}) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    async function handleDelete() {
        if (!confirm(`Are you sure you want to delete application for "${applicantName}"?\n\nThis action cannot be undone.`)) return;

        setIsDeleting(true);
        try {
            await deleteApplication(id);
            router.push("/admin/admissions");
        } catch (error) {
            alert("Failed to delete application. Please try again.");
            setIsDeleting(false);
        }
    }

    return (
        <div className="mt-4 flex flex-col gap-3 border-t pt-4">
            <Link
                href={`/admin/admissions/${id}/edit`}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                <Pencil className="h-4 w-4" />
                Edit Application
            </Link>

            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
            >
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Delete Application
            </button>
        </div>
    );
}
