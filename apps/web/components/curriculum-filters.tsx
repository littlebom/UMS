"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { Select, SelectOption } from "@/components/ui/select";

interface Faculty {
    id: string;
    nameEn: string;
    nameTh: string;
    code: string;
}

interface CurriculumFiltersProps {
    faculties: Faculty[];
}

export function CurriculumFilters({ faculties }: CurriculumFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { locale } = useLanguage();

    const currentFacultyId = searchParams.get("facultyId") || "";
    const currentDegreeLevel = searchParams.get("degreeLevel") || "";

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/curriculum?${params.toString()}`);
    };

    // Faculty options
    const facultyOptions: SelectOption[] = [
        { value: "", label: locale === "en" ? "All Faculties" : "คณะทั้งหมด" },
        ...faculties.map((faculty) => ({
            value: faculty.id,
            label: locale === "en" ? faculty.nameEn : faculty.nameTh,
        })),
    ];

    // Degree Level options
    const degreeLevelOptions: SelectOption[] = [
        { value: "", label: locale === "en" ? "All Levels" : "ระดับทั้งหมด" },
        { value: "BACHELOR", label: locale === "en" ? "Bachelor's Degree" : "ปริญญาตรี" },
        { value: "MASTER", label: locale === "en" ? "Master's Degree" : "ปริญญาโท" },
        { value: "DOCTORATE", label: locale === "en" ? "Doctorate Degree" : "ปริญญาเอก" },
    ];

    return (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
            <Select
                label={locale === "en" ? "Degree Level" : "ระดับการศึกษา"}
                value={currentDegreeLevel}
                onChange={(value) => handleFilterChange("degreeLevel", value)}
                options={degreeLevelOptions}
                placeholder={locale === "en" ? "Select degree level" : "เลือกระดับการศึกษา"}
                showDescriptionInValue={false}
            />
            <Select
                label={locale === "en" ? "Faculty" : "คณะ"}
                value={currentFacultyId}
                onChange={(value) => handleFilterChange("facultyId", value)}
                options={facultyOptions}
                placeholder={locale === "en" ? "Select a faculty" : "เลือกคณะ"}
                showDescriptionInValue={false}
            />
        </div>
    );
}
