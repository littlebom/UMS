"use client";

import { getDepartmentById, updateDepartment } from "@/actions/department";
import { getFaculties } from "@/actions/faculty";
import { Button, Input } from "@ums/ui";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Select, SelectOption } from "@/components/ui/select";

export default function EditDepartmentPage() {
    const params = useParams();
    const id = params.id as string;
    const [department, setDepartment] = useState<any>(null);
    const [faculties, setFaculties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const [deptData, facultiesData] = await Promise.all([
                getDepartmentById(id),
                getFaculties(),
            ]);

            if (!deptData) {
                notFound();
            }

            setDepartment(deptData);
            setFaculties(facultiesData);
            setLoading(false);
        }
        loadData();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto py-10 max-w-2xl">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    if (!department) {
        notFound();
    }

    const updateDepartmentWithId = updateDepartment.bind(null, id);

    const facultyOptions: SelectOption[] = faculties.map((f) => ({
        value: f.id,
        label: f.code,
        description: f.nameEn,
        status: "info", // Adding a status indicator as requested
    }));

    return (
        <div className="container mx-auto py-10 max-w-2xl">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Edit Department</h1>
                <Link
                    href="/admin/academic/program/departments"
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </Link>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
                <form action={updateDepartmentWithId} className="space-y-6">
                    <div className="space-y-2">
                        <Select
                            label="Faculty"
                            value={department.facultyId} // This needs state handling
                            onChange={(val) => setDepartment({ ...department, facultyId: val })}
                            options={facultyOptions}
                            required
                        />
                        {/* Hidden input for form submission */}
                        <input type="hidden" name="facultyId" value={department.facultyId} />
                        <p className="text-xs text-gray-500">Select the faculty this department belongs to</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Thai Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            name="nameTh"
                            defaultValue={department.nameTh}
                            placeholder="ชื่อภาควิชาภาษาไทย"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            English Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            name="nameEn"
                            defaultValue={department.nameEn}
                            placeholder="Department Name in English"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Description
                        </label>
                        <Input
                            name="description"
                            defaultValue={department.description || ""}
                            placeholder="Optional description"
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Link href="/admin/program/departments">
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
