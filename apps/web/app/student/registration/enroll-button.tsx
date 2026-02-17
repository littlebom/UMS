"use client";

import { enrollStudent } from "@/actions/enrollment";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function EnrollButton({ sectionId }: { sectionId: string }) {
    const [isEnrolling, setIsEnrolling] = useState(false);
    const router = useRouter();

    async function handleEnroll() {
        // if (!confirm("Are you sure you want to enroll in this section?")) return;

        setIsEnrolling(true);
        try {
            await enrollStudent(sectionId);
            alert("Enrolled successfully!");
            router.refresh();
        } catch (error) {
            alert(error instanceof Error ? error.message : "Failed to enroll");
        } finally {
            setIsEnrolling(false);
        }
    }

    return (
        <button
            onClick={handleEnroll}
            disabled={isEnrolling}
            className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
        >
            {isEnrolling ? "Enrolling..." : "Enroll"}
        </button>
    );
}
