"use client";

import { createProgram } from "@/actions/program";
import { getFaculties } from "@/actions/faculty";
import { getDepartments } from "@/actions/department";
import { Button, Input } from "@ums/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Select, SelectOption } from "@/components/ui/select";

export default function CreateProgramPage() {
    const [faculties, setFaculties] = useState<any[]>([]);
    const [departments, setDepartments] = useState<any[]>([]);
    const [filteredDepartments, setFilteredDepartments] = useState<any[]>([]);
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedDegree, setSelectedDegree] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const [facultiesData, departmentsData] = await Promise.all([
                getFaculties(),
                getDepartments(),
            ]);
            setFaculties(facultiesData);
            setDepartments(departmentsData);
            setLoading(false);
        }
        loadData();
    }, []);

    useEffect(() => {
        if (selectedFaculty) {
            setFilteredDepartments(
                departments.filter((d) => d.facultyId === selectedFaculty)
            );
            // Reset department selection when faculty changes
            if (selectedDepartment) {
                const dept = departments.find(d => d.id === selectedDepartment);
                if (dept && dept.facultyId !== selectedFaculty) {
                    setSelectedDepartment("");
                }
            }
        } else {
            setFilteredDepartments([]);
            setSelectedDepartment("");
        }
    }, [selectedFaculty, departments, selectedDepartment]);

    if (loading) {
        return (
            <div className="container mx-auto py-10 max-w-2xl">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    const facultyOptions: SelectOption[] = faculties.map((f) => ({
        value: f.id,
        label: f.code,
        description: f.nameEn,
        status: "info",
    }));

    const departmentOptions: SelectOption[] = filteredDepartments.map((d) => ({
        value: d.id,
        label: d.nameEn,
        description: d.nameTh,
        status: "neutral",
    }));

    const degreeOptions: SelectOption[] = [
        { value: "BACHELOR", label: "Bachelor's Degree", status: "success" },
        { value: "MASTER", label: "Master's Degree", status: "warning" },
        { value: "DOCTORAL", label: "Doctoral Degree", status: "error" },
    ];

    return (
        <div className="container mx-auto py-10 max-w-2xl">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Add New Program</h1>
                <Link
                    href="/admin/academic/program/programs"
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </Link>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
                <form action={createProgram} className="space-y-6">
                    <div className="space-y-2">
                        <Select
                            label="Faculty"
                            value={selectedFaculty}
                            onChange={(val) => setSelectedFaculty(val)}
                            options={facultyOptions}
                            required
                        />
                        {/* No hidden input needed for faculty as it's not directly used in createProgram action, 
                            but departmentId is used to find faculty. However, if we want to be safe/explicit: */}
                        {/* <input type="hidden" name="facultyId" value={selectedFaculty} /> */}
                    </div>

                    <div className="space-y-2">
                        <Select
                            label="Department"
                            value={selectedDepartment}
                            onChange={(val) => setSelectedDepartment(val)}
                            options={departmentOptions}
                            disabled={!selectedFaculty}
                            placeholder={!selectedFaculty ? "Select Faculty first" : "Select Department"}
                            required
                        />
                        <input type="hidden" name="departmentId" value={selectedDepartment} />
                    </div>

                    <div className="space-y-2">
                        <Select
                            label="Degree Level"
                            value={selectedDegree}
                            onChange={(val) => setSelectedDegree(val)}
                            options={degreeOptions}
                            required
                        />
                        <input type="hidden" name="degreeLevel" value={selectedDegree} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                            Thai Name <span className="text-red-500">*</span>
                        </label>
                        <Input name="nameTh" placeholder="ชื่อหลักสูตรภาษาไทย" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                            English Name <span className="text-red-500">*</span>
                        </label>
                        <Input name="nameEn" placeholder="Program Name in English" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                            Description
                        </label>
                        <Input name="description" placeholder="Optional description" />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Link href="/admin/program/programs">
                            <Button className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-5 py-2.5" type="button">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit">Create Program</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
