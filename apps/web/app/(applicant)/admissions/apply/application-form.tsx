"use client";

import { submitApplication } from "@/actions/admission";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { GraduationCap, Building2, BookOpen, CheckCircle2, ChevronRight } from "lucide-react";
import { Select, SelectOption } from "@/components/ui/select";

export default function ApplicationForm({
    programs,
    applicantId,
}: {
    programs: any[];
    applicantId: string;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const defaultProgramId = searchParams.get("programId") || "";

    const [selectedFacultyId, setSelectedFacultyId] = useState<string>("");
    const [selectedProgramId, setSelectedProgramId] = useState(defaultProgramId);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Get unique faculties from programs
    const faculties = useMemo(() => {
        const facultyMap = new Map();
        programs.forEach(program => {
            if (!facultyMap.has(program.faculty.id)) {
                facultyMap.set(program.faculty.id, program.faculty);
            }
        });
        return Array.from(facultyMap.values());
    }, [programs]);

    // Convert faculties to SelectOption format
    const facultyOptions: SelectOption[] = useMemo(() => {
        return faculties.map(faculty => ({
            value: faculty.id,
            label: faculty.nameEn,
            description: faculty.nameTh,
            status: "info" as const,
        }));
    }, [faculties]);

    // Filter programs by selected faculty and accepting applications
    const filteredPrograms = useMemo(() => {
        if (!selectedFacultyId) return [];
        return programs.filter(p => p.faculty.id === selectedFacultyId);
    }, [programs, selectedFacultyId]);

    // Separate open and closed programs
    const openPrograms = useMemo(() => {
        return filteredPrograms.filter(p => p.isAcceptingApplications !== false);
    }, [filteredPrograms]);

    const closedPrograms = useMemo(() => {
        return filteredPrograms.filter(p => p.isAcceptingApplications === false);
    }, [filteredPrograms]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!selectedProgramId) {
            setError("Please select a program");
            return;
        }

        setIsLoading(true);

        try {
            const applicationId = await submitApplication({
                applicantId,
                programId: selectedProgramId,
            });

            router.push("/admissions/dashboard");
        } catch (e: any) {
            setError(e.message);
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Faculty Selection */}
            <div>
                <Select
                    label="Step 1: Select Faculty"
                    value={selectedFacultyId}
                    onChange={(value) => {
                        setSelectedFacultyId(value);
                        setSelectedProgramId(""); // Reset program selection
                    }}
                    options={facultyOptions}
                    placeholder="Choose a faculty..."
                    required
                />
                <p className="mt-2 text-sm text-gray-500">
                    Choose the faculty that offers your desired program.
                </p>
            </div>

            {/* Step 2: Program Selection (shown only after faculty is selected) */}
            {selectedFacultyId && (
                <div className="border-t pt-8">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                            Step 2: Select Program <span className="text-red-500">*</span>
                        </h2>
                        <p className="text-sm text-gray-600">
                            Choose the program you wish to apply for. Your personal information from registration will be used for this application.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {openPrograms.map((program) => (
                            <button
                                key={program.id}
                                type="button"
                                onClick={() => setSelectedProgramId(program.id)}
                                className={`relative rounded-lg border-2 p-6 text-left transition-all hover:shadow-md ${selectedProgramId === program.id
                                    ? "border-blue-600 bg-blue-50 shadow-md"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                                    }`}
                            >
                                {selectedProgramId === program.id && (
                                    <div className="absolute top-4 right-4">
                                        <CheckCircle2 className="h-6 w-6 text-blue-600" />
                                    </div>
                                )}

                                <div className="mb-4">
                                    <div className={`inline-flex rounded-lg p-3 ${selectedProgramId === program.id
                                        ? "bg-blue-100"
                                        : "bg-gray-100"
                                        }`}>
                                        <GraduationCap className={`h-6 w-6 ${selectedProgramId === program.id
                                            ? "text-blue-600"
                                            : "text-gray-600"
                                            }`} />
                                    </div>
                                </div>

                                <h3 className={`font-semibold mb-2 pr-8 ${selectedProgramId === program.id
                                    ? "text-blue-900"
                                    : "text-gray-900"
                                    }`}>
                                    {program.nameEn}
                                </h3>

                                <p className="text-sm text-gray-600 mb-3">
                                    {program.nameTh}
                                </p>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <BookOpen className="h-4 w-4" />
                                        <span className="font-medium">{program.degreeLevel}</span>
                                    </div>

                                    {program.department && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <ChevronRight className="h-4 w-4" />
                                            <span className="truncate">{program.department.nameEn}</span>
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))}

                        {/* Closed Programs - Display as disabled */}
                        {closedPrograms.map((program) => (
                            <div
                                key={program.id}
                                className="relative rounded-lg border-2 border-gray-200 bg-gray-50 p-6 opacity-60"
                            >
                                <div className="absolute top-4 right-4">
                                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                        Closed
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <div className="inline-flex rounded-lg p-3 bg-gray-200">
                                        <GraduationCap className="h-6 w-6 text-gray-500" />
                                    </div>
                                </div>

                                <h3 className="font-semibold mb-2 pr-16 text-gray-700">
                                    {program.nameEn}
                                </h3>

                                <p className="text-sm text-gray-500 mb-3">
                                    {program.nameTh}
                                </p>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <BookOpen className="h-4 w-4" />
                                        <span className="font-medium">{program.degreeLevel}</span>
                                    </div>

                                    {program.department && (
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <ChevronRight className="h-4 w-4" />
                                            <span className="truncate">{program.department.nameEn}</span>
                                        </div>
                                    )}
                                </div>

                                <p className="mt-3 text-xs text-red-600 font-medium">
                                    Not accepting applications
                                </p>
                            </div>
                        ))}
                    </div>

                    {filteredPrograms.length === 0 && (
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
                            <p className="text-gray-600">No programs available in this faculty.</p>
                        </div>
                    )}
                </div>
            )}

            {error && (
                <div className="rounded-md bg-red-50 border border-red-200 p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading || !selectedProgramId}
                    className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Submitting..." : "Submit Application"}
                </button>
            </div>
        </form>
    );
}
