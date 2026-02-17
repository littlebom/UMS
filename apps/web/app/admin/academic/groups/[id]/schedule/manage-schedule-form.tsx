"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { addSectionToGroup, removeSectionFromGroup } from "@/actions/student-group";

interface ManageGroupScheduleFormProps {
    groupId: string;
    sectionId: string;
    action: "add" | "remove";
}

export default function ManageGroupScheduleForm({
    groupId,
    sectionId,
    action,
}: ManageGroupScheduleFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            if (action === "add") {
                await addSectionToGroup(groupId, sectionId);
            } else {
                await removeSectionFromGroup(groupId, sectionId);
            }
            router.refresh();
        });
    };

    if (action === "add") {
        return (
            <button
                onClick={handleClick}
                disabled={isPending}
                className="inline-flex items-center gap-1 rounded-md bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-100 disabled:opacity-50"
            >
                {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Plus className="h-4 w-4" />
                )}
                Add
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            className="inline-flex items-center gap-1 rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
        >
            {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Trash2 className="h-4 w-4" />
            )}
            Remove
        </button>
    );
}
