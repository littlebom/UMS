"use client";

import { getProgramById, updateProgram } from "@/actions/program";
import { getFaculties } from "@/actions/faculty";
import { getDepartments } from "@/actions/department";
import { Button, Input } from "@ums/ui";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Select, SelectOption } from "@/components/ui/select";

export default function EditProgramPage() {
    const params = useParams();
    const id = params.id as string;
    const [program, setProgram] = useState<any>(null);
    const [faculties, setFaculties] = useState<any[]>([]);
    const [departments, setDepartments] = useState<any[]>([]);
    const [filteredDepartments, setFilteredDepartments] = useState<any[]>([]);
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedDegree, setSelectedDegree] = useState("");
    const [isAcceptingApplications, setIsAcceptingApplications] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const [programData, facultiesData, departmentsData] = await Promise.all([
                getProgramById(id),
                getFaculties(),
                getDepartments(),
            ]);

            if (!programData) {
                notFound();
            }

            setProgram(programData);
            setFaculties(facultiesData);
            setDepartments(departmentsData);

            // Set initial values
            setSelectedFaculty(programData.facultyId);
            setSelectedDepartment(programData.departmentId);
            setSelectedDegree(programData.degreeLevel);
            setIsAcceptingApplications(programData.isAcceptingApplications ?? true);

            setLoading(false);
        }
        loadData();
    }, [id]);

    useEffect(() => {
        if (selectedFaculty) {
            setFilteredDepartments(
                departments.filter((d) => d.facultyId === selectedFaculty)
            );
            // Check if current department belongs to selected faculty, if not reset
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

    if (!program) {
        notFound();
    }

    const updateProgramWithId = updateProgram.bind(null, id);

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
                <h1 className="text-2xl font-bold">Edit Program</h1>
                <Link
                    href="/admin/academic/program/programs"
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </Link>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
                <form action={updateProgramWithId} className="space-y-6">
                    <div className="space-y-2">
                        <Select
                            label="Faculty"
                            value={selectedFaculty}
                            onChange={(val) => setSelectedFaculty(val)}
                            options={facultyOptions}
                            required
                        />
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

                    {/* Application Status Toggle */}
                    <div className="border-t pt-6">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-gray-900">Application Status</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {isAcceptingApplications
                                        ? "This program is currently accepting applications"
                                        : "This program is not accepting applications"}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-sm font-medium ${isAcceptingApplications ? "text-green-600" : "text-red-600"
                                    }`}>
                                    {isAcceptingApplications ? "Open" : "Closed"}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setIsAcceptingApplications(!isAcceptingApplications)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isAcceptingApplications ? "bg-green-600" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAcceptingApplications ? "translate-x-6" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                        <input type="hidden" name="isAcceptingApplications" value={isAcceptingApplications.toString()} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                            Thai Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            name="nameTh"
                            defaultValue={program.nameTh}
                            placeholder="ชื่อหลักสูตรภาษาไทย"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                            English Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            name="nameEn"
                            defaultValue={program.nameEn}
                            placeholder="Program Name in English"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">
                            Description
                        </label>
                        <textarea
                            name="description"
                            defaultValue={program.description || ""}
                            placeholder="Brief program description"
                            className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                    </div>

                    {/* Detailed Curriculum Information */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold mb-4">Curriculum Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Total Credits
                                </label>
                                <Input
                                    name="credits"
                                    type="number"
                                    defaultValue={program.credits || ""}
                                    placeholder="e.g. 120"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Duration
                                </label>
                                <Input
                                    name="duration"
                                    defaultValue={program.duration || ""}
                                    placeholder="e.g. 4 years"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Program Objectives
                                </label>
                                <textarea
                                    name="objectives"
                                    defaultValue={program.objectives || ""}
                                    placeholder="What are the main objectives of this program?"
                                    className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Curriculum Structure
                                </label>
                                <textarea
                                    name="structure"
                                    defaultValue={program.structure || ""}
                                    placeholder="Describe the curriculum structure (e.g., core courses, electives, etc.)"
                                    className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Admission Requirements
                                </label>
                                <textarea
                                    name="admissionRequirements"
                                    defaultValue={program.admissionRequirements || ""}
                                    placeholder="What are the requirements for admission?"
                                    className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Career Opportunities
                                </label>
                                <textarea
                                    name="careerOpportunities"
                                    defaultValue={program.careerOpportunities || ""}
                                    placeholder="What career paths are available after graduation?"
                                    className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Link href="/admin/academic/program/programs">
                            <Button className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-5 py-2.5" type="button">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
