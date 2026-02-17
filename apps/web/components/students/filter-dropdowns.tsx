"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface FilterDropdownsProps {
    faculties: any[];
    departments: any[];
    programs: any[];
    years: number[];
}

export function FilterDropdowns({
    faculties,
    departments,
    programs,
    years,
}: FilterDropdownsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const currentFacultyId = searchParams.get("facultyId") || "";
    const currentDepartmentId = searchParams.get("departmentId") || "";
    const currentProgramId = searchParams.get("programId") || "";
    const currentStatus = searchParams.get("status") || "";
    const currentYear = searchParams.get("year") || "";

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);

            // Cascading logic: clear child filters when parent changes
            if (key === "facultyId") {
                params.delete("departmentId");
                params.delete("programId");
            } else if (key === "departmentId") {
                params.delete("programId");
            }
        } else {
            params.delete(key);

            // Clear child filters too
            if (key === "facultyId") {
                params.delete("departmentId");
                params.delete("programId");
            } else if (key === "departmentId") {
                params.delete("programId");
            }
        }

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    // Filter departments by selected faculty
    const filteredDepartments = currentFacultyId
        ? departments.filter((d: any) => d.facultyId === currentFacultyId)
        : departments;

    // Filter programs by selected department or faculty
    const filteredPrograms = currentDepartmentId
        ? programs.filter((p: any) => p.departmentId === currentDepartmentId)
        : currentFacultyId
            ? programs.filter((p: any) => p.facultyId === currentFacultyId)
            : programs;

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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

            {/* Department Filter */}
            <select
                value={currentDepartmentId}
                onChange={(e) => handleFilterChange("departmentId", e.target.value)}
                disabled={!currentFacultyId}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <option value="">All Departments</option>
                {filteredDepartments.map((dept: any) => (
                    <option key={dept.id} value={dept.id}>
                        {dept.nameEn}
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

            {/* Status Filter */}
            <select
                value={currentStatus}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Status</option>
                <option value="STUDYING">Studying</option>
                <option value="ON_LEAVE">On Leave</option>
            </select>

            {/* Year Filter */}
            <select
                value={currentYear}
                onChange={(e) => handleFilterChange("year", e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Years</option>
                {years.map((year) => (
                    <option key={year} value={year.toString()}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
}
