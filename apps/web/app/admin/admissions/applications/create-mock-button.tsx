"use client";

import { createMockApplication } from "@/actions/admission";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function CreateMockApplicationButton({ programs }: { programs: any[] }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = async () => {
        if (programs.length === 0) {
            alert("Please create at least one program first.");
            return;
        }

        setIsLoading(true);
        try {
            const randomProgram = programs[Math.floor(Math.random() * programs.length)];
            const randomId = Math.floor(Math.random() * 10000);

            await createMockApplication({
                firstName: `Applicant`,
                lastName: `${randomId}`,
                email: `applicant${randomId}@example.com`,
                programId: randomProgram.id,
            });
        } catch (error) {
            console.error(error);
            alert("Failed to create mock application");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleCreate}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
            <Plus className="h-4 w-4" />
            {isLoading ? "Creating..." : "Create Mock Application"}
        </button>
    );
}
