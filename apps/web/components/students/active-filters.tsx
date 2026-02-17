"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

interface ActiveFilter {
    key: string;
    label: string;
    value: string;
}

interface ActiveFiltersProps {
    faculties: any[];
    departments: any[];
    programs: any[];
}

export function ActiveFilters({ faculties, departments, programs }: ActiveFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const activeFilters: ActiveFilter[] = [];

    // Build active filters list
    const facultyId = searchParams.get("facultyId");
    const departmentId = searchParams.get("departmentId");
    const programId = searchParams.get("programId");
    const status = searchParams.get("status");
    const year = searchParams.get("year");
    const search = searchParams.get("search");

    if (search) {
        activeFilters.push({ key: "search", label: "Search", value: search });
    }

    if (facultyId) {
        const faculty = faculties.find((f: any) => f.id === facultyId);
        if (faculty) {
            activeFilters.push({
                key: "facultyId",
                label: "Faculty",
                value: faculty.nameEn,
            });
        }
    }

    if (departmentId) {
        const dept = departments.find((d: any) => d.id === departmentId);
        if (dept) {
            activeFilters.push({
                key: "departmentId",
                label: "Department",
                value: dept.nameEn,
            });
        }
    }

    if (programId) {
        const program = programs.find((p: any) => p.id === programId);
        if (program) {
            activeFilters.push({
                key: "programId",
                label: "Program",
                value: program.nameEn,
            });
        }
    }

    if (status) {
        activeFilters.push({ key: "status", label: "Status", value: status });
    }

    if (year) {
        activeFilters.push({ key: "year", label: "Year", value: year });
    }

    const removeFilter = (key: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(key);

        // Cascading: if removing faculty, also remove department and program
        if (key === "facultyId") {
            params.delete("departmentId");
            params.delete("programId");
        } else if (key === "departmentId") {
            params.delete("programId");
        }

        router.push(`?${params.toString()}`);
    };

    const clearAll = () => {
        router.push("?");
    };

    if (activeFilters.length === 0) {
        return null;
    }

    return (
        <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeFilters.map((filter) => (
                <div
                    key={filter.key}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm"
                >
                    <span className="font-medium text-blue-900">{filter.label}:</span>
                    <span className="text-blue-700">{filter.value}</span>
                    <button
                        onClick={() => removeFilter(filter.key)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            ))}
            <button
                onClick={clearAll}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
                Clear all
            </button>
        </div>
    );
}
