"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface LeaveRequestFiltersProps {
    faculties: any[];
    programs: any[];
}

export function LeaveRequestFilters({ faculties, programs }: LeaveRequestFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const currentStatus = searchParams.get("status") || "";
    const currentFacultyId = searchParams.get("facultyId") || "";
    const currentProgramId = searchParams.get("programId") || "";

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);

            // Clear child filters
            if (key === "facultyId") {
                params.delete("programId");
            }
        } else {
            params.delete(key);

            // Clear child filters
            if (key === "facultyId") {
                params.delete("programId");
            }
        }

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    // Filter programs by selected faculty
    const filteredPrograms = currentFacultyId
        ? programs.filter((p: any) => p.facultyId === currentFacultyId)
        : programs;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Status Filter */}
            <select
                value={currentStatus}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
            </select>

            {/* Faculty Filter */}
            <select
                value={currentFacultyId}
                onChange={(e) => handleFilterChange("facultyId", e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Faculties</option>
                {faculties.map((faculty: any) => (
                    <option key={faculty.id} value={faculty.id}>
                        {faculty.nameEn}
                    </option>
                ))}
            </select>

            {/* Program Filter */}
            <select
                value={currentProgramId}
                onChange={(e) => handleFilterChange("programId", e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Programs</option>
                {filteredPrograms.map((program: any) => (
                    <option key={program.id} value={program.id}>
                        {program.nameEn}
                    </option>
                ))}
            </select>
        </div>
    );
}
